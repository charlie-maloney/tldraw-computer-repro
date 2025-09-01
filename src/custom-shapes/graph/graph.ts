import type { Editor, TLArrowBinding, TLShapeId, TLUnknownShape } from "tldraw";
import { DepGraph } from "dependency-graph";
import { isComponentShape, type Node } from "./types";
import type { IComponentShape } from "../component-shape/component-shape";

export const buildGraph = (startingShapeId: TLShapeId, editor: Editor) => {
  const graph = new DepGraph<Node>();
  const visited = new Set<string>();

  function walk(shapeId: TLShapeId) {
    // If we've already visited this shape, skip it
    if (visited.has(shapeId)) {
      return;
    }

    visited.add(shapeId);

    const currentShape = editor.getShape<TLUnknownShape>(shapeId);

    if (!isComponentShape(currentShape)) {
      return;
    }

    if (!graph.hasNode(currentShape.id)) {
      graph.addNode(currentShape.id, {
        shapeId: currentShape.id,
        type: currentShape.type,
        component: currentShape.props.component,
        value: currentShape.props.text,
        output: "",
        hasRun: false,
      });
    }

    // Traverse incoming arrows (shapes that point to this shape) for traversal only
    const arrows = editor.getBindingsToShape(shapeId, "arrow");
    for (const binding of arrows) {
      const arrow = editor.getShape(binding.fromId);
      //   debugger;
      if (!arrow) continue;

      // Find the componentShape at the both ends of the arrow (one of which is the current shape)
      const bindings = editor
        .getBindingsFromShape(arrow.id as TLShapeId, "arrow")
        // make sure we are not adding the current shape as a dep of itself
        .filter((b) => b.toId !== currentShape.id);

      for (const binding of bindings) {
        const otherShape = editor.getShape(binding.toId);

        if (isComponentShape(otherShape)) {
          if (!graph.hasNode(otherShape.id)) {
            graph.addNode(otherShape.id, {
              shapeId: otherShape.id,
              type: otherShape.type,
              component: otherShape.props.component,
              value: otherShape.props.text,
              output: "",
              hasRun: false,
            });
          }

          // if the arrow is coming from the start terminal, add a dependency
          if ((binding as TLArrowBinding).props?.terminal === "start") {
            graph.addDependency(currentShape.id, otherShape.id);
          }
          walk(otherShape.id);
        }
      }
    }
    return graph;
  }

  walk(startingShapeId);
  return graph;
};

export const getInputsOfNode = (id: string, graph: DepGraph<Node>) => {
  return graph.dependenciesOf(id).filter((n) => {
    const node = graph.getNodeData(n);
    return node;
  });
};

export const getOutputsOfNode = (id: string, graph: DepGraph<Node>) => {
  return graph.dependantsOf(id).filter((n) => {
    const node = graph.getNodeData(n);
    return node;
  });
};

export const runGraphFromShape = (shapeId: TLShapeId, editor: Editor) => {
  const graph = buildGraph(shapeId, editor);
  const processedNodes = new Set<string>();
  const queue: string[] = [shapeId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    if (processedNodes.has(currentId)) continue;
    const currentNode = graph.getNodeData(currentId);
    if (!currentNode) continue;

    const inputs = getInputsOfNode(currentId, graph).map((n) =>
      graph.getNodeData(n)
    );
    const outputs = graph
      .directDependantsOf(currentId)
      .map((n) => graph.getNodeData(n));

    switch (currentNode.component) {
      case "instruction":
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
      case "text":
        console.log("Running text:", currentNode);
        processedNodes.add(currentId);
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
