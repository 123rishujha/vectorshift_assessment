// draggableNode.js

import { Box } from "@mui/material";

export const DraggableNode = ({ type, label, propData, icon }) => {
  const onDragStart = (event, nodeType) => {
    // const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      // JSON.stringify(appData)
      JSON.stringify(propData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      sx={{
        cursor: "grab",
        width: "fit-content",
        minWidth: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        justifyContent: "center",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "secondary.light",
        p: "3px 10px",
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
      draggable
    >
      <Box sx={{ width: "20px", height: "20px", mb: "5px" }}>{icon}</Box>
      <span style={{ color: "#1C2536", fontSize: "13px" }}>{label}</span>
    </Box>
  );
};
