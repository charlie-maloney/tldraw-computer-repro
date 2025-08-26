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

export const uiOverrides: TLUiOverrides = {
  tools(editor, tools) {
    // Create a tool item in the ui's context.
    tools.textNode = {
      id: "textNode",
      icon: "color",
      label: "Text Node",
      kbd: "c",
      onSelect: () => {
        // console.log("hello");
        editor.setCurrentTool("textNode");
      },
    };
    return tools;
  },
};

export const components: TLComponents = {
  Toolbar: (props) => {
    const tools = useTools();
    const isTextNodeSelected = useIsToolSelected(tools["textNode"]);
    return (
      <DefaultToolbar {...props}>
        <TldrawUiMenuItem
          {...tools["textNode"]}
          isSelected={isTextNodeSelected}
        />
        <DefaultToolbarContent />
      </DefaultToolbar>
    );
  },
  KeyboardShortcutsDialog: (props) => {
    const tools = useTools();
    return (
      <DefaultKeyboardShortcutsDialog {...props}>
        <TldrawUiMenuItem {...tools["textNode"]} />
        <DefaultKeyboardShortcutsDialogContent />
      </DefaultKeyboardShortcutsDialog>
    );
  },
};
