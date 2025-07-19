"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for sponsors
const sponsors = [
  {
    id: 1,
    name: "Rungta College of Engineering and Technology",
    logo: "/rungtaa.png",
    description: "Leading technology company providing innovative solutions.",
    tier: "platinum",
    website: "https://rungta.ac.in/",
  },
  {
    id: 2,
    name: "Bhilai Institute of Engineering and Technology",
    logo: "/bitDurgLogo.jpg",
    description: "Educational publishing company supporting student success.",
    tier: "platinum",
    website: "https://bitdurg.ac.in/",
  },
  {
    id: 3,
    name: "GrillIn",
    logo: "/grillin.png",
    description: "Catering service providing delicious meals for events.",
    tier: "gold",
    website: "https://grillinn.in/",
  },
  {
    id: 4,
    name: "TripChalein",
    logo: "/trip.jpg",
    description: "Printing company specializing in event materials and yearbooks.",
    tier: "gold",
    website: "https://example.com",
  },
  {
    id: 5,
    name: "Life Fitness",
    logo: "/life.png",
    description: "Neighborhood cafe supporting local school events.",
    tier: "silver",
    website: "https://example.com",
  },
  {
    id: 6,
    name: "Coding Ninjas",
    logo: "/coding.png",
    description: "Professional photography services for all occasions.",
    tier: "silver",
    website: "https://example.com",
  },
  {
    id: 7,
    name: "Silver Bliss Events",
    logo: "/placeholder.svg?height=100&width=200&text=SoundSystems",
    description: "Audio-visual equipment provider for events.",
    tier: "silver",
    website: "https://example.com",
  },
  {
    id: 8,
    name: "The Empreyeans",
    logo: "/placeholder.svg?height=100&width=200&text=DecorDesign",
    description: "Event decoration and design services.",
    tier: "bronze",
    website: "https://example.com",
  },
]

export default function SponsorsPage() {
  const platinumSponsors = sponsors.filter((sponsor) => sponsor.tier === "platinum")
  const goldSponsors = sponsors.filter((sponsor) => sponsor.tier === "gold")
  const silverSponsors = sponsors.filter((sponsor) => sponsor.tier === "silver")
  const bronzeSponsors = sponsors.filter((sponsor) => sponsor.tier === "bronze")

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Sponsors</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We extend our heartfelt gratitude to all the sponsors who have made this farewell event possible. Their
            generous support has helped create lasting memories.
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Platinum Sponsors */}
          <SponsorTier
            title="Platinum Sponsors"
            description="Our premium sponsors who have made exceptional contributions to make this event possible."
            sponsors={platinumSponsors}
            badgeColor="bg-gradient-to-r from-gray-300 to-white"
            textColor="text-gray-900"
          />

          {/* Gold Sponsors */}
          <SponsorTier
            title="Gold Sponsors"
            description="Major contributors who have generously supported our farewell event."
            sponsors={goldSponsors}
            badgeColor="bg-gradient-to-r from-yellow-500 to-yellow-300"
            textColor="text-gray-900"
          />

          {/* Silver Sponsors */}
          <SponsorTier
            title="Silver Sponsors"
            description="Valuable supporters who have helped enhance our farewell celebration."
            sponsors={silverSponsors}
            badgeColor="bg-gradient-to-r from-gray-400 to-gray-300"
            textColor="text-gray-900"
          />

          {/* Bronze Sponsors */}
          <SponsorTier
            title="Bronze Sponsors"
            description="Appreciated contributors to our farewell event."
            sponsors={bronzeSponsors}
            badgeColor="bg-gradient-to-r from-amber-700 to-amber-600"
            textColor="text-white"
          />
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Become a Sponsor</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Interested in supporting our school events? We offer various sponsorship packages with different benefits
            and recognition opportunities.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Contact for Sponsorship</Button>
        </div>
      </div>
    </div>
  )
}

function SponsorTier({ title, description, sponsors, badgeColor, textColor }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={sponsor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className={`h-2 w-full ${badgeColor}`}></div>
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <img src={sponsor.logo || "/placeholder.svg"} alt={sponsor.name} className="h-16 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-2">{sponsor.name}</h3>
                <p className="text-gray-400 text-center text-sm mb-4">{sponsor.description}</p>
                <div className="flex justify-center">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-900/20"
                  >
                    <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      Visit Website <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
