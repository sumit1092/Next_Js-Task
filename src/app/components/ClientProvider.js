// "use client";

// import { Provider } from "react-redux";
// import { store } from "../redux/store";
// import { MantineProvider } from "@mantine/core";
// import { Notifications } from "@mantine/notifications"; 

// function ClientProvider({ children }) {
//   return (
//     <Provider store={store}>
//       <MantineProvider
//         withGlobalStyles
//         withNormalizeCSS
//         theme={{ colorScheme: "light" }}
//         emotionOptions={{ key: "mantine", prepend: true }}
//       >
//         <Notifications position="top-right" />
//         {children}
//       </MantineProvider>
//     </Provider>
//   );
// }

// export default ClientProvider;
"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications"; 
import ToastListener from "@/app/components/ToastListener"

function ClientProvider({ children }) {
  return (
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }}
        emotionOptions={{ key: "mantine", prepend: true }}
      >
        <Notifications position="top-right" />
        <ToastListener />  
        {children}
      </MantineProvider>
    </Provider>
  );
}

export default ClientProvider;
