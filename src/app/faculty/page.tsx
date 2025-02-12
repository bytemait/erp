"use client"

import { LayoutDashboard, FileText, Settings, LineChart } from "lucide-react";
import { Topnav } from "@/components/Topnav";
import { Sidenav } from "@/components/Sidenav";
import FacultyPage from "./FacultyPage"; 

const navItems = [
  { name: "Courses", href: "/faculty/courses", icon: LayoutDashboard },
  { name: "Attendance", href: "/faculty/attendance", icon: FileText },
  { name: "Assessments", href: "/faculty/assessments", icon: Settings },
  { name: "Reports", href: "/faculty/reports", icon: LineChart }
];

export default function Faculty() {
  return (
    <>
      <div className="flex h-screen flex-col" >
        <Topnav />
        <div className="flex flex-1 overflow-hidden" >
          <Sidenav navItems={navItems} />
          <main className="flex-1 overflow-y-auto p-4" >
            <h1 className="text-6xl text-center text-primary pb-20">Welcome to faculty</h1>
            <FacultyPage />
          </main>
        </div>
      </div>
    </>
  );
}
