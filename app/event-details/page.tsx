"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import EventDetails from "@/components/event-details"

export default function EventDetailsPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Event Details</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            This is a Demo Webpage , not even a single information is correct here!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <EventDetails />
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Info className="h-5 w-5 text-purple-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">Important Information</h3>
                </div>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2 flex-shrink-0"></span>
                    <span>Tickets will be distributed in class starting Aug 10.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2 flex-shrink-0"></span>
                    <span>Each student can bring two family members.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2 flex-shrink-0"></span>
                    <span>Parking is available in the school's main parking lot.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2 flex-shrink-0"></span>
                    <span>Professional photographers will be present to capture the event.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="rounded-xl overflow-hidden">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3342.3967840614237!2d81.32917497477072!3d21.18290338050517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a293cc87a93fbd3%3A0xa0147ca4f63aed89!2sBSP%20Senior%20Secondary%20School%20Sector%2010%2C%20Bhilai!5e1!3m2!1sen!2sin!4v1748399516175!5m2!1sen!2sin"
    width="100%"
    height="250"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Get Directions</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-purple-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">Add to Calendar</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Don't miss this special event! Add it to your calendar to receive reminders.
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-900/20"
                  >
                    Google Calendar
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-900/20"
                  >
                    Apple Calendar
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-900/20"
                  >
                    Outlook
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
