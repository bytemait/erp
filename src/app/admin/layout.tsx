import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | ERP",
  description: "ERP for MAIT",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}