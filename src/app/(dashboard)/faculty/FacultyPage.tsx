"use client";

import { Menucard } from "@/components/Menucard";
import { Mail, Calendar, CreditCard, LineChart } from "lucide-react";

export default function FacultyPage() {
  const functionCards = [
    {
      title: "Courses",
      description: "Manage and view your courses",
      icon: Mail,
      color: "bg-slate-500",
      route: "/faculty/courses",
    },
    {
      title: "Attendance",
      description: "Track and manage attendance",
      icon: Calendar,
      color: "bg-slate-500",
      route: "/faculty/attendance",
    },
    {
      title: "Assessments",
      description: "Manage assessments and exams",
      icon: CreditCard,
      color: "bg-slate-500",
      route: "/faculty/assessments",
    },
    {
      title: "Reports",
      description: "View reports and analytics",
      icon: LineChart,
      color: "bg-slate-500",
      route: "/faculty/reports",
    },
  ];

  return (
    <>
      <Menucard functions={functionCards} />
    </>
  );
}