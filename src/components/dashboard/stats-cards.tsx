"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, ClipboardList, Users, CheckCircle, TrendingUp, Clock, AlertTriangle, Target } from "lucide-react"

interface StatsCardsProps {
  role: "manager" | "worker"
}

export function StatsCards({ role }: StatsCardsProps) {
  const managerStats = [
    {
      title: "Total Projects",
      value: "12",
      change: "+2 this month",
      trend: "up",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Active Tasks",
      value: "48",
      change: "6 due today",
      trend: "neutral",
      icon: ClipboardList,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Team Members",
      value: "24",
      change: "3 online now",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5% vs last month",
      trend: "up",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ]

  const workerStats = [
    {
      title: "My Tasks",
      value: "8",
      change: "2 due today",
      trend: "neutral",
      icon: ClipboardList,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "In Progress",
      value: "3",
      change: "Started this week",
      trend: "up",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      title: "Completed",
      value: "23",
      change: "+4 this week",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Reports Submitted",
      value: "15",
      change: "Last: 2 hours ago",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ]

  const stats = role === "manager" ? managerStats : workerStats

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`${stat.borderColor} border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`text-xs ${
                  stat.trend === "up"
                    ? "bg-green-100 text-green-700"
                    : stat.trend === "down"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {stat.trend === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
                {stat.trend === "down" && <AlertTriangle className="h-3 w-3 mr-1" />}
                {stat.change}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
