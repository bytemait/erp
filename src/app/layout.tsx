import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}