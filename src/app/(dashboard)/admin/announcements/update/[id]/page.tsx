"use client"

import { useEffect, useState } from "react"
import AnnouncementForm from "@/components/AnnouncementForm"
import { Announcement } from "@/types/alert"
import { Role } from "@prisma/client"


async function getAnnouncement(id: string) {
    return {
        id: Number.parseInt(id),
        title: "Sample Announcement",
        message: "This is a sample announcement.",
        role: "STUDENT" as Role,
        filters: {
            batch: ["2023", "2024"],
            group: ["A"],
            branch: ["CSE"],
        },
    }
}

export default function UpdateAnnouncement({ params }: { params: { id: string } }) {
    const [announcement, setAnnouncement] = useState<Announcement | null>(null)

    useEffect(() => {
        getAnnouncement(params.id).then(setAnnouncement)
    }, [params.id])

    if (!announcement) {
        return <div>Loading...</div>
    }

    return <AnnouncementForm initialData={announcement} />
}

