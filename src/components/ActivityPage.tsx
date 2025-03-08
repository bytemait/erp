'use client'
import Link from "next/link"
import { Bell, Megaphone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState ,useEffect } from "react"
import axios from "axios"

interface Notification {
    id: number;
    title: string;
    message: string;
    createdAt: string;
}

interface Announcement {
    id: number;
    title: string;
    message: string;
    createdAt: string;
}

const getNotifications = async () => {
    try {
        
        const response = await axios.get("/api/public/notification")

    
        if(!response.data.success){
            console.error(response.data.message)
            return []
        }
        return response.data.data
    } catch (error) {
        console.error(error)
        
    }
}
const getAnnouncements = async () => {
    try {
        const response = await axios.get("/api/student/announcements")

        console.log(response.data)
        return response.data.data
        
    } catch (error) {
        console.error(error)
    }
}



export default function ActivityPage() {

    const[notifications , setNotifications]= useState<Notification[]>([])
    const[announcements , setAnnouncements]= useState<Announcement[]>([])

    useEffect(() => {
        getNotifications().then(setNotifications)
        getAnnouncements().then(setAnnouncements)
    }, [])


    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Tabs defaultValue="notifications">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="notifications">All Notifications</TabsTrigger>
                    <TabsTrigger value="announcements">All Announcements</TabsTrigger>
                </TabsList>
                <TabsContent value="notifications">
                    {notifications.length > 0 ? notifications.map((item) => (
                        <ActivityItem
                            key={item.id}
                            icon={<Bell className="h-4 w-4" />}
                            title={item.title}
                            description={item.message}
                            date={item.createdAt}
                        />
                    )) : <p>NOTHING</p>}
                </TabsContent>
                <TabsContent value="announcements">
                    { announcements.length > 0 ? announcements.map((item) => (
                        <ActivityItem
                            key={item.id}
                            icon={<Megaphone className="h-4 w-4" />}
                            title={item.title}
                            description={item.message}
                            date={item.createdAt}
                        />
                    )) : <p>No Announcement</p>}
                </TabsContent>
            </Tabs>
            <div className="mt-6">
                <Button asChild variant="outline">
                    <Link href="/">Back to Dashboard</Link>
                </Button>
            </div>
        </div>
    )
}

interface ActivityItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    date: string;
}

function ActivityItem({ icon, title, description, date }: ActivityItemProps) {
    
    const formatedDate = new Date(date).toLocaleDateString()
    return (
        <Card className="mb-4">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
                <div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription>{formatedDate}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p>{description}</p>
            </CardContent>
        </Card>
    )
}

