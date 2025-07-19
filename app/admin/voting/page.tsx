"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Crown, Heart, TrendingUp, Vote } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Candidate {
  id: string
  name: string
  class: string
  votes: number
  photo: string
}

export default function VotingControlPage() {
  const [votingEnabled, setVotingEnabled] = useState(true)

  const [mrFarewellCandidates] = useState<Candidate[]>([
    { id: "1", name: "Akshat Singh", class: "12A", votes: 145, photo: "/placeholder.svg?height=100&width=100" },
    { id: "2", name: "Rohit Kumar", class: "12B", votes: 132, photo: "/placeholder.svg?height=100&width=100" },
    { id: "3", name: "Vikash Singh", class: "12C", votes: 98, photo: "/placeholder.svg?height=100&width=100" },
    { id: "4", name: "Amit Patel", class: "12D", votes: 87, photo: "/placeholder.svg?height=100&width=100" },
    { id: "5", name: "Ravi Gupta", class: "12E", votes: 76, photo: "/placeholder.svg?height=100&width=100" },
  ])

  const [mrsFarewellCandidates] = useState<Candidate[]>([
    { id: "6", name: "Priya Sharma", class: "12A", votes: 156, photo: "/placeholder.svg?height=100&width=100" },
    { id: "7", name: "Anita Kumar", class: "12B", votes: 143, photo: "/placeholder.svg?height=100&width=100" },
    { id: "8", name: "Sneha Singh", class: "12C", votes: 121, photo: "/placeholder.svg?height=100&width=100" },
    { id: "9", name: "Kavya Patel", class: "12D", votes: 109, photo: "/placeholder.svg?height=100&width=100" },
    { id: "10", name: "Ritika Gupta", class: "12E", votes: 95, photo: "/placeholder.svg?height=100&width=100" },
  ])

  const totalVotes = [...mrFarewellCandidates, ...mrsFarewellCandidates].reduce(
    (sum, candidate) => sum + candidate.votes,
    0,
  )
  const mrFarewellTotal = mrFarewellCandidates.reduce((sum, candidate) => sum + candidate.votes, 0)
  const mrsFarewellTotal = mrsFarewellCandidates.reduce((sum, candidate) => sum + candidate.votes, 0)

  const getTopCandidates = (candidates: Candidate[]) => {
    return candidates.sort((a, b) => b.votes - a.votes).slice(0, 3)
  }

  const toggleVoting = () => {
    setVotingEnabled(!votingEnabled)
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
                  Voting Control
                </h1>
                <p className="text-gray-300 text-lg">Manage Mr & Mrs Farewell voting</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-semibold">Voting Status</p>
                <p className="text-gray-300 text-sm">{votingEnabled ? "Active" : "Disabled"}</p>
              </div>
              <Switch
                checked={votingEnabled}
                onCheckedChange={toggleVoting}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Votes", value: totalVotes, icon: Vote, color: "from-purple-500 to-purple-600" },
            { title: "Mr Farewell", value: mrFarewellTotal, icon: Crown, color: "from-blue-500 to-blue-600" },
            { title: "Mrs Farewell", value: mrsFarewellTotal, icon: Heart, color: "from-pink-500 to-pink-600" },
            { title: "Participation", value: "87%", icon: TrendingUp, color: "from-green-500 to-green-600" },
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

        {/* Voting Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mr Farewell */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                Mr Farewell
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                {mrFarewellTotal} total votes • {mrFarewellCandidates.length} candidates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {getTopCandidates(mrFarewellCandidates).map((candidate, index) => {
                const percentage = (candidate.votes / mrFarewellTotal) * 100
                return (
                  <div
                    key={candidate.id}
                    className="space-y-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src={candidate.photo || "/placeholder.svg"}
                          alt={candidate.name}
                          width={60}
                          height={60}
                          className="rounded-full border-2 border-blue-400"
                        />
                        {index === 0 && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Crown className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-white">{candidate.name}</h3>
                            <p className="text-blue-300 text-sm">{candidate.class}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold text-lg">{candidate.votes}</p>
                            <p className="text-blue-300 text-sm">{percentage.toFixed(1)}%</p>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2 bg-gray-700" />
                      </div>
                    </div>
                  </div>
                )
              })}

              {mrFarewellCandidates.length > 3 && (
                <div className="text-center">
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    View All {mrFarewellCandidates.length} Candidates
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mrs Farewell */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                Mrs Farewell
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                {mrsFarewellTotal} total votes • {mrsFarewellCandidates.length} candidates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {getTopCandidates(mrsFarewellCandidates).map((candidate, index) => {
                const percentage = (candidate.votes / mrsFarewellTotal) * 100
                return (
                  <div
                    key={candidate.id}
                    className="space-y-3 p-4 bg-pink-500/10 rounded-lg border border-pink-500/20 hover:bg-pink-500/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src={candidate.photo || "/placeholder.svg"}
                          alt={candidate.name}
                          width={60}
                          height={60}
                          className="rounded-full border-2 border-pink-400"
                        />
                        {index === 0 && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Heart className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-white">{candidate.name}</h3>
                            <p className="text-pink-300 text-sm">{candidate.class}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold text-lg">{candidate.votes}</p>
                            <p className="text-pink-300 text-sm">{percentage.toFixed(1)}%</p>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2 bg-gray-700" />
                      </div>
                    </div>
                  </div>
                )
              })}

              {mrsFarewellCandidates.length > 3 && (
                <div className="text-center">
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    View All {mrsFarewellCandidates.length} Candidates
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Voting Analytics */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mt-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Voting Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="text-3xl font-bold text-white mb-2">{totalVotes}</div>
                <div className="text-purple-300">Total Votes Cast</div>
              </div>
              <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="text-3xl font-bold text-white mb-2">87%</div>
                <div className="text-blue-300">Participation Rate</div>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-3xl font-bold text-white mb-2">2</div>
                <div className="text-green-300">Active Categories</div>
              </div>
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
        
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-fade-in-down { animation: fade-in-down 0.6s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  )
}
