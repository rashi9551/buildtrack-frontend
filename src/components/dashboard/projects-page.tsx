"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog"
import { EditProjectDialog } from "@/components/dashboard/edit-project-dialog"
import { DeleteProjectDialog } from "@/components/dashboard/delete-project-dialog"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Calendar,
  Users,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Enhanced static data with more projects for pagination
const allProjects = [
  {
    id: 1,
    name: "Downtown Office Complex",
    status: "In Progress",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    progress: 65,
    manager: "John Doe",
    managerAvatar: "/placeholder.svg?height=32&width=32",
    workers: 8,
    budget: "$2.5M",
    priority: "High",
    location: "Downtown District",
  },
  {
    id: 2,
    name: "Residential Tower A",
    status: "Planning",
    startDate: "2024-03-01",
    endDate: "2024-12-15",
    progress: 15,
    manager: "Jane Smith",
    managerAvatar: "/placeholder.svg?height=32&width=32",
    workers: 12,
    budget: "$4.2M",
    priority: "Medium",
    location: "North Side",
  },
  {
    id: 3,
    name: "Shopping Mall Renovation",
    status: "Completed",
    startDate: "2023-08-01",
    endDate: "2024-01-30",
    progress: 100,
    manager: "Mike Johnson",
    managerAvatar: "/placeholder.svg?height=32&width=32",
    workers: 6,
    budget: "$1.8M",
    priority: "Low",
    location: "West End",
  },
  {
    id: 4,
    name: "Highway Bridge Construction",
    status: "In Progress",
    startDate: "2024-02-01",
    endDate: "2024-08-30",
    progress: 40,
    manager: "Sarah Wilson",
    managerAvatar: "/placeholder.svg?height=32&width=32",
    workers: 15,
    budget: "$6.1M",
    priority: "High",
    location: "Highway 101",
  },
  {
    id: 5,
    name: "City Park Pavilion",
    status: "Planning",
    startDate: "2024-04-01",
    endDate: "2024-09-15",
    progress: 5,
    manager: "David Brown",
    managerAvatar: "/placeholder.svg?height=32&width=32",
    workers: 4,
    budget: "$800K",
    priority: "Low",
    location: "Central Park",
  },
  {
    id: 6,
    name: "Industrial Warehouse",
    status: "In Progress",
    startDate: "2024-01-20",
    endDate: "2024-07-20",
    progress: 55,
    manager: "Lisa Garcia",
    managerAvatar: "/placeholder.svg?height=32&width=32",
    workers: 10,
    budget: "$3.2M",
    priority: "Medium",
    location: "Industrial Zone",
  },
  {
    id: 7,
    name: "School Renovation",
    status: "Completed",
    startDate: "2023-09-01",
    endDate: "2024-02-28",
    progress: 100,
    manager: "Robert Lee",
    managerAvatar: "/placeholder.svg?height=32&width=32",
    workers: 8,
    budget: "$2.1M",
    priority: "High",
    location: "Education District",
  },
  {
    id: 8,
    name: "Medical Center Extension",
    status: "In Progress",
    startDate: "2024-02-15",
    endDate: "2024-10-30",
    progress: 30,
    manager: "Emily Chen",
    managerAvatar: "/placeholder.svg?height=32&width=32",
    workers: 18,
    budget: "$5.5M",
    priority: "High",
    location: "Medical District",
  },
]

interface ProjectsPageProps {
  currentUser: any
}

export function ProjectsPage({ currentUser }: ProjectsPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [deletingProject, setDeletingProject] = useState<any>(null)

  // Filter projects
  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.manager.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || project.status.toLowerCase().replace(" ", "-") === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority.toLowerCase() === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Planning":
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

  const handleEdit = (project: any) => {
    setEditingProject(project)
  }

  const handleDelete = (project: any) => {
    setDeletingProject(project)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage and track all your construction projects</p>
        </div>
        {currentUser.role === "manager" && (
          <Button onClick={() => setShowCreateProject(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        )}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search projects, locations, or managers..."
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
                  <SelectItem value="planning">Planning</SelectItem>
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

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Projects ({filteredProjects.length})</span>
            <Badge variant="secondary">
              Page {currentPage} of {totalPages}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Project</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Manager</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Progress</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Timeline</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Team</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Budget</th>
                  {currentUser.role === "manager" && (
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentProjects.map((project) => (
                  <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{project.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {project.location}
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={project.managerAvatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {project.manager
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{project.manager}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Badge className={`${getStatusColor(project.status)} border`}>{project.status}</Badge>
                        <Badge className={`${getPriorityColor(project.priority)} border text-xs`}>
                          {project.priority}
                        </Badge>
                      </div>
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
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">{project.workers}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">{project.budget}</span>
                      </div>
                    </td>

                    {currentUser.role === "manager" && (
                      <td className="py-4 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(project)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(project)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length}{" "}
              projects
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
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
                  onClick={() => handlePageChange(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateProjectDialog open={showCreateProject} onOpenChange={setShowCreateProject} />
      <EditProjectDialog
        project={editingProject}
        open={!!editingProject}
        onOpenChange={() => setEditingProject(null)}
      />
      <DeleteProjectDialog
        project={deletingProject}
        open={!!deletingProject}
        onOpenChange={() => setDeletingProject(null)}
      />
    </div>
  )
}
