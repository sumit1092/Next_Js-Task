"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearToast } from "../../app/redux/slices/uiSlice";

const ToastListener = () => {
  const dispatch = useDispatch();
  const toastData = useSelector((state) => state.ui.toast);

  useEffect(() => {
    if (toastData) {
      if (toastData.type === "success") {
        toast.success(toastData.message);
      } else {
        toast.error(toastData.message);
      }
      dispatch(clearToast());
    }
  }, [toastData, dispatch]);

  return null;
};

export default ToastListener;
