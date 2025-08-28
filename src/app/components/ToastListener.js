"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@mantine/notifications";
import { clearToast } from "../../app/redux/slices/uiSlice";

const ToastListener = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.ui.toast);

  useEffect(() => {
    if (toast) {
      showNotification({
        message: toast.message,
        color: toast.type === "success" ? "green" : "red",
      });
      dispatch(clearToast());
    }
  }, [toast, dispatch]);

  return null;
};

export default ToastListener;
