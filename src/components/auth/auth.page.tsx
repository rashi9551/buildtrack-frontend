"use client"

import { useState } from "react"
import { AuthForm } from "@/components/auth/auth-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, ClipboardList, Camera } from "lucide-react"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">BuildTrack</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your construction projects with our comprehensive management system
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features Section */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Team Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Manage project managers and site workers efficiently</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <ClipboardList className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Task Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Assign and track tasks with real-time updates</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Building2 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Project Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Complete visibility into all your construction projects</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Camera className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Progress Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Visual progress tracking with photo uploads</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Auth Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="flex rounded-lg bg-gray-100 p-1 mb-4">
                  <Button
                    variant={!isSignUp ? "default" : "ghost"}
                    className="flex-1 rounded-md"
                    onClick={() => setIsSignUp(false)}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant={isSignUp ? "default" : "ghost"}
                    className="flex-1 rounded-md"
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign Up
                  </Button>
                </div>
                <CardTitle className="text-2xl">{isSignUp ? "Create Account" : "Welcome Back"}</CardTitle>
                <CardDescription>
                  {isSignUp
                    ? "Sign up to start managing your construction projects"
                    : "Sign in to access your construction projects"}
                </CardDescription>
              </CardHeader>
              <CardContent>
            <AuthForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
