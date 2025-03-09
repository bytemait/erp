import { Sidenav } from "@/components/Sidenav";
import { Topnav } from "@/components/Topnav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student | ERP",
  description: "ERP for MAIT",
};

const navItems = [
  { name: "My-Profile", href: "/student/profile", icon: "LayoutDashboard" },
  { name: "Assignment", href: "/student/assignment", icon: "FileText" },
  { name: "Attendance", href: "/student/attendance", icon: "Check" },
  { name: "Log Out", href: "/logout", icon: "Settings" },
];

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col" >
      <Topnav />
      <div className="flex flex-1 " >
        <Sidenav navItems={navItems} />
        {children}
      </div>
    </div>
  );
}


