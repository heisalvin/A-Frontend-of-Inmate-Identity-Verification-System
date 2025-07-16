"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, Camera, CheckCircle, XCircle, TrendingUp, Users } from "lucide-react"
import type { Page } from "@/app/page"
import { ActivityFeed } from "./activity-feed"

interface DashboardProps {
  onNavigate: (page: Page) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    {
      title: "Total Verifications",
      value: "1,247",
      change: "+12%",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "Successful Matches",
      value: "1,189",
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Failed Matches",
      value: "58",
      change: "-3%",
      icon: XCircle,
      color: "text-red-600",
    },
    {
      title: "Total Inmates",
      value: "2,456",
      change: "+2%",
      icon: Users,
      color: "text-purple-600",
    },
  ]

  const recentVerifications = [
    {
      inmateId: "INM-2024-001",
      name: "John Smith",
      result: "Success",
      confidence: "98.5%",
      timestamp: "2024-01-15 14:30:22",
      officer: "Officer Johnson",
    },
    {
      inmateId: "INM-2024-002",
      name: "Michael Brown",
      result: "Success",
      confidence: "96.2%",
      timestamp: "2024-01-15 14:25:15",
      officer: "Officer Davis",
    },
    {
      inmateId: "INM-2024-003",
      name: "Unknown",
      result: "Failed",
      confidence: "45.1%",
      timestamp: "2024-01-15 14:20:08",
      officer: "Officer Wilson",
    },
    {
      inmateId: "INM-2024-004",
      name: "Robert Johnson",
      result: "Success",
      confidence: "97.8%",
      timestamp: "2024-01-15 14:15:33",
      officer: "Officer Johnson",
    },
    {
      inmateId: "INM-2024-005",
      name: "David Wilson",
      result: "Success",
      confidence: "94.7%",
      timestamp: "2024-01-15 14:10:45",
      officer: "Officer Smith",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Officer Johnson</h2>
        <p className="text-blue-100 mb-4">Monitor and manage inmate verification activities from your dashboard.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => onNavigate("verify")}
            className="bg-white text-blue-600 hover:bg-gray-100 flex items-center space-x-2"
          >
            <Camera className="h-4 w-4" />
            <span>Verify Inmate</span>
          </Button>
          <Button
            onClick={() => onNavigate("enroll")}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-600 flex items-center space-x-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Enroll Inmate</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Verifications */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Verifications
                <Button variant="outline" size="sm" onClick={() => onNavigate("logs")}>
                  View All Logs
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Inmate ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Officer</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentVerifications.map((verification, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{verification.inmateId}</TableCell>
                        <TableCell>{verification.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant={verification.result === "Success" ? "default" : "destructive"}
                            className={
                              verification.result === "Success" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                            }
                          >
                            {verification.result}
                          </Badge>
                        </TableCell>
                        <TableCell>{verification.confidence}</TableCell>
                        <TableCell>{verification.officer}</TableCell>
                        <TableCell className="text-sm text-gray-500">{new Date().toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
