"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2 } from "lucide-react"

interface ConfigureSectionProps {
  title: string
  initialItems: Item[]
}

interface Item {
  id: number
  name: string
}

export default function ConfigureSection({ title, initialItems }: ConfigureSectionProps) {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [newItemName, setNewItemName] = useState("")
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null)

  const handleCreate = () => {
    if (newItemName) {
      const formattedName = newItemName.toUpperCase().replace(/ /g, "_")
      setItems([...items, { id: Date.now(), name: formattedName }])
      setNewItemName("")
      setIsCreateModalOpen(false)
    }
  }

  const handleEdit = (item: Item) => {
    setEditingItem(item)
    setNewItemName(item.name)
    setIsCreateModalOpen(true)
  }

  const handleUpdate = () => {
    if (editingItem && newItemName) {
      const formattedName = newItemName.toUpperCase().replace(/ /g, "_")
      setItems(items.map((item) => (item.id === editingItem.id ? { ...item, name: formattedName } : item)))
      setEditingItem(null)
      setNewItemName("")
      setIsCreateModalOpen(false)
    }
  }

  const handleDelete = (item: Item) => {
    setItemToDelete(item)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      setItems(items.filter((item) => item.id !== itemToDelete.id))
      setIsDeleteModalOpen(false)
      setItemToDelete(null)
    }
  }

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <span>{item.name}</span>
            <div>
              <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogTrigger asChild>
          <Button
            className="mt-4"
            onClick={() => {
              setIsCreateModalOpen(true)
              setEditingItem(null)
              setNewItemName("")
            }}
          >
            Create New {title}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? `Edit ${title}` : `Create New ${title}`}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={`Enter ${title.toLowerCase()} name`}
            />
            <Button onClick={editingItem ? handleUpdate : handleCreate}>{editingItem ? "Update" : "Create"}</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete {itemToDelete?.name}? This action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

