import {
  DefaultKeyboardShortcutsDialog,
  DefaultKeyboardShortcutsDialogContent,
  DefaultToolbar,
  DefaultToolbarContent,
  TldrawUiMenuItem,
  useIsToolSelected,
  useTools,
  type TLComponents,
  type TLUiOverrides,
} from "tldraw";
import { ComponentShapeType } from "./custom-shapes/component-shape/component-shape";

// TODO: make this dynamically generated based on component shape types
export const uiOverrides: TLUiOverrides = {
  tools(editor, tools) {
    tools.instructionComponentTool = {
      id: "instructionComponentTool",
      icon: "color",
      label: "Instruction Component",
      kbd: undefined,
      onSelect: () => {
        editor.setStyleForNextShapes(ComponentShapeType, "instruction");
        editor.setCurrentTool("componentTool");
      },
    };
    tools.textComponentTool = {
      id: "textComponentTool",
      icon: "color",
      label: "Text Component",
      kbd: undefined,
      onSelect: () => {
        editor.setStyleForNextShapes(ComponentShapeType, "text");
        editor.setCurrentTool("componentTool");
      },
    };
    return tools;
  },
};

export const components: TLComponents = {
  Toolbar: (props) => {
    const tools = useTools();
    const isTextComponentSelected = useIsToolSelected(
      tools["textComponentTool"]
    );
    const isInstructionComponentSelected = useIsToolSelected(
      tools["instructionComponentTool"]
    );
    return (
      <DefaultToolbar {...props}>
        <TldrawUiMenuItem
          {...tools["textComponentTool"]}
          isSelected={isTextComponentSelected}
        />
        <TldrawUiMenuItem
          {...tools["instructionComponentTool"]}
          isSelected={isInstructionComponentSelected}
        />
        <DefaultToolbarContent />
      </DefaultToolbar>
    );
  },
  KeyboardShortcutsDialog: (props) => {
    const tools = useTools();
    return (
      <DefaultKeyboardShortcutsDialog {...props}>
        <TldrawUiMenuItem {...tools["componentTool"]} />
        <DefaultKeyboardShortcutsDialogContent />
      </DefaultKeyboardShortcutsDialog>
    );
  },
};
