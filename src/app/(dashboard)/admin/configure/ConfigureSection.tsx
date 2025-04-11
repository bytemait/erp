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
import { Pencil, Trash2, Loader2 } from "lucide-react"
import toast from "react-hot-toast"

export interface Item {
  id: string
  name: string
}

interface ConfigureSectionProps {
  title: string
  initialItems: Item[]
  isLoading: boolean
  error: string | null
  onCreateItem: (name: string) => Promise<void>
  onUpdateItem: (id: string, name: string) => Promise<void>
  onDeleteItem: (id: string) => Promise<void>
}

export default function ConfigureSection({
  title,
  initialItems = [],
  isLoading,
  error,
  onCreateItem,
  onUpdateItem,
  onDeleteItem
}: ConfigureSectionProps) {
  const [newItemName, setNewItemName] = useState("")
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const items = Array.isArray(initialItems) ? initialItems : []

  const handleCreate = async () => {
    if (!newItemName.trim()) {
      toast.error("Please enter a name")
      return
    }

    try {
      setIsSubmitting(true)
      const formattedName = newItemName.toUpperCase().replace(/ /g, "_")
      await onCreateItem(formattedName)
      setNewItemName("")
      setIsCreateModalOpen(false)
      toast.success(`${title} created successfully`)
    } catch (err: unknown) {
      console.error("Create error:", err)
      toast.error(`Failed to create ${title.toLowerCase()}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (item: Item) => {
    setEditingItem(item)
    setNewItemName(item.name)
    setIsCreateModalOpen(true)
  }

  const handleUpdate = async () => {
    if (!newItemName.trim()) {
      toast.error("Please enter a name")
      return
    }

    if (editingItem && newItemName) {
      try {
        setIsSubmitting(true)
        const formattedName = newItemName.toUpperCase().replace(/ /g, "_")
        await onUpdateItem(editingItem.id, formattedName)
        setEditingItem(null)
        setNewItemName("")
        setIsCreateModalOpen(false)
        toast.success(`${title} updated successfully`)
      } catch (err: unknown) {
        console.error("Update error:", err)
        toast.error(`Failed to update ${title.toLowerCase()}`)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleDelete = (item: Item) => {
    setItemToDelete(item)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        setIsSubmitting(true)
        await onDeleteItem(itemToDelete.id)
        setIsDeleteModalOpen(false)
        setItemToDelete(null)
        toast.success(`${title} deleted successfully`)
      } catch (err: unknown) {
        console.error("Delete error:", err)
        toast.error(`Failed to delete ${title.toLowerCase()}`)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (error) {
    return (
      <div className="border rounded-lg p-4 bg-red-50">
        <h2 className="text-xl font-semibold mb-2 text-red-700">{title}</h2>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2 min-h-[100px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-gray-500 text-center py-2">No items found</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span>{item.name}</span>
              <div className="space-x-1">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(item)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
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
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>{editingItem ? `Edit ${title}` : `Create New ${title}`}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={`Enter ${title.toLowerCase()} name`}
              disabled={isSubmitting}
            />
            <Button
              onClick={editingItem ? handleUpdate : handleCreate}
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingItem ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete {itemToDelete?.name}? This action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}