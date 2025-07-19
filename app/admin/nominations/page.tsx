"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Search, Eye, Check, X, Filter, UserCheck, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Nomination {
  id: string
  nomineeName: string
  nomineeClass: string
  nominatorName: string
  nominatorEmail: string
  category: "Mr Farewell" | "Mrs Farewell"
  reason: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
}

export default function NominationsPage() {
  const [nominations, setNominations] = useState<Nomination[]>([
    {
      id: "1",
      nomineeName: "Arjun Sharma",
      nomineeClass: "12A",
      nominatorName: "Priya Singh",
      nominatorEmail: "priya.singh@school.edu",
      category: "Mr Farewell",
      reason:
        "Arjun has been an amazing friend and leader throughout our school journey. He always helps everyone and has great leadership qualities.",
      status: "pending",
      submittedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      nomineeName: "Sneha Kumar",
      nomineeClass: "12B",
      nominatorName: "Rohit Patel",
      nominatorEmail: "rohit.patel@school.edu",
      category: "Mrs Farewell",
      reason:
        "Sneha is the most caring and supportive person in our class. She deserves this title for her kindness and academic excellence.",
      status: "approved",
      submittedAt: "2024-01-14T15:45:00Z",
    },
    {
      id: "3",
      nomineeName: "Vikash Singh",
      nomineeClass: "12C",
      nominatorName: "Anita Sharma",
      nominatorEmail: "anita.sharma@school.edu",
      category: "Mr Farewell",
      reason:
        "Vikash has been a great sports captain and has represented our school in many competitions. He's also very helpful to juniors.",
      status: "pending",
      submittedAt: "2024-01-14T09:20:00Z",
    },
    {
      id: "4",
      nomineeName: "Kavya Gupta",
      nomineeClass: "12D",
      nominatorName: "Amit Kumar",
      nominatorEmail: "amit.kumar@school.edu",
      category: "Mrs Farewell",
      reason:
        "Kavya is an excellent student and has been class representative for 2 years. She's very responsible and caring towards everyone.",
      status: "rejected",
      submittedAt: "2024-01-13T14:10:00Z",
    },
    {
      id: "5",
      nomineeName: "Ravi Patel",
      nomineeClass: "12E",
      nominatorName: "Ritika Singh",
      nominatorEmail: "ritika.singh@school.edu",
      category: "Mr Farewell",
      reason:
        "Ravi is very talented in music and has organized many cultural events. He's also academically brilliant and helps everyone with studies.",
      status: "pending",
      submittedAt: "2024-01-13T11:30:00Z",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [categoryFilter, setCategoryFilter] = useState<"all" | "Mr Farewell" | "Mrs Farewell">("all")

  const filteredNominations = nominations.filter((nomination) => {
    const matchesSearch =
      nomination.nomineeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nomination.nominatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nomination.nominatorEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || nomination.status === statusFilter
    const matchesCategory = categoryFilter === "all" || nomination.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const updateNominationStatus = (id: string, status: "approved" | "rejected") => {
    setNominations((prev) => prev.map((nomination) => (nomination.id === id ? { ...nomination, status } : nomination)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <Check className="w-4 h-4" />
      case "rejected":
        return <X className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const stats = {
    total: nominations.length,
    pending: nominations.filter((n) => n.status === "pending").length,
    approved: nominations.filter((n) => n.status === "approved").length,
    rejected: nominations.filter((n) => n.status === "rejected").length,
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
            <div className="flex items-center gap-6">
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Nominations Management
                </h1>
                <p className="text-gray-300 text-lg">Review and manage all nominations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total", value: stats.total, icon: UserCheck, color: "from-purple-500 to-purple-600" },
            { title: "Pending", value: stats.pending, icon: Clock, color: "from-yellow-500 to-yellow-600" },
            { title: "Approved", value: stats.approved, icon: Check, color: "from-green-500 to-green-600" },
            { title: "Rejected", value: stats.rejected, icon: X, color: "from-red-500 to-red-600" },
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

        {/* Filters */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search nominations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all" className="bg-gray-800">
                  All Status
                </option>
                <option value="pending" className="bg-gray-800">
                  Pending
                </option>
                <option value="approved" className="bg-gray-800">
                  Approved
                </option>
                <option value="rejected" className="bg-gray-800">
                  Rejected
                </option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as any)}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all" className="bg-gray-800">
                  All Categories
                </option>
                <option value="Mr Farewell" className="bg-gray-800">
                  Mr Farewell
                </option>
                <option value="Mrs Farewell" className="bg-gray-800">
                  Mrs Farewell
                </option>
              </select>

              <div className="text-white text-sm flex items-center">
                Showing {filteredNominations.length} of {nominations.length} nominations
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nominations List */}
        <div className="space-y-6">
          {filteredNominations.map((nomination, index) => (
            <Card
              key={nomination.id}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <CardTitle className="text-xl font-bold text-white">{nomination.nomineeName}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {nomination.nomineeClass} • Nominated by {nomination.nominatorName}
                      </CardDescription>
                    </div>
                    <Badge
                      className={`${nomination.category === "Mr Farewell" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : "bg-pink-500/20 text-pink-300 border-pink-500/30"} border`}
                    >
                      {nomination.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${getStatusColor(nomination.status)} border flex items-center gap-1`}>
                      {getStatusIcon(nomination.status)}
                      {nomination.status.charAt(0).toUpperCase() + nomination.status.slice(1)}
                    </Badge>
                    <span className="text-gray-400 text-sm">{formatDate(nomination.submittedAt)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-gray-300 text-sm">Nominator Details:</p>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <p className="text-white font-medium">{nomination.nominatorName}</p>
                        <p className="text-gray-400 text-sm">{nomination.nominatorEmail}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-300 text-sm">Nomination Reason:</p>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <p className="text-white text-sm">{nomination.reason.slice(0, 100)}...</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">Nomination Details</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Complete information about this nomination
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-white mb-2">Nominee Information</h4>
                              <div className="space-y-1">
                                <p>
                                  <span className="text-gray-400">Name:</span> {nomination.nomineeName}
                                </p>
                                <p>
                                  <span className="text-gray-400">Class:</span> {nomination.nomineeClass}
                                </p>
                                <p>
                                  <span className="text-gray-400">Category:</span> {nomination.category}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white mb-2">Nominator Information</h4>
                              <div className="space-y-1">
                                <p>
                                  <span className="text-gray-400">Name:</span> {nomination.nominatorName}
                                </p>
                                <p>
                                  <span className="text-gray-400">Email:</span> {nomination.nominatorEmail}
                                </p>
                                <p>
                                  <span className="text-gray-400">Submitted:</span> {formatDate(nomination.submittedAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-2">Nomination Reason</h4>
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <p className="text-gray-300">{nomination.reason}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Current Status:</span>
                            <Badge className={`${getStatusColor(nomination.status)} border flex items-center gap-1`}>
                              {getStatusIcon(nomination.status)}
                              {nomination.status.charAt(0).toUpperCase() + nomination.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {nomination.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => updateNominationStatus(nomination.id, "approved")}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button onClick={() => updateNominationStatus(nomination.id, "rejected")} variant="destructive">
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNominations.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 animate-fade-in">
            <CardContent className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No nominations found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}
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
        
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-fade-in-down { animation: fade-in-down 0.6s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  )
}
