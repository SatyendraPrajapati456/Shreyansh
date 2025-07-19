"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { X, Camera, ArrowLeft, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Categories for nomination
const categories = [
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

export default function NominatePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("self")
  const [photoPreview, setPhotoPreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    class: "",
    section: "",
    category: "",
    achievements: "",
    skills: "",
    bio: "",
    nominatorName: "",
    nominatorEmail: "",
    nominatorRelation: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setPhotoPreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
    }, 1500)
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    router.push("/voting")
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link
            href="/voting"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Voting
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Nomination Form</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Submit a nomination for yourself or someone else for our farewell awards. Nominations will be reviewed by
            the committee before being added to the voting page.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="self" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-gray-800">
              <TabsTrigger value="self" className="data-[state=active]:bg-purple-600">
                Nominate Yourself
              </TabsTrigger>
              <TabsTrigger value="other" className="data-[state=active]:bg-purple-600">
                Nominate Someone Else
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Nominee Information */}
              <div>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                      {activeTab === "self" ? "Your Information" : "Nominee Information"}
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="class" className="text-white">
                            Class
                          </Label>
                          <Select value={formData.class} onValueChange={(value) => handleSelectChange("class", value)}>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="10">Class 10</SelectItem>
                              <SelectItem value="11">Class 11</SelectItem>
                              <SelectItem value="12">Class 12</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="section" className="text-white">
                            Section
                          </Label>
                          <Select
                            value={formData.section}
                            onValueChange={(value) => handleSelectChange("section", value)}
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="A">Section A</SelectItem>
                              <SelectItem value="B">Section B</SelectItem>
                              <SelectItem value="C">Section C</SelectItem>
                              <SelectItem value="D">Section D</SelectItem>
                              <SelectItem value="E">Section E</SelectItem>
                              <SelectItem value="F">Section F</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-white">
                          Nomination Category
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
                        {formData.category === "Mr. Farewell" && (
                          <p className="text-yellow-400 text-xs flex items-start mt-1">
                            <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                            This category is for male students only.
                          </p>
                        )}
                        {formData.category === "Miss Farewell" && (
                          <p className="text-yellow-400 text-xs flex items-start mt-1">
                            <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                            This category is for female students only.
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {activeTab === "other" && (
                  <Card className="bg-gray-800 border-gray-700 mt-6">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold text-white mb-4">Your Information (Nominator)</h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="nominatorName" className="text-white">
                            Your Name
                          </Label>
                          <Input
                            id="nominatorName"
                            name="nominatorName"
                            placeholder="Enter your name"
                            value={formData.nominatorName}
                            onChange={handleInputChange}
                            required
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nominatorEmail" className="text-white">
                            Your Email
                          </Label>
                          <Input
                            id="nominatorEmail"
                            name="nominatorEmail"
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.nominatorEmail}
                            onChange={handleInputChange}
                            required
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nominatorRelation" className="text-white">
                            Relationship to Nominee
                          </Label>
                          <Select
                            value={formData.nominatorRelation}
                            onValueChange={(value) => handleSelectChange("nominatorRelation", value)}
                            required
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select your relationship" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="classmate">Classmate</SelectItem>
                              <SelectItem value="friend">Friend</SelectItem>
                              <SelectItem value="teacher">Teacher</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Photo Upload and Additional Information */}
              <div className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Photo Upload</h2>
                    <div className="space-y-4">
                      {photoPreview ? (
                        <div className="relative">
                          <img
                            src={photoPreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={removePhoto}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div
                          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer h-64 flex flex-col items-center justify-center"
                          onClick={() => document.getElementById("photo-upload").click()}
                        >
                          <Camera className="h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-gray-300 font-medium">Upload a photo</p>
                          <p className="text-gray-400 text-sm mt-1">Click to browse or drag and drop</p>
                          <p className="text-gray-500 text-xs mt-2">JPG or PNG • Max 5MB</p>
                        </div>
                      )}
                      <Input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      <p className="text-gray-400 text-xs">
                        Please upload a clear, recent photo. For Mr. and Miss Farewell nominations, a formal photo is
                        recommended.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Additional Information</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="achievements" className="text-white">
                          Achievements
                        </Label>
                        <Textarea
                          id="achievements"
                          name="achievements"
                          placeholder="List notable achievements (separate with commas)"
                          value={formData.achievements}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                        />
                        <p className="text-gray-400 text-xs">
                          Example: Class President, Science Olympiad Winner, Basketball Team Captain
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="skills" className="text-white">
                          Skills
                        </Label>
                        <Textarea
                          id="skills"
                          name="skills"
                          placeholder="List key skills (separate with commas)"
                          value={formData.skills}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                        />
                        <p className="text-gray-400 text-xs">Example: Leadership, Public Speaking, Problem Solving</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-white">
                          Personal Statement
                        </Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          placeholder="Why should you/they win this award? (max 200 words)"
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[150px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Nomination"
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Success Dialog */}
        <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
          <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center text-2xl">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 bg-green-600/20 rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                Nomination Submitted!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300 text-center">
                Thank you for your nomination. Our committee will review it shortly. If approved, it will appear on the
                voting page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleSuccessClose} className="bg-purple-600 hover:bg-purple-700 text-white">
                Return to Voting
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
