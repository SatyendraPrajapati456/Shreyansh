"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Upload, Filter, Search, X, Heart, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogClose } from "@/components/ui/dialog"

// Mock data for gallery images
const categories = ["All Photos", "Classroom", "Events", "Sports", "Trips", "Performances"]

const galleryImages = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `/placeholder.svg?height=400&width=400&text=Memory+${i + 1}`,
  alt: `Memory ${i + 1}`,
  category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
  likes: Math.floor(Math.random() * 50) + 5,
  uploadedBy: ["Alex", "Emma", "Michael", "Sophia", "James"][Math.floor(Math.random() * 5)],
}))

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Photos")
  const [selectedImage, setSelectedImage] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredImages = galleryImages.filter((image) => {
    const matchesSearch =
      image.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Photos" || image.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const openImageDialog = (image) => {
    setSelectedImage(image)
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Memory Gallery</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Browse through the collection of memories shared by students and teachers. Relive the moments that made our
            school years special.
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
            <Link href="/gallery/upload" className="flex items-center">
              <Upload className="mr-2 h-4 w-4" /> Upload Your Photos
            </Link>
          </Button>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search photos..."
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

        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="aspect-square overflow-hidden rounded-lg relative group cursor-pointer"
                onClick={() => openImageDialog(image)}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{image.uploadedBy}</span>
                    <div className="flex items-center text-white text-sm">
                      <Heart className="h-3 w-3 mr-1 text-red-500" />
                      {image.likes}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No photos found matching your search criteria.</p>
            <Button
              variant="outline"
              className="mt-4 border-purple-500/50 text-purple-400 hover:bg-purple-900/20"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All Photos")
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        {/* Image Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-3xl p-0 overflow-hidden">
            <DialogHeader className="absolute top-0 right-0 z-10 p-2">
              <DialogClose className="rounded-full h-8 w-8 flex items-center justify-center bg-black/50 hover:bg-black/70">
                <X className="h-4 w-4 text-white" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            {selectedImage && (
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 bg-black">
                  <img
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="md:w-1/3 p-4 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white">{selectedImage.alt}</h3>
                    <p className="text-sm text-gray-400">Uploaded by {selectedImage.uploadedBy}</p>
                  </div>
                  <div className="flex items-center mb-6">
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
                      <Heart className="h-4 w-4 mr-2 text-red-500" />
                      {selectedImage.likes} Likes
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <div className="mt-auto">
                    <div className="text-xs text-gray-400 mb-2">Category</div>
                    <div className="inline-block bg-purple-900/30 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/30">
                      {selectedImage.category}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
