"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, CheckCircle2, Clock, Calendar, Building2, Eye, Upload } from "lucide-react"
import { ProgressReportModal } from "@/components/dashboard/progress-report-modal"

// Static data - only tasks assigned to current worker
const workerTasks = [
  {
    id: 1,
    title: "Foundation Excavation",
    description: "Excavate foundation for building A section. Ensure proper depth and soil compaction.",
    projectName: "Downtown Office Complex",
    projectDescription: "Modern office building construction with 15 floors and underground parking",
    dueDate: "2024-02-15",
    status: "In Progress",
    priority: "High",
    progress: 75,
  },
  {
    id: 3,
    title: "Concrete Pouring",
    description: "Pour concrete for parking structure foundation. Mix ratio: 1:2:3",
    projectName: "Residential Tower A",
    projectDescription: "High-rise residential building with 25 floors and amenities",
    dueDate: "2024-02-10",
    status: "Done",
    priority: "High",
    progress: 100,
  },
  {
    id: 5,
    title: "Steel Framework Installation",
    description: "Install steel framework for floors 3-5. Follow safety protocols.",
    projectName: "Downtown Office Complex",
    projectDescription: "Modern office building construction with 15 floors and underground parking",
    dueDate: "2024-02-25",
    status: "Pending",
    priority: "Medium",
    progress: 0,
  },
]

interface WorkerViewProps {
  currentUser: any
}

export function WorkerView({ currentUser }: WorkerViewProps) {
  const [reportingTask, setReportingTask] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Done":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "In Progress":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "Pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {currentUser.name}! 👷‍♂️</h2>
            <p className="text-orange-100">
              You have {workerTasks.filter((t) => t.status !== "Done").length} active tasks assigned to you.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm text-orange-100 mb-1">Tasks Completed</div>
              <div className="text-2xl font-bold">{workerTasks.filter((t) => t.status === "Done").length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-blue-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Tasks</p>
                <p className="text-3xl font-bold text-gray-900">{workerTasks.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-50">
                <ClipboardList className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-gray-900">
                  {workerTasks.filter((t) => t.status === "In Progress").length}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-yellow-50">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">
                  {workerTasks.filter((t) => t.status === "Done").length}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-green-50">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projects</p>
                <p className="text-3xl font-bold text-gray-900">
                  {new Set(workerTasks.map((t) => t.projectName)).size}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-purple-50">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Tasks Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            My Assigned Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workerTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(task.status)}
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <Badge className={`${getStatusColor(task.status)} border text-xs`}>{task.status}</Badge>
                    <Badge className={`${getPriorityColor(task.priority)} border text-xs`}>{task.priority}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{task.projectName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Due: {task.dueDate}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {task.status !== "Done" && (
                      <Button
                        size="sm"
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => setReportingTask(task)}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Report Progress
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Report Modal */}
      <ProgressReportModal task={reportingTask} open={!!reportingTask} onOpenChange={() => setReportingTask(null)} />
    </div>
  )
}
