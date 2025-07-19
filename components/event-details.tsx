import { Calendar, Clock, MapPin, ScrollText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EventDetails() {
  return (
    <Tabs defaultValue="venue" className="w-full max-w-3xl mx-auto">
      <TabsList className="grid grid-cols-3 w-full bg-gray-800">
        <TabsTrigger value="venue" className="data-[state=active]:bg-purple-600">
          Venue & Time
        </TabsTrigger>
        <TabsTrigger value="rules" className="data-[state=active]:bg-purple-600">
          Rules
        </TabsTrigger>
        <TabsTrigger value="schedule" className="data-[state=active]:bg-purple-600">
          Schedule
        </TabsTrigger>
      </TabsList>

      <TabsContent value="venue" className="mt-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-purple-500 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Venue</h3>
                  <p className="text-gray-300">Gonna Reveal Soon</p>
                  <p className="text-gray-400 text-sm mt-1">
                    The venue is equipped with state-of-the-art sound and lighting systems to make this farewell
                    unforgettable.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="h-6 w-6 text-purple-500 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Date</h3>
                  <p className="text-gray-300">26 Nov,2025</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Mark your calendars for this special day to celebrate with your friends and teachers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-purple-500 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Time</h3>
                  <p className="text-gray-300">Soon</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Doors open at Soon. Please arrive early to avoid any last-minute rush.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="rules" className="mt-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <ScrollText className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Event Rules</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2 flex-shrink-0"></span>
                    <span>All students must present their passes at the entrance.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2 flex-shrink-0"></span>
                    <span>Formal or semi-formal attire is required for the event.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2 flex-shrink-0"></span>
                    <span>Photography is encouraged, but please be respectful of others' privacy.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2 flex-shrink-0"></span>
                    <span>No outside food or beverages are allowed. Refreshments will be provided.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2 flex-shrink-0"></span>
                    <span>Please maintain decorum during speeches and performances.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2 flex-shrink-0"></span>
                    <span>Voting for awards will close at 7:00 PM sharp.</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="schedule" className="mt-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-purple-900"></div>
              <ul className="space-y-6">
                <TimelineItem time="5:00 PM" event="Welcome & Registration" />
                <TimelineItem time="5:30 PM" event="Opening Ceremony & Principal's Address" />
                <TimelineItem time="6:00 PM" event="Cultural Performances" />
                <TimelineItem time="7:00 PM" event="Dinner & Networking" />
                <TimelineItem time="8:00 PM" event="Awards Ceremony" />
                <TimelineItem time="9:00 PM" event="Dance & Celebration" />
                <TimelineItem time="10:00 PM" event="Closing Ceremony" />
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function TimelineItem({ time, event }) {
  return (
    <li className="ml-12 relative">
      <div className="absolute -left-12 mt-1.5 h-4 w-4 rounded-full border border-purple-500 bg-gray-900"></div>
      <time className="text-sm font-semibold text-purple-400">{time}</time>
      <h3 className="text-white mt-1">{event}</h3>
    </li>
  )
}
