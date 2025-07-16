"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock } from "lucide-react"

interface ActivityItem {
  id: string
  type: "verification" | "enrollment" | "system"
  message: string
  timestamp: string
  status: "success" | "failed" | "info"
  officer?: string
  inmateId?: string
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([])

  const generateMockActivity = (): ActivityItem => {
    const officers = ["Officer Kwabena", "Officer Akosua", "Officer Johnson", "Officer Davis"]
    const inmateIds = ["I231", "I445", "I892", "I156", "I723"]
    const locations = ["Main Gate", "Cafeteria", "Recreation Area", "Medical Wing", "Visitor Center"]

    const activityTypes = [
      {
        type: "verification" as const,
        status: Math.random() > 0.2 ? ("success" as const) : ("failed" as const),
        getMessage: (officer: string, inmateId: string, location: string, status: string) =>
          `Inmate ${inmateId} ${status === "success" ? "verified" : "verification failed"} at ${location} by ${officer}`,
      },
      {
        type: "enrollment" as const,
        status: "success" as const,
        getMessage: (officer: string, inmateId: string) => `New inmate ${inmateId} enrolled by ${officer}`,
      },
      {
        type: "system" as const,
        status: "info" as const,
        getMessage: () => {
          const count = Math.floor(Math.random() * 10) + 1
          return `${count} successful verification${count > 1 ? "s" : ""} completed today`
        },
      },
    ]

    const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)]
    const officer = officers[Math.floor(Math.random() * officers.length)]
    const inmateId = inmateIds[Math.floor(Math.random() * inmateIds.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]

    return {
      id: Date.now().toString() + Math.random(),
      type: randomType.type,
      message: randomType.getMessage(officer, inmateId, location, randomType.status),
      timestamp: new Date().toLocaleTimeString(),
      status: randomType.status,
      officer: randomType.type !== "system" ? officer : undefined,
      inmateId: randomType.type !== "system" ? inmateId : undefined,
    }
  }

  useEffect(() => {
    // Initialize with some activities
    const initialActivities = Array.from({ length: 5 }, () => generateMockActivity())
    setActivities(initialActivities)

    // Add new activity every 10-15 seconds
    const interval = setInterval(
      () => {
        const newActivity = generateMockActivity()
        setActivities((prev) => [newActivity, ...prev.slice(0, 9)]) // Keep only last 10
      },
      Math.random() * 5000 + 10000,
    ) // 10-15 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "info":
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "info":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Live Activity Feed</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 mt-0.5">{getStatusIcon(activity.status)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
