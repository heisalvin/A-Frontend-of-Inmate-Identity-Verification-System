"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, User, Download, Calendar, Shield } from "lucide-react"
import type { Page } from "@/app/page"

interface InmateHistoryProps {
  onNavigate: (page: Page) => void
}

export function InmateHistory({ onNavigate }: InmateHistoryProps) {
  const inmateProfile = {
    id: "INM-2024-001",
    name: "John Smith",
    crime: "Armed Robbery, Assault with Deadly Weapon",
    sentence: "8 years imprisonment",
    legalStatus: "Convicted",
    prison: "State Correctional Facility - Block A",
    lastVerified: new Date().toLocaleString(),
    enrollmentDate: "2024-01-01",
    totalVerifications: 47,
    successRate: "96.8%",
    imageUrl: "/images/inmate-placeholder.png", // This can be easily replaced with real photo
  }

  const verificationHistory = [
    {
      timestamp: new Date().toLocaleString(),
      officer: "Officer Johnson",
      method: "Live Camera",
      confidence: "98.5%",
      result: "Success",
      location: "Main Gate",
    },
    {
      timestamp: new Date(Date.now() - 18900000).toLocaleString(), // ~5 hours ago
      officer: "Officer Davis",
      method: "Upload",
      confidence: "97.2%",
      result: "Success",
      location: "Cafeteria",
    },
    {
      timestamp: new Date(Date.now() - 36000000).toLocaleString(), // ~10 hours ago
      officer: "Officer Wilson",
      method: "Live Camera",
      confidence: "95.8%",
      result: "Success",
      location: "Recreation Area",
    },
    {
      timestamp: new Date(Date.now() - 54900000).toLocaleString(), // ~15 hours ago
      officer: "Officer Smith",
      method: "Upload",
      confidence: "94.3%",
      result: "Success",
      location: "Medical Wing",
    },
    {
      timestamp: new Date(Date.now() - 72000000).toLocaleString(), // ~20 hours ago
      officer: "Officer Johnson",
      method: "Live Camera",
      confidence: "96.7%",
      result: "Success",
      location: "Visitor Center",
    },
    {
      timestamp: new Date(Date.now() - 90900000).toLocaleString(), // ~25 hours ago
      officer: "Officer Brown",
      method: "Upload",
      confidence: "89.2%",
      result: "Success",
      location: "Cell Block",
    },
    {
      timestamp: new Date(Date.now() - 108000000).toLocaleString(), // ~30 hours ago
      officer: "Officer Davis",
      method: "Live Camera",
      confidence: "92.4%",
      result: "Success",
      location: "Workshop",
    },
    {
      timestamp: new Date(Date.now() - 126900000).toLocaleString(), // ~35 hours ago
      officer: "Officer Wilson",
      method: "Upload",
      confidence: "88.9%",
      result: "Success",
      location: "Library",
    },
  ]

  const handleExport = (format: "pdf" | "csv") => {
    if (format === "csv") {
      const headers = ["Timestamp", "Officer", "Method", "Location", "Confidence", "Result"]
      const csvContent = [
        headers.join(","),
        ...verificationHistory.map((record) =>
          [record.timestamp, record.officer, record.method, record.location, record.confidence, record.result].join(
            ",",
          ),
        ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `inmate-${inmateProfile.id}-history.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } else {
      alert(
        `PDF export would generate a comprehensive report for ${inmateProfile.name} including profile details and verification history.`,
      )
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => onNavigate("dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inmate History</h1>
          <p className="text-gray-600">Detailed verification history and profile information</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Inmate Profile */}
        <div className="xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Inmate Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image and Basic Info */}
              <div className="flex flex-col sm:flex-row xl:flex-col gap-6">
                {/* Inmate Image */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 mx-auto sm:mx-0 xl:mx-auto">
                    <img
                      src={inmateProfile.imageUrl || "/placeholder.svg"}
                      alt={`${inmateProfile.name} - Inmate Photo`}
                      className="w-full h-full object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                    />
                  </div>
                </div>

                {/* Basic Information */}
                <div className="flex-1 space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Inmate ID:</span>
                    <p className="font-mono text-lg font-bold text-gray-900">{inmateProfile.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Full Name:</span>
                    <p className="font-semibold text-lg text-gray-900">{inmateProfile.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Legal Status:</span>
                    <div className="mt-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {inmateProfile.legalStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div>
                  <span className="text-sm font-medium text-gray-600">Crime:</span>
                  <p className="text-sm text-gray-900 mt-1">{inmateProfile.crime}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Sentence:</span>
                  <p className="text-sm text-gray-900 mt-1">{inmateProfile.sentence}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Prison:</span>
                  <p className="text-sm text-gray-900 mt-1">{inmateProfile.prison}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Enrollment Date:</span>
                  <p className="text-sm text-gray-900 mt-1 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {inmateProfile.enrollmentDate}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Last Verified:</span>
                  <p className="text-sm text-gray-900 mt-1">{inmateProfile.lastVerified}</p>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{inmateProfile.totalVerifications}</p>
                  <p className="text-xs text-gray-600">Total Verifications</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{inmateProfile.successRate}</p>
                  <p className="text-xs text-gray-600">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Verification History */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Verification History</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Officer</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verificationHistory.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-sm">{record.timestamp}</TableCell>
                        <TableCell>{record.officer}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {record.method}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{record.location}</TableCell>
                        <TableCell>
                          <span
                            className={`font-semibold ${
                              Number.parseFloat(record.confidence) >= 95
                                ? "text-green-600"
                                : Number.parseFloat(record.confidence) >= 90
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {record.confidence}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={record.result === "Success" ? "default" : "destructive"}
                            className={
                              record.result === "Success" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                            }
                          >
                            {record.result}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
