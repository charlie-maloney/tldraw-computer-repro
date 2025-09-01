/* eslint-disable react-hooks/rules-of-hooks */
import {
  Geometry2d,
  HTMLContainer,
  Rectangle2d,
  resizeBox,
  ShapeUtil,
  StyleProp,
  T,
  type RecordProps,
  type TLBaseShape,
  type TLResizeInfo,
} from "tldraw";

import { useEditor } from "tldraw";
import "./component-shape.css";
import { runGraphFromShape } from "../graph/graph";

export const ComponentShapeType = StyleProp.defineEnum("tldraw:component", {
  defaultValue: "text",
  values: ["instruction", "text"],
});

export type IComponentShape = TLBaseShape<
  "componentShape",
  {
    w: number;
    h: number;
    component: "instruction" | "text";
    text: string;
  }
>;

export class ComponentShapeUtil extends ShapeUtil<IComponentShape> {
  static override type = "componentShape" as const;
  static override props: RecordProps<IComponentShape> = {
    w: T.number,
    h: T.number,
    text: T.string,
    component: ComponentShapeType,
  };

  getDefaultProps(): IComponentShape["props"] {
    return {
      w: 250,
      h: 250,
      text: "",
      component: "text",
    };
  }

  override canEdit() {
    return true;
  }
  override canResize() {
    return true;
  }
  override isAspectRatioLocked() {
    return true;
  }

  getGeometry(shape: IComponentShape): Geometry2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  override onResize(
    shape: IComponentShape,
    info: TLResizeInfo<IComponentShape>
  ) {
    return resizeBox(shape, info);
  }

  component(shape: IComponentShape) {
    const editor = useEditor();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      editor.updateShape({
        id: shape.id,
        type: "componentShape",
        props: { text: e.target.value },
      });
    };

    const handlePlay = () => {
      console.log("id", shape.id);
      runGraphFromShape(shape.id, editor);
    };

    return (
      <HTMLContainer
        className="text-node-container"
        style={{ pointerEvents: "all" }}
      >
        <div className="text-node-header">
          <h2 className="text-node-title">
            {shape.props.component.charAt(0).toUpperCase() +
              shape.props.component.slice(1).toLowerCase()}
          </h2>
          {shape.props.component === "instruction" && (
            <button
              className="text-node-play-btn"
              tabIndex={0}
              onClick={handlePlay}
              onPointerDown={(e) => e.stopPropagation()} // Only this is needed
              aria-label="Play"
            >
              <svg
                className="text-node-play-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="none" />
                <polygon points="9,7 19,12 9,17" />
              </svg>
            </button>
          )}
        </div>
        <span style={{ fontSize: "20px" }}>{shape.id}</span>
        <textarea
          className="text-node-textarea"
          value={shape.props.text}
          onChange={handleChange}
          autoFocus={true}
          draggable={false}
          tabIndex={0}
          spellCheck={true}
          placeholder="Add in your text here..."
          onPointerDown={(e) => {
            e.stopPropagation();
            // e.preventDefault();
          }}
        />
      </HTMLContainer>
    );
  }

  indicator(shape: IComponentShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}
