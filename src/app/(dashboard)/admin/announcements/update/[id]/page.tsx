"use client"

import { useEffect, useState } from "react"
import AnnouncementForm from "@/components/AnnouncementForm"
import { Announcement } from "@/types/alert"
import { useParams } from "next/navigation"


async function getAnnouncement(id: string) {


    const response = await fetch(`/api/admin/announcements/${id}`)
    const data = await response.json()
    
    

    return data.data
}

export default function UpdateAnnouncement() {
    const params = useParams()
    const announcementId = params.id as string

    const [announcement, setAnnouncement] = useState<Announcement | null>(null)

    useEffect(() => {
        getAnnouncement(announcementId).then(setAnnouncement)
    }, [announcementId])

    if (!announcement) {
        return <div>Loading...</div>
    }

    return <AnnouncementForm userRole="admin" initialData={announcement} />
}

