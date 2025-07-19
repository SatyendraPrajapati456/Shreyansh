"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Phone, Mail, User, Users, Star, MapPin } from "lucide-react"
import Link from "next/link"

interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  class: string
  section: string
  email: string
  phone: string
  isLead: boolean
  avatar: string
}

export default function ContactsPage() {
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Maria Kujur",
      role: "Event Coordinator",
      department: "Management",
      class: "12",
      section: "H",
      email: "arjun.sharma@school.edu",
      phone: "8085851573",
      isLead: true,
      avatar: "/mario.jpeg",
    },
    {
      id: "2",
      name: "Shourya Singh",
      role: "Technical Lead",
      department: "Collection",
      class: "12",
      section: "B",
      email: "priya.singh@school.edu",
      phone: "+91 98765 43211",
      isLead: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      name: "Karishma Khatri",
      role: "Decoration Head",
      department: "Decoration",
      class: "12",
      section: "C",
      email: "rohit.kumar@school.edu",
      phone: "+91 98765 43212",
      isLead: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "4",
      name: "Ketan Dubey",
      role: "Design Coordinator",
      department: "Creative",
      class: "12",
      section: "D",
      email: "sneha.patel@school.edu",
      phone: "+91 98765 43213",
      isLead: false,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "5",
      name: "Karan",
      role: "Logistics Manager",
      department: "Operations",
      class: "12",
      section: "E",
      email: "vikash.singh@school.edu",
      phone: "+91 98765 43214",
      isLead: false,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "6",
      name: "Yagini",
      role: "Finance Coordinator",
      department: "Finance",
      class: "12",
      section: "F",
      email: "kavya.gupta@school.edu",
      phone: "+91 98765 43215",
      isLead: false,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "7",
      name: "Gauri Sharma",
      role: "Content Writer",
      department: "Content",
      class: "12",
      section: "G",
      email: "amit.patel@school.edu",
      phone: "+91 98765 43216",
      isLead: false,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "8",
      name: "Jennifer",
      role: "Social Media Manager",
      department: "Marketing",
      class: "12",
      section: "H",
      email: "ritika.sharma@school.edu",
      phone: "+91 98765 43217",
      isLead: false,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "9",
      name: "Avishi",
      role: "Photography Lead",
      department: "Media",
      class: "12",
      section: "A",
      email: "ravi.gupta@school.edu",
      phone: "+91 98765 43218",
      isLead: false,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "10",
      name: "Vinayak",
      role: "Volunteer Coordinator",
      department: "Operations",
      class: "12",
      section: "B",
      email: "anita.kumar@school.edu",
      phone: "+91 98765 43219",
      isLead: false,
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter

    return matchesSearch && matchesDepartment
  })

  const departments = Array.from(new Set(teamMembers.map((member) => member.department)))
  const teamLeads = teamMembers.filter((member) => member.isLead)

  const getDepartmentColor = (department: string) => {
    const colors = {
      Management: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      Technology: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      Marketing: "bg-green-500/20 text-green-300 border-green-500/30",
      Creative: "bg-pink-500/20 text-pink-300 border-pink-500/30",
      Operations: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      Finance: "bg-red-500/20 text-red-300 border-red-500/30",
      Content: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      Media: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    }
    return colors[department as keyof typeof colors] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
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
                  Team Contacts
                </h1>
                <p className="text-gray-300 text-lg">Complete team directory and contact information</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Members", value: teamMembers.length, icon: Users, color: "from-purple-500 to-purple-600" },
            { title: "Team Leads", value: teamLeads.length, icon: Star, color: "from-yellow-500 to-yellow-600" },
            { title: "Departments", value: departments.length, icon: MapPin, color: "from-blue-500 to-blue-600" },
            { title: "Class 12", value: teamMembers.length, icon: User, color: "from-green-500 to-green-600" },
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

        {/* Team Leads Section */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5" />
              Team Leadership
            </CardTitle>
            <CardDescription className="text-gray-300">Key team leads and coordinators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teamLeads.map((lead, index) => (
                <div
                  key={lead.id}
                  className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={lead.avatar || "/placeholder.svg"}
                        alt={lead.name}
                        className="w-12 h-12 rounded-full border-2 border-yellow-400"
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{lead.name}</h3>
                      <p className="text-yellow-300 text-sm">{lead.role}</p>
                      <p className="text-gray-400 text-xs">{lead.department}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all" className="bg-gray-800">
                  All Departments
                </option>
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="bg-gray-800">
                    {dept}
                  </option>
                ))}
              </select>

              <div className="text-white text-sm flex items-center">
                Showing {filteredMembers.length} of {teamMembers.length} members
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => (
            <Card
              key={member.id}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="w-16 h-16 rounded-full border-2 border-purple-400"
                    />
                    {member.isLead && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-white">{member.name}</CardTitle>
                    <CardDescription className="text-gray-300">{member.role}</CardDescription>
                    <Badge className={`${getDepartmentColor(member.department)} border text-xs mt-1`}>
                      {member.department}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-white font-bold">Class {member.class}</div>
                    <div className="text-gray-400 text-sm">Section {member.section}</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-white font-bold">{member.isLead ? "Lead" : "Member"}</div>
                    <div className="text-gray-400 text-sm">Role</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Email</p>
                      <p className="text-gray-400 text-xs">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <Phone className="w-4 h-4 text-green-400" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Phone</p>
                      <p className="text-gray-400 text-xs">{member.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => window.open(`mailto:${member.email}`)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => window.open(`tel:${member.phone}`)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 animate-fade-in">
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No team members found</h3>
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
