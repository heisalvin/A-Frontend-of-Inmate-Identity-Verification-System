"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { EnrollInmate } from "@/components/enroll-inmate"
import { VerifyInmate } from "@/components/verify-inmate"
import { InmateHistory } from "@/components/inmate-history"
import { Logs } from "@/components/logs"

export type Page = "dashboard" | "enroll" | "verify" | "history" | "logs"

export default function PrisonDashboard() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />
      case "enroll":
        return <EnrollInmate onNavigate={setCurrentPage} />
      case "verify":
        return <VerifyInmate onNavigate={setCurrentPage} />
      case "history":
        return <InmateHistory onNavigate={setCurrentPage} />
      case "logs":
        return <Logs onNavigate={setCurrentPage} />
      default:
        return <Dashboard onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="container mx-auto px-4 py-6">{renderPage()}</main>
    </div>
  )
}
