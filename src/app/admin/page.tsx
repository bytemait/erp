"use client"

import { LayoutDashboard, FileText, Settings } from "lucide-react"
import { Topnav } from "@/components/Topnav"
import { Sidenav } from "@/components/Sidenav"
import AdminPage from "./AdminPage"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function Admin() {
  return (
    <>
      <div className="flex h-screen flex-col" >
        <Topnav />
        <div className="flex flex-1 overflow-hidden" >
          <Sidenav navItems={navItems} />
          <main className="flex-1 overflow-y-auto p-4" >
            <h1 className="text-6xl text-center text-primary">Welcome to admin</h1>
            <AdminPage />
          </main>
        </div>
      </div>
    </>
  );
}