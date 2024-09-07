import React from "react";
import { Handle } from "reactflow";

const CustomHandle = (props) => {
  return (
    <Handle
      {...props}
      style={{
        width: "8px",
        height: "8px",
        backgroundColor: "#f5f6fa",
        border: "2px solid #5d00e3",
        ...(props.style || {}),
      }}
    />
  );
};

export default CustomHandle;
