"use client";

import { LayoutDashboard, FileText, Settings, Check } from "lucide-react";
import { Topnav } from "@/components/Topnav";
import { Sidenav } from "@/components/Sidenav";
import StudentPage from "./StudentPage";

const navItems = [
  { name: "My-Profile", href: "/student/profile", icon: LayoutDashboard },
  { name: "Assignment", href: "/student/assignment", icon: FileText },
  { name: "Attendance", href: "/student/attendance", icon: Check },
  { name: "Log Out", href: "/logout", icon: Settings },
];

export default function Student() {
  return (
    <>
      <div className="flex h-screen flex-col">
        <Topnav />
        <div className="flex flex-1 overflow-hidden">
          <Sidenav navItems={navItems} />
          <main className="flex-1 overflow-y-auto p-4">
            <h1 className="text-6xl text-center text-primary pb-20">
              Welcome to student
            </h1>
            <StudentPage />
          </main>
        </div>
      </div>
    </>
  );
}
