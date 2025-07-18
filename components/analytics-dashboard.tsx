"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"

// Mock Data for Analytics
const ageDistributionData = [
  { name: "18-30", value: 31, color: "hsl(210 40% 96.1%)" }, // Light blue
  { name: "31-45", value: 31, color: "hsl(210 40% 80%)" }, // Medium blue
  { name: "46-60", value: 24, color: "hsl(210 40% 60%)" }, // Darker blue
  { name: "60+", value: 14, color: "hsl(210 40% 40%)" }, // Even darker blue
]

const crimesCommittedData = [
  { name: "Burglary", value: 150 },
  { name: "Assault", value: 120 },
  { name: "Fraud", value: 90 },
  { name: "Drug Offense", value: 70 },
  { name: "Theft", value: 60 },
  { name: "Other", value: 40 },
]

const legalStatusData = [
  { name: "Convicted", value: 55, color: "hsl(210 40% 60%)" },
  { name: "Awaiting Trial", value: 27, color: "hsl(210 40% 80%)" },
  { name: "Paroled", value: 18, color: "hsl(210 40% 96.1%)" },
]

const sentenceDurationData = [
  { name: "< 5 years", value: 200 },
  { name: "5-10 years", value: 150 },
  { name: "10-20 years", value: 100 },
  { name: "> 20 years", value: 70 },
  { name: "Life", value: 30 },
]

const prisonDistributionData = [
  { name: "Kumasi", May: 120, Jun: 150, Jul: 130, Aug: 180 },
  { name: "Accra", May: 100, Jun: 110, Jul: 105, Aug: 140 },
  { name: "Tamale", May: 80, Jun: 90, Jul: 85, Aug: 110 },
  { name: "Sunyani", May: 60, Jun: 70, Jul: 65, Aug: 90 },
]

const verificationTrendData = [
  { month: "Jan", verifications: 120 },
  { month: "Feb", verifications: 150 },
  { month: "Mar", verifications: 130 },
  { month: "Apr", verifications: 180 },
  { month: "May", verifications: 160 },
  { month: "Jun", verifications: 200 },
  { month: "Jul", verifications: 190 },
  { month: "Aug", verifications: 220 },
]

export function AnalyticsDashboard() {
  const COLORS_AGE = ["hsl(210 40% 96.1%)", "hsl(210 40% 80%)", "hsl(210 40% 60%)", "hsl(210 40% 40%)"]
  const COLORS_LEGAL = ["hsl(210 40% 60%)", "hsl(210 40% 80%)", "hsl(210 40% 96.1%)"]
  const COLORS_VERIFICATION = ["hsl(210 40% 60%)", "hsl(0 84.2% 60.2%)"] // Blue for success, Red for failed

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer
              config={{
                "18-30": { label: "18-30", color: COLORS_AGE[0] },
                "31-45": { label: "31-45", color: COLORS_AGE[1] },
                "46-60": { label: "46-60", color: COLORS_AGE[2] },
                "60+": { label: "60+", color: COLORS_AGE[3] },
              }}
              className="h-[200px] w-full"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <Pie
                  data={ageDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {ageDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_AGE[index % COLORS_AGE.length]} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Crimes Committed */}
        <Card>
          <CardHeader>
            <CardTitle>Crimes Committed</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Count", color: "hsl(210 40% 60%)" },
              }}
              className="h-[200px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={crimesCommittedData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={100} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="hsl(210 40% 60%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Legal Status */}
        <Card>
          <CardHeader>
            <CardTitle>Legal Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer
              config={{
                Convicted: { label: "Convicted", color: COLORS_LEGAL[0] },
                "Awaiting Trial": { label: "Awaiting Trial", color: COLORS_LEGAL[1] },
                Paroled: { label: "Paroled", color: COLORS_LEGAL[2] },
              }}
              className="h-[200px] w-full"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <Pie
                  data={legalStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {legalStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_LEGAL[index % COLORS_LEGAL.length]} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Sentence Duration */}
        <Card>
          <CardHeader>
            <CardTitle>Sentence Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Count", color: "hsl(210 40% 60%)" },
              }}
              className="h-[200px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sentenceDurationData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={100} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="hsl(210 40% 60%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Prison Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Prison Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                Kumasi: { label: "Kumasi", color: "hsl(210 40% 60%)" },
                Accra: { label: "Accra", color: "hsl(210 40% 70%)" },
                Tamale: { label: "Tamale", color: "hsl(210 40% 80%)" },
                Sunyani: { label: "Sunyani", color: "hsl(210 40% 90%)" },
                trend: { label: "Trend", color: "hsl(210 40% 40%)" },
              }}
              className="h-[200px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prisonDistributionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="May" fill="hsl(210 40% 60%)" name="May" />
                  <Bar dataKey="Jun" fill="hsl(210 40% 70%)" name="Jun" />
                  <Bar dataKey="Jul" fill="hsl(210 40% 80%)" name="Jul" />
                  <Bar dataKey="Aug" fill="hsl(210 40% 90%)" name="Aug" />
                  <Line type="monotone" dataKey="Aug" stroke="hsl(210 40% 40%)" name="Aug Trend" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Verifications */}
        <Card>
          <CardHeader>
            <CardTitle>Verifications</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-4 w-full">
              <div className="text-4xl font-bold text-blue-600">72%</div>
              <div className="flex-1 h-[60px]">
                <ChartContainer
                  config={{
                    verifications: { label: "Verifications", color: "hsl(210 40% 60%)" },
                  }}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={verificationTrendData}>
                      <Line type="monotone" dataKey="verifications" stroke="hsl(210 40% 60%)" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
            <div className="flex justify-around w-full">
              <ChartContainer
                config={{
                  Successful: { label: "Successful", color: COLORS_VERIFICATION[0] },
                  Failed: { label: "Failed", color: COLORS_VERIFICATION[1] },
                }}
                className="h-[100px] w-[100px]"
              >
                <PieChart>
                  <Pie
                    data={[{ name: "Successful", value: 72 }]}
                    cx="50%"
                    cy="50%"
                    outerRadius={40}
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    <Cell fill={COLORS_VERIFICATION[0]} />
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                </PieChart>
                <div className="text-center text-sm mt-2">Successful</div>
              </ChartContainer>
              <ChartContainer
                config={{
                  Successful: { label: "Successful", color: COLORS_VERIFICATION[0] },
                  Failed: { label: "Failed", color: COLORS_VERIFICATION[1] },
                }}
                className="h-[100px] w-[100px]"
              >
                <PieChart>
                  <Pie
                    data={[{ name: "Failed", value: 28 }]}
                    cx="50%"
                    cy="50%"
                    outerRadius={40}
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    <Cell fill={COLORS_VERIFICATION[1]} />
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                </PieChart>
                <div className="text-center text-sm mt-2">Failed</div>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
