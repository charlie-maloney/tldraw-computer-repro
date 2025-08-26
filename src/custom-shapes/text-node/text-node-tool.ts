import { BaseBoxShapeTool } from "tldraw";

export class TextNodeTool extends BaseBoxShapeTool {
  static override id = "textNode";
  static override initial = "idle";
  override shapeType = "textNodeShape";
}
