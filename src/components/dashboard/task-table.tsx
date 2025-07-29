"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit } from "lucide-react"

// Static data
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
  },
]

interface TaskTableProps {
  role: "manager" | "worker"
  currentUserId?: number
}

export function TaskTable({ role, currentUserId }: TaskTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter tasks based on role
  const tasks =
    role === "worker" && currentUserId ? allTasks.filter((task) => task.assignedToId === currentUserId) : allTasks

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Project</TableHead>
            {role === "manager" && <TableHead>Assigned To</TableHead>}
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-500">{task.description}</p>
                </div>
              </TableCell>
              <TableCell>{task.project}</TableCell>
              {role === "manager" && <TableCell>{task.assignedTo}</TableCell>}
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {role === "worker" && (
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
