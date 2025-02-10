"use client";
import { Menucard } from "@/components/Menucard";
import {
  User,
  BookOpen,
  Award,
  Check,
  BookText,
  School,
  Paperclip,
  Laptop,
} from "lucide-react";

export default function StudentPage() {
  const FunctionStudentCards = [
    {
      title: "Profile",
      description: "Manage your profile",
      icon: User,
      color: "bg-slate-500",
      route: "/student/profile",
    },
    {
      title: "Timetable",
      description: "View and manage your classes",
      icon: BookOpen,
      color: "bg-slate-500",
      route: "/student/timetable",
    },
    {
      title: "Grades",
      description: "View your grades and performance",
      icon: Award,
      color: "bg-slate-500",
      route: "/student/grades",
    },
    {
      title: "Attendance",
      description: "View your attendance and participation",
      icon: Check,
      color: "bg-slate-500",
      route: "/student/attendance",
    },
    {
      title: "Online classes",
      description: "View your online classes and their meeting links",
      icon: Laptop,
      color: "bg-slate-500",
      route: "/student/online-classes",
    },
    {
      title: "Assignments",
      description: "View your assignments and submit them",
      icon: Paperclip,
      color: "bg-slate-500",
      route: "/student/assignments",
    },
    {
      title: "Exams and quizzes",
      description: "View your upcoming exams and quizzes",
      icon: School,
      color: "bg-slate-500",
      route: "/student/exams",
    },
    {
      title: "Library",
      description: "View your library books and reserve them",
      icon: BookText,
      color: "bg-slate-500",
      route: "/student/library",
    },
  ];
  return Menucard({ functions: FunctionStudentCards });
}
