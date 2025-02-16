"use client"

import { useEffect, useState } from "react"
import {useRouter } from "next/navigation"
import Link from "next/link"

export default function Custom404() {
    const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/")
    }, 10000)

    const interval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1)
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Oops! Page not found</p>
        <p className="text-lg text-gray-500 mb-4">Redirecting to home page in {countdown} seconds...</p>
        <Link href="/" className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
          Go to Home Page
        </Link>
      </div>
    </div>
  )
}
