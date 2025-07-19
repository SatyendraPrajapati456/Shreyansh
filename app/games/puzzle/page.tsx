"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Clock,
  Trophy,
  Star,
  ArrowLeft,
  RotateCcw,
  Home,
  Share2,
  Target,
  Puzzle,
  Grid3X3,
  Shuffle,
  CheckCircle,
  Eye,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Puzzle data
const puzzleImages = [
  {
    id: 1,
    name: "School Main Building",
    image: "/placeholder.svg?height=400&width=400&text=School+Building",
    difficulty: "easy",
    pieces: 9, // 3x3
    points: 100,
    description: "The iconic main building where we spent most of our time",
    category: "buildings",
  },
  {
    id: 2,
    name: "Library Reading Hall",
    image: "/placeholder.svg?height=400&width=400&text=Library+Hall",
    difficulty: "medium",
    pieces: 16, // 4x4
    points: 200,
    description: "Our peaceful study sanctuary with thousands of books",
    category: "buildings",
  },
  {
    id: 3,
    name: "Annual Sports Day",
    image: "/placeholder.svg?height=400&width=400&text=Sports+Day",
    difficulty: "easy",
    pieces: 9,
    points: 100,
    description: "The exciting annual sports competition on the playground",
    category: "events",
  },
  {
    id: 4,
    name: "Science Laboratory",
    image: "/placeholder.svg?height=400&width=400&text=Science+Lab",
    difficulty: "medium",
    pieces: 16,
    points: 200,
    description: "Where we conducted amazing experiments and discoveries",
    category: "buildings",
  },
  {
    id: 5,
    name: "Cultural Festival Stage",
    image: "/placeholder.svg?height=400&width=400&text=Cultural+Festival",
    difficulty: "hard",
    pieces: 25, // 5x5
    points: 300,
    description: "The grand stage where talents shined during our cultural events",
    category: "events",
  },
  {
    id: 6,
    name: "School Garden",
    image: "/placeholder.svg?height=400&width=400&text=School+Garden",
    difficulty: "easy",
    pieces: 9,
    points: 100,
    description: "The beautiful garden where we learned about nature",
    category: "nature",
  },
  {
    id: 7,
    name: "Graduation Ceremony",
    image: "/placeholder.svg?height=400&width=400&text=Graduation",
    difficulty: "hard",
    pieces: 25,
    points: 300,
    description: "The memorable graduation ceremony in the main auditorium",
    category: "events",
  },
  {
    id: 8,
    name: "Computer Lab",
    image: "/placeholder.svg?height=400&width=400&text=Computer+Lab",
    difficulty: "medium",
    pieces: 16,
    points: 200,
    description: "Where we learned programming and digital skills",
    category: "buildings",
  },
]

// Game states
const GAME_STATES = {
  MENU: "menu",
  PUZZLE_SELECT: "puzzle-select",
  PLAYING: "playing",
  COMPLETED: "completed",
  FINISHED: "finished",
}

export default function SchoolPuzzleGame() {
  const router = useRouter()
  const [gameState, setGameState] = useState(GAME_STATES.MENU)
  const [selectedPuzzle, setSelectedPuzzle] = useState(null)
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0)
  const [completedPuzzles, setCompletedPuzzles] = useState([])
  const [totalScore, setTotalScore] = useState(0)
  const [gameStartTime, setGameStartTime] = useState(null)
  const [puzzleStartTime, setPuzzleStartTime] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)

  // Puzzle game state
  const [puzzlePieces, setPuzzlePieces] = useState([])
  const [solvedPieces, setSolvedPieces] = useState([])
  const [draggedPiece, setDraggedPiece] = useState(null)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const canvasRef = useRef(null)

  // Timer effect
  useEffect(() => {
    let timer
    if (gameState === GAME_STATES.PLAYING && puzzleStartTime) {
      timer = setInterval(() => {
        setTimeElapsed(Date.now() - puzzleStartTime)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [gameState, puzzleStartTime])

  const startGame = () => {
    setGameState(GAME_STATES.PUZZLE_SELECT)
    setCompletedPuzzles([])
    setTotalScore(0)
    setGameStartTime(Date.now())
    setHintsUsed(0)
  }

  const selectPuzzle = (puzzle) => {
    setSelectedPuzzle(puzzle)
    setGameState(GAME_STATES.PLAYING)
    setPuzzleStartTime(Date.now())
    setTimeElapsed(0)
    setShowPreview(false)
    initializePuzzle(puzzle)
  }

  const initializePuzzle = (puzzle) => {
    const gridSize = Math.sqrt(puzzle.pieces)
    const pieces = []
    const solved = []

    // Create puzzle pieces
    for (let i = 0; i < puzzle.pieces; i++) {
      const row = Math.floor(i / gridSize)
      const col = i % gridSize

      pieces.push({
        id: i,
        correctPosition: i,
        currentPosition: i,
        row,
        col,
        x: col * (400 / gridSize),
        y: row * (400 / gridSize),
        width: 400 / gridSize,
        height: 400 / gridSize,
        isPlaced: false,
      })

      solved.push(false)
    }

    // Shuffle pieces
    const shuffledPieces = [...pieces].sort(() => Math.random() - 0.5)
    shuffledPieces.forEach((piece, index) => {
      piece.currentPosition = index
    })

    setPuzzlePieces(shuffledPieces)
    setSolvedPieces(solved)
  }

  const handlePieceClick = (piece) => {
    if (draggedPiece === piece.id) {
      setDraggedPiece(null)
    } else {
      setDraggedPiece(piece.id)
    }
  }

  const handleSlotClick = (slotIndex) => {
    if (draggedPiece !== null) {
      const piece = puzzlePieces.find((p) => p.id === draggedPiece)
      if (piece && piece.correctPosition === slotIndex) {
        // Correct placement
        const newPieces = puzzlePieces.map((p) =>
          p.id === draggedPiece ? { ...p, isPlaced: true, currentPosition: slotIndex } : p,
        )
        const newSolved = [...solvedPieces]
        newSolved[slotIndex] = true

        setPuzzlePieces(newPieces)
        setSolvedPieces(newSolved)
        setDraggedPiece(null)

        // Check if puzzle is complete
        if (newSolved.every((solved) => solved)) {
          completePuzzle()
        }
      } else {
        // Wrong placement - piece bounces back
        setDraggedPiece(null)
      }
    }
  }

  const completePuzzle = () => {
    const timeBonus = Math.max(0, 300 - Math.floor(timeElapsed / 1000)) // Bonus for speed
    const hintPenalty = hintsUsed * 10
    const finalScore = selectedPuzzle.points + timeBonus - hintPenalty

    setTotalScore((prev) => prev + finalScore)
    setCompletedPuzzles((prev) => [
      ...prev,
      {
        ...selectedPuzzle,
        timeElapsed,
        score: finalScore,
        hintsUsed,
      },
    ])

    setGameState(GAME_STATES.COMPLETED)
  }

  const nextPuzzle = () => {
    const nextIndex = currentPuzzleIndex + 1
    if (nextIndex < puzzleImages.length) {
      setCurrentPuzzleIndex(nextIndex)
      setGameState(GAME_STATES.PUZZLE_SELECT)
      setHintsUsed(0)
    } else {
      setGameState(GAME_STATES.FINISHED)
    }
  }

  const showHint = () => {
    if (hintsUsed < 3) {
      setShowPreview(true)
      setHintsUsed((prev) => prev + 1)
      setTimeout(() => setShowPreview(false), 3000)
    }
  }

  const shufflePieces = () => {
    const unplacedPieces = puzzlePieces.filter((p) => !p.isPlaced)
    const shuffled = [...unplacedPieces].sort(() => Math.random() - 0.5)

    const newPieces = puzzlePieces.map((piece) => {
      if (!piece.isPlaced) {
        const shuffledIndex = shuffled.findIndex((p) => p.id === piece.id)
        return { ...piece, currentPosition: shuffledIndex }
      }
      return piece
    })

    setPuzzlePieces(newPieces)
  }

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const getCompletionPercentage = () => {
    return (solvedPieces.filter(Boolean).length / solvedPieces.length) * 100
  }

  if (gameState === GAME_STATES.MENU) {
    return <GameMenu onStart={startGame} />
  }

  if (gameState === GAME_STATES.PUZZLE_SELECT) {
    return (
      <PuzzleSelector
        puzzles={puzzleImages}
        onSelect={selectPuzzle}
        completedPuzzles={completedPuzzles}
        onBack={() => router.push("/games")}
      />
    )
  }

  if (gameState === GAME_STATES.COMPLETED) {
    return (
      <PuzzleCompleted
        puzzle={selectedPuzzle}
        score={completedPuzzles[completedPuzzles.length - 1]?.score || 0}
        timeElapsed={timeElapsed}
        hintsUsed={hintsUsed}
        onNext={nextPuzzle}
        onMenu={() => setGameState(GAME_STATES.PUZZLE_SELECT)}
      />
    )
  }

  if (gameState === GAME_STATES.FINISHED) {
    return (
      <GameResults
        completedPuzzles={completedPuzzles}
        totalScore={totalScore}
        totalTime={Date.now() - gameStartTime}
        onRestart={startGame}
        onHome={() => router.push("/games")}
      />
    )
  }

  const gridSize = Math.sqrt(selectedPuzzle.pieces)

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Game Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGameState(GAME_STATES.PUZZLE_SELECT)}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Puzzles
              </Button>
              <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                {selectedPuzzle.name}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-800 px-3 py-2 rounded-lg">
                <Clock className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-white font-mono">{formatTime(timeElapsed)}</span>
              </div>
              <div className="flex items-center bg-gray-800 px-3 py-2 rounded-lg">
                <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="text-white font-semibold">{totalScore}</span>
              </div>
              <div className="flex items-center bg-gray-800 px-3 py-2 rounded-lg">
                <Lightbulb className="h-4 w-4 text-orange-500 mr-2" />
                <span className="text-white">{3 - hintsUsed} hints</span>
              </div>
            </div>
          </div>
          <Progress value={getCompletionPercentage()} className="h-2 bg-gray-800" />
          <div className="text-center mt-2">
            <span className="text-gray-400 text-sm">
              {solvedPieces.filter(Boolean).length} of {selectedPuzzle.pieces} pieces placed
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Puzzle Board */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Puzzle Board</h3>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={showHint}
                  disabled={hintsUsed >= 3}
                  className="border-orange-500/50 text-orange-400 hover:bg-orange-900/20"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Hint
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={shufflePieces}
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-900/20"
                >
                  <Shuffle className="h-4 w-4 mr-1" />
                  Shuffle
                </Button>
              </div>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ width: 400, height: 400 }}>
                  {/* Preview overlay */}
                  {showPreview && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${selectedPuzzle.image})` }}
                    />
                  )}

                  {/* Puzzle grid */}
                  <div
                    className="grid gap-1 p-2"
                    style={{
                      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                      width: 400,
                      height: 400,
                    }}
                  >
                    {Array.from({ length: selectedPuzzle.pieces }).map((_, index) => (
                      <div
                        key={index}
                        className={`border-2 border-dashed border-gray-600 rounded cursor-pointer transition-all duration-200 ${
                          solvedPieces[index]
                            ? "border-green-500 bg-green-900/20"
                            : "hover:border-purple-500 hover:bg-purple-900/20"
                        }`}
                        onClick={() => handleSlotClick(index)}
                        style={{
                          width: (400 - 16 - (gridSize - 1) * 4) / gridSize,
                          height: (400 - 16 - (gridSize - 1) * 4) / gridSize,
                        }}
                      >
                        {solvedPieces[index] && (
                          <div
                            className="w-full h-full bg-cover bg-center rounded"
                            style={{
                              backgroundImage: `url(${selectedPuzzle.image})`,
                              backgroundPosition: `${-(index % gridSize) * (100 / (gridSize - 1))}% ${-Math.floor(index / gridSize) * (100 / (gridSize - 1))}%`,
                              backgroundSize: `${gridSize * 100}%`,
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Puzzle Pieces */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Puzzle Pieces</h3>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {puzzlePieces
                    .filter((piece) => !piece.isPlaced)
                    .map((piece) => (
                      <motion.div
                        key={piece.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          draggedPiece === piece.id
                            ? "border-purple-500 shadow-lg shadow-purple-500/50"
                            : "border-gray-600 hover:border-gray-500"
                        }`}
                        onClick={() => handlePieceClick(piece)}
                        style={{
                          width: 80,
                          height: 80,
                        }}
                      >
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${selectedPuzzle.image})`,
                            backgroundPosition: `${-(piece.col) * (100 / (gridSize - 1))}% ${-(piece.row) * (100 / (gridSize - 1))}%`,
                            backgroundSize: `${gridSize * 100}%`,
                          }}
                        />
                        {draggedPiece === piece.id && (
                          <div className="absolute inset-0 bg-purple-500/30 flex items-center justify-center">
                            <Target className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                </div>

                {puzzlePieces.filter((piece) => !piece.isPlaced).length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <p className="text-white font-semibold">All pieces placed!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Puzzle Info */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <h4 className="text-lg font-semibold text-white mb-2">{selectedPuzzle.name}</h4>
                <p className="text-gray-400 text-sm mb-3">{selectedPuzzle.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <Badge className={getDifficultyColor(selectedPuzzle.difficulty)}>{selectedPuzzle.difficulty}</Badge>
                  <span className="text-gray-400">{selectedPuzzle.pieces} pieces</span>
                  <span className="text-purple-400">{selectedPuzzle.points} points</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function GameMenu({ onStart }) {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-8">
            <div className="h-24 w-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Puzzle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">School Puzzle Challenge</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Piece together beautiful memories of our school! Solve jigsaw puzzles featuring iconic locations,
              memorable events, and special moments from our school journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Grid3X3 className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">8 Puzzles</h3>
                <p className="text-gray-400 text-sm">School buildings, events, and memorable locations</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">3 Difficulties</h3>
                <p className="text-gray-400 text-sm">9, 16, or 25 pieces based on complexity</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Score Points</h3>
                <p className="text-gray-400 text-sm">Earn points based on speed and difficulty</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">How to Play</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Click puzzle pieces to select them, then click the correct slot to place them
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Use hints to see the complete image for 3 seconds (3 hints per puzzle)
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Shuffle remaining pieces if you need a different arrangement
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Complete puzzles faster to earn time bonus points</span>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={onStart}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
          >
            <Puzzle className="mr-2 h-5 w-5" />
            Start Puzzle Challenge
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

function PuzzleSelector({ puzzles, onSelect, completedPuzzles, onBack }) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { value: "all", label: "All Puzzles" },
    { value: "buildings", label: "School Buildings" },
    { value: "events", label: "School Events" },
    { value: "nature", label: "Nature & Gardens" },
  ]

  const filteredPuzzles =
    selectedCategory === "all" ? puzzles : puzzles.filter((puzzle) => puzzle.category === selectedCategory)

  const isCompleted = (puzzleId) => {
    return completedPuzzles.some((cp) => cp.id === puzzleId)
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Games
              </Button>
              <h1 className="text-3xl font-bold text-white">Choose Your Puzzle</h1>
            </div>
            <div className="w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-400">
              Progress: {completedPuzzles.length} of {puzzles.length} puzzles completed
            </p>
            <Progress value={(completedPuzzles.length / puzzles.length) * 100} className="h-2 bg-gray-800 mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPuzzles.map((puzzle, index) => (
            <motion.div
              key={puzzle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`bg-gray-800 border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer ${
                  isCompleted(puzzle.id) ? "ring-2 ring-green-500/50" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={puzzle.image || "/placeholder.svg"}
                    alt={puzzle.name}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <Badge className={getDifficultyColor(puzzle.difficulty)}>{puzzle.difficulty}</Badge>
                    {isCompleted(puzzle.id) && (
                      <Badge className="bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Done
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {puzzle.pieces} pieces
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{puzzle.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{puzzle.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-semibold">{puzzle.points} points</span>
                    <Button
                      size="sm"
                      onClick={() => onSelect(puzzle)}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {isCompleted(puzzle.id) ? "Play Again" : "Start Puzzle"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PuzzleCompleted({ puzzle, score, timeElapsed, hintsUsed, onNext, onMenu }) {
  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8">
            <div className="h-24 w-24 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Puzzle Complete!</h1>
            <p className="text-xl text-gray-400">Great job solving "{puzzle.name}"</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{score}</div>
                <p className="text-gray-400 text-xs">Score</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{formatTime(timeElapsed)}</div>
                <p className="text-gray-400 text-xs">Time</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Lightbulb className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{hintsUsed}</div>
                <p className="text-gray-400 text-xs">Hints Used</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Grid3X3 className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{puzzle.pieces}</div>
                <p className="text-gray-400 text-xs">Pieces</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onNext} className="bg-purple-600 hover:bg-purple-700 text-white">
              Next Puzzle
            </Button>
            <Button variant="outline" onClick={onMenu} className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Choose Another Puzzle
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function GameResults({ completedPuzzles, totalScore, totalTime, onRestart, onHome }) {
  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    const remainingSeconds = seconds % 60

    if (hours > 0) {
      return `${hours}:${remainingMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    }
    return `${remainingMinutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const averageScore = completedPuzzles.length > 0 ? Math.round(totalScore / completedPuzzles.length) : 0
  const totalHints = completedPuzzles.reduce((sum, puzzle) => sum + puzzle.hintsUsed, 0)

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="h-24 w-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Puzzle Challenge Complete!</h1>
            <p className="text-xl text-gray-400">You've completed all the school puzzles!</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{totalScore}</div>
                <p className="text-gray-400 text-sm">Total Score</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{formatTime(totalTime)}</div>
                <p className="text-gray-400 text-sm">Total Time</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{averageScore}</div>
                <p className="text-gray-400 text-sm">Avg Score</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Lightbulb className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{totalHints}</div>
                <p className="text-gray-400 text-sm">Hints Used</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">Puzzle Summary</h3>
              <div className="space-y-4">
                {completedPuzzles.map((puzzle, index) => (
                  <div key={puzzle.id} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={puzzle.image || "/placeholder.svg"}
                          alt={puzzle.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <h4 className="text-white font-medium">{puzzle.name}</h4>
                          <p className="text-gray-400 text-sm">
                            {puzzle.pieces} pieces • {puzzle.difficulty}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{puzzle.score} points</div>
                        <div className="text-gray-400 text-sm">{formatTime(puzzle.timeElapsed)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onRestart} className="bg-purple-600 hover:bg-purple-700 text-white">
              <RotateCcw className="mr-2 h-4 w-4" />
              Play Again
            </Button>
            <Button variant="outline" onClick={onHome} className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Home className="mr-2 h-4 w-4" />
              Back to Games
            </Button>
            <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-900/20">
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case "easy":
      return "bg-green-600"
    case "medium":
      return "bg-yellow-600"
    case "hard":
      return "bg-red-600"
    default:
      return "bg-gray-600"
  }
}
