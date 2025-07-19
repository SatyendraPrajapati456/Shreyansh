"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Edit, TrendingUp, Users, CreditCard, IndianRupee } from "lucide-react"
import Link from "next/link"

interface PassSales {
  id: string
  section: string
  passesSold: number
  totalStudents: number
  pricePerPass: number
  totalRevenue: number
  lastUpdated: string
}

export default function PassSalesPage() {
  const [passSales, setPassSales] = useState<PassSales[]>([
    {
      id: "1",
      section: "12A",
      passesSold: 28,
      totalStudents: 35,
      pricePerPass: 200,
      totalRevenue: 5600,
      lastUpdated: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      section: "12B",
      passesSold: 32,
      totalStudents: 38,
      pricePerPass: 200,
      totalRevenue: 6400,
      lastUpdated: "2024-01-15T09:45:00Z",
    },
    {
      id: "3",
      section: "12C",
      passesSold: 25,
      totalStudents: 33,
      pricePerPass: 200,
      totalRevenue: 5000,
      lastUpdated: "2024-01-14T16:20:00Z",
    },
    {
      id: "4",
      section: "12D",
      passesSold: 30,
      totalStudents: 36,
      pricePerPass: 200,
      totalRevenue: 6000,
      lastUpdated: "2024-01-14T14:15:00Z",
    },
    {
      id: "5",
      section: "12E",
      passesSold: 27,
      totalStudents: 34,
      pricePerPass: 200,
      totalRevenue: 5400,
      lastUpdated: "2024-01-13T11:30:00Z",
    },
    {
      id: "6",
      section: "12F",
      passesSold: 29,
      totalStudents: 37,
      pricePerPass: 200,
      totalRevenue: 5800,
      lastUpdated: "2024-01-13T10:45:00Z",
    },
    {
      id: "7",
      section: "12G",
      passesSold: 31,
      totalStudents: 35,
      pricePerPass: 200,
      totalRevenue: 6200,
      lastUpdated: "2024-01-12T15:20:00Z",
    },
    {
      id: "8",
      section: "12H",
      passesSold: 26,
      totalStudents: 32,
      pricePerPass: 200,
      totalRevenue: 5200,
      lastUpdated: "2024-01-12T13:10:00Z",
    },
    {
      id: "9",
      section: "Outsiders",
      passesSold: 45,
      totalStudents: 0, // No limit for outsiders
      pricePerPass: 300,
      totalRevenue: 13500,
      lastUpdated: "2024-01-15T12:00:00Z",
    },
  ])

  const [editingSection, setEditingSection] = useState<PassSales | null>(null)
  const [newPassCount, setNewPassCount] = useState("")
  const [newPrice, setNewPrice] = useState("")

  const totalPassesSold = passSales.reduce((sum, section) => sum + section.passesSold, 0)
  const totalRevenue = passSales.reduce((sum, section) => sum + section.totalRevenue, 0)
  const studentSections = passSales.filter((section) => section.section !== "Outsiders")
  const outsiderSection = passSales.find((section) => section.section === "Outsiders")

  const updatePassSales = (sectionId: string, newPasses: number, newPricePerPass: number) => {
    setPassSales((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            passesSold: newPasses,
            pricePerPass: newPricePerPass,
            totalRevenue: newPasses * newPricePerPass,
            lastUpdated: new Date().toISOString(),
          }
        }
        return section
      }),
    )
  }

  const handleEdit = (section: PassSales) => {
    setEditingSection(section)
    setNewPassCount(section.passesSold.toString())
    setNewPrice(section.pricePerPass.toString())
  }

  const handleSave = () => {
    if (editingSection && newPassCount && newPrice) {
      updatePassSales(editingSection.id, Number.parseInt(newPassCount), Number.parseInt(newPrice))
      setEditingSection(null)
      setNewPassCount("")
      setNewPrice("")
    }
  }

  const getCompletionPercentage = (sold: number, total: number) => {
    if (total === 0) return 0 // For outsiders
    return Math.round((sold / total) * 100)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-6 border border-white/20 animate-fade-in-down">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
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
                  Pass Sales
                </h1>
                <p className="text-gray-300 text-lg mt-1">Track pass sales by class sections and manage pricing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Passes Sold",
              value: totalPassesSold,
              icon: CreditCard,
              color: "from-purple-500 to-purple-600",
            },
            {
              title: "Total Revenue",
              value: `₹${totalRevenue.toLocaleString()}`,
              icon: IndianRupee,
              color: "from-green-500 to-green-600",
            },
            {
              title: "Student Passes",
              value: studentSections.reduce((sum, section) => sum + section.passesSold, 0),
              icon: Users,
              color: "from-blue-500 to-blue-600",
            },
            {
              title: "Outsider Passes",
              value: outsiderSection?.passesSold || 0,
              icon: TrendingUp,
              color: "from-yellow-500 to-yellow-600",
            },
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

        {/* Class Sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Class 12 Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentSections.map((section, index) => (
              <Card
                key={section.id}
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-white">{section.section}</CardTitle>
                    <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                      {getCompletionPercentage(section.passesSold, section.totalStudents)}%
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-300">
                    {section.passesSold} of {section.totalStudents} students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${getCompletionPercentage(section.passesSold, section.totalStudents)}%`,
                        }}
                      />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-2 bg-white/5 rounded border border-white/10">
                        <div className="text-lg font-bold text-purple-400">₹{section.pricePerPass}</div>
                        <div className="text-xs text-gray-400">Per Pass</div>
                      </div>
                      <div className="text-center p-2 bg-white/5 rounded border border-white/10">
                        <div className="text-lg font-bold text-green-400">₹{section.totalRevenue.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Revenue</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">Updated: {formatDate(section.lastUpdated)}</div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                          onClick={() => handleEdit(section)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Update
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700 text-white">
                        <DialogHeader>
                          <DialogTitle>Update {section.section} Pass Sales</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Update the number of passes sold and pricing for {section.section}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="passes" className="text-white">
                              Passes Sold
                            </Label>
                            <Input
                              id="passes"
                              type="number"
                              value={newPassCount}
                              onChange={(e) => setNewPassCount(e.target.value)}
                              max={section.totalStudents}
                              min="0"
                              className="bg-white/10 border-white/20 text-white"
                            />
                            <p className="text-sm text-gray-500 mt-1">Maximum: {section.totalStudents} students</p>
                          </div>
                          <div>
                            <Label htmlFor="price" className="text-white">
                              Price Per Pass (₹)
                            </Label>
                            <Input
                              id="price"
                              type="number"
                              value={newPrice}
                              onChange={(e) => setNewPrice(e.target.value)}
                              min="0"
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={handleSave}
                              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            >
                              Save Changes
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setEditingSection(null)}
                              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Outsiders Section */}
        {outsiderSection && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">External Participants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-white">Outsiders</CardTitle>
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                      External
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-300">{outsiderSection.passesSold} passes sold</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                        <div className="text-2xl font-bold text-orange-400">₹{outsiderSection.pricePerPass}</div>
                        <div className="text-sm text-gray-400">Per Pass</div>
                      </div>
                      <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="text-2xl font-bold text-green-400">
                          ₹{outsiderSection.totalRevenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">Total Revenue</div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="text-lg font-bold text-blue-400">{outsiderSection.passesSold}</div>
                      <div className="text-sm text-gray-400">Passes Sold</div>
                      <div className="text-xs text-gray-500 mt-1">No limit for external participants</div>
                    </div>

                    <div className="text-xs text-gray-500">Updated: {formatDate(outsiderSection.lastUpdated)}</div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                          onClick={() => handleEdit(outsiderSection)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Update
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700 text-white">
                        <DialogHeader>
                          <DialogTitle>Update Outsider Pass Sales</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Update the number of passes sold and pricing for external participants
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="outsider-passes" className="text-white">
                              Passes Sold
                            </Label>
                            <Input
                              id="outsider-passes"
                              type="number"
                              value={newPassCount}
                              onChange={(e) => setNewPassCount(e.target.value)}
                              min="0"
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="outsider-price" className="text-white">
                              Price Per Pass (₹)
                            </Label>
                            <Input
                              id="outsider-price"
                              type="number"
                              value={newPrice}
                              onChange={(e) => setNewPrice(e.target.value)}
                              min="0"
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={handleSave}
                              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            >
                              Save Changes
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setEditingSection(null)}
                              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Breakdown */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Breakdown</CardTitle>
                  <CardDescription className="text-gray-300">Revenue distribution by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <span className="font-medium text-white">Student Passes</span>
                      <span className="font-bold text-purple-400">
                        ₹{studentSections.reduce((sum, section) => sum + section.totalRevenue, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <span className="font-medium text-white">Outsider Passes</span>
                      <span className="font-bold text-orange-400">
                        ₹{outsiderSection.totalRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-white/20 pt-3">
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <span className="font-bold text-white">Total Revenue</span>
                        <span className="font-bold text-green-400 text-lg">₹{totalRevenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
