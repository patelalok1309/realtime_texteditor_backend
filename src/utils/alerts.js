import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/**
 * Show a toast notification with a success message.
 * @param {string} message - The message to show in the toast.
 */
export const showToastSuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

/**
 * Show a toast notification with an error message.
 * @param {string} message - The message to show in the toast.
 */
export const showErrorToast = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

/**
 * Show a toast notification with an informational message.
 * @param {string} message - The message to show in the toast.
 */
export const showInfoToast = (message) => {
    toast.info(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};
