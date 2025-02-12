import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff | ERP",
  description: "ERP for MAIT",
};

export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}