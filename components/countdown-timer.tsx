"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isClient, setIsClient] = useState(false)

  // Target date: November 26, 2025
  const targetDate = new Date("2025-11-26T10:00:00").getTime()

  useEffect(() => {
    setIsClient(true)

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!isClient) {
    return null // Prevent hydration mismatch
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days, color: "from-purple-600 to-purple-400" },
    { label: "Hours", value: timeLeft.hours, color: "from-blue-600 to-blue-400" },
    { label: "Minutes", value: timeLeft.minutes, color: "from-pink-600 to-pink-400" },
    { label: "Seconds", value: timeLeft.seconds, color: "from-orange-600 to-orange-400" },
  ]

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="inline-flex items-center bg-purple-900/30 px-4 py-2 rounded-full border border-purple-500/30 mb-6">
          <Sparkles className="h-4 w-4 text-purple-400 mr-2" />
          <span className="text-purple-300 text-sm font-medium">The Big Day is Coming</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Countdown to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Farewell 2025
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          The moment we've all been waiting for is almost here. Join us for an unforgettable celebration of memories,
          friendships, and new beginnings.
        </p>
      </motion.div>

      {/* Countdown Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm">
              <CardContent className="p-6">
                <div
                  className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${unit.color} bg-clip-text text-transparent mb-2`}
                >
                  {unit.value.toString().padStart(2, "0")}
                </div>
                <div className="text-gray-400 text-sm md:text-base font-medium uppercase tracking-wider">
                  {unit.label}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
      </div>
    </div>
  )
}
