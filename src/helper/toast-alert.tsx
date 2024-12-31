import { toast, ToastPosition } from "react-toastify";

interface ToastOptions {
  position?: ToastPosition;
  hideProgressBar?: boolean;
  autoClose?: number;
  theme?: "light" | "dark" | "colored";
}

const defaultOptions: ToastOptions = {
  position: "top-right",
  hideProgressBar: true,
  autoClose: 3000,
  theme: "colored",
};

const info = (
  message: string = "",
  autoClose: number | false = defaultOptions.autoClose!,
  position: ToastPosition = defaultOptions.position!
) => {
  toast.info(<p className="text-white tx-16 mb-0">{message}</p>, {
    ...defaultOptions,
    autoClose,
    position,
  });
};

const success = (
  message: string = "",
  autoClose: number | false = defaultOptions.autoClose!,
  position: ToastPosition = defaultOptions.position!
) => {
  toast.success(<p className="text-white tx-16 mb-0">{message}</p>, {
    ...defaultOptions,
    autoClose,
    position,
  });
};

const warning = (
  message: string = "",
  autoClose: number | false = defaultOptions.autoClose!,
  position: ToastPosition = defaultOptions.position!
) => {
  toast.warning(<p className="text-white tx-16 mb-0">{message}</p>, {
    ...defaultOptions,
    autoClose,
    position,
  });
};

const error = (
  message: string = "",
  autoClose: number | false = defaultOptions.autoClose!,
  position: ToastPosition = defaultOptions.position!
) => {
  toast.error(<p className="text-white tx-16 mb-0">{message}</p>, {
    ...defaultOptions,
    autoClose,
    position,
  });
};

const ToastAlert = { info, success, warning, error };

export default ToastAlert;
