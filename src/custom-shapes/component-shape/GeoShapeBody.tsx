import { useDefaultColorTheme, STROKE_SIZES } from "tldraw";
import { getGeoShapePath } from "./get-shape-paths";
import { ShapeFill } from "./ShapeFill";
import type { IComponentShape } from "./component-shape.schema";

export function GeoShapeBody({
  shape,
  shouldScale,
  forceSolid,
}: {
  shape: IComponentShape;
  shouldScale: boolean;
  forceSolid: boolean;
}) {
  const scaleToUse = shouldScale ? shape.props.scale : 1;
  const theme = useDefaultColorTheme();
  const { props } = shape;
  const { color, fill, dash, size } = props;
  const strokeWidth = STROKE_SIZES[size] * scaleToUse;

  const path = getGeoShapePath(shape);
  const fillPath =
    dash === "draw" && !forceSolid
      ? path.toDrawD({
          strokeWidth,
          randomSeed: shape.id,
          passes: 1,
          offset: 0,
          onlyFilled: true,
        })
      : path.toD({ onlyFilled: true });

  return (
    <>
      <ShapeFill
        theme={theme}
        d={fillPath}
        color={color}
        fill={fill}
        scale={scaleToUse}
      />
      {path.toSvg({
        style: dash,
        strokeWidth,
        forceSolid,
        randomSeed: shape.id,
        props: { fill: "none", stroke: "black" },
      })}
    </>
  );
}
