import toast from "react-hot-toast";
import React from "react";
import ProgressGrid from "./ProgressGrid";
import "../index.css";

const ToastContent = ({ status, message, onClose }) => {
  const backgroundColor = "#fff";
  const borderColor =
    status === "warn"
      ? "var(--icon-warning)"
      : status === "dan"
      ? "var(--icon-error)"
      : "var(--icon-green)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
        padding: "8px 12px",
        width: "100%",
        minHeight: "70px",
        borderBottom: `2.5px solid ${borderColor}`,
        boxShadow:
          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        backgroundColor: backgroundColor,
      }}
    >
      <ProgressGrid status={status} />
      <div
        style={{
          flexGrow: 1,
          textTransform: "capitalize",
          fontSize: "15px",
          marginLeft: "50px",
          width: "70%",
          wordWrap: "break-word",
        }}
      >
        {message}
      </div>
      <button
        onClick={onClose}
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: "transparent",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--icon-sidebar)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
    </div>
  );
};

const ToastHandler = (status, message) => {
  toast(
    (t) => (
      <ToastContent
        status={status}
        message={message}
        onClose={(event) => {
          event.stopPropagation();
          toast.dismiss(t.id);
        }}
      />
    ),
    {
      position: "top-center",
      duration: 3200,
      style: {
        background: "transparent",
        boxShadow: "none",
        padding: "0",
      },
    }
  );
};

export default ToastHandler;
