"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Filter, Award, UserPlus, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import NomineeCard from "@/components/nominee-card"

// Update the categories array to include Mr. Farewell and Miss Farewell at the beginning
const categories = [
  "All Categories",
  "Mr. Farewell",
  "Miss Farewell",
  "Most Likely to Succeed",
  "Most Creative",
  "Most Athletic",
  "Best Dressed",
  "Most Talented",
  "Class Clown",
  "Most Helpful",
]

// Update the nominees array to include candidates for Mr. Farewell and Miss Farewell
const nominees = [
  {
    id: 1,
    name: "Jahnvi Pandey",
    photo: "/janvi.jpeg",
    category: "Miss Farewell",
    achievements: ["Class President", "Science Olympiad Winner", "Perfect Attendance"],
    skills: ["Leadership", "Public Speaking", "Problem Solving"],
  },
  {
    id: 2,
    name: "Siddhi Gosai",
    photo: "/siddhi.jpeg",
    category: "Miss Farewell",
    achievements: ["Basketball Team Captain", "Student Council Member", "Community Service Award"],
    skills: ["Athletics", "Team Leadership", "Public Speaking"],
  },
  {
    id: 3,
    name: "Md Jeeshan",
    photo: "/jeeshan.jpeg",
    category: "Mr. Farewell",
    achievements: ["Debate Team Captain", "Academic Excellence Award", "School Ambassador"],
    skills: ["Critical Thinking", "Communication", "Problem Solving"],
  },
  {
    id: 4,
    name: "Ishita",
    photo: "/placeholder.svg?height=300&width=300",
    category: "Best Dressed",
    achievements: ["Student Council President", "National Merit Scholar", "Volunteer of the Year"],
    skills: ["Leadership", "Organization", "Public Speaking"],
  },
  {
    id: 5,
    name: "Karishma Khatri",
    photo: "/karishma2.jpeg",
    category: "Best Dressed",
    achievements: ["Drama Club President", "Art Competition Winner", "School Newspaper Editor"],
    skills: ["Creativity", "Performance", "Writing"],
  },
  {
    id: 6,
    name: "Ayush Kumar",
    photo: "/ayush.jpeg",
    category: "Mr. Farewell",
    achievements: ["Volleyball Team Captain", "Honor Society Member", "Peer Mentor Program Lead"],
    skills: ["Athletics", "Leadership", "Mentoring"],
  },
  {
    id: 7,
    name: "Ashutosh Kumar",
    photo: "/placeholder.svg?height=300&width=300",
    category: "Class Clown",
    achievements: ["Basketball Team Captain", "Track & Field Champion", "Sports MVP"],
    skills: ["Basketball", "Running", "Team Leadership"],
  },
  {
    id: 8,
    name: "Utsav Mandal",
    photo: "/utsav.jpeg",
    category: "Mr. Farewell",
    achievements: ["Fashion Club President", "Yearbook Committee", "Prom Committee"],
    skills: ["Fashion Design", "Photography", "Event Planning"],
  },
  {
    id: 9,
    name: "Gauri Sharma",
    photo: "/gauri.jpeg",
    category: "Class Clown",
    achievements: ["School Band Lead", "Talent Show Winner", "Music Competition Finalist"],
    skills: ["Guitar", "Piano", "Singing"],
  },
  {
    id: 10,
    name: "Akshya Shukla",
    photo: "/placeholder.svg?height=300&width=300",
    category: "Best Dressed",
    achievements: ["Comedy Club Member", "School Play Lead", "Talent Show Host"],
    skills: ["Comedy", "Acting", "Public Speaking"],
  },
  {
    id: 11,
    name: "Vedant Sahu",
    photo: "/placeholder.svg?height=300&width=300",
    category: "Most Helpful",
    achievements: ["Volunteer Club President", "Peer Tutor", "Community Service Award"],
    skills: ["Teaching", "Organization", "Communication"],
  },
  {
    id: 12,
    name: "Md .Jeeshan",
    photo: "/placeholder.svg?height=300&width=300",
    category: "Most Likely to Succeed",
    achievements: ["Debate Team Captain", "Math Competition Winner", "Student Council VP"],
    skills: ["Critical Thinking", "Mathematics", "Debate"],
  },
  {
    id: 13,
    name: "Akshat Trivedi",
    photo: "/placeholder.svg?height=300&width=300",
    category: "Most Creative",
    achievements: ["Photography Club President", "School Newspaper Editor", "Art Exhibition Winner"],
    skills: ["Photography", "Editing", "Graphic Design"],
  },
  {
    id: 14,
    name: "Shreya Bais",
    photo: "/shreya1.jpeg",
    category: "Most Creative",
    achievements: ["Art Competition Winner", "School Magazine Editor", "Drama Club Lead"],
    skills: ["Painting", "Writing", "Acting"],
  },
]

// Replace the existing export default function with this updated version
export default function VotingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [votedFor, setVotedFor] = useState({
    "Mr. Farewell": null,
    "Miss Farewell": null,
  })
  const [votingEnds] = useState(() => {
    // Set voting end date to 7 days from now
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 7)
    return endDate
  })

  const filteredNominees = nominees.filter((nominee) => {
    const matchesSearch = nominee.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || nominee.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Get Mr. and Miss Farewell nominees for the featured section
  const mrFarewellNominees = nominees.filter((nominee) => nominee.category === "Mr. Farewell")
  const missFarewellNominees = nominees.filter((nominee) => nominee.category === "Miss Farewell")

  const handleVote = (category, nomineeId) => {
    if (category === "Mr. Farewell" || category === "Miss Farewell") {
      setVotedFor((prev) => ({
        ...prev,
        [category]: nomineeId,
      }))
    }
  }

  // Calculate time remaining
  const calculateTimeRemaining = () => {
    const now = new Date()
    const difference = votingEnds - now

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

    return { days, hours, minutes }
  }

  const timeRemaining = calculateTimeRemaining()

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Live Voting</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Vote for your peers in various categories, including Mr. Farewell and Miss Farewell. Each nominee has been
            selected for their unique achievements and skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/voting/nominate" className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                Submit a Nomination
              </Link>
            </Button>
            <div className="flex items-center justify-center bg-gray-800 px-4 py-2 rounded-md border border-gray-700">
              <Clock className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-gray-300 text-sm">
                Voting ends in:{" "}
                <span className="text-white font-semibold">
                  {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
                </span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Featured Mr. and Miss Farewell Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-white inline-block relative">
              <span className="relative z-10">Special Categories</span>
              <span className="absolute bottom-0 left-0 right-0 h-3 bg-purple-600/20 -z-0"></span>
            </h2>
            <p className="text-gray-400 mt-2">Vote for one candidate in each of these special categories</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Mr. Farewell Section */}
            <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center mr-3">
                  <Award className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Mr. Farewell</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Vote for the student who best represents the spirit of our school and has made a significant impact
                during their time here.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mrFarewellNominees.map((nominee) => (
                  <div
                    key={nominee.id}
                    className={`relative rounded-lg overflow-hidden border ${
                      votedFor["Mr. Farewell"] === nominee.id
                        ? "border-green-500"
                        : "border-gray-700 hover:border-purple-500/50"
                    } transition-all duration-300`}
                  >
                    <div className="aspect-square">
                      <img
                        src={nominee.photo || "/placeholder.svg"}
                        alt={nominee.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-white text-center">{nominee.name}</h4>
                      <div className="mt-2">
                        <Button
                          size="sm"
                          className={`w-full ${
                            votedFor["Mr. Farewell"] === nominee.id
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-purple-600 hover:bg-purple-700"
                          } text-white`}
                          onClick={() => handleVote("Mr. Farewell", nominee.id)}
                          disabled={votedFor["Mr. Farewell"] !== null && votedFor["Mr. Farewell"] !== nominee.id}
                        >
                          {votedFor["Mr. Farewell"] === nominee.id ? "Voted" : "Vote"}
                        </Button>
                      </div>
                    </div>
                    {votedFor["Mr. Farewell"] === nominee.id && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Your Choice
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Miss Farewell Section */}
            <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center mr-3">
                  <Award className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Miss Farewell</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Vote for the student who best represents the spirit of our school and has made a significant impact
                during their time here.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {missFarewellNominees.map((nominee) => (
                  <div
                    key={nominee.id}
                    className={`relative rounded-lg overflow-hidden border ${
                      votedFor["Miss Farewell"] === nominee.id
                        ? "border-green-500"
                        : "border-gray-700 hover:border-purple-500/50"
                    } transition-all duration-300`}
                  >
                    <div className="aspect-square">
                      <img
                        src={nominee.photo || "/placeholder.svg"}
                        alt={nominee.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-white text-center">{nominee.name}</h4>
                      <div className="mt-2">
                        <Button
                          size="sm"
                          className={`w-full ${
                            votedFor["Miss Farewell"] === nominee.id
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-purple-600 hover:bg-purple-700"
                          } text-white`}
                          onClick={() => handleVote("Miss Farewell", nominee.id)}
                          disabled={votedFor["Miss Farewell"] !== null && votedFor["Miss Farewell"] !== nominee.id}
                        >
                          {votedFor["Miss Farewell"] === nominee.id ? "Voted" : "Vote"}
                        </Button>
                      </div>
                    </div>
                    {votedFor["Miss Farewell"] === nominee.id && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Your Choice
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search nominees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <Filter className="h-4 w-4 mr-2 text-purple-400" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedCategory !== "All Categories" && (
          <div className="mb-8 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-purple-400 mr-2" />
              <h2 className="text-xl font-bold text-white">{selectedCategory}</h2>
            </div>
            <p className="text-gray-300 text-sm mt-2">
              Vote for the classmate who you think best exemplifies the qualities of {selectedCategory.toLowerCase()}.
            </p>
          </div>
        )}

        {filteredNominees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNominees.map((nominee, index) => (
              <motion.div
                key={nominee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NomineeCard
                  name={nominee.name}
                  photo={nominee.photo}
                  category={nominee.category}
                  achievements={nominee.achievements}
                  skills={nominee.skills}
                  hideVotes={true}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No nominees found matching your search criteria.</p>
            <Button
              variant="outline"
              className="mt-4 border-purple-500/50 text-purple-400 hover:bg-purple-900/20"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All Categories")
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
