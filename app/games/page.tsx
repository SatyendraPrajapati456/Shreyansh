"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GamepadIcon, Clock, Star, Play } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import GameLeaderboard from "@/components/game-leaderboard"
import Link from "next/link"

// Mock data for games
const games = [
  {
    id: "quiz",
    name: "Farewell Quiz",
    description: "Test your knowledge about school events, teachers, and classmates in this fun quiz game.",
    image: "/placeholder.svg?height=200&width=350&text=Farewell+Quiz",
    difficulty: "Medium",
    playTime: "5 min",
    players: 245,
    route: "/games/quiz",
  },
  {
    id: "guess-who",
    name: "Guess Who?",
    description: "Look at childhood or funny photos and guess which classmate or teacher it is! 30 seconds per photo.",
    image: "/placeholder.svg?height=200&width=350&text=Guess+Who",
    difficulty: "Easy",
    playTime: "3 min",
    players: 189,
    route: "/games/guess-who",
  },
  {
    id: "puzzle",
    name: "School Puzzle",
    description: "Solve puzzles featuring iconic school locations and memorable moments.",
    image: "/placeholder.svg?height=200&width=350&text=School+Puzzle",
    difficulty: "Hard",
    playTime: "10 min",
    players: 132,
    route: "/games/puzzle",
  },
]

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openGameDialog = (game) => {
    setSelectedGame(game)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Farewell Games</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have fun with these interactive games created specially for our farewell. Compete with your classmates and
            see who tops the leaderboards!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 h-full flex flex-col">
                <div className="relative">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.name}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {game.difficulty}
                  </div>
                </div>
                <CardContent className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{game.description}</p>
                  <div className="flex items-center text-gray-400 text-sm space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-purple-400" />
                      {game.playTime}
                    </div>
                    <div className="flex items-center">
                      <GamepadIcon className="h-4 w-4 mr-1 text-purple-400" />
                      {game.players} players
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  {game.route ? (
                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <Link href={game.route}>
                        <Play className="mr-2 h-4 w-4" />
                        Play Now
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => openGameDialog(game)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Play Now
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Leaderboards</h2>
          <GameLeaderboard />
        </div>

        {/* Game Dialog for games without routes */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{selectedGame?.name}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video bg-black rounded-md flex items-center justify-center">
              <div className="text-center p-6">
                <GamepadIcon className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">
                  This is a placeholder for the {selectedGame?.name} game. In a real application, the interactive game
                  would be embedded here.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Start Game</Button>
                  <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-900/20">
                    How to Play
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between text-gray-300 text-sm mb-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-purple-400" />
                  {selectedGame?.playTime}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  <Star className="h-4 w-4 mr-1 text-gray-600" />
                  <Star className="h-4 w-4 mr-1 text-gray-600" />
                  <span className="ml-1">3.0/5</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{selectedGame?.description}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
