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
      w: 200,
      h: 200,
      text: "I'm a shape!",
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
    return false;
  }
  onDoubleClick(shape: ITextNode):
    | void
    | ({
        id: TLShapeId;
        meta?: Partial<JsonObject> | undefined;
        props?: Partial<{ w: number; h: number; text: string }> | undefined;
        type: "textNodeShape";
      } & Partial<Omit<ITextNode, "props" | "type" | "id" | "meta">>) {
    console.log(shape);
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
    return (
      <HTMLContainer style={{ backgroundColor: "#efefef" }}>
        <h2>Text</h2>
        {shape.props.text}
      </HTMLContainer>
    );
  }

  // [g]
  indicator(shape: ITextNode) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}
