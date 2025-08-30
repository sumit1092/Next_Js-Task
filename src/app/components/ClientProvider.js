"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastListener from "@/app/components/ToastListener";

function ClientProvider({ children }) {
  return (
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }}
        emotionOptions={{ key: "mantine", prepend: true }}
      >
        <ToastContainer position="top-right" autoClose={3000} />
        <ToastListener />
        {children}
      </MantineProvider>
    </Provider>
  );
}

export default ClientProvider;
