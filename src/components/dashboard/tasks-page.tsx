"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ProgressUploadForm } from "@/components/dashboard/progress-upload-form"
import {
  Plus,
  Search,
  Eye,
  Edit,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Enhanced task data
const allTasks = [
  {
    id: 1,
    title: "Foundation Excavation",
    description: "Excavate foundation for building A",
    project: "Downtown Office Complex",
    assignedTo: "Mike Johnson",
    assignedToId: 1,
    dueDate: "2024-02-15",
    status: "In Progress",
    priority: "High",
    progress: 75,
    createdDate: "2024-01-20",
  },
  {
    id: 2,
    title: "Electrical Wiring",
    description: "Install electrical systems on floor 2",
    project: "Downtown Office Complex",
    assignedTo: "Sarah Wilson",
    assignedToId: 2,
    dueDate: "2024-02-20",
    status: "Pending",
    priority: "Medium",
    progress: 0,
    createdDate: "2024-01-22",
  },
  {
    id: 3,
    title: "Concrete Pouring",
    description: "Pour concrete for parking structure",
    project: "Residential Tower A",
    assignedTo: "Mike Johnson",
    assignedToId: 1,
    dueDate: "2024-02-10",
    status: "Completed",
    priority: "High",
    progress: 100,
    createdDate: "2024-01-15",
  },
  {
    id: 4,
    title: "Plumbing Installation",
    description: "Install plumbing systems",
    project: "Shopping Mall Renovation",
    assignedTo: "John Smith",
    assignedToId: 3,
    dueDate: "2024-02-25",
    status: "In Progress",
    priority: "Low",
    progress: 45,
    createdDate: "2024-01-25",
  },
  {
    id: 5,
    title: "Roofing Work",
    description: "Install roofing materials and waterproofing",
    project: "Highway Bridge Construction",
    assignedTo: "David Brown",
    assignedToId: 4,
    dueDate: "2024-03-01",
    status: "Pending",
    priority: "Medium",
    progress: 0,
    createdDate: "2024-01-28",
  },
  {
    id: 6,
    title: "Interior Painting",
    description: "Paint interior walls and ceilings",
    project: "City Park Pavilion",
    assignedTo: "Lisa Garcia",
    assignedToId: 5,
    dueDate: "2024-02-28",
    status: "In Progress",
    priority: "Low",
    progress: 60,
    createdDate: "2024-01-30",
  },
]

interface TasksPageProps {
  currentUser: any
}

export function TasksPage({ currentUser }: TasksPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [selectedTask, setSelectedTask] = useState<any>(null)

  // Filter tasks based on role
  const userTasks =
    currentUser.role === "worker" ? allTasks.filter((task) => task.assignedToId === currentUser.id) : allTasks

  // Apply filters
  const filteredTasks = userTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || task.status.toLowerCase().replace(" ", "-") === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority.toLowerCase() === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTasks = filteredTasks.slice(startIndex, endIndex)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
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
      case "Completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "Pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {currentUser.role === "worker" ? "My Tasks" : "All Tasks"}
          </h1>
          <p className="text-gray-600 mt-1">
            {currentUser.role === "worker"
              ? "View and manage your assigned tasks"
              : "Monitor and assign tasks across all projects"}
          </p>
        </div>
        {currentUser.role === "manager" && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tasks, projects, or assignees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 per page</SelectItem>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{task.title}</CardTitle>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                </div>
                {getStatusIcon(task.status)}
              </div>

              <div className="flex gap-2 mb-3">
                <Badge className={`${getStatusColor(task.status)} border text-xs`}>{task.status}</Badge>
                <Badge className={`${getPriorityColor(task.priority)} border text-xs`}>{task.priority}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900 mb-1">{task.project}</p>
              </div>

              {currentUser.role === "manager" && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{task.assignedTo}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Due: {task.dueDate}</span>
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
                  View
                </Button>
                {currentUser.role === "worker" && (
                  <Button size="sm" className="flex-1" onClick={() => setSelectedTask(task)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Update
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredTasks.length)} of {filteredTasks.length} tasks
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Upload Modal for Workers */}
      {currentUser.role === "worker" && selectedTask && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Update Task Progress - {selectedTask.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressUploadForm task={selectedTask} onClose={() => setSelectedTask(null)} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
