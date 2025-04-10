import { useState } from "react";
import {  Pencil, Trash2, Plus, Minus } from "lucide-react";
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
}

const InfraSection = () => {
  // Sample data for inventory items
  const [items, setItems] = useState<InventoryItem[]>([
    
    { id: "inv001cm8q601pu0", itemType: "PC", room: "5501", quantity: 10 },
    { id: "inv002cm8q601pu0", itemType: "Laptop", room: "5502", quantity: 5 },
    { id: "inv003cm8q601pu0", itemType: "Monitor", room: "5503", quantity: 15 },
    { id: "inv004cm8q601pu0", itemType: "PC", room: "5501", quantity: 8 },
    { id: "inv005cm8q601pu0", itemType: "Laptop", room: "5502", quantity: 3 },
  ]);

  // Available rooms and item types
  const [rooms, setRooms] = useState<string[]>([
    "5501",
    "5502",
    "5503",
  ]);
  
  const [itemTypes, setItemTypes] = useState<string[]>([
    "PC",
    "Laptop",
    "Monitor",
  ]);

  // State for modal visibility and selected item
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // State for create item modal
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<Omit<InventoryItem, "id">>({
    itemType: "",
    room: "",
    quantity: 1,
  });

  // State for create room modal
  const [showCreateRoomModal, setShowCreateRoomModal] = useState<boolean>(false);
  const [newRoom, setNewRoom] = useState<string>("");

  // State for create item type modal
  const [showCreateItemTypeModal, setShowCreateItemTypeModal] = useState<boolean>(false);
  const [newItemType, setNewItemType] = useState<string>("");

  // Handle opening the item details modal
  const handleItemClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  // Handle creating a new item
  const handleCreateItem = () => {
    if (newItem.itemType && newItem.room && newItem.quantity > 0) {
      const randomId = `inv${Math.floor(Math.random() * 999)
        .toString()
        .padStart(3, "0")}cm8q601pu0`;

      const createdItem: InventoryItem = {
        id: randomId,
        itemType: newItem.itemType,
        room: newItem.room,
        quantity: newItem.quantity,
      };

      setItems([...items, createdItem]);
      setNewItem({
        itemType: "",
        room: "",
        quantity: 1,
      });
      setShowCreateModal(false);
    }
  };

  // Handle creating a new room
  const handleCreateRoom = () => {
    if (newRoom && !rooms.includes(newRoom)) {
      setRooms([...rooms, newRoom]);
      setNewItem({...newItem, room: newRoom});
      setNewRoom("");
      setShowCreateRoomModal(false);
    }
  };

  // Handle creating a new item type
  const handleCreateItemType = () => {
    if (newItemType && !itemTypes.includes(newItemType)) {
      setItemTypes([...itemTypes, newItemType]);
      setNewItem({...newItem, itemType: newItemType});
      setNewItemType("");
      setShowCreateItemTypeModal(false);
    }
  };

  // Handle quantity increment/decrement
  const incrementQuantity = () => {
    setNewItem({...newItem, quantity: newItem.quantity + 1});
  };

  const decrementQuantity = () => {
    if (newItem.quantity > 1) {
      setNewItem({...newItem, quantity: newItem.quantity - 1});
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setNewItem({...newItem, quantity: value});
    } else if (e.target.value === "") {
      setNewItem({...newItem, quantity: 1});
    }
  };

  return (
    <>
      {/* Action bar */}
      <div className="flex justify-between items-center mb-6">
        <div>{/* Title could go here */}</div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-slate-900 hover:bg-slate-800"
        >
          Create
        </Button>
      </div>

      {/* Inventory table */}
      <div className="bg-white border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium text-slate-600">
                Id
              </TableHead>
              <TableHead className="font-medium text-slate-600">
                Item Type
              </TableHead>
              <TableHead className="font-medium text-slate-600">
                Room
              </TableHead>
              <TableHead className="font-medium text-slate-600">
                Quantity
              </TableHead>
              <TableHead className="font-medium text-slate-600">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => handleItemClick(item)}
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
                    <Button variant="ghost" size="icon">
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
        <DialogContent className="sm:max-w-md">
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
                  {Array.from({
                    length: selectedItem.quantity,
                  }).map((_, i) => (
                    <div
                      key={i}
                      className="p-2 bg-slate-50 rounded-md"
                    >
                      {selectedItem.itemType} #{i + 1} in{" "}
                      {selectedItem.room}
                    </div>
                  ))}
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
        <DialogContent className="sm:max-w-md">
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
                  onValueChange={(value) => setNewItem({...newItem, room: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room} value={room}>
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
                  onValueChange={(value) => setNewItem({...newItem, itemType: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an item type" />
                  </SelectTrigger>
                  <SelectContent>
                    {itemTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setShowCreateItemTypeModal(true)}
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
              disabled={!newItem.itemType || !newItem.room || newItem.quantity < 1}
            >
              Create Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Room Modal */}
      <Dialog open={showCreateRoomModal} onOpenChange={setShowCreateRoomModal}>
        <DialogContent className="sm:max-w-md">
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
      <Dialog open={showCreateItemTypeModal} onOpenChange={setShowCreateItemTypeModal}>
        <DialogContent className="sm:max-w-md">
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
              disabled={!newItemType || itemTypes.includes(newItemType)}
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