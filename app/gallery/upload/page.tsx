"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Upload, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for categories
const categories = ["Classroom", "Events", "Sports", "Trips", "Performances"]

export default function UploadPage() {
  const router = useRouter()
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  })

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
      }))
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (id) => {
    setFiles(files.filter((file) => file.id !== id))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (files.length === 0) return

    setUploading(true)

    // Simulate upload
    setTimeout(() => {
      setUploading(false)
      setUploadComplete(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/gallery")
      }, 2000)
    }, 2000)
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Upload Your Photos</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Share your favorite school memories with everyone. Upload photos from events, trips, classroom activities,
            or any special moments.
          </p>
        </motion.div>

        {uploadComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center p-8 bg-gray-800 rounded-lg border border-green-500/30"
          >
            <div className="h-16 w-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Upload Complete!</h2>
            <p className="text-gray-400 mb-6">
              Your photos have been successfully uploaded and will be visible in the gallery after review.
            </p>
            <Button onClick={() => router.push("/gallery")} className="bg-purple-600 hover:bg-purple-700 text-white">
              Go to Gallery
            </Button>
          </motion.div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-white">
                            Title
                          </Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="Enter a title for your photos"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-white">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            name="description"
                            placeholder="Tell us about these photos"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-white">
                            Category
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => handleSelectChange("category", value)}
                            required
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select a category" />
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
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <Label className="text-white">Upload Photos</Label>
                        <div
                          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer"
                          onClick={() => document.getElementById("file-upload").click()}
                        >
                          <div className="flex flex-col items-center">
                            <Upload className="h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-gray-300 font-medium">Drag and drop your photos here</p>
                            <p className="text-gray-400 text-sm mt-1">or click to browse</p>
                            <p className="text-gray-500 text-xs mt-2">JPG, PNG or GIF • Max 5MB per file</p>
                          </div>
                          <Input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </div>

                        {files.length > 0 && (
                          <div className="space-y-2 mt-4">
                            <Label className="text-white">Selected Photos ({files.length})</Label>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                              {files.map((file) => (
                                <div key={file.id} className="flex items-center bg-gray-700 rounded-md p-2 group">
                                  <div className="h-12 w-12 rounded bg-gray-600 overflow-hidden flex-shrink-0 mr-3">
                                    <img
                                      src={file.preview || "/placeholder.svg"}
                                      alt={file.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-grow min-w-0">
                                    <p className="text-sm text-white truncate">{file.name}</p>
                                    <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-600"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      removeFile(file.id)
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Remove</span>
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                  disabled={files.length === 0 || uploading}
                >
                  {uploading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photos
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
