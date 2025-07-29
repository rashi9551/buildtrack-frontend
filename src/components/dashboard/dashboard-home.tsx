"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { EnhancedProjectChart } from "@/components/dashboard/enhanced-project-chart"
import { UserCog, HardHat, Clock, CheckCircle2, AlertTriangle, Users, Plus } from "lucide-react"

interface DashboardHomeProps {
  currentUser: any
  userRole: "manager" | "worker"
  setUserRole: (role: "manager" | "worker") => void
}

export function DashboardHome({ currentUser, userRole, setUserRole }: DashboardHomeProps) {
  const recentActivities = [
    {
      id: 1,
      type: "task_completed",
      message: "Foundation Work completed by Mike Johnson",
      time: "2 hours ago",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      type: "project_created",
      message: "New project 'Office Complex' created",
      time: "4 hours ago",
      icon: Plus,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: 3,
      type: "task_overdue",
      message: "Electrical Work is overdue",
      time: "6 hours ago",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      id: 4,
      type: "team_update",
      message: "3 new team members joined",
      time: "1 day ago",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Role Switcher */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserCog className="h-5 w-5 text-blue-600" />
            </div>
            Demo Role Switcher
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              variant={userRole === "manager" ? "default" : "outline"}
              onClick={() => setUserRole("manager")}
              className={`flex items-center gap-2 transition-all duration-200 ${
                userRole === "manager"
                  ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
                  : "hover:bg-blue-50 hover:border-blue-300"
              }`}
            >
              <UserCog className="h-4 w-4" />
              Project Manager
              {userRole === "manager" && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </Button>
            <Button
              variant={userRole === "worker" ? "default" : "outline"}
              onClick={() => setUserRole("worker")}
              className={`flex items-center gap-2 transition-all duration-200 ${
                userRole === "worker"
                  ? "bg-orange-600 hover:bg-orange-700 shadow-lg"
                  : "hover:bg-orange-50 hover:border-orange-300"
              }`}
            >
              <HardHat className="h-4 w-4" />
              Site Worker
              {userRole === "worker" && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Good morning, {currentUser.name}! 👋</h2>
            <p className="text-blue-100">
              {userRole === "manager"
                ? "You have 6 tasks due today and 3 projects need your attention."
                : "You have 3 tasks assigned and 1 report pending submission."}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm text-blue-100 mb-1">Today's Progress</div>
              <div className="text-2xl font-bold">73%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards role={userRole} />

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EnhancedProjectChart />
        </div>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <div className="p-1 bg-blue-100 rounded-md">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-full ${activity.bgColor}`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
