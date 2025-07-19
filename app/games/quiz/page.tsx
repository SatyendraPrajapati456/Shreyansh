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
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Home,
  Share2,
  Zap,
  Target,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    type: "multiple-choice",
    question: "Why is our canteen still closed??",
    options: ["Teachers nahi chah rhe", "Principal ke karan", "Budget ke Karan", "Bunk na mar pae bache isliye"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 10,
    category: "School Staff",
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "In which year was our school established?",
    options: ["1985", "1990", "1971", "2000"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 15,
    category: "School History",
  },
  {
    id: 3,
    type: "true-false",
    question: "Our.",
    options: ["1985", "1990", "1995", "2000"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 10,
    category: "Sports",
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "What is the motto of our school?",
    options: ["Knowledge is Power", "Excellence in Education", "Learn, Lead, Succeed", "Wisdom Through Learning"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 15,
    category: "School Culture",
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "Which teacher is known for their famous quote 'Mathematics is the music of reason'?",
    options: ["Mr. T.K Sahu", "Mrs. Seema Philips", "Dr. Jaya Ghosh", "Mr. C.P Sharma"],
    correctAnswer: 0,
    difficulty: "hard",
    points: 20,
    category: "Teachers",
  },
  {
    id: 6,
    type: "true-false",
    question: "The school library has over 10,000 books.",
    correctAnswer: false,
    difficulty: "medium",
    points: 15,
    category: "Facilities",
  },
  {
    id: 7,
    type: "multiple-choice",
    question: "What is the name of our school's last annual festival?",
    options: ["उक्ति", "अभिव्यंजना", "आरम्भ", "संगम"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 10,
    category: "Events",
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "Which subject has the highest pass rate in our school?",
    options: ["Mathematics", "English", "Science", "Social Studies"],
    correctAnswer: 1,
    difficulty: "hard",
    points: 20,
    category: "Academics",
  },
  {
    id: 9,
    type: "true-false",
    question: "Our school has a swimming pool.",
    correctAnswer: false,
    difficulty: "easy",
    points: 10,
    category: "Facilities",
  },
  {
    id: 10,
    type: "multiple-choice",
    question: "What time does the first period start?",
    options: ["8:00 AM", "8:15 AM", "9:00 AM", "9:30 AM"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 10,
    category: "School Schedule",
  },
]

// Game states
const GAME_STATES = {
  MENU: "menu",
  PLAYING: "playing",
  PAUSED: "paused",
  FINISHED: "finished",
}

export default function QuizGame() {
  const router = useRouter()
  const [gameState, setGameState] = useState(GAME_STATES.MENU)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [userAnswers, setUserAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [showResult, setShowResult] = useState(false)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [gameStats, setGameStats] = useState({
    correct: 0,
    incorrect: 0,
    totalTime: 0,
  })

  // Timer effect
  useEffect(() => {
    let timer
    if (gameState === GAME_STATES.PLAYING && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameState === GAME_STATES.PLAYING) {
      handleFinishGame()
    }
    return () => clearInterval(timer)
  }, [gameState, timeLeft])

  const startGame = () => {
    setGameState(GAME_STATES.PLAYING)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setUserAnswers([])
    setScore(0)
    setTimeLeft(300)
    setStreak(0)
    setMaxStreak(0)
    setGameStats({ correct: 0, incorrect: 0, totalTime: 0 })
  }

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    const question = quizQuestions[currentQuestion]
    const isCorrect =
      question.type === "true-false"
        ? (answerIndex === 0 ? true : false) === question.correctAnswer
        : answerIndex === question.correctAnswer

    const newAnswer = {
      questionId: question.id,
      selectedAnswer: answerIndex,
      isCorrect,
      points: isCorrect ? question.points : 0,
      timeTaken: 300 - timeLeft,
    }

    setUserAnswers((prev) => [...prev, newAnswer])

    if (isCorrect) {
      setScore((prev) => prev + question.points)
      setStreak((prev) => prev + 1)
      setMaxStreak((prev) => Math.max(prev, streak + 1))
      setGameStats((prev) => ({ ...prev, correct: prev.correct + 1 }))
    } else {
      setStreak(0)
      setGameStats((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }))
    }

    // Auto advance after 2 seconds
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        nextQuestion()
      } else {
        handleFinishGame()
      }
    }, 2000)
  }

  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleFinishGame = () => {
    setGameState(GAME_STATES.FINISHED)
    setGameStats((prev) => ({ ...prev, totalTime: 300 - timeLeft }))
  }

  const restartGame = () => {
    startGame()
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getScoreGrade = () => {
    const percentage = (score / (quizQuestions.length * 15)) * 100 // Average 15 points per question
    if (percentage >= 90) return { grade: "A+", color: "text-green-400", message: "Outstanding!" }
    if (percentage >= 80) return { grade: "A", color: "text-green-400", message: "Excellent!" }
    if (percentage >= 70) return { grade: "B+", color: "text-blue-400", message: "Great job!" }
    if (percentage >= 60) return { grade: "B", color: "text-blue-400", message: "Good work!" }
    if (percentage >= 50) return { grade: "C", color: "text-yellow-400", message: "Not bad!" }
    return { grade: "D", color: "text-red-400", message: "Keep practicing!" }
  }

  if (gameState === GAME_STATES.MENU) {
    return <GameMenu onStart={startGame} />
  }

  if (gameState === GAME_STATES.FINISHED) {
    return (
      <GameResults
        score={score}
        userAnswers={userAnswers}
        questions={quizQuestions}
        gameStats={gameStats}
        maxStreak={maxStreak}
        onRestart={restartGame}
        onHome={() => router.push("/games")}
      />
    )
  }

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

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
                Question {currentQuestion + 1} of {quizQuestions.length}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-800 px-3 py-2 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                <span className={`font-mono ${timeLeft < 60 ? "text-red-400" : "text-white"}`}>
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

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`${getDifficultyColor(question.difficulty)} text-white`}>
                    {question.difficulty.toUpperCase()}
                  </Badge>
                  <div className="flex items-center text-gray-400">
                    <Target className="h-4 w-4 mr-1" />
                    <span>{question.points} points</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{question.question}</h2>
                <p className="text-purple-400 text-sm">Category: {question.category}</p>
              </div>

              <div className="space-y-4">
                {question.type === "multiple-choice" ? (
                  question.options.map((option, index) => (
                    <AnswerOption
                      key={index}
                      option={option}
                      index={index}
                      isSelected={selectedAnswer === index}
                      isCorrect={index === question.correctAnswer}
                      showResult={showResult}
                      onClick={() => handleAnswerSelect(index)}
                    />
                  ))
                ) : (
                  <>
                    <AnswerOption
                      option="True"
                      index={0}
                      isSelected={selectedAnswer === 0}
                      isCorrect={question.correctAnswer === true}
                      showResult={showResult}
                      onClick={() => handleAnswerSelect(0)}
                    />
                    <AnswerOption
                      option="False"
                      index={1}
                      isSelected={selectedAnswer === 1}
                      isCorrect={question.correctAnswer === false}
                      showResult={showResult}
                      onClick={() => handleAnswerSelect(1)}
                    />
                  </>
                )}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-gray-700/50"
                >
                  <div className="flex items-center">
                    {userAnswers[userAnswers.length - 1]?.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <span className="text-white">
                      {userAnswers[userAnswers.length - 1]?.isCorrect
                        ? `Correct! +${question.points} points`
                        : "Incorrect!"}
                    </span>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={currentQuestion === quizQuestions.length - 1 ? handleFinishGame : nextQuestion}
                  disabled={selectedAnswer === null}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
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
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Farewell Quiz Challenge</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Test your knowledge about our school, teachers, and memorable moments. How well do you really know your
              school?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">10 Questions</h3>
                <p className="text-gray-400 text-sm">Covering school history, teachers, events, and more</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">5 Minutes</h3>
                <p className="text-gray-400 text-sm">Complete the quiz before time runs out</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Score Points</h3>
                <p className="text-gray-400 text-sm">Earn points based on difficulty and speed</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Quiz Rules</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Each question has a point value based on difficulty (Easy: 10pts, Medium: 15pts, Hard: 20pts)
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Build streaks by answering consecutive questions correctly
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">You have 5 minutes to complete all 10 questions</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Your score will be added to the global leaderboard</span>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={onStart}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
          >
            <Trophy className="mr-2 h-5 w-5" />
            Start Quiz Challenge
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
        <span className="flex-grow">{option}</span>
        {showResult && isCorrect && <CheckCircle className="h-5 w-5 text-white ml-2" />}
        {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-white ml-2" />}
      </div>
    </motion.button>
  )
}

function GameResults({ score, userAnswers, questions, gameStats, maxStreak, onRestart, onHome }) {
  const scoreGrade = getScoreGrade(score, questions.length)
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
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h1>
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
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">
                  {Math.floor(gameStats.totalTime / 60)}:{(gameStats.totalTime % 60).toString().padStart(2, "0")}
                </div>
                <p className="text-gray-400 text-sm">Time Taken</p>
              </CardContent>
            </Card>
          </div>

          {/* Question Review */}
          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">Question Review</h3>
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const userAnswer = userAnswers[index]
                  return (
                    <div key={question.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-grow">
                          <p className="text-white font-medium">{question.question}</p>
                          <p className="text-gray-400 text-sm mt-1">Category: {question.category}</p>
                        </div>
                        <div className="flex items-center ml-4">
                          {userAnswer?.isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span className="ml-2 text-sm text-gray-400">
                            {userAnswer?.isCorrect ? `+${question.points}` : "0"} pts
                          </span>
                        </div>
                      </div>
                      {!userAnswer?.isCorrect && (
                        <p className="text-green-400 text-sm">
                          Correct answer:{" "}
                          {question.type === "true-false"
                            ? question.correctAnswer
                              ? "True"
                              : "False"
                            : question.options[question.correctAnswer]}
                        </p>
                      )}
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

function getScoreGrade(score, totalQuestions) {
  const maxScore = totalQuestions * 15 // Average points per question
  const percentage = (score / maxScore) * 100

  if (percentage >= 90) return { grade: "A+", color: "text-green-400", message: "Outstanding!" }
  if (percentage >= 80) return { grade: "A", color: "text-green-400", message: "Excellent!" }
  if (percentage >= 70) return { grade: "B+", color: "text-blue-400", message: "Great job!" }
  if (percentage >= 60) return { grade: "B", color: "text-blue-400", message: "Good work!" }
  if (percentage >= 50) return { grade: "C", color: "text-yellow-400", message: "Not bad!" }
  return { grade: "D", color: "text-red-400", message: "Keep practicing!" }
}
