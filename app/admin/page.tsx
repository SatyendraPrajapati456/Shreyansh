"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Vote, Contact, CreditCard, Shield, UserCheck, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth")
    if (auth === "authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "hellyeahbaby") {
      localStorage.setItem("admin-auth", "authenticated")
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Invalid password")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin-auth")
    setIsAuthenticated(false)
    setPassword("")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>

        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 shadow-2xl animate-fade-in">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Admin Access</CardTitle>
            <CardDescription className="text-gray-300">Enter password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              {error && <p className="text-red-400 text-sm animate-shake">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8 border border-white/20 animate-fade-in-down">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-300 text-lg">Farewell Event Management System</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Votes", value: "1,247", icon: Vote, color: "from-purple-500 to-purple-600" },
            { title: "Nominations", value: "89", icon: UserCheck, color: "from-blue-500 to-blue-600" },
            { title: "Pass Sales", value: "₹45,600", icon: CreditCard, color: "from-green-500 to-green-600" },
            { title: "Team Members", value: "10", icon: Users, color: "from-yellow-500 to-yellow-600" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Voting Control",
              description: "Manage Mr & Mrs Farewell voting",
              icon: Vote,
              href: "/admin/voting",
              color: "from-purple-500 to-purple-600",
              stats: "2 Categories Active",
            },
            {
              title: "Nominations",
              description: "Review and manage nominations",
              icon: UserCheck,
              href: "/admin/nominations",
              color: "from-blue-500 to-blue-600",
              stats: "15 Pending Review",
            },
            {
              title: "Team Contacts",
              description: "View team member directory",
              icon: Contact,
              href: "/admin/contacts",
              color: "from-green-500 to-green-600",
              stats: "10 Team Members",
            },
            {
              title: "Pass Sales",
              description: "Track pass sales by sections",
              icon: CreditCard,
              href: "/admin/passes",
              color: "from-yellow-500 to-yellow-600",
              stats: "9 Sections Tracking",
            },
          ].map((section, index) => (
            <Link key={index} href={section.href}>
              <Card
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${section.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <section.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30">{section.stats}</Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg">{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-purple-300 group-hover:text-purple-200 transition-colors duration-300">
                    <span className="text-sm font-medium">Manage →</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mt-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New vote received", time: "2 minutes ago", type: "vote" },
                { action: "Nomination approved", time: "5 minutes ago", type: "nomination" },
                { action: "Pass sold - Section 12A", time: "10 minutes ago", type: "pass" },
                { action: "Team member updated contact", time: "15 minutes ago", type: "contact" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "vote"
                          ? "bg-purple-400"
                          : activity.type === "nomination"
                            ? "bg-blue-400"
                            : activity.type === "pass"
                              ? "bg-green-400"
                              : "bg-yellow-400"
                      }`}
                    />
                    <span className="text-white">{activity.action}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-fade-in-down { animation: fade-in-down 0.6s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  )
}
