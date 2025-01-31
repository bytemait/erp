import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty | ERP",
  description: "ERP for MAIT",
};

export default function FacultyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}