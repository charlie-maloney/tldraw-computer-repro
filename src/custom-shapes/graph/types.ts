import type { TLUnknownShape } from "tldraw";
import type { IComponentShape } from "../component-shape/component-shape";

export interface Node {
  shapeId: string;
  type: string;
  component: string;
  value: string;
  output: string;
  hasRun: boolean;
}

// Helper function to type validate a componentShape
export function isComponentShape(
  shape: TLUnknownShape | undefined
): shape is IComponentShape {
  if (!shape) return false;

  return (
    shape &&
    typeof shape === "object" &&
    shape.type === "componentShape" &&
    shape.props &&
    "component" in shape.props &&
    "text" in shape.props &&
    typeof shape.props.component === "string" &&
    typeof shape.props.text === "string"
  );
}
