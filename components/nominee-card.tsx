"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThumbsUp } from "lucide-react"

interface NomineeCardProps {
  name: string
  photo: string
  category: string
  achievements: string[]
  skills: string[]
}

export default function NomineeCard({ name, photo, category, achievements, skills }: NomineeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  const handleVote = (e) => {
    e.stopPropagation()
    setHasVoted(true)
    // Here you would implement the actual voting logic
  }

  return (
    <div className="h-[400px] perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative w-full h-full preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border border-purple-500/30 bg-gray-800">
          <div className="relative h-full flex flex-col">
            <div className="h-3/5 overflow-hidden">
              <img src={photo || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4">
                <Badge className="bg-purple-600">{category}</Badge>
              </div>
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow">
              <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">Click to see details</p>
                <Button
                  size="sm"
                  className={`${hasVoted ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"} text-white`}
                  onClick={handleVote}
                  disabled={hasVoted}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {hasVoted ? "Voted" : "Vote"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border border-purple-500/30 bg-gray-800 rotateY-180">
          <div className="p-6 h-full flex flex-col">
            <h3 className="text-xl font-bold text-white mb-4">{name}</h3>
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-purple-400 mb-2">Achievements</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-purple-400 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-purple-500/50 text-purple-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-auto">
              <Button
                size="sm"
                className={`w-full ${hasVoted ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"} text-white`}
                onClick={handleVote}
                disabled={hasVoted}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                {hasVoted ? "Voted" : "Vote for " + name}
              </Button>
              <p className="text-xs text-gray-400 text-center mt-2">Click card to flip back</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
