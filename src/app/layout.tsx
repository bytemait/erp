import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/store/StoreProvider";
import DebugStore from "@/store/DebugStore";

export const metadata: Metadata = {
  title: "Login | ERP",
  description: "ERP for MAIT",
  icons: {
    icon: "/logo.jpg"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <Toaster />
          <DebugStore />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}