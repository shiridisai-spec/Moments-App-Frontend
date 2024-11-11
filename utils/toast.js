import { toast } from "react-toastify";

const toastConfig = {
  position: "top-right",
  autoClose: 5000, // 5 seconds
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showToast = (message, type = "success") => {
  if (type === "success") {
    toast.success(message, toastConfig);
  } else if (type === "error") {
    toast.error(message, toastConfig);
  } else if (type === "info") {
    toast.info(message, toastConfig);
  } else if (type === "warn") {
    toast.warn(message, toastConfig);
  }
};
