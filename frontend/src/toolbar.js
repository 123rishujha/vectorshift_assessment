// toolbar.js

import { DraggableNode } from "./draggableNode";
import ArticleIcon from "@mui/icons-material/Article";
import InputIcon from "@mui/icons-material/Input";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import OutputIcon from "@mui/icons-material/Output";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "15px 30px",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
      >
        {/* <DraggableNode
          // type="myNode"
          label="Input"
          propData={{
            nodeType: "myNode",
            inputType: "Input",
            inputNameProp: "Test 1",
            showInputCtrl: true,
            ctrlInputProps: {
              controlerType: "simpleText",
            },
            handleType: "source",
            handlePosition: "Right",
          }}
          icon={<InputIcon sx={{ color: "secondary.dark" }} />}
        /> */}
        <DraggableNode
          label="Input"
          propData={{
            nodeType: "myNode",
            inputType: "Input",
            inputNameProp: "Input_1",
            showInputCtrl: true,
            inputInitValue: "Text",
            ctrlInputProps: {
              controlerType: "dropdown",
              options: [
                { displayValue: "Text", value: "Text" },
                { displayValue: "Audio", value: "Audio" },
                { displayValue: "File", value: "File" },
              ],
            },
            handleType: "source",
            handlePosition: "Right",
          }}
          icon={<InputIcon sx={{ color: "secondary.dark" }} />}
        />

        <DraggableNode
          label="Output"
          propData={{
            nodeType: "myNode",
            inputType: "Output",
            inputNameProp: "Test 1",
            showInputCtrl: true,
            ctrlInputProps: {
              controlerType: "simpleText",
            },
            handleType: "target",
            handlePosition: "Left",
          }}
          icon={<OutputIcon sx={{ color: "secondary.dark" }} />}
        />

        <DraggableNode
          label="Text"
          propData={{
            nodeType: "myNode",
            inputType: "Text",
            // inputNameProp: "Text",
            // showInputCtrl: true,
            inputInitValue: [
              { type: "paragraph", children: [{ text: "Write something..." }] },
            ],
            ctrlInputProps: {
              controlerType: "slateText",
            },
            handleType: "source",
            handlePosition: "Right",
          }}
          icon={<ArticleIcon sx={{ color: "secondary.dark" }} />}
        />

        {/* <DraggableNode
          // type="myNode"
          label="Select"
          propData={{
            nodeType: "myNode",
            inputType: "Custom Dropdown",
            inputNameProp: "Test Input",
            showInputCtrl: true,
            ctrlInputProps: {
              controlerType: "dropdown",
              options: [
                { displayValue: "A", value: "A" },
                { displayValue: "B", value: "B" },
                { displayValue: "C", value: "C" },
                { displayValue: "D", value: "D" },
              ],
            },
            handleType: "target",
            handlePosition: "Left",
          }}
          icon={<ArrowDropDownCircleIcon sx={{ color: "secondary.dark" }} />}
        /> */}

        <DraggableNode
          // type="myNode"
          label="Pipeline"
          propData={{
            nodeType: "myNode",
            inputType: "Pipeline",
            inputNameProp: "Test Input",
            inputInitValue: true,
            showInputCtrl: false,
            ctrlInputProps: {
              controlerType: "checkbox",
            },
            handleType: "target",
            handlePosition: "Left",
          }}
          icon={<PlayCircleIcon sx={{ color: "secondary.dark" }} />}
        />
      </div>
    </div>
  );
};
