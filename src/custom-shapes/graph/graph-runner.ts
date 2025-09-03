import type { TLShapeId, Editor } from "tldraw";
import type { IComponentShape } from "../component-shape/component-shape";
import { buildGraph } from "./graph";

export const runGraphFromShape = (shapeId: TLShapeId, editor: Editor) => {
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
        console.log("Running instruction", {
          instruction: currentNode.value,
          inputs: inputs
            .filter((n) => n.component === "text")
            .map((n) => n.value)
            .join(", "),
          outputTypes: [
            ...new Set(
              graph
                .directDependantsOf(currentId)
                .map<IComponentShape | undefined>((n) =>
                  editor.getShape(n as TLShapeId)
                )
                .filter<IComponentShape>((n) => !!n)
                .map((n) => n.props.component)
            ),
          ],
          outputNodes: outputs,
        });

        processedNodes.add(currentId);
        break;
      }
      case "text":
        {
          console.log("Running text:", currentNode);
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
