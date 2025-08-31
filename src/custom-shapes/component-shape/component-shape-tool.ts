import { StateNode } from "tldraw";
import { ComponentShapeType, type IComponentShape } from "./component-shape";

export class ComponentTool extends StateNode {
  static override id = "componentTool";
  static override initial = "idle";
  override shapeType = "componentShape";

  override onEnter(): void {
    const { originPagePoint } = this.editor.inputs;
    this.editor.createShape<IComponentShape>({
      type: "componentShape",
      x: originPagePoint.x,
      y: originPagePoint.y,
      props: {
        w: 200,
        h: 100,
        component: this.editor.getStyleForNextShape(ComponentShapeType),
        text: "",
      },
    });
    this.editor.setCurrentTool("select");
  }
}
