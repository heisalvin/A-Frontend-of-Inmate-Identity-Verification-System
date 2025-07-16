"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Filter, Download, Search, ChevronLeft, ChevronRight } from "lucide-react"
import type { Page } from "@/app/page"

interface LogsProps {
  onNavigate: (page: Page) => void
}

export function Logs({ onNavigate }: LogsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPrison, setSelectedPrison] = useState("All Prisons")
  const [dateRange, setDateRange] = useState("All Dates")

  const handleExport = (format: "csv" | "pdf") => {
    if (format === "csv") {
      // Create CSV content
      const headers = [
        "Inmate ID",
        "Name",
        "Officer",
        "Prison",
        "Location",
        "Method",
        "Confidence",
        "Result",
        "Date",
        "Time",
      ]
      const csvContent = [
        headers.join(","),
        ...currentLogs.map((log) =>
          [
            log.inmateId,
            log.inmateName,
            log.officer,
            log.prison,
            log.location,
            log.method,
            log.confidence,
            log.result,
            log.date,
            log.time,
          ].join(","),
        ),
      ].join("\n")

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `verification-logs-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } else if (format === "pdf") {
      // Simulate PDF export
      alert("PDF export functionality would generate a formatted report with the current table data.")
    }
  }

  const logsData = [
    {
      inmateId: "INM-2024-001",
      inmateName: "John Smith",
      officer: "Officer Johnson",
      confidence: "98.5%",
      result: "Success",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      method: "Live Camera",
      prison: "State Correctional Facility",
      location: "Main Gate",
    },
    {
      inmateId: "INM-2024-002",
      inmateName: "Michael Brown",
      officer: "Officer Davis",
      confidence: "96.2%",
      result: "Success",
      date: new Date(Date.now() - 300000).toLocaleDateString(), // 5 minutes ago
      time: new Date(Date.now() - 300000).toLocaleTimeString(),
      method: "Upload",
      prison: "State Correctional Facility",
      location: "Cafeteria",
    },
    {
      inmateId: "INM-2024-003",
      inmateName: "Unknown",
      officer: "Officer Wilson",
      confidence: "45.1%",
      result: "Failed",
      date: new Date(Date.now() - 600000).toLocaleDateString(), // 10 minutes ago
      time: new Date(Date.now() - 600000).toLocaleTimeString(),
      method: "Live Camera",
      prison: "County Detention Center",
      location: "Visitor Center",
    },
    {
      inmateId: "INM-2024-004",
      inmateName: "Robert Johnson",
      officer: "Officer Johnson",
      confidence: "97.8%",
      result: "Success",
      date: new Date(Date.now() - 900000).toLocaleDateString(), // 15 minutes ago
      time: new Date(Date.now() - 900000).toLocaleTimeString(),
      method: "Upload",
      prison: "State Correctional Facility",
      location: "Recreation Area",
    },
    {
      inmateId: "INM-2024-005",
      inmateName: "David Wilson",
      officer: "Officer Smith",
      confidence: "94.7%",
      result: "Success",
      date: new Date(Date.now() - 1200000).toLocaleDateString(), // 20 minutes ago
      time: new Date(Date.now() - 1200000).toLocaleTimeString(),
      method: "Live Camera",
      prison: "Federal Prison Complex",
      location: "Medical Wing",
    },
    {
      inmateId: "INM-2024-006",
      inmateName: "James Miller",
      officer: "Officer Brown",
      confidence: "92.3%",
      result: "Success",
      date: new Date(Date.now() - 1500000).toLocaleDateString(), // 25 minutes ago
      time: new Date(Date.now() - 1500000).toLocaleTimeString(),
      method: "Upload",
      prison: "State Correctional Facility",
      location: "Workshop",
    },
    {
      inmateId: "INM-2024-007",
      inmateName: "Unknown",
      officer: "Officer Davis",
      confidence: "38.9%",
      result: "Failed",
      date: new Date(Date.now() - 1800000).toLocaleDateString(), // 30 minutes ago
      time: new Date(Date.now() - 1800000).toLocaleTimeString(),
      method: "Live Camera",
      prison: "County Detention Center",
      location: "Cell Block",
    },
    {
      inmateId: "INM-2024-008",
      inmateName: "William Garcia",
      officer: "Officer Wilson",
      confidence: "95.6%",
      result: "Success",
      date: new Date(Date.now() - 2100000).toLocaleDateString(), // 35 minutes ago
      time: new Date(Date.now() - 2100000).toLocaleTimeString(),
      method: "Upload",
      prison: "Federal Prison Complex",
      location: "Library",
    },
  ]

  const itemsPerPage = 10
  const totalPages = Math.ceil(logsData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentLogs = logsData.slice(startIndex, endIndex)

  const prisons = ["State Correctional Facility", "County Detention Center", "Federal Prison Complex"]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => onNavigate("dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verification Logs</h1>
          <p className="text-gray-600">Complete history of all verification activities</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Inmate ID or Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Prison/Facility</label>
              <Select value={selectedPrison} onValueChange={setSelectedPrison}>
                <SelectTrigger>
                  <SelectValue placeholder="All Prisons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Prisons">All Prisons</SelectItem>
                  {prisons.map((prison) => (
                    <SelectItem key={prison} value={prison}>
                      {prison}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Dates">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <div className="flex space-x-2">
                <Button onClick={() => handleExport("csv")} variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  CSV
                </Button>
                <Button onClick={() => handleExport("pdf")} variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Verification Records</CardTitle>
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, logsData.length)} of {logsData.length} records
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inmate ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Officer</TableHead>
                  <TableHead>Prison</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono font-medium">{log.inmateId}</TableCell>
                    <TableCell>
                      {log.inmateName === "Unknown" ? (
                        <span className="text-gray-500 italic">Unknown</span>
                      ) : (
                        log.inmateName
                      )}
                    </TableCell>
                    <TableCell>{log.officer}</TableCell>
                    <TableCell className="text-sm">{log.prison}</TableCell>
                    <TableCell className="text-sm">{log.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {log.method}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-semibold ${
                          Number.parseFloat(log.confidence) >= 95
                            ? "text-green-600"
                            : Number.parseFloat(log.confidence) >= 80
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {log.confidence}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={log.result === "Success" ? "default" : "destructive"}
                        className={log.result === "Success" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {log.result}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>
                        <div className="font-medium">{log.date}</div>
                        <div className="text-gray-500">{log.time}</div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
