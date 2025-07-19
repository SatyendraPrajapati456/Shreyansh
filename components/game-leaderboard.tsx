"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Medal, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const games = [
  { id: "quiz", name: "Farewell Quiz" },
  { id: "guess-who", name: "Guess Who?" },
  { id: "puzzle", name: "School Puzzle" },
]

const leaderboardData = {
  quiz: [
    { rank: 1, name: "Emma Wilson", score: 950, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 2, name: "James Miller", score: 920, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 3, name: "Olivia Davis", score: 890, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 4, name: "Noah Garcia", score: 850, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 5, name: "Sophia Martinez", score: 820, avatar: "/placeholder.svg?height=40&width=40" },
  ],
  "guess-who": [
    { rank: 1, name: "Liam Johnson", score: 1200, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 2, name: "Ava Williams", score: 1150, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 3, name: "Mason Brown", score: 1100, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 4, name: "Isabella Jones", score: 1050, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 5, name: "Lucas Garcia", score: 1000, avatar: "/placeholder.svg?height=40&width=40" },
  ],
  puzzle: [
    { rank: 1, name: "Ethan Smith", score: 780, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 2, name: "Amelia Taylor", score: 760, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 3, name: "Benjamin Wilson", score: 740, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 4, name: "Mia Johnson", score: 720, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 5, name: "Logan Martinez", score: 700, avatar: "/placeholder.svg?height=40&width=40" },
  ],
}

export default function GameLeaderboard() {
  const [selectedGame, setSelectedGame] = useState("quiz")

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Tabs defaultValue="quiz" onValueChange={setSelectedGame} className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-gray-800">
          {games.map((game) => (
            <TabsTrigger key={game.id} value={game.id} className="data-[state=active]:bg-purple-600">
              {game.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {games.map((game) => (
          <TabsContent key={game.id} value={game.id} className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-white flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  {game.name} Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData[game.id].map((player, index) => (
                    <motion.div
                      key={player.rank}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`flex items-center p-3 rounded-lg ${
                        player.rank === 1
                          ? "bg-yellow-500/10 border border-yellow-500/30"
                          : player.rank === 2
                            ? "bg-gray-400/10 border border-gray-400/30"
                            : player.rank === 3
                              ? "bg-amber-700/10 border border-amber-700/30"
                              : "bg-gray-700/50"
                      }`}
                    >
                      <div className="flex-shrink-0 w-8 text-center font-bold">
                        {player.rank === 1 ? (
                          <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />
                        ) : player.rank === 2 ? (
                          <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                        ) : player.rank === 3 ? (
                          <Award className="h-5 w-5 text-amber-700 mx-auto" />
                        ) : (
                          <span className="text-gray-400">{player.rank}</span>
                        )}
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <img
                          src={player.avatar || "/placeholder.svg"}
                          alt={player.name}
                          className="h-10 w-10 rounded-full"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <p className="text-white font-medium">{player.name}</p>
                      </div>
                      <div className="flex-shrink-0 font-mono text-purple-400 font-bold">{player.score}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
