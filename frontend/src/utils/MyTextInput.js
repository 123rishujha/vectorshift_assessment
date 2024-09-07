import React, { useMemo } from "react";
import {
  Slate,
  Editable,
  withReact,
  useSlateStatic,
  ReactEditor,
} from "slate-react";
import { createEditor, Transforms, Editor } from "slate";
import { v4 as uuidv4 } from "uuid";
import { Box, TextField,  IconButton } from "@mui/material";

import "./MyTextInput.css";
import "../index.css";
import ToastHandler from "./MyToast";
import CloseIcon from "@mui/icons-material/Close";

const CustomInputComponent = ({ element }) => {
  const editor = useSlateStatic();

  const isValidJsVariableName = (name) =>
    /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(name);

  const handleChange = (event) => {
    const newValue = event.target.value;

    if (isValidJsVariableName(newValue)) {
      const path = ReactEditor.findPath(editor, element);
      Transforms.setNodes(editor, { value: newValue }, { at: path });
    } else {
      ToastHandler("warn", "Please enter a valid JavaScript variable name");
    }
  };

  const handleDelete = () => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, { at: path });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: "10px",
        padding: "5px",
        backgroundColor: "background.paper",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TextField
        size="small"
        variant="outlined"
        value={element.value || ""}
        onChange={handleChange}
        sx={{
          flexGrow: 1,
          borderRadius: "10px",
          "& .MuiOutlinedInput-root": {
            height: "30px",
            padding: "0px 8px",
            "& fieldset": {
              borderColor: "primary.main",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
        inputProps={{
          contentEditable: false,
        }}
      />
      <IconButton size="small" onClick={handleDelete}>
        <CloseIcon fontSize={"small"} sx={{ color: "icon.error" }} />
      </IconButton>
    </Box>
  );
};

let regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;

const MyTextInput = ({ value, setValue }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const handleKeyDown = (event) => {
    const { selection } = editor;

    if (!selection) {
      return;
    }

    const currentPath = selection?.anchor?.path;

    const [foundNode] = Editor.nodes(editor, {
      match: (n) => value[currentPath[0]].type === n.type,
    });

    if (foundNode) {
      const [, path] = foundNode;

      let textVal = value[currentPath[0] || 0]?.children[0]?.text || "";

      if (textVal && textVal.match(regex)) {
        let variableName = textVal.match(regex)?.[0]?.slice(2, -2);

        let str = textVal.replace(regex, "");

        Transforms.insertText(editor, str, { at: path.concat([0]) });

        const customNode = {
          type: "myNode",
          id: uuidv4(),
          value: variableName || "",
          children: [{ text: "" }],
        };

        Transforms.insertNodes(editor, customNode);
      }
    }

    if (event.key === "Enter") {
      const [match] = Editor.nodes(editor, {
        match: (n) => n.type === "myNode",
      });
      if (match) {
        event.preventDefault();
      }
    }
  };

  const renderElement = ({ attributes, children, element }) => {
    switch (element.type) {
      case "myNode":
        return (
          <div component="span" sx={{ display: "inline" }} {...attributes}>
            <CustomInputComponent element={element} />
            {children}
          </div>
        );
      default: {
        return <span {...attributes}>{children}</span>;
      }
    }
  };

  return (
    <Slate
      editor={editor}
      initialValue={value}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable
        renderElement={renderElement}
        onKeyDown={handleKeyDown}
        style={{
          minHeight: "50px",
          maxHeight: "130px",
          cursor: "text",
          padding: "8px",
          borderRadius: "4px",
          overflowY: "auto",
          border: "none",
          outline: "none",
        }}
        className="nopan nodrag custom_editable"
        onFocus={(e) => {
          e.target.style.borderWidth = "2px";
          e.target.style.borderStyle = "solid";
          e.target.style.borderColor = "var(--primary-main)";
          e.target.style.outline = "var(--primary-main)";
        }}
        onBlur={(e) => {
          e.target.style.borderWidth = "1px";
          e.target.style.borderStyle = "solid";
          e.target.style.borderColor = "var(--secondary-dark)";
          e.target.style.outline = "var(--secondary-dark)";
        }}
      />
    </Slate>
  );
};

export default MyTextInput;
