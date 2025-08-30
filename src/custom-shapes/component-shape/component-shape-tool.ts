import { BaseBoxShapeTool } from "tldraw";

export class ComponentNodeTool extends BaseBoxShapeTool {
  static override id = "componentNode";
  static override initial = "idle";
  override shapeType = "componentShape";
}
