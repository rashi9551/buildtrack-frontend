"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, Eye, MoreHorizontal, Calendar, Users, DollarSign, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Enhanced static data
const projects = [
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
]

export function ProjectTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

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

  return (
    <div className="space-y-6">
      {/* Enhanced Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-1 max-w-md">
          <Input
            placeholder="Search projects or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="flex gap-2">
          {["all", "planning", "in progress", "completed"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold">Project</TableHead>
              <TableHead className="font-semibold">Manager</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Progress</TableHead>
              <TableHead className="font-semibold">Timeline</TableHead>
              <TableHead className="font-semibold">Team</TableHead>
              <TableHead className="font-semibold">Budget</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id} className="hover:bg-gray-50 transition-colors">
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900">{project.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {project.location}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
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
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Badge className={`${getStatusColor(project.status)} border`}>{project.status}</Badge>
                    <Badge className={`${getPriorityColor(project.priority)} border text-xs`}>{project.priority}</Badge>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm">
                    <p className="text-gray-900">{project.startDate}</p>
                    <p className="text-gray-500">{project.endDate}</p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{project.workers}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{project.budget}</span>
                  </div>
                </TableCell>

                <TableCell>
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
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
