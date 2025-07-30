"use client"
import type React from "react"
import { useMutation } from "@apollo/client"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { Github, Mail, Lock, User } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { SIGNUP_MUTATION } from "@/graphql/mutations"
import { useRouter, useSearchParams } from "next/navigation"

interface AuthFormProps {
  isSignUp: boolean,
  setIsSignUp:any
}

export function AuthForm({ isSignUp , setIsSignUp}: AuthFormProps) {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const router = useRouter()

  useEffect(() => {
    if (error === "UserNotFound") {
      toast.error("User not found. Please sign up first.")
      // Remove error param
      const params = new URLSearchParams(window.location.search)
      params.delete("error")
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false })
    } else if (error === "BackendError") {
      toast.error("Server error during login. Try again later.")
      // Remove error param
      const params = new URLSearchParams(window.location.search)
      params.delete("error")
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false })
    }
  }, [error, router])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "worker", // Default to worker
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = () => {
    signIn("google", {
      redirect: true,
      callbackUrl: "/dashboard?justSignedIn=true",
    })
  }

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "/dashboard" })
  }

  const [signup, { loading: signupLoading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted(data) {
      toast.success("Signup successful! Please log in.")
      setIsSignUp(!isSignUp)
    },
    onError(error) {
      console.log(error)
      toast.error(error.message || "Signup failed")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (isSignUp) {
        try {
          const input = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role.toUpperCase(), // 'worker' -> 'WORKER', 'manager' -> 'MANAGER'
          }
          await signup({ variables: { input } })
          console.log("Signup data:", formData)
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="space-y-6">
      {/* OAuth Buttons - Only show during login */}
      {!isSignUp && (
        <div className="space-y-3">
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full h-12 text-base bg-transparent hover:bg-gray-50"
            disabled={isLoading}
          >
            <FcGoogle className="mr-3 h-5 w-5" />
            Continue with Google
          </Button>
          <Button
            onClick={handleGithubSignIn}
            variant="outline"
            className="w-full h-12 text-base bg-transparent hover:bg-gray-50"
            disabled={isLoading}
          >
            <Github className="mr-3 h-5 w-5" />
            Continue with GitHub
          </Button>
        </div>
      )}

      {/* Email/Password Form - Only show during signup */}
      {isSignUp && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                className="pl-10 h-12"
                required={isSignUp}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Role</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="worker"
                  name="role"
                  value="worker"
                  checked={formData.role === "worker"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <Label htmlFor="worker" className="text-sm font-medium cursor-pointer">
                  Site Worker
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="manager"
                  name="role"
                  value="manager"
                  checked={formData.role === "manager"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <Label htmlFor="manager" className="text-sm font-medium cursor-pointer">
                  Project Manager
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 h-12"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
            disabled={isLoading || signupLoading}
          >
            {isLoading || signupLoading ? "Please wait..." : "Create Account"}
          </Button>
        </form>
      )}

      {isSignUp && (
        <p className="text-xs text-center text-gray-600">
          By creating an account, you agree to our{" "}
          <Button variant="link" className="p-0 h-auto text-xs text-blue-600 hover:text-blue-700">
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button variant="link" className="p-0 h-auto text-xs text-blue-600 hover:text-blue-700">
            Privacy Policy
          </Button>
        </p>
      )}
    </div>
  )
}
