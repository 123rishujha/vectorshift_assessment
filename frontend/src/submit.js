// submit.js
import axios from "axios";
import { useStore } from "./store";
import { Grid2, Button, CircularProgress } from "@mui/material";
import ToastHandler from "./utils/MyToast";
import { useState } from "react";

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const edges = useStore((state) => state.edges);
  const nodes = useStore((state) => state.nodes);

  const handlePost = async () => {
    try {
      setLoading(true);
      const formData = new URLSearchParams();
      formData.append("pipeline", JSON.stringify({ edges, nodes }));

      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}pipelines/parse`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: formData,
      });

      const { num_nodes, num_edges, is_dag } = res.data;

      ToastHandler(
        "success",
        `Number of Nodes: ${num_nodes}\nNumber of Edges: ${num_edges}\nIs DAG: ${is_dag}`
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error?.code === "ERR_NETWORK") {
        ToastHandler("dan", "Network error please check your internet");
      } else {
        ToastHandler("dan", "uncaught error");
      }
    }
  };

  return (
    <Grid2
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        variant={loading ? "outlined" : "contained"}
        disabled={loading}
        onClick={() => handlePost()}
        sx={{ minWidth: "120px" }}
      >
        {loading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
    </Grid2>
  );
};
