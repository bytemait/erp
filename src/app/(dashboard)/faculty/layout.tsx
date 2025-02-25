import { Sidenav } from "@/components/Sidenav";
import { Topnav } from "@/components/Topnav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty | ERP",
  description: "ERP for MAIT",
};

const navItems = [
  { name: "Dashboard", href: "/faculty", icon: "LayoutDashboard" },
  { name: "Courses", href: "/faculty/courses", icon: "Book" },
  { name: "Attendance", href: "/faculty/attendance", icon: "CalendarSearch" },
  { name: "Assessment", href: "/faculty/attendance", icon: "CreditCard" },
  { name: "Reports", href: "/faculty/reports", icon: "LineChart" },
];

export default function FacultyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Topnav />
      <div className="flex flex-1 overflow-hidden">
        <Sidenav navItems={navItems} />
        {children}
      </div>
    </div>
  );
}