"use client";
import { useState, useEffect } from "react";
import * as React from "react";

import InfraSection from "./InfraSection";
interface InventoryItem {
	id: string;
	itemType: string;
	room: string;
	quantity: number;
}

export default function ComboboxDemo() {
	const [items, setItems] = useState<InventoryItem[]>([]);


	// const handleCreate = async () => {

	// }
	// const handleUpdate = async (section: string, id: string, name: string) => {

	// }

	// const handleDelete = async (section: string, id: string) => {

	// }
	useEffect(() => {
		async function getData() {
			const resposne = await fetch("/api/admin/infra", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await resposne.json();
			if (resposne.ok) {
				setItems(data.data);
			} else {
				console.error("Error fetching data:", data.message);
			}
		}
    getData();
	}, []);

	return (
		<>
			<InfraSection
        initialData={items}
        

       />
		</>
	);
}
