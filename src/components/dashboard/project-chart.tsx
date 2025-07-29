"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProjectChart() {
  // Static data for the chart
  const chartData = [
    { name: "Completed", value: 35, color: "#10b981" },
    { name: "In Progress", value: 45, color: "#3b82f6" },
    { name: "Planning", value: 20, color: "#f59e0b" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
