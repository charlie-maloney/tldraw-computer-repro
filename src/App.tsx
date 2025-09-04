import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { ComponentShapeUtil } from "./custom-shapes/component-shape/component-shape";
import { components, uiOverrides } from "./ui-overrides";
import { ComponentTool } from "./custom-shapes/component-shape/component-shape-tool";
import Toolbar from "./components/toolbar.tsx";
import "./components/toolbar.css";
import HeaderNavbar from "./components/headerNavbar";
import "./components/headerNavbar.css";

const customShapes = [ComponentShapeUtil];
const customTools = [ComponentTool];

export default function App() {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        persistenceKey="example"
        shapeUtils={customShapes}
        tools={customTools}
        overrides={uiOverrides}
        components={components}
      />
      <Toolbar />
      <HeaderNavbar />
    </div>
  );
}
