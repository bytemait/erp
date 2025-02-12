import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student | ERP",
  description: "ERP for MAIT",
};

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}