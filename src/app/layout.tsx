import { AppProvider } from "@/providers/ReactQueryProvider";
import "./globals.css";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
          {modal}
        </AppProvider>
      </body>
    </html>
  );
}
