"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Clock,
  Trophy,
  Star,
  CheckCircle,
  XCircle,
  ArrowLeft,
  RotateCcw,
  Home,
  Share2,
  Zap,
  Target,
  Eye,
  Camera,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Game data - photos with multiple choice answers
const gamePhotos = [
  {
    id: 1,
    photo: "/aasna.jpeg",
    options: ["Anshika", "Mouli", "Aashna", "Anushree"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 100,
    hint: "Shes from Maths",
    photoType: "childhood",
  },
  {
    id: 2,
    photo: "/guesswho1.jpeg",
    options: ["Jahnvi", "Rutuja", "Purva", "Aaradhna"],
    correctAnswer: 0,
    difficulty: "hard",
    points: 200,
    hint: "Shes from Bio",
    photoType: "baby",
  },
  {
    id: 3,
    photo: "/niloptal.jpeg",
    options: ["Akash", "Nilotpal", "Nayan", "Ansh"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 150,
    hint: "He's from Section E",
    photoType: "funny",
  },
  {
    id: 4,
    photo: "/kavya.jpeg",
    options: ["harshvardhan", "ansh", "kavya", "arush"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 100,
    hint: "no more in our school",
    photoType: "event",
  },
  {
    id: 5,
    photo: "/sumita.png",
    options: ["Principal ", "Vice Principal", "Dean of Studies", "Head of Academics"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 150,
    hint: "Has been leading our school for 5 years",
    photoType: "formal",
  },
  {
    id: 6,
    photo: "/khobragade.jpeg",
    options: ["Rajesh", "Kamal", "Raju", "Santosh"],
    correctAnswer: 2,
    difficulty: "hard",
    points: 200,
    hint: "Guard",
    photoType: "sports",
  },
  {
    id: 7,
    photo: "/yashika.jpeg",
    options: ["Maya Singh", "Arjun Gupta", "Yashika Sharma", "Rohit Verma"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 150,
    hint: "Always carries a guitar to school",
    photoType: "childhood",
  },
  {
    id: 8,
    photo: "/guesswho3.jpeg",
    options: ["Soumya", "Kirti", "Shraddha", "ayushi"],
    correctAnswer: 3,
    difficulty: "hard",
    points: 200,
    hint: "Geography teacher who loves traveling",
    photoType: "gym-freak",
  },
]

// Game states
const GAME_STATES = {
  MENU: "menu",
  PLAYING: "playing",
  PAUSED: "paused",
  FINISHED: "finished",
}

export default function GuessWhoGame() {
  const router = useRouter()
  const [gameState, setGameState] = useState(GAME_STATES.MENU)
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [userAnswers, setUserAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30) // 30 seconds per photo
  const [showResult, setShowResult] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [gameStats, setGameStats] = useState({
    correct: 0,
    incorrect: 0,
    hintsUsed: 0,
  })

  // Timer effect
  useEffect(() => {
    let timer
    if (gameState === GAME_STATES.PLAYING && timeLeft > 0 && !showResult) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameState === GAME_STATES.PLAYING && !showResult) {
      // Time's up - mark as incorrect and move to next
      handleTimeUp()
    }
    return () => clearInterval(timer)
  }, [gameState, timeLeft, showResult])

  const startGame = () => {
    setGameState(GAME_STATES.PLAYING)
    setCurrentPhoto(0)
    setSelectedAnswer(null)
    setUserAnswers([])
    setScore(0)
    setTimeLeft(30)
    setShowResult(false)
    setShowHint(false)
    setStreak(0)
    setMaxStreak(0)
    setGameStats({ correct: 0, incorrect: 0, hintsUsed: 0 })
  }

  const handleTimeUp = () => {
    if (selectedAnswer !== null) return

    const photo = gamePhotos[currentPhoto]
    const newAnswer = {
      photoId: photo.id,
      selectedAnswer: null,
      isCorrect: false,
      points: 0,
      timeUp: true,
    }

    setUserAnswers((prev) => [...prev, newAnswer])
    setStreak(0)
    setGameStats((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }))
    setShowResult(true)

    // Auto advance after 2 seconds
    setTimeout(() => {
      if (currentPhoto < gamePhotos.length - 1) {
        nextPhoto()
      } else {
        handleFinishGame()
      }
    }, 2000)
  }

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    const photo = gamePhotos[currentPhoto]
    const isCorrect = answerIndex === photo.correctAnswer

    // Calculate points based on time remaining and difficulty
    let points = 0
    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft * 2) // 2 points per second remaining
      points = photo.points + timeBonus
    }

    const newAnswer = {
      photoId: photo.id,
      selectedAnswer: answerIndex,
      isCorrect,
      points,
      timeRemaining: timeLeft,
    }

    setUserAnswers((prev) => [...prev, newAnswer])

    if (isCorrect) {
      setScore((prev) => prev + points)
      setStreak((prev) => prev + 1)
      setMaxStreak((prev) => Math.max(prev, streak + 1))
      setGameStats((prev) => ({ ...prev, correct: prev.correct + 1 }))
    } else {
      setStreak(0)
      setGameStats((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }))
    }

    // Auto advance after 2 seconds
    setTimeout(() => {
      if (currentPhoto < gamePhotos.length - 1) {
        nextPhoto()
      } else {
        handleFinishGame()
      }
    }, 2000)
  }

  const nextPhoto = () => {
    setCurrentPhoto((prev) => prev + 1)
    setSelectedAnswer(null)
    setShowResult(false)
    setShowHint(false)
    setTimeLeft(30)
  }

  const useHint = () => {
    if (!showHint) {
      setShowHint(true)
      setGameStats((prev) => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }))
    }
  }

  const handleFinishGame = () => {
    setGameState(GAME_STATES.FINISHED)
  }

  const restartGame = () => {
    startGame()
  }

  const formatTime = (seconds) => {
    return seconds.toString().padStart(2, "0")
  }

  const getScoreGrade = () => {
    const maxPossibleScore = gamePhotos.reduce((sum, photo) => sum + photo.points + 60, 0) // Max time bonus
    const percentage = (score / maxPossibleScore) * 100
    if (percentage >= 90) return { grade: "A+", color: "text-green-400", message: "Photo Detective!" }
    if (percentage >= 80) return { grade: "A", color: "text-green-400", message: "Excellent Recognition!" }
    if (percentage >= 70) return { grade: "B+", color: "text-blue-400", message: "Great Memory!" }
    if (percentage >= 60) return { grade: "B", color: "text-blue-400", message: "Good Guessing!" }
    if (percentage >= 50) return { grade: "C", color: "text-yellow-400", message: "Not Bad!" }
    return { grade: "D", color: "text-red-400", message: "Need More Practice!" }
  }

  if (gameState === GAME_STATES.MENU) {
    return <GameMenu onStart={startGame} />
  }

  if (gameState === GAME_STATES.FINISHED) {
    return (
      <GameResults
        score={score}
        userAnswers={userAnswers}
        photos={gamePhotos}
        gameStats={gameStats}
        maxStreak={maxStreak}
        onRestart={restartGame}
        onHome={() => router.push("/games")}
      />
    )
  }

  const photo = gamePhotos[currentPhoto]
  const progress = ((currentPhoto + 1) / gamePhotos.length) * 100

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
                onClick={() => router.push("/games")}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Games
              </Button>
              <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                Photo {currentPhoto + 1} of {gamePhotos.length}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center px-3 py-2 rounded-lg ${timeLeft <= 10 ? "bg-red-900/50 border border-red-500/30" : "bg-gray-800"}`}
              >
                <Clock className={`h-4 w-4 mr-2 ${timeLeft <= 10 ? "text-red-400" : "text-yellow-500"}`} />
                <span className={`font-mono text-2xl font-bold ${timeLeft <= 10 ? "text-red-400" : "text-white"}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="flex items-center bg-gray-800 px-3 py-2 rounded-lg">
                <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="text-white font-semibold">{score}</span>
              </div>
              {streak > 1 && (
                <div className="flex items-center bg-orange-900/50 px-3 py-2 rounded-lg border border-orange-500/30">
                  <Zap className="h-4 w-4 text-orange-400 mr-2" />
                  <span className="text-orange-400 font-semibold">{streak} streak!</span>
                </div>
              )}
            </div>
          </div>
          <Progress value={progress} className="h-2 bg-gray-800" />
        </div>

        {/* Photo Card */}
        <motion.div
          key={currentPhoto}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`${getDifficultyColor(photo.difficulty)} text-white`}>
                    {photo.difficulty.toUpperCase()}
                  </Badge>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-400">
                      <Target className="h-4 w-4 mr-1" />
                      <span>{photo.points} base points</span>
                    </div>
                    <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                      {photo.photoType}
                    </Badge>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Who is this person?</h2>
              </div>

              {/* Photo Display */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <img
                    src={photo.photo || "/placeholder.svg"}
                    alt="Guess who this is"
                    className="w-80 h-80 object-cover rounded-xl border-2 border-gray-600"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
                    <Camera className="h-4 w-4 inline mr-1" />
                    {photo.photoType}
                  </div>
                </div>
              </div>

              {/* Hint Section */}
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg"
                >
                  <div className="flex items-center text-blue-400 mb-2">
                    <Eye className="h-4 w-4 mr-2" />
                    <span className="font-semibold">Hint:</span>
                  </div>
                  <p className="text-blue-300">{photo.hint}</p>
                </motion.div>
              )}

              {/* Answer Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {photo.options.map((option, index) => (
                  <AnswerOption
                    key={index}
                    option={option}
                    index={index}
                    isSelected={selectedAnswer === index}
                    isCorrect={index === photo.correctAnswer}
                    showResult={showResult}
                    onClick={() => handleAnswerSelect(index)}
                  />
                ))}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-gray-700/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {userAnswers[userAnswers.length - 1]?.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span className="text-white">
                        {userAnswers[userAnswers.length - 1]?.timeUp
                          ? "Time's up!"
                          : userAnswers[userAnswers.length - 1]?.isCorrect
                            ? `Correct! +${userAnswers[userAnswers.length - 1]?.points} points`
                            : `Incorrect! The answer was ${photo.options[photo.correctAnswer]}`}
                      </span>
                    </div>
                    {userAnswers[userAnswers.length - 1]?.isCorrect && (
                      <div className="text-green-400 text-sm">
                        Time bonus: +{Math.floor(userAnswers[userAnswers.length - 1]?.timeRemaining * 2)} pts
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={useHint}
                  disabled={showHint || showResult}
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-900/20"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Use Hint
                </Button>
                <div className="text-gray-400 text-sm flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  +2 points per second remaining
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
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
              <Camera className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Guess Who?</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Look at childhood photos, baby pictures, and funny moments. Can you guess which classmate or teacher it
              is? You have 30 seconds per photo!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Camera className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">8 Photos</h3>
                <p className="text-gray-400 text-sm">Childhood, baby, funny, and event photos</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">30 Seconds</h3>
                <p className="text-gray-400 text-sm">Per photo to make your guess</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Time Bonus</h3>
                <p className="text-gray-400 text-sm">+2 points per second remaining</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Game Rules</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Each photo has base points (Easy: 100pts, Medium: 150pts, Hard: 200pts)
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Get time bonus: +2 points for each second remaining</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Use hints if you're stuck (no penalty)</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Build streaks for consecutive correct answers</span>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={onStart}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
          >
            <Camera className="mr-2 h-5 w-5" />
            Start Guessing!
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

function AnswerOption({ option, index, isSelected, isCorrect, showResult, onClick }) {
  const getOptionStyle = () => {
    if (!showResult) {
      return isSelected
        ? "bg-purple-600 border-purple-500 text-white"
        : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500"
    }

    if (isCorrect) {
      return "bg-green-600 border-green-500 text-white"
    }

    if (isSelected && !isCorrect) {
      return "bg-red-600 border-red-500 text-white"
    }

    return "bg-gray-700 border-gray-600 text-gray-400"
  }

  return (
    <motion.button
      whileHover={!showResult ? { scale: 1.02 } : {}}
      whileTap={!showResult ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={showResult}
      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${getOptionStyle()}`}
    >
      <div className="flex items-center">
        <span className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-4 text-sm font-semibold">
          {String.fromCharCode(65 + index)}
        </span>
        <span className="flex-grow font-medium">{option}</span>
        {showResult && isCorrect && <CheckCircle className="h-5 w-5 text-white ml-2" />}
        {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-white ml-2" />}
      </div>
    </motion.button>
  )
}

function GameResults({ score, userAnswers, photos, gameStats, maxStreak, onRestart, onHome }) {
  const scoreGrade = getScoreGrade(score, photos.length)
  const accuracy =
    gameStats.correct + gameStats.incorrect > 0
      ? (gameStats.correct / (gameStats.correct + gameStats.incorrect)) * 100
      : 0

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="h-24 w-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Game Complete!</h1>
            <div className={`text-6xl font-bold ${scoreGrade.color} mb-2`}>{scoreGrade.grade}</div>
            <p className="text-xl text-gray-400">{scoreGrade.message}</p>
          </div>

          {/* Score Summary */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{score}</div>
                <p className="text-gray-400 text-sm">Total Score</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{accuracy.toFixed(1)}%</div>
                <p className="text-gray-400 text-sm">Accuracy</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{maxStreak}</div>
                <p className="text-gray-400 text-sm">Best Streak</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Eye className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{gameStats.hintsUsed}</div>
                <p className="text-gray-400 text-sm">Hints Used</p>
              </CardContent>
            </Card>
          </div>

          {/* Photo Review */}
          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">Photo Review</h3>
              <div className="space-y-4">
                {photos.map((photo, index) => {
                  const userAnswer = userAnswers[index]
                  return (
                    <div key={photo.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start space-x-4">
                          <img
                            src={photo.photo || "/placeholder.svg"}
                            alt="Photo"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-grow">
                            <p className="text-white font-medium">Photo {index + 1}</p>
                            <p className="text-gray-400 text-sm">Type: {photo.photoType}</p>
                            <p className="text-gray-400 text-sm">Correct: {photo.options[photo.correctAnswer]}</p>
                          </div>
                        </div>
                        <div className="flex items-center ml-4">
                          {userAnswer?.isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span className="ml-2 text-sm text-gray-400">
                            {userAnswer?.isCorrect ? `+${userAnswer.points}` : "0"} pts
                          </span>
                        </div>
                      </div>
                      {userAnswer?.timeUp && <p className="text-red-400 text-sm">Time's up!</p>}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
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
              Share Score
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

function getScoreGrade(score, totalPhotos) {
  const maxScore = totalPhotos * 260 // Max possible with time bonus
  const percentage = (score / maxScore) * 100

  if (percentage >= 90) return { grade: "A+", color: "text-green-400", message: "Photo Detective!" }
  if (percentage >= 80) return { grade: "A", color: "text-green-400", message: "Excellent Recognition!" }
  if (percentage >= 70) return { grade: "B+", color: "text-blue-400", message: "Great Memory!" }
  if (percentage >= 60) return { grade: "B", color: "text-blue-400", message: "Good Guessing!" }
  if (percentage >= 50) return { grade: "C", color: "text-yellow-400", message: "Not Bad!" }
  return { grade: "D", color: "text-red-400", message: "Need More Practice!" }
}
