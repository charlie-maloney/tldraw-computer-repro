import type { Editor, TLArrowBinding, TLShapeId, TLUnknownShape } from "tldraw";
import { DepGraph } from "dependency-graph";
import { isComponentShape, type GraphNode } from "./types";

export const buildGraph = (startingShapeId: TLShapeId, editor: Editor) => {
  const graph = new DepGraph<GraphNode>();
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
