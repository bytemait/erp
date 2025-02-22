import ActivityPage from "@/components/ActivityPage";

export default function Activity() {
    return (
        <>
            <main className="flex-1 overflow-y-auto p-4" >
                <h1 className="text-4xl text-center text-primary" >
                    Activity
                </h1>
                <ActivityPage />
            </main>
        </>
    );
}
