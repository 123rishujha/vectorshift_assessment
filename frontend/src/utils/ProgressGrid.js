import { CircularProgress, Grid2 } from "@mui/material";
import React from "react";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useProgressHook from "../hooks/useProgressHook";

const ProgressGrid = ({ status }) => {
  const progress = useProgressHook(3000); // 3 seconds

  const getIcon = (status) => {
    switch (status) {
      case "warn":
        return <WarningIcon fontSize="small" sx={{ color: "icon.warning" }} />;
      case "dan":
        return <ErrorIcon fontSize="small" sx={{ color: "icon.error" }} />;
      case "suc":
      default:
        return (
          <CheckCircleIcon fontSize="small" sx={{ color: "icon.green" }} />
        );
    }
  };

  return (
    <Grid2
      sx={(theme) => ({
        backgroundColor: `${
          status === "warn"
            ? `${theme.palette.icon.warning}33`
            : status === "dan"
            ? `${theme.palette.icon.error}44`
            : `${theme.palette.icon.green}33`
        }`,
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "8px",
        position: "absolute",
      })}
    >
      <CircularProgress
        variant="determinate"
        value={progress}
        size={40}
        sx={{
          color: `${
            status === "warn"
              ? "icon.warning"
              : status === "dan"
              ? "icon.error"
              : "icon.green"
          }`,
          position: "absolute",
          zIndex: 1,
        }}
      />
      {getIcon(status)}
    </Grid2>
  );
};

export default ProgressGrid;
