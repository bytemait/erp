import React from "react";
import type { Metadata } from "next";
import { Topnav } from "@/components/Topnav";
import { Sidenav } from "@/components/Sidenav";

const navItems = [
	{ name: "Home", href: "/staff", icon: "LayoutDashboard" },
	{ name: "Send Announcement", href: "/staff/announcements", icon: "Send" },
	{ name: "Placement Portal", href: "/staff/placement", icon: "GraduationCap" },
	{ name: "Infrastructure Portal", href: "/staff/infrastructure", icon: "Building" }
];

export const metadata: Metadata = {
	title: "Staff | ERP",
	description: "ERP for MAIT",
};

export default function StaffLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-screen flex-col">
			<Topnav />
			<div className="flex flex-1 overflow-hidden">
				<Sidenav navItems={navItems} />
				<main className="flex-1 overflow-y-auto p-4">
					{children}
				</main>
			</div>
		</div>
	);
}
