import type { TLShapeId, Editor } from "tldraw";
import type { IComponentShape } from "../component-shape/component-shape";
import { buildGraph } from "./graph";
import {
  processInstruction,
  type InstructionOutput,
} from "../../services/openaiService";

const setProcessingState = (
  editor: Editor,
  shapeId: TLShapeId,
  isProcessing: boolean
) => {
  const shape = editor.getShape<IComponentShape>(shapeId);
  if (shape) {
    editor.updateShape<IComponentShape>({
      id: shapeId,
      type: "componentShape",
      props: { ...shape.props, isProcessing },
    });
  }
};

export const runGraphFromShape = async (shapeId: TLShapeId, editor: Editor) => {
  const graph = buildGraph(shapeId, editor);
  const processedNodes = new Set<string>();
  const queue: string[] = [shapeId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    if (processedNodes.has(currentId)) continue;
    const currentNode = graph.getNodeData(currentId);
    if (!currentNode) continue;

    const inputs = graph.dependenciesOf(shapeId).map((n) => {
      const node = graph.getNodeData(n);
      return node;
    });

    const outputs = graph
      .directDependantsOf(currentId)
      .map((n) => graph.getNodeData(n));

    switch (currentNode.component) {
      case "instruction": {
        setProcessingState(editor, currentNode.shapeId, true);
        const outputTypes = [
          ...new Set(
            graph
              .directDependantsOf(currentId)
              .map<IComponentShape | undefined>((n) =>
                editor.getShape(n as TLShapeId)
              )
              .filter<IComponentShape>((n) => !!n)
              .map((n) => n.props.component)
          ),
        ];

        const instructionInputs = inputs
          .filter((n) => n.component === "text")
          .map((n) => n.getValue());

        const requests: Promise<InstructionOutput>[] = [];

        // debugger;

        for (const outputType of outputTypes) {
          if (outputType === "text") {
            const args = {
              type: "text" as const,
              instruction: currentNode.getValue(),
              inputs: instructionInputs,
            };
            requests.push(processInstruction(args));
          }
        }

        const responses = await Promise.all(requests);

        // Assign responses to output nodes
        for (const response of responses) {
          if (response.type === "text") {
            const outputNode = outputs.find(() => "text" === response.type);

            if (outputNode) {
              const outputShape = editor.getShape<IComponentShape>(
                outputNode.shapeId
              );
              editor.updateShape<IComponentShape>({
                id: outputNode.shapeId,
                type: "componentShape",
                props: { ...outputShape?.props, text: response.result },
              });
            } else {
              // TODO: If no output node exists, create shape and arrow binding
              editor.createShape<IComponentShape>({
                type: "componentShape",
                props: { text: response.result },
              });
            }
          }
        }

        // console.log("Running instruction", {
        //   instruction: currentNode.getValue(),
        //   outputNodes: outputs,
        // });

        processedNodes.add(currentId);
        setProcessingState(editor, currentNode.shapeId, false);
        break;
      }
      case "text":
        {
          // console.log("Running text:", currentNode);
          processedNodes.add(currentId);
        }
        break;
      default:
        processedNodes.add(currentId);
        break;
    }

    // Enqueue unprocessed instruction nodes that are direct outputs
    for (const outputNode of outputs) {
      if (outputNode && !queue.includes(outputNode.shapeId)) {
        queue.push(outputNode.shapeId);
      }
    }
  }
};
