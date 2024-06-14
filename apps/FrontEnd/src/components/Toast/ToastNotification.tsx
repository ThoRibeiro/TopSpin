import React from "react";
import { toast, ToastContainer, ToastOptions, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  style: {
    backgroundColor: "var(--primary-color)",
    color: "#ffffff",
  },
  transition: Slide,
};

export const notifySuccess = (message: string) => {
  toast.success(message, {
    ...toastOptions,
    icon: <div style={{ color: "#ffffff" }}>✔️</div>,
    closeButton: <div style={{ color: "#ffffff" }}>✖</div>,
  });
};

export const notifyError = (message: string) => {
  toast.error(message, {
    ...toastOptions,
    icon: <div style={{ color: "#ffffff" }}>❌</div>,
    closeButton: <div style={{ color: "#ffffff" }}>✖</div>,
  });
};

const ToastNotification: React.FC = () => {
  return <ToastContainer />;
};

export default ToastNotification;
