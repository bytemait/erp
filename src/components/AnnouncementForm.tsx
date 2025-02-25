"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { Announcement } from "@/types/alert"
import { Role } from "@prisma/client"

interface AnnouncementFormProps {
    initialData?: Announcement
}

const batchOptions = ["2023", "2024", "2025", "2026"]
const groupOptions = ["5C12", "5C13", "5C14", "5C15"]
const branchOptions = ["CSE", "ECE", "ME", "CE"]
const staffTypeOptions = ["PLACEMENT_OFFICER", "LIBRARIAN", "DEAN"]
const designationOptions = ["PROFESSOR", "ASSOCIATE_PROFESSOR", "ASSISTANT_PROFESSOR", "LECTURER"]
const departmentOptions = ["COMPUTER_SCIENCE", "ELECTRONICS", "MECHANICAL", "CIVIL"]

export default function AnnouncementForm({ initialData }: AnnouncementFormProps) {
    const router = useRouter()
    const [formData, setFormData] = useState<Announcement>({
        id: 0,
        title: "",
        message: "",
        role: "STUDENT" as Role,
        filters: {},
    })
    const [showPreview, setShowPreview] = useState(false)

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        }
    }, [initialData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleRoleChange = (value: Role) => {
        setFormData((prev) => ({ ...prev, role: value, filters: {} }))
    }

    const handleFilterChange = (filterType: string, values: string[]) => {
        setFormData((prev) => ({
            ...prev,
            filters: { ...prev.filters, [filterType]: values },
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setShowPreview(true)
    }

    const handleConfirm = async () => {
        try {
            const url = formData.id ? `/api/announcements/${formData.id}` : "/api/announcements"
            const method = formData.id ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                router.push("/announcements")
            } else {
                console.error("Failed to save announcement")
            }
        } catch (error) {
            console.error("Error saving announcement:", error)
        }
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">{formData.id ? "Update" : "Create"} Announcement</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                </div>
                <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required />
                </div>
                <div>
                    <Label htmlFor="role">Role</Label>
                    <Select onValueChange={handleRoleChange} value={formData.role}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="STUDENT">Student</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="FACULTY">Faculty</SelectItem>
                            <SelectItem value="STAFF">Staff</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {formData.role === "STUDENT" && (
                    <>
                        <div>
                            <Label>Batch</Label>
                            <MultiSelect
                                options={batchOptions}
                                selected={formData.filters.batch || []}
                                onChange={(values) => handleFilterChange("batch", values)}
                            />
                        </div>
                        <div>
                            <Label>Group</Label>
                            <MultiSelect
                                options={groupOptions}
                                selected={formData.filters.group || []}
                                onChange={(values) => handleFilterChange("group", values)}
                            />
                        </div>
                        <div>
                            <Label>Branch</Label>
                            <MultiSelect
                                options={branchOptions}
                                selected={formData.filters.branch || []}
                                onChange={(values) => handleFilterChange("branch", values)}
                            />
                        </div>
                    </>
                )}
                {formData.role === "STAFF" && (
                    <>
                        <div>
                            <Label>Staff Type</Label>
                            <MultiSelect
                                options={staffTypeOptions}
                                selected={formData.filters.staffType || []}
                                onChange={(values) => handleFilterChange("staffType", values)}
                            />
                        </div>
                    </>
                )}
                {formData.role === "FACULTY" && (
                    <>
                        <div>
                            <Label>Designation</Label>
                            <MultiSelect
                                options={designationOptions}
                                selected={formData.filters.designation || []}
                                onChange={(values) => handleFilterChange("designation", values)}
                            />
                        </div>
                        <div>
                            <Label>Department</Label>
                            <MultiSelect
                                options={departmentOptions}
                                selected={formData.filters.department || []}
                                onChange={(values) => handleFilterChange("department", values)}
                            />
                        </div>
                    </>
                )}
                <Button type="submit">Preview Announcement</Button>
            </form>

            <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Announcement Preview</DialogTitle>
                        <DialogDescription>Review your announcement before confirming</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <strong>Title:</strong> {formData.title}
                        </div>
                        <div>
                            <strong>Message:</strong> {formData.message}
                        </div>
                        <div>
                            <strong>Role:</strong> {formData.role}
                        </div>
                        <div>
                            <strong>Filters:</strong>
                            <pre>{JSON.stringify(formData.filters, null, 2)}</pre>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPreview(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm}>{formData.id ? "Update" : "Create"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

