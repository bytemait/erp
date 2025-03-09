"use client"

import { Menucard } from "@/components/Menucard";
import { Send, GraduationCap, Building } from "lucide-react"

export default function Staff() {

  const functionCards = [
    {
      title: "Send Announcement",
      description: "Send an announcement to users",
      icon: Send,
      color: "bg-slate-500",
      route: "staff/announcements"
    },
    {
      title: "Placement Portal",
      description: "Manage your placement activities",
      icon: GraduationCap,
      color: "bg-slate-500",
      route: "staff/placement"
    },
    {
      title: "Infrastructure Portal",
      description: "Manage your infrastructure activities",
      icon: Building,
      color: "bg-slate-500",
      route: "staff/infrastructure"
    }
  ]

  return (
    <>
      <main className="flex-1 overflow-y-auto p-4" >
        <h1 className="text-6xl text-center text-primary pb-20" >
          Staff Dashboard
        </h1>
        <Menucard functions={functionCards} />
      </main>
    </>
  );
}