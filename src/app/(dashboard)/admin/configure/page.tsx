"use client"

import { useEffect, useState, useCallback } from "react"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import ConfigureSection, { Item } from "./ConfigureSection"

interface ConfigData {
    BATCH: Item[]
    BRANCH: Item[]
    GROUP: Item[]
    DEPARTMENT: Item[]
    DESIGNATION: Item[]
    STAFFTYPE: Item[]
}

interface ResponseItem {
    batch?: string
    branch?: string
    group?: string
    department?: string
    designation?: string
    staffType?: string
    students?: { id: string }[]
    staff?: { id: string }[]
}

interface SectionState {
    data: Item[]
    isLoading: boolean
    error: string | null
}

const API_ENDPOINTS = {
    BATCH: "/api/admin/batch",
    BRANCH: "/api/admin/branch",
    GROUP: "/api/admin/group",
    DEPARTMENT: "/api/admin/department",
    DESIGNATION: "/api/admin/designation",
    STAFFTYPE: "/api/admin/stafftype",
} as const

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "",
    headers: {
        "Content-Type": "application/json",
    },
})

export default function ConfigurePage() {
    const [sections, setSections] = useState<Record<keyof ConfigData, SectionState>>({
        BATCH: { data: [], isLoading: true, error: null },
        BRANCH: { data: [], isLoading: true, error: null },
        GROUP: { data: [], isLoading: true, error: null },
        DEPARTMENT: { data: [], isLoading: true, error: null },
        DESIGNATION: { data: [], isLoading: true, error: null },
        STAFFTYPE: { data: [], isLoading: true, error: null },
    })

    const transformResponseData = useCallback((data: ResponseItem[], section: keyof ConfigData): Item[] => {
        switch (section) {
            case "BATCH":
                return data.map(item => ({ id: item.batch || "", name: item.batch || "" }))
            case "BRANCH":
                return data.map(item => ({ id: item.branch || "", name: item.branch || "" }))
            case "GROUP":
                return data.map(item => ({ id: item.group || "", name: item.group || "" }))
            case "DEPARTMENT":
                return data.map(item => ({ id: item.department || "", name: item.department || "" }))
            case "DESIGNATION":
                return data.map(item => ({ id: item.designation || "", name: item.designation || "" }))
            case "STAFFTYPE":
                return data.map(item => ({ id: item.staffType || "", name: item.staffType || "" }))
            default:
                return []
        }
    }, [])

    const fetchSectionData = useCallback(async (section: keyof ConfigData) => {
        try {
            setSections(prev => ({
                ...prev,
                [section]: { ...prev[section], isLoading: true, error: null }
            }))

            const response = await api.get(API_ENDPOINTS[section])
            const rawData = Array.isArray(response.data) ? response.data : response.data.data || []
            const transformedData = transformResponseData(rawData, section)

            setSections(prev => ({
                ...prev,
                [section]: { data: transformedData, isLoading: false, error: null }
            }))
        } catch (err) {
            const error = err as Error | AxiosError
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.message || "Failed to fetch data"
                : "Failed to fetch data"

            console.error(`Failed to fetch ${section} data:`, error)
            setSections(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    data: [],
                    isLoading: false,
                    error: errorMessage
                }
            }))
        }
    }, [transformResponseData])

    useEffect(() => {
        const fetchAllData = async () => {
            const sectionKeys = Object.keys(API_ENDPOINTS) as Array<keyof ConfigData>
            await Promise.all(sectionKeys.map(section => fetchSectionData(section)))
        }
        fetchAllData()
    }, [fetchSectionData])

    const handleCreate = useCallback(async (section: keyof ConfigData, name: string) => {
        try {
            const requestData = {
                [section.toLowerCase()]: name
            }
            await api.post(API_ENDPOINTS[section], requestData)
            await fetchSectionData(section)
        } catch (err) {
            const error = err as Error | AxiosError
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.message || `Failed to create ${section.toLowerCase()}`
                : `Failed to create ${section.toLowerCase()}`

            console.error(`Create ${section} error:`, error)
            toast.error(errorMessage)
            throw error
        }
    }, [fetchSectionData])

    const handleUpdate = useCallback(async (section: keyof ConfigData, id: string, name: string) => {
        try {
            const requestData = {
                [section.toLowerCase()]: name
            }
            await api.put(`${API_ENDPOINTS[section]}/${id}`, requestData)
            await fetchSectionData(section)
        } catch (err) {
            const error = err as Error | AxiosError
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.message || `Failed to update ${section.toLowerCase()}`
                : `Failed to update ${section.toLowerCase()}`

            console.error(`Update ${section} error:`, error)
            toast.error(errorMessage)
            throw error
        }
    }, [fetchSectionData])

    const handleDelete = useCallback(async (section: keyof ConfigData, id: string) => {
        try {
            await api.delete(`${API_ENDPOINTS[section]}/${id}`)
            await fetchSectionData(section)
        } catch (err) {
            const error = err as Error | AxiosError
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.message || `Failed to delete ${section.toLowerCase()}`
                : `Failed to delete ${section.toLowerCase()}`

            console.error(`Delete ${section} error:`, error)
            toast.error(errorMessage)
            throw error
        }
    }, [fetchSectionData])

    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold mb-6">Configure</h1>
            {(Object.keys(sections) as Array<keyof ConfigData>).map((section) => (
                <ConfigureSection
                    key={section}
                    title={section}
                    initialItems={sections[section].data}
                    isLoading={sections[section].isLoading}
                    error={sections[section].error}
                    onCreateItem={(name) => handleCreate(section, name)}
                    onUpdateItem={(id, name) => handleUpdate(section, id, name)}
                    onDeleteItem={(id) => handleDelete(section, id)}
                />
            ))}
        </div>
    )
}