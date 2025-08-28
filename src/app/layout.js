import ClientProvider from "./components/ClientProvider";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <ClientProvider>
          <main className="flex-1 bg-gray-50">{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;