"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, User, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Helper to extract YouTube video ID
function getYouTubeId(url: string): string | null {
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[1].length === 11 ? match[1] : null
}

// Mock data for teacher videos
const teacherVideos = [
  {
    id: 1,
    title: "Farewell Message from Principal",
    teacher: "Sumita Sarkar",
    subject: "Principal",
    thumbnail: "/sumita.png",
    duration: "4:32",
    videoUrl: "https://youtu.be/ICJKWNbhqL8",
  },
  {
    id: 2,
    title: "Memories and Wishes",
    teacher: "Mr. Tk Sahu",
    subject: "Mathematics",
    thumbnail: "/placeholder.svg?height=200&width=350&text=Math+Teacher",
    duration: "3:15",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    title: "Future Advice",
    teacher: "Ms. Jaya Ghosh",
    subject: "Science",
    thumbnail: "/placeholder.svg?height=200&width=350&text=Science+Teacher",
    duration: "5:47",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 4,
    title: "Memorable Moments",
    teacher: "Mr. Shukhtel",
    subject: "History",
    thumbnail: "/placeholder.svg?height=200&width=350&text=History+Teacher",
    duration: "4:10",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 5,
    title: "Words of Wisdom",
    teacher: "Mrs. Seema Philips",
    subject: "English",
    thumbnail: "/placeholder.svg?height=200&width=350&text=English+Teacher",
    duration: "3:58",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 6,
    title: "Farewell Speech",
    teacher: "Mr. Panda Sir",
    subject: "Physical Education",
    thumbnail: "/placeholder.svg?height=200&width=350&text=PE+Teacher",
    duration: "2:45",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
]

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredVideos =
    activeTab === "all"
      ? teacherVideos
      : teacherVideos.filter((video) => {
          if (activeTab === "principal" && video.subject === "Principal") return true
          if (activeTab === "academic" && ["Mathematics", "Science", "History", "English"].includes(video.subject))
            return true
          if (
            activeTab === "other" &&
            !["Principal", "Mathematics", "Science", "History", "English"].includes(video.subject)
          )
            return true
          return false
        })

  const openVideoDialog = (video: any) => {
    setSelectedVideo(video)
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Teacher Farewell Videos</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Watch heartfelt goodbye messages from your teachers as they share their memories, advice, and well wishes
            for your future.
          </p>
        </motion.div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto bg-gray-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600">All Videos</TabsTrigger>
            <TabsTrigger value="principal" className="data-[state=active]:bg-purple-600">Principal</TabsTrigger>
            <TabsTrigger value="academic" className="data-[state=active]:bg-purple-600">Academic</TabsTrigger>
            <TabsTrigger value="other" className="data-[state=active]:bg-purple-600">Other</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <CardContent className="p-0">
                  <div className="relative group cursor-pointer" onClick={() => openVideoDialog(video)}>
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="h-16 w-16 rounded-full bg-purple-600/90 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2">{video.title}</h3>
                    <div className="flex items-center text-gray-400 text-sm">
                      <User className="h-3 w-3 mr-1" />
                      <span>{video.teacher}</span>
                      <span className="mx-2">•</span>
                      <span>{video.subject}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Video Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{selectedVideo?.title}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video bg-black rounded-md overflow-hidden">
              {selectedVideo?.videoUrl?.includes("youtube") || selectedVideo?.videoUrl?.includes("youtu.be") ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo.videoUrl)}`}
                  title={selectedVideo?.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video controls className="w-full h-full">
                  <source src={selectedVideo?.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <div className="mt-2">
              <div className="flex items-center text-gray-300 text-sm mb-2">
                <User className="h-4 w-4 mr-1" />
                <span>{selectedVideo?.teacher}</span>
                <span className="mx-2">•</span>
                <span>{selectedVideo?.subject}</span>
              </div>
              <p className="text-gray-400 text-sm">
                Watch this heartfelt message from {selectedVideo?.teacher} as they share memories and wishes for your
                future journey.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
