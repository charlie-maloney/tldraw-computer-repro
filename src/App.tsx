import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { TextNodeUtil } from "./custom-shapes/text-node/text-node";
import { components, uiOverrides } from "./ui-overrides";
import { TextNodeTool } from "./custom-shapes/text-node/text-node-tool";
import { ComponentNodeUtil } from "./custom-shapes/component-shape/component-shape";
import { ComponentNodeTool } from "./custom-shapes/component-shape/component-shape-tool";

const customShapes = [TextNodeUtil, ComponentNodeUtil];
const customTools = [TextNodeTool, ComponentNodeTool];

export default function App() {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        shapeUtils={customShapes}
        tools={customTools}
        overrides={uiOverrides}
        components={components}
      />
    </div>
  );
}
