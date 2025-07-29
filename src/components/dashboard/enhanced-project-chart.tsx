"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BarChart3 } from "lucide-react"

export function EnhancedProjectChart() {
  const chartData = [
    { name: "Completed", value: 35, color: "#10b981", count: 7 },
    { name: "In Progress", value: 45, color: "#3b82f6", count: 9 },
    { name: "Planning", value: 20, color: "#f59e0b", count: 4 },
  ]

  const totalProjects = chartData.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="p-1 bg-blue-100 rounded-md">
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </div>
          Project Status Overview
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12% this month
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            {chartData.map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{item.count}</div>
                <div className="text-sm text-gray-600">{item.name}</div>
              </div>
            ))}
          </div>

          {/* Progress Bars */}
          <div className="space-y-4">
            {chartData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{item.count} projects</span>
                    <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Summary */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Total Projects</span>
              <span className="text-lg font-bold text-gray-900">{totalProjects}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
