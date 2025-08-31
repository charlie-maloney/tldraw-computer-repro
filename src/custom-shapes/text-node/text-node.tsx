import {
  Geometry2d,
  HTMLContainer,
  Rectangle2d,
  resizeBox,
  ShapeUtil,
  T,
  type JsonObject,
  type RecordProps,
  type TLBaseShape,
  type TLResizeInfo,
  type TLShapeId,
} from "tldraw";

import { useEditor, useValue } from "tldraw";
import "./text-node.css";

type ITextNode = TLBaseShape<
  "textNodeShape",
  {
    w: number;
    h: number;
    text: string;
  }
>;

export class TextNodeUtil extends ShapeUtil<ITextNode> {
  // [a]

  static override type = "textNodeShape" as const;
  static override props: RecordProps<ITextNode> = {
    w: T.number,
    h: T.number,
    text: T.string,
  };

  // [b]
  getDefaultProps(): ITextNode["props"] {
    return {
      w: 250,
      h: 250,
      text: "",
    };
  }

  // [c]
  override canEdit() {
    return true;
  }
  override canResize() {
    return true;
  }
  override isAspectRatioLocked() {
    return true;
  }


  // [d]
  getGeometry(shape: ITextNode): Geometry2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  // [e]
  override onResize(shape: any, info: TLResizeInfo<any>) {
    return resizeBox(shape, info);
  }

  // [f]
  component(shape: ITextNode) {
    const editor = useEditor();


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      editor.updateShape({
        id: shape.id,
        type: "textNodeShape",
        props: { text: e.target.value },
      });
    };

    const handlePlay = () => {
      console.log("Button has been clicked");
    };

    return (
      <HTMLContainer className="text-node-container">
        <div className="text-node-header">
          <h2 className="text-node-title">Text</h2>
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
        </div>
        <textarea
          className="text-node-textarea"
          value={shape.props.text}
          onChange={handleChange}
          autoFocus={true}
          draggable={false}
          tabIndex={0}
          spellCheck={true}
          placeholder="Add in your text here..."
          onPointerDown={e => {
            e.stopPropagation();
            // e.preventDefault();
          }}
        />
      </HTMLContainer>
    );
  }

  // [g]
  indicator(shape: ITextNode) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}
