import {
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
    tools.componentNode = {
      id: "componentNode",
      icon: "color",
      label: "Component Node",
      kbd: "c",
      onSelect: () => {
        // console.log("hello");
        editor.setCurrentTool("componentNode");
      },
    };
    return tools;
  },
};

export const components: TLComponents = {
  Toolbar: (props) => {
    const tools = useTools();
    const isTextNodeSelected = useIsToolSelected(tools["textNode"]);
    const isComponentNodeSelected = useIsToolSelected(tools["componentNode"]);
    return (
      <DefaultToolbar {...props}>
        <TldrawUiMenuItem
          {...tools["textNode"]}
          isSelected={isTextNodeSelected}
        />
        <TldrawUiMenuItem
          {...tools["componentNode"]}
          isSelected={isComponentNodeSelected}
        />
        <DefaultToolbarContent />
      </DefaultToolbar>
    );
  },
};
