"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { month: "Jan", leads: 65, revenue: 24000, conversions: 12 },
  { month: "Feb", leads: 78, revenue: 28500, conversions: 15 },
  { month: "Mar", leads: 90, revenue: 31200, conversions: 17 },
  { month: "Apr", leads: 105, revenue: 36800, conversions: 22 },
  { month: "May", leads: 95, revenue: 32500, conversions: 19 },
  { month: "Jun", leads: 110, revenue: 42000, conversions: 25 },
  { month: "Jul", leads: 120, revenue: 45600, conversions: 27 },
  { month: "Aug", leads: 135, revenue: 51000, conversions: 30 },
  { month: "Sep", leads: 125, revenue: 47500, conversions: 28 },
  { month: "Oct", leads: 140, revenue: 53200, conversions: 32 },
  { month: "Nov", leads: 155, revenue: 58900, conversions: 35 },
  { month: "Dec", leads: 170, revenue: 64600, conversions: 38 },
]

export default function AdminDashboardCharts() {
  return (
    <Tabs defaultValue="revenue">
      <TabsList className="mb-4">
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
        <TabsTrigger value="leads">Leads</TabsTrigger>
        <TabsTrigger value="conversions">Conversions</TabsTrigger>
      </TabsList>

      <TabsContent value="revenue" className="h-[300px]">
        <Chart>
          <ChartLegend className="mb-2">
            <ChartLegendItem name="Revenue" color="#6482AD" />
          </ChartLegend>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6482AD" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6482AD" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltip>
                          <ChartTooltipContent>
                            <div className="font-medium">{payload[0].payload.month}</div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-[#6482AD] mr-2" />
                              <span className="font-medium">${payload[0].value.toLocaleString()}</span>
                            </div>
                          </ChartTooltipContent>
                        </ChartTooltip>
                      )
                    }
                    return null
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6482AD" strokeWidth={2} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Chart>
      </TabsContent>

      <TabsContent value="leads" className="h-[300px]">
        <Chart>
          <ChartLegend className="mb-2">
            <ChartLegendItem name="Leads" color="#6482AD" />
          </ChartLegend>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltip>
                          <ChartTooltipContent>
                            <div className="font-medium">{payload[0].payload.month}</div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-[#6482AD] mr-2" />
                              <span className="font-medium">{payload[0].value} leads</span>
                            </div>
                          </ChartTooltipContent>
                        </ChartTooltip>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="leads" fill="#6482AD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Chart>
      </TabsContent>

      <TabsContent value="conversions" className="h-[300px]">
        <Chart>
          <ChartLegend className="mb-2">
            <ChartLegendItem name="Conversions" color="#6482AD" />
          </ChartLegend>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltip>
                          <ChartTooltipContent>
                            <div className="font-medium">{payload[0].payload.month}</div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-[#6482AD] mr-2" />
                              <span className="font-medium">{payload[0].value}% conversion rate</span>
                            </div>
                          </ChartTooltipContent>
                        </ChartTooltip>
                      )
                    }
                    return null
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke="#6482AD"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#6482AD" }}
                  activeDot={{ r: 6, fill: "#6482AD" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Chart>
      </TabsContent>
    </Tabs>
  )
}

