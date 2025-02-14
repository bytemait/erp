"use client";

import { LayoutDashboard, Book, CreditCard, LineChart, CalendarSearch } from "lucide-react";
import { Topnav } from "@/components/Topnav";
import { Sidenav } from "@/components/Sidenav";
import FacultyPage from "./FacultyPage";

const navItems = [
  { name: "Dashboard", href: "/faculty", icon: LayoutDashboard },
  { name: "Courses", href: "/faculty/courses", icon: Book },
  { name: "Attendance", href: "/faculty/attendance", icon: CalendarSearch },
  { name: "Assessment", href: "/faculty/attendance", icon: CreditCard },
  { name: "Reports", href: "/faculty/reports", icon: LineChart },
];

export default function Faculty() {
  return (
    <div className="flex h-screen flex-col">
      <Topnav />
      <div className="flex flex-1 overflow-hidden">
        <Sidenav navItems={navItems} />
        <main className="flex-1 overflow-y-auto p-4">
          <h1 className="text-4xl font-bold text-center text-primary pb-10">
            Faculty Dashboard
          </h1>
          <FacultyPage />
        </main>
      </div>
    </div>
  );
}