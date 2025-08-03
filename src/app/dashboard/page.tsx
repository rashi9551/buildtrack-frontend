"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, LogOut, Bell, UserCog, HardHat } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProjectManagerDashboard } from "@/components/dashboard/project-manager-dashboard"
import { SiteWorkerDashboard } from "@/components/dashboard/site-worker-dashboard"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useMutation } from "@apollo/client"
import { GOOGLE_LOGIN_MUTATION } from "@/graphql/mutations"

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<"manager" | "worker">("manager")
    const [hasGreeted, setHasGreeted] = useState(false);
    const [googleLogin, { loading, error }] = useMutation(GOOGLE_LOGIN_MUTATION);

  const { data: session, status } = useSession()
  const router = useRouter()


useEffect(() => {
  const url = new URL(window.location.href);
  const justSignedIn = url.searchParams.get("justSignedIn");

  const loginIfNeeded = async () => {
    if (
      status === "authenticated" &&
      justSignedIn &&
      session.user &&
      session.user.email &&
      !hasGreeted
    ) {
      try {
        const { data } = await googleLogin({
          variables: { email: session.user.email },
          fetchPolicy: "no-cache",
        });

        const token = data?.googleLogin?.token;
        if (token) {
          localStorage.setItem("token", token);
          toast.success(`Welcome back, ${session.user.name ?? session.user.email}! 🎉`);
        } else {
          toast.error("No account found in BuildTrack");
        }

        setHasGreeted(true);
        url.searchParams.delete("justSignedIn");
        window.history.replaceState({}, document.title, url.pathname);
      } catch (error) {
        console.error("Login mutation failed:", error);
        toast.error("Login failed");
      }
    }
  };

  loginIfNeeded();
}, [status, session, hasGreeted, googleLogin]);

  const currentUser = {
    id: userRole === "manager" ? 1 : 2,
    name: userRole === "manager" ? "John Manager" : "Mike Worker",
    email: userRole === "manager" ? "john@buildtrack.com" : "mike@buildtrack.com",
    role: userRole,
    avatar: "/placeholder.svg?height=40&width=40",
  }

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
              <p className="text-xs text-gray-500">Construction Management System</p>
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
                      <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                      Project Manager
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-orange-500 rounded-full inline-block"></span>
                      Site Worker
                    </>
                  )}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-600"
              onClick={() => {signOut({ callbackUrl: "/" }); localStorage.removeItem('token')} }
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 lg:p-8">
        {/* Demo Role Switcher */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
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

        {/* Role-based Dashboard */}
        {userRole === "manager" ? (
          <ProjectManagerDashboard currentUser={currentUser} />
        ) : (
          <SiteWorkerDashboard currentUser={currentUser} />
        )}
      </main>
    </div>
  )
}
