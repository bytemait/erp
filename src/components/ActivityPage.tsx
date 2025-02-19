import Link from "next/link"
import { Bell, Megaphone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const notifications = [
    { id: 1, title: "New message", description: "You have a new message from John Doe", date: "2023-04-01" },
    { id: 2, title: "Meeting reminder", description: "Team meeting in 30 minutes", date: "2023-04-02" },
    {
        id: 3,
        title: "Task update",
        description: "Your task 'Complete project proposal' is due tomorrow",
        date: "2023-04-03",
    },
]

const announcements = [
    { id: 1, title: "System maintenance", description: "Scheduled maintenance on April 15th", date: "2023-04-05" },
    { id: 2, title: "New feature release", description: "Check out our latest productivity tools", date: "2023-04-06" },
    { id: 3, title: "Holiday notice", description: "Office will be closed on April 22nd", date: "2023-04-07" },
]

export default function ActivityPage() {
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Tabs defaultValue="notifications">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="notifications">All Notifications</TabsTrigger>
                    <TabsTrigger value="announcements">All Announcements</TabsTrigger>
                </TabsList>
                <TabsContent value="notifications">
                    {notifications.map((item) => (
                        <ActivityItem
                            key={item.id}
                            icon={<Bell className="h-4 w-4" />}
                            title={item.title}
                            description={item.description}
                            date={item.date}
                        />
                    ))}
                </TabsContent>
                <TabsContent value="announcements">
                    {announcements.map((item) => (
                        <ActivityItem
                            key={item.id}
                            icon={<Megaphone className="h-4 w-4" />}
                            title={item.title}
                            description={item.description}
                            date={item.date}
                        />
                    ))}
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
    return (
        <Card className="mb-4">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
                <div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription>{date}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p>{description}</p>
            </CardContent>
        </Card>
    )
}

