import Link from "next/link"
import { ReactNode } from 'react';
import { ArrowRight, Award, Calendar, Camera, GamepadIcon, Gift, Play, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import NomineeCard from "@/components/nominee-card"
import EventDetails from "@/components/event-details"
import GameLeaderboard from "@/components/game-leaderboard"
import CountdownTimer from "@/components/countdown-timer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />

      {/* Countdown Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto">
          <CountdownTimer />
        </div>
      </section>


      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-400">Farewell Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Play className="h-10 w-10 text-purple-500" />}
              title="Teacher Videos"
              description="Watch heartfelt goodbye messages from your favorite teachers"
              link="/videos"
            />
            <FeatureCard
              icon={<Award className="h-10 w-10 text-purple-500" />}
              title="Live Voting"
              description="Vote for your peers in various categories and celebrate achievements"
              link="/voting"
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-purple-500" />}
              title="Event Details"
              description="Get all information about venue, date, time and rules"
              link="/event-details"
            />
            <FeatureCard
              icon={<Camera className="h-10 w-10 text-purple-500" />}
              title="Gallery"
              description="View and upload your favorite memories with friends"
              link="/gallery"
            />
            <FeatureCard
              icon={<Gift className="h-10 w-10 text-purple-500" />}
              title="Sponsors"
              description="Check out the amazing sponsors who made this event possible"
              link="/sponsors"
            />
            <FeatureCard
              icon={<GamepadIcon className="h-10 w-10 text-purple-500" />}
              title="Games"
              description="Play interactive games and compete on the leaderboard"
              link="/games"
            />
          </div>
        </div>
      </section>

      {/* Nominees Preview Section */}
      <section className="py-20 px-4 md:px-6 bg-gray-900">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-400">Featured Nominees</h2>
            <Link href="/voting" className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NomineeCard
              name="Jhanvi "
              photo="/janvi.jpeg"
              category="Most Likely to Succeed"
              achievements={["Class President", "Science Olympiad Winner", "Perfect Attendance"]}
              skills={["Leadership", "Public Speaking", "Problem Solving"]}
            />
            <NomineeCard
              name="Trial 2"
              photo="/closedpng.png"
              category="Most Creative"
              achievements={["Art Competition Winner", "School Magazine Editor", "Drama Club Lead"]}
              skills={["Painting", "Writing", "Acting"]}
            />
            <NomineeCard
              name="Trial 3"
              photo="/closedpng.png"
              category="Most Athletic"
              achievements={["Basketball Team Captain", "Track & Field Champion", "Sports MVP"]}
              skills={["Basketball", "Running", "Team Leadership"]}
            />
          </div>
          <div className="mt-12 text-center">
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/voting">Vote Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Event Details Preview */}
      <section className="py-20 px-4 md:px-6 bg-black">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-400">Event Information</h2>
          <EventDetails />
          <div className="mt-12 text-center">
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/event-details">View Full Details</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Games Preview */}
      <section className="py-20 px-4 md:px-6 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-400">Games & Leaderboard</h2>
          <GameLeaderboard />
          <div className="mt-12 text-center">
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/games">Play Games</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 px-4 md:px-6 bg-black">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-400">Memory Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg relative group">
                <img
                  src={`/placeholder.svg?height=300&width=300&text=Memory+${i}`}
                  alt={`Memory ${i}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center space-y-4">
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/gallery">View Gallery</Link>
            </Button>
            <div>
              <Button asChild variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-900/20">
                <Link href="/gallery/upload" className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" /> Upload Your Photos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-t from-black to-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-400">Join Us For The Farewell</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Don't miss this once-in-a-lifetime opportunity to celebrate your school journey with friends and teachers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-900/20">
              <Link href="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link }) => {
  return (
    <Link href={link} className="block">
      <div className="bg-gray-800 rounded-xl p-6 h-full transition-all duration-300 hover:bg-gray-700 hover:shadow-lg hover:shadow-purple-500/20 border border-gray-700 hover:border-purple-500/50">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-purple-300">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </Link>
  );
};