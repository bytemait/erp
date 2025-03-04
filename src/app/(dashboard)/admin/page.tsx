"use client";

import AdminPage from "./AdminPage";

export default function Admin() {

	return (
		<>
			<main className="flex-1 overflow-y-auto p-4" >
				<h1 className="text-6xl text-center text-primary pb-20" >
					Admin Dashboard
				</h1>
				<AdminPage />
			</main>
		</>
	);
}
