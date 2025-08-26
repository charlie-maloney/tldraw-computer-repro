import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { TextNodeUtil } from "./custom-shapes/text-node/text-node";
import { components, uiOverrides } from "./ui-overrides";
import { TextNodeTool } from "./custom-shapes/text-node/text-node-tool";

const customShapes = [TextNodeUtil];
const customTools = [TextNodeTool];

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
