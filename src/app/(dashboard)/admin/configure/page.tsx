import ConfigureSection from "./ConfigureSection"

const dummyData = {
    BATCH: [
        { id: 1, name: "2023" },
        { id: 2, name: "2024" },
    ],
    BRANCH: [
        { id: 1, name: "COMPUTER_SCIENCE" },
        { id: 2, name: "ELECTRICAL_ENGINEERING" },
    ],
    GROUP: [
        { id: 1, name: "5C12" },
        { id: 2, name: "5C13" },
    ],
    DEPARTMENT: [
        { id: 1, name: "ENGINEERING" },
        { id: 2, name: "HUMAN_RESOURCES" },
    ],
    DESIGNATION: [
        { id: 1, name: "SOFTWARE_ENGINEER" },
        { id: 2, name: "PROJECT_MANAGER" },
    ],
}

export default function ConfigurePage() {
    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold mb-6">Configure</h1>
            <ConfigureSection title="BATCH" initialItems={dummyData.BATCH} />
            <ConfigureSection title="BRANCH" initialItems={dummyData.BRANCH} />
            <ConfigureSection title="GROUP" initialItems={dummyData.GROUP} />
            <ConfigureSection title="DEPARTMENT" initialItems={dummyData.DEPARTMENT} />
            <ConfigureSection title="DESIGNATION" initialItems={dummyData.DESIGNATION} />
        </div>
    )
}

