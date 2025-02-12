'use client'
import React from "react";
import { LayoutDashboard, FileText, Settings } from "lucide-react";
import { Sidenav } from "@/components/Sidenav";
import UserMangementPage from "./UserManagementPage";
import { Topnav } from "@/components/Topnav";

function UserManagement() {
    const navItems = [
		{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
		{ name: "Documents", href: "/documents", icon: FileText },
		
		{ name: "Settings", href: "/settings", icon: Settings },
	];
	return (
		<>
			<div className="flex h-screen flex-col">
						<Topnav />
						<div className="flex flex-1 overflow-hidden">
			
							<Sidenav navItems={navItems} />
							<main className="flex-1 overflow-y-auto p-4">
								<UserMangementPage />
							</main>
						</div>
					</div>
		</>
	);
}

export default UserManagement;
