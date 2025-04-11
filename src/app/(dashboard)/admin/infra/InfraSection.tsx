"use client";
import { useState } from "react";
import { Pencil, Trash2, Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";


// Define TypeScript interfaces
interface InventoryItem {
	id: string;
	itemType: string;
	room: string;
	quantity: number;
	itemDetails?: ItemDetail[];
}

interface ItemDetail {
	itemCode: string;
	yearOfPurchase: number;
	status: string;
}

interface InventorySectionProps {
	initialData?: InventoryItem[];
}

const InfraSection = ({ initialData }: InventorySectionProps) => {
	// Sample data for inventory items
	const [items, setItems] = useState<InventoryItem[]>(
		initialData
			? [...initialData]
			: [
					{
						id: "inv001cm8q601pu0",
						itemType: "PC",
						room: "5501",
						quantity: 5,
						itemDetails: [
							{ itemCode: "PC001", yearOfPurchase: 2023, status: "Working" },
							{ itemCode: "PC002", yearOfPurchase: 2023, status: "Working" },
							{ itemCode: "PC003", yearOfPurchase: 2022, status: "Repair" },
							{ itemCode: "PC004", yearOfPurchase: 2023, status: "Working" },
							{ itemCode: "PC005", yearOfPurchase: 2021, status: "Working" },
						]
					},
					{
						id: "inv002cm8q601pu0",
						itemType: "Laptop",
						room: "5502",
						quantity: 3,
						itemDetails: [
							{ itemCode: "LT001", yearOfPurchase: 2023, status: "Working" },
							{ itemCode: "LT002", yearOfPurchase: 2022, status: "Working" },
							{ itemCode: "LT003", yearOfPurchase: 2023, status: "Not Working" },
						]
					},
					{
						id: "inv003cm8q601pu0",
						itemType: "Monitor",
						room: "5503",
						quantity: 10,
						itemDetails: Array(10).fill(null).map((_, index) => ({
							itemCode: `MON00${index + 1}`,
							yearOfPurchase: 2023,
							status: "Working"
						}))
					},
			  ]
	);

	// Available rooms and item types
	const [rooms, setRooms] = useState<string[]>(["5501", "5502", "5503"]);

	const [itemTypes, setItemTypes] = useState<string[]>([
		"PC",
		"Laptop",
		"Monitor",
	]);

	// Status options
	const statusOptions = ["Working", "Not Working", "Repair", "Maintenance"];

	// State for modal visibility and selected item
	const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(
		null
	);

	// State for create item modal
	const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
	const [newItem, setNewItem] = useState<Omit<InventoryItem, "id">>({
		itemType: "",
		room: "",
		quantity: 1,
		itemDetails: [{ itemCode: "", yearOfPurchase: new Date().getFullYear(), status: "Working" }]
	});

	// State for create room modal
	const [showCreateRoomModal, setShowCreateRoomModal] =
		useState<boolean>(false);
	const [newRoom, setNewRoom] = useState<string>("");

	// State for create item type modal
	const [showCreateItemTypeModal, setShowCreateItemTypeModal] =
		useState<boolean>(false);
	const [newItemType, setNewItemType] = useState<string>("");
	
	// State for item details expanded view
	const [expandedItems, setExpandedItems] = useState<boolean[]>([]);

	// Handle opening the item details modal
	const handleItemClick = (item: InventoryItem) => {
		setSelectedItem(item);
		setShowDetailsModal(true);
	};

	const generateId = (prefix: string) => {
		const timestamp = Date.now();
		const random = Math.random().toString(36).substring(2, 8);
		return `${prefix}${timestamp}${random}`;
	};
	
	// Toggle expanded state for item details section
	const toggleExpanded = (index: number) => {
		const newExpandedItems = [...expandedItems];
		newExpandedItems[index] = !newExpandedItems[index];
		setExpandedItems(newExpandedItems);
	};

	// Handle creating a new item
	const handleCreateItem = async () => {
		if (newItem.itemType && newItem.room && newItem.quantity > 0) {
			// Validate that all item codes are filled
			const allItemCodesValid = newItem.itemDetails?.every(item => item.itemCode.trim() !== "");
			
			if (!allItemCodesValid) {
				alert("Please fill in all item codes");
				return;
			}

			const createdItem: InventoryItem = {
				id: generateId("inv"),
				itemType: newItem.itemType,
				room: newItem.room,
				quantity: newItem.quantity,
				itemDetails: newItem.itemDetails
			};

			try {
				// Prepare data for API call
				const itemData = {
					roomNumber: newItem.room,
					itemType: newItem.itemType, // This should be the item type ID in a real app
					itemCodes: newItem.itemDetails?.map(detail => detail.itemCode) || [],
					yearOfPurchase: "2023",
					status: newItem.itemDetails?.[0]?.status || "Working",
				};

				// Send to API
				await fetch("/api/admin/infra/group", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(itemData),
				});

				setItems([...items, createdItem]);
				setNewItem({
					itemType: "",
					room: "",
					quantity: 1,
					itemDetails: [{ itemCode: "", yearOfPurchase: new Date().getFullYear(), status: "Working" }]
				});
				setShowCreateModal(false);
			} catch (error) {
				console.error("Error creating inventory item:", error);
				alert("Failed to create inventory item");
			}
		}
	};

	// Handle creating a new room
	const handleCreateRoom = async () => {
		if (newRoom && !rooms.includes(newRoom)) {
            await fetch("/api/admin/infra/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ room: newRoom }),
            })
			setRooms([...rooms, newRoom]);
			setNewItem({ ...newItem, room: newRoom });
			setNewRoom("");
			setShowCreateRoomModal(false);
		}
	};

	// Handle creating a new item type
	const handleCreateItemType = async () => {
		if (newItemType && !itemTypes.includes(newItemType)) {
			setItemTypes([...itemTypes, newItemType]);
			setNewItem({ ...newItem, itemType: newItemType });
			setNewItemType("");
			setShowCreateItemTypeModal(false);

            await fetch("/api/admin/infra/item-type", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ item: newItemType }),
            })
		}
	};

	// Handle quantity increment/decrement
	const incrementQuantity = () => {
		const updatedQuantity = newItem.quantity + 1;
		const currentDetails = newItem.itemDetails || [];
		
		// Add a new item detail when increasing quantity
		const updatedDetails = [
			...currentDetails,
			{ itemCode: "", yearOfPurchase: new Date().getFullYear(), status: "Working" }
		];
		
		setNewItem({ 
			...newItem, 
			quantity: updatedQuantity,
			itemDetails: updatedDetails
		});
	};

	const decrementQuantity = () => {
		if (newItem.quantity > 1) {
			const updatedQuantity = newItem.quantity - 1;
			const currentDetails = newItem.itemDetails || [];
			
			// Remove the last item detail when decreasing quantity
			const updatedDetails = currentDetails.slice(0, updatedQuantity);
			
			setNewItem({ 
				...newItem, 
				quantity: updatedQuantity,
				itemDetails: updatedDetails
			});
		}
	};

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value) && value >= 1) {
			const currentDetails = newItem.itemDetails || [];
			let updatedDetails = [...currentDetails];
			

			if (value > currentDetails.length) {

				const newDetails = Array(value - currentDetails.length).fill(null).map(() => ({
					itemCode: "",
					yearOfPurchase: new Date().getFullYear(),
					status: "Working"
				}));
				updatedDetails = [...currentDetails, ...newDetails];
			} else if (value < currentDetails.length) {
	
				updatedDetails = currentDetails.slice(0, value);
			}
			
			setNewItem({ 
				...newItem, 
				quantity: value,
				itemDetails: updatedDetails
			});
		} else if (e.target.value === "") {
			setNewItem({ ...newItem, quantity: 1 });
		}
	};
	
	// Handle item detail changes
	const updateItemDetail = (index: number, field: keyof ItemDetail, value: string | number) => {
		if (newItem.itemDetails) {
			const updatedDetails = [...newItem.itemDetails];
			updatedDetails[index] = {
				...updatedDetails[index],
				[field]: value
			};
			setNewItem({
				...newItem,
				itemDetails: updatedDetails
			});
		}
	};

	return (
		<>
			{/* Action bar */}
			<div className="flex justify-between items-center mb-6">
				<div>{/* Title could go here */}</div>
				<Button
					onClick={() => setShowCreateModal(true)}
					className=""
				>
					Create
				</Button>
			</div>

			{/* Inventory table */}
			<div className=" border rounded-sm">
				<Table >
					<TableHeader>
						<TableRow>
							<TableHead className="font-bold text-slate-600">
								Id
							</TableHead>
							<TableHead className="font-bold text-slate-600">
								Item Type
							</TableHead>
							<TableHead className="font-bold text-slate-600">
								Room
							</TableHead>
							<TableHead className="font-bold text-slate-600">
								Quantity
							</TableHead>
							<TableHead className="font-bold text-slate-600">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{items.map((item) => (
							<TableRow
								key={item.id}
								className="cursor-pointer"
							>
								<TableCell className="font-mono text-sm text-slate-600">
									{item.id}
								</TableCell>
								<TableCell>{item.itemType}</TableCell>
								<TableCell>{item.room}</TableCell>
								<TableCell>{item.quantity}</TableCell>
								<TableCell>
									<div className="flex gap-2">
										<Button 
											variant="ghost" 
											size="icon"
											onClick={() => handleItemClick(item)}
										>
											<Pencil className="h-4 w-4" />
										</Button>
										<Button variant="ghost" size="icon">
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				{items.length === 0 && (
					<div className="text-center py-10 text-slate-500">
						<p>A list of inventory items.</p>
					</div>
				)}
			</div>

			{/* "A list of Inventory" text when there are items but we want to show it anyway */}
			{items.length > 0 && (
				<div className="text-center py-4 text-slate-500">
					<p>A list of inventory items.</p>
				</div>
			)}

			{/* Item Details Modal */}
			<Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
				<DialogContent className="sm:max-w-md bg-white">
					<DialogHeader>
						<DialogTitle>Item Details</DialogTitle>
						<DialogDescription>
							Detailed view of {selectedItem?.itemType} in{" "}
							{selectedItem?.room}
						</DialogDescription>
					</DialogHeader>
					{selectedItem && (
						<div className="py-4">
							<div className="grid grid-cols-2 gap-4 mb-4">
								<div>
									<Label className="font-medium">
										Item Type
									</Label>
									<p>{selectedItem.itemType}</p>
								</div>
								<div>
									<Label className="font-medium">Room</Label>
									<p>{selectedItem.room}</p>
								</div>
								<div>
									<Label className="font-medium">
										Quantity
									</Label>
									<p>{selectedItem.quantity}</p>
								</div>
							</div>

							<div className="mt-6">
								<Label className="font-medium block mb-2">
									Individual Items
								</Label>
								<div className="max-h-60 overflow-y-auto space-y-2">
									{selectedItem.itemDetails ? (
										selectedItem.itemDetails.map((detail, index) => (
											<div
												key={index}
												className="p-2 bg-slate-50 rounded-md"
											>
												<div className="flex justify-between">
													<span className="font-medium">{detail.itemCode}</span>
													<span className={`px-2 py-1 text-xs rounded ${
														detail.status === "Working" ? "bg-green-100 text-green-800" : 
														detail.status === "Not Working" ? "bg-red-100 text-red-800" :
														"bg-yellow-100 text-yellow-800"
													}`}>
														{detail.status}
													</span>
												</div>
												<div className="text-sm text-slate-500">
													Year: {detail.yearOfPurchase}
												</div>
											</div>
										))
									) : (
										Array.from({
											length: selectedItem.quantity,
										}).map((_, i) => (
											<div
												key={i}
												className="p-2 bg-slate-50 rounded-md"
											>
												{selectedItem.itemType} #{i + 1} in{" "}
												{selectedItem.room}
											</div>
										))
									)}
								</div>
							</div>
						</div>
					)}
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowDetailsModal(false)}
						>
							Close
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Create Item Modal */}
			<Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
				<DialogContent className="sm:max-w-md bg-white">
					<DialogHeader>
						<DialogTitle>Create Item</DialogTitle>
						<DialogDescription>
							Add new inventory items
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						{/* Room Selection */}
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="room" className="text-right">
								Room
							</Label>
							<div className="col-span-3 flex gap-2">
								<Select
									value={newItem.room}
									onValueChange={(value) =>
										setNewItem({ ...newItem, room: value })
									}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a room" />
									</SelectTrigger>
									<SelectContent>
										{rooms.map((room) => (
											<SelectItem key={room} value={room} className="text-sm bg-white">
												{room}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<Button
									variant="outline"
									size="icon"
									onClick={() => setShowCreateRoomModal(true)}
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>
						</div>

						{/* Item Type Selection */}
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="itemType" className="text-right">
								Item Type
							</Label>
							<div className="col-span-3 flex gap-2">
								<Select
									value={newItem.itemType}
									onValueChange={(value) =>
										setNewItem({
											...newItem,
											itemType: value,
										})
									}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select an item type" />
									</SelectTrigger>
									<SelectContent>
										{itemTypes.map((type) => (
											<SelectItem key={type} value={type} className="text-sm bg-white">
												{type}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<Button
									variant="outline"
									size="icon"
									onClick={() =>
										setShowCreateItemTypeModal(true)
									}
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>
						</div>

						{/* Quantity Input with Increment/Decrement */}
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="quantity" className="text-right">
								Quantity
							</Label>
							<div className="col-span-3 flex">
								<Button
									variant="outline"
									size="icon"
									onClick={decrementQuantity}
									disabled={newItem.quantity <= 1}
									className="rounded-r-none border-r-0"
								>
									<Minus className="h-4 w-4" />
								</Button>
								<Input
									id="quantity"
									type="number"
									min={1}
									value={newItem.quantity}
									onChange={handleQuantityChange}
									className="rounded-none text-center w-16"
								/>
								<Button
									variant="outline"
									size="icon"
									onClick={incrementQuantity}
									className="rounded-l-none border-l-0"
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>
						</div>
						
						{/* Item Details Section */}
						<div className="mt-6">
							<div className="flex justify-between items-center mb-4">
								<h3 className="font-medium">Item Details</h3>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setExpandedItems([...expandedItems.map(() => !expandedItems[0])])}
								>
									{expandedItems[0] ? "Collapse All" : "Expand All"}	
								</Button>
							</div>
							
							<div className="space-y-4 max-h-60 overflow-y-auto">
								{newItem.itemDetails?.map((detail, index) => (
									<div key={index} className="border rounded-md p-2">
										<div 
											className="flex justify-between items-center cursor-pointer p-2"
											onClick={() => toggleExpanded(index)}
										>
											<span className="font-medium">
												Item {index + 1} {detail.itemCode ? `(${detail.itemCode})` : ""}
											</span>
											<Button variant="ghost" size="sm">
												{expandedItems[index] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
											</Button>
										</div>
										
										{expandedItems[index] && (
											<div className="p-2 space-y-4">
												{/* Item Code */}
												<div className="grid grid-cols-4 items-center gap-4">
													<Label htmlFor={`itemCode-${index}`} className="text-right text-sm">
														Item Code
													</Label>
													<Input
														id={`itemCode-${index}`}
														value={detail.itemCode}
														onChange={(e) => updateItemDetail(index, "itemCode", e.target.value)}
														placeholder="Enter item code"
														className="col-span-3"
													/>
												</div>
												
												{/* Year of Purchase */}
												<div className="grid grid-cols-4 items-center gap-4">
													<Label htmlFor={`year-${index}`} className="text-right text-sm">
														Year
													</Label>
													<Input
														id={`year-${index}`}
														type="number"
														value={detail.yearOfPurchase}
														onChange={(e) => updateItemDetail(index, "yearOfPurchase", parseInt(e.target.value))}
														placeholder="Year of purchase"
														className="col-span-3"
													/>
												</div>
												
												{/* Status */}
												<div className="grid grid-cols-4 items-center gap-4">
													<Label htmlFor={`status-${index}`} className="text-right text-sm">
														Status
													</Label>
													<Select
														value={detail.status}
														onValueChange={(value) => updateItemDetail(index, "status", value)}
													>
														<SelectTrigger className="w-full col-span-3">
															<SelectValue placeholder="Select status" />
														</SelectTrigger>
														<SelectContent>
															{statusOptions.map((status) => (
																<SelectItem key={status} value={status} className="text-sm bg-white">
																	{status}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowCreateModal(false)}
						>
							Cancel
						</Button>
						<Button
							onClick={handleCreateItem}
							disabled={
								!newItem.itemType ||
								!newItem.room ||
								newItem.quantity < 1
							}
						>
							Create Item
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Create Room Modal */}
			<Dialog
				open={showCreateRoomModal}
				onOpenChange={setShowCreateRoomModal}
			>
				<DialogContent className="sm:max-w-md bg-white">
					<DialogHeader>
						<DialogTitle>Create New Room</DialogTitle>
						<DialogDescription>
							Add a new room to the inventory system
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="newRoom" className="text-right">
								Room Name
							</Label>
							<Input
								id="newRoom"
								value={newRoom}
								onChange={(e) => setNewRoom(e.target.value)}
								placeholder="Enter new room name"
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowCreateRoomModal(false)}
						>
							Cancel
						</Button>
						<Button
							onClick={handleCreateRoom}
							disabled={!newRoom || rooms.includes(newRoom)}
						>
							Create Room
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Create Item Type Modal */}
			<Dialog
				open={showCreateItemTypeModal}
				onOpenChange={setShowCreateItemTypeModal}
			>
				<DialogContent className="sm:max-w-md bg-white">
					<DialogHeader>
						<DialogTitle>Create New Item Type</DialogTitle>
						<DialogDescription>
							Add a new item type to the inventory system
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="newItemType" className="text-right">
								Item Type
							</Label>
							<Input
								id="newItemType"
								value={newItemType}
								onChange={(e) => setNewItemType(e.target.value)}
								placeholder="Enter new item type"
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowCreateItemTypeModal(false)}
						>
							Cancel
						</Button>
						<Button
							onClick={handleCreateItemType}
							disabled={
								!newItemType || itemTypes.includes(newItemType)
							}
						>
							Create Item Type
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Bottom avatar */}
			<div className="fixed bottom-6 left-8">
				<div className="bg-slate-800 text-white h-10 w-10 rounded-full flex items-center justify-center">
					N
				</div>
			</div>
		</>
	);
};

export default InfraSection;