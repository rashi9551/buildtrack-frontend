"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog"
import { CreateTaskDialog } from "@/components/dashboard/create-task-dialog"
import { TaskDetailDialog } from "@/components/dashboard/task-detail-dialog"
import {
  Plus,
  Search,
  Building2,
  ClipboardList,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Static data
const projects = [
  {
    id: 1,
    name: "Downtown Office Complex",
    description: "Modern office building construction",
    status: "In Progress",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    progress: 65,
    tasksCount: 12,
    workersCount: 8,
  },
  {
    id: 2,
    name: "Residential Tower A",
    description: "High-rise residential building",
    status: "Planning",
    startDate: "2024-03-01",
    endDate: "2024-12-15",
    progress: 15,
    tasksCount: 8,
    workersCount: 12,
  },
  {
    id: 3,
    name: "Shopping Mall Renovation",
    description: "Complete mall renovation project",
    status: "Completed",
    startDate: "2023-08-01",
    endDate: "2024-01-30",
    progress: 100,
    tasksCount: 15,
    workersCount: 6,
  },
  {
    id: 4,
    name: "Highway Bridge Construction",
    description: "New highway bridge construction",
    status: "In Progress",
    startDate: "2024-02-01",
    endDate: "2024-08-30",
    progress: 40,
    tasksCount: 20,
    workersCount: 15,
  },
]

const tasks = [
  {
    id: 1,
    title: "Foundation Excavation",
    description: "Excavate foundation for building A",
    projectId: 1,
    projectName: "Downtown Office Complex",
    assignedTo: "Mike Johnson",
    assignedToId: 1,
    dueDate: "2024-02-15",
    status: "In Progress",
    priority: "High",
    progress: 75,
  },
  {
    id: 2,
    title: "Electrical Wiring",
    description: "Install electrical systems on floor 2",
    projectId: 1,
    projectName: "Downtown Office Complex",
    assignedTo: "Sarah Wilson",
    assignedToId: 2,
    dueDate: "2024-02-20",
    status: "Pending",
    priority: "Medium",
    progress: 0,
  },
  {
    id: 3,
    title: "Concrete Pouring",
    description: "Pour concrete for parking structure",
    projectId: 2,
    projectName: "Residential Tower A",
    assignedTo: "Mike Johnson",
    assignedToId: 1,
    dueDate: "2024-02-10",
    status: "Done",
    priority: "High",
    progress: 100,
  },
]

interface ManagerDashboardProps {
  currentUser: any
}

export function ManagerDashboard({ currentUser }: ManagerDashboardProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "tasks">("projects")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)

  // Filter and paginate projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status.toLowerCase().replace(" ", "-") === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
      case "Done":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Planning":
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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {currentUser.name}! 👋</h2>
            <p className="text-blue-100">Manage your construction projects and assign tasks to your team.</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm text-blue-100 mb-1">Active Projects</div>
              <div className="text-2xl font-bold">{projects.filter((p) => p.status === "In Progress").length}</div>
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
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-50">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Tasks</p>
                <p className="text-3xl font-bold text-gray-900">{tasks.filter((t) => t.status !== "Done").length}</p>
              </div>
              <div className="p-2 rounded-lg bg-green-50">
                <ClipboardList className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
              </div>
              <div className="p-2 rounded-lg bg-purple-50">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due This Week</p>
                <p className="text-3xl font-bold text-gray-900">6</p>
              </div>
              <div className="p-2 rounded-lg bg-orange-50">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "projects" ? "default" : "ghost"}
          onClick={() => setActiveTab("projects")}
          className="rounded-md"
        >
          <Building2 className="h-4 w-4 mr-2" />
          Projects
        </Button>
        <Button
          variant={activeTab === "tasks" ? "default" : "ghost"}
          onClick={() => setActiveTab("tasks")}
          className="rounded-md"
        >
          <ClipboardList className="h-4 w-4 mr-2" />
          Tasks
        </Button>
      </div>

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Project Management</CardTitle>
              <Button onClick={() => setShowCreateProject(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Projects Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Project</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Progress</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Timeline</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Tasks</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Workers</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProjects.map((project) => (
                    <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{project.name}</p>
                          <p className="text-sm text-gray-500">{project.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${getStatusColor(project.status)} border`}>{project.status}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{project.startDate}</p>
                          <p className="text-gray-500">{project.endDate}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium">{project.tasksCount}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium">{project.workersCount}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProjects.length)} of{" "}
                  {filteredProjects.length} projects
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
            )}
          </CardContent>
        </Card>
      )}

      {/* Tasks Tab */}
      {activeTab === "tasks" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Task Management</CardTitle>
              <Button onClick={() => setShowCreateTask(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge className={`${getStatusColor(task.status)} border text-xs`}>{task.status}</Badge>
                      <Badge className={`${getPriorityColor(task.priority)} border text-xs`}>{task.priority}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900 mb-1">{task.projectName}</p>
                      <p className="text-gray-600">Assigned to: {task.assignedTo}</p>
                      <p className="text-gray-600">Due: {task.dueDate}</p>
                    </div>
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => setSelectedTask(task)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <CreateProjectDialog open={showCreateProject} onOpenChange={setShowCreateProject} />
      <CreateTaskDialog open={showCreateTask} onOpenChange={setShowCreateTask} />
      <TaskDetailDialog task={selectedTask} open={!!selectedTask} onOpenChange={() => setSelectedTask(null)} />
    </div>
  )
}
