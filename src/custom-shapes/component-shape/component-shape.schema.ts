import { StyleProp, type TLBaseShape, type TLGeoShapeProps } from "tldraw";

export const ComponentShapeType = StyleProp.defineEnum("tldraw:component", {
  defaultValue: "instruction",
  values: ["instruction", "text", "image"],
});

export type IComponentShape = TLBaseShape<
  "componentShape",
  {
    component: "instruction" | "text" | "image";
  } & TLGeoShapeProps
>;
