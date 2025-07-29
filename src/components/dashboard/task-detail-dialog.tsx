"use client"

import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, User, Building2, Clock, Flag, FileText } from "lucide-react"

interface TaskDetailDialogProps {
  task: any
  open: boolean
  onOpenChange: (open: boolean) => void
  userRole: "manager" | "worker"
}

export function TaskDetailDialog({ task, open, onOpenChange, userRole }: TaskDetailDialogProps) {
  if (!task) return null

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Task Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Header */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
            <div className="flex gap-2">
              <Badge className={`${getStatusColor(task.status)} border`}>{task.status}</Badge>
              <Badge className={`${getPriorityColor(task.priority)} border`}>{task.priority}</Badge>
            </div>
          </div>

          {/* Task Description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Description</h3>
            <p className="text-gray-600 leading-relaxed">{task.description}</p>
          </div>

          {/* Project Information */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Project Information
            </h3>
            <div className="space-y-2">
              <p className="font-medium text-gray-900">{task.projectName}</p>
              {task.projectDescription && <p className="text-sm text-gray-600">{task.projectDescription}</p>}
            </div>
          </div>

          {/* Task Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {userRole === "manager" && (
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Assigned to</p>
                    <p className="font-medium text-gray-900">{task.assignedTo}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="font-medium text-gray-900">{task.dueDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Flag className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Priority</p>
                  <p className="font-medium text-gray-900">{task.priority}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-medium text-gray-900">{task.createdDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Completion</span>
                <span className="font-medium">{task.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Last Update */}
          {task.lastUpdate && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Last updated: <span className="font-medium">{task.lastUpdate}</span>
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
