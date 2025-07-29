"use client"

import type { ReactNode } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, LogOut, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DashboardLayoutProps {
  children: ReactNode
  currentUser: {
    id: number
    name: string
    email: string
    role: string
    avatar?: string
  }
}

export function DashboardLayout({ children, currentUser }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BuildTrack</h1>
              <p className="text-xs text-gray-500">Construction Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                3
              </Badge>
            </Button>

            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-gray-500 capitalize flex items-center gap-1">
                  {currentUser.role === "manager" ? (
                    <>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Project Manager
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Site Worker
                    </>
                  )}
                </p>
              </div>
            </div>

            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 lg:p-8">{children}</main>
    </div>
  )
}
