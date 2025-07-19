"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Phone,
  Mail,
  Users,
  Award,
  Heart,
  Sparkles,
  Lightbulb,
  Coffee,
  Music,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Team member data with expanded details
const teamMembers = [
  {
    id: 1,
    name: "Maria Kujur",
    role: "Event Manager",
    photo: "/mario.jpeg",
    description:
      "Coordinated all aspects of the farewell event, ensuring everything runs smoothly.",
    bio: "Maria has been participating in school events for the past 3 years. With exceptional leadership skills and attention to detail,she has successfully managed multiple events including last year's annual day celebration.",
    achievements: [
      "Class 11th Arts Topper",
      "Dancer",
      "Leadership Camp Graduate",
    ],
    social: {
      instagram: "https://www.instagram.com/mariaakujur?igsh=eGpyMmpjYWs2MXY0",
      whatsapp: "https://wa.me/1234567890",
      email: "alex@school.edu",
    },
    department: "management",
  },
  {
    id: 2,
    name: "Karishma Khatri",
    role: "Decoration Manager",
    photo: "/karishma.jpeg",
    description:
      "Designed and implemented all decorations and visual elements for the event.",
    bio: "Sophia is known for her creative vision and artistic talents. She has transformed ordinary spaces into extraordinary venues for multiple school events with her innovative decoration ideas.",
    achievements: [
      "Art Competition Winner",
      "Design Club President",
      "School Magazine Cover Designer",
    ],
    social: {
      instagram:
        "https://www.instagram.com/karishmalovesraita?igsh=MW9sY3BlcDNtd283OA==",
      whatsapp: "https://wa.me/1234567891",
      email: "sophia@school.edu",
    },
    department: "creative",
  },
  {
    id: 3,
    name: "S.Jennifer",
    role: "Performance Head",
    photo: "/jenni.jpeg",
    description:
      "Managed fundraising and budget allocation for all farewell activities.",
    bio: "Jennifer has a talent for financial management and fundraising. Her strategic approach to budgeting has helped maximize resources for school events while ensuring fiscal responsibility.",
    achievements: [
      "Treasurer of Student Council",
      "Economics Club Leader",
      "Fundraising Record Holder",
    ],
    social: {
      instagram:
        "https://www.instagram.com/_.jennifferrr._?igsh=dmF6enMxZmd1dTMz",
      whatsapp: "https://wa.me/1234567892",
      email: "michael@school.edu",
    },
    department: "management",
  },
  {
    id: 4,
    name: "Gauri Sharma",
    role: "Performance Assist",
    photo: "/gauri.jpeg",
    description:
      "Created and curated all digital content for the farewell website and social media.",
    bio: "Gauri has a passion for digital media and storytelling. Her ability to capture the essence of events through compelling content has made her an invaluable asset to the team.",
    achievements: [
      "Digital Media Award",
      "School Blog Editor",
      "Photography Contest Winner",
    ],
    social: {
      instagram:
        "https://www.instagram.com/_gaurisharma._?igsh=enR0dTF0dHRzajI4",
      whatsapp: "https://wa.me/1234567893",
      email: "emma@school.edu",
    },
    department: "creative",
  },
  {
    id: 5,
    name: "Shaurya Singh",
    role: "Collection Head",
    photo: "/shaurya.jpeg",
    description:
      "Managed all technical aspects including sound, lighting, and audiovisual elements.",
    bio: "Diddy is the go-to person for all things technical. His expertise in sound engineering and lighting design has elevated the production quality of numerous school events.",
    achievements: [
      "Tech Club President",
      "Robotics Competition Winner",
      "AV Team Lead",
    ],
    social: {
      instagram:
        "https://www.instagram.com/_shouryasinghhh_?igsh=YjJnM3NvemJ1azE5",
      whatsapp: "https://wa.me/1234567894",
      email: "david@school.edu",
    },
    department: "technical",
  },
  {
    id: 6,
    name: "Karan",
    role: "Food & Catering Manager",
    photo: "/ketan.jpeg",
    description:
      "Coordinated with caterers and managed all food-related arrangements for the event.",
    bio: "Olivia has a keen interest in culinary arts and event hospitality. Her meticulous planning ensures that all dietary preferences are accommodated while maintaining high-quality food service.",
    achievements: [
      "Culinary Club Founder",
      "Food Festival Organizer",
      "Hospitality Management Certificate",
    ],
    social: {
      instagram:
        "https://www.instagram.com/vkkumar__2008?igsh=ZXRncDdjM281bzh5",
      whatsapp: "https://wa.me/1234567895",
      email: "olivia@school.edu",
    },
    department: "logistics",
  },
  {
    id: 7,
    name: "Anabiya Sheikh",
    role: "Decoration Assist",
    photo: "/anabiya.jpeg",
    description:
      "Captured all the special moments of the farewell event through photography and videography.",
    bio: "James has an eye for capturing perfect moments. His photography skills have documented countless school memories that will be cherished for years to come.",
    achievements: [
      "Photography Club President",
      "Annual Yearbook Photographer",
      "Visual Arts Award",
    ],
    social: {
      instagram:
        "https://www.instagram.com/anabiya_.sheikh?igsh=MTVwbHYwNDBlbTRhMA==",
      whatsapp: "https://wa.me/1234567896",
      email: "james@school.edu",
    },
    department: "creative",
  },
  {
    id: 8,
    name: "Yagini",
    role: "Performance Assist",
    photo: "/yashi.jpeg",
    description:
      "Handled venue arrangements, transportation, and overall event logistics.",
    bio: "Ava excels at solving complex logistical challenges. Her organizational skills ensure that all practical aspects of events run without a hitch.",
    achievements: [
      "Event Planning Certificate",
      "School Trip Organizer",
      "Volunteer Coordinator",
    ],
    social: {
      instagram: "https://instagram.com/ava_organizes",
      whatsapp: "https://wa.me/1234567897",
      email: "ava@school.edu",
    },
    department: "logistics",
  },
  {
    id: 9,
    name: "Ketan Dubey",
    role: "Social Media Head",
    photo: "/karan.jpeg",
    description:
      "Curated and managed all performances and entertainment activities for the farewell.",
    bio: "Ethan has a background in performing arts and a talent for discovering and showcasing student performances. His entertainment programs are always the highlight of school events.",
    achievements: [
      "Drama Club President",
      "Talent Show Director",
      "Music Competition Winner",
    ],
    social: {
      instagram:
        "https://www.instagram.com/_ketandubey?igsh=MXE0dGZpdjlra21iMQ==",
      whatsapp: "https://wa.me/1234567898",
      email: "ethan@school.edu",
    },
    department: "creative",
  },
  {
    id: 10,
    role: "Social Media Manager",
    name: "Empty Slot",
    photo: "/placeholder.svg?height=300&width=300",
    description:
      "Managed all social media accounts and online promotion for the farewell event.",
    bio: "Mia has a knack for creating engaging social media content that resonates with students. Her strategic approach to digital marketing has significantly increased event participation.",
    achievements: [
      "Digital Marketing Certificate",
      "Social Media Contest Winner",
      "School Influencer Award",
    ],
    social: {
      instagram: "https://instagram.com/mia_social",
      whatsapp: "https://wa.me/1234567899",
      email: "mia@school.edu",
    },
    department: "management",
  },
  {
    id: 11,
    name: "Empty Slot",
    role: "Volunteer Coordinator",
    photo: "/placeholder.svg?height=300&width=300",
    description:
      "Recruited and managed student volunteers for various farewell activities.",
    bio: "Noah is excellent at team building and volunteer management. His ability to match people with the right tasks has created an efficient and motivated volunteer team.",
    achievements: [
      "Community Service Award",
      "Leadership Workshop Facilitator",
      "Peer Mentor Program Lead",
    ],
    social: {
      instagram: "https://instagram.com/noah_leads",
      whatsapp: "https://wa.me/1234567810",
      email: "noah@school.edu",
    },
    department: "management",
  },
  {
    id: 12,
    name: "Empty Slot",
    role: "Sponsorship Coordinator",
    photo: "/placeholder.svg?height=300&width=300",
    description:
      "Secured sponsorships and partnerships to support the farewell event.",
    bio: "Isabella has exceptional networking and negotiation skills. Her ability to build relationships with local businesses has brought valuable sponsorships to school events.",
    achievements: [
      "Business Club Leader",
      "Entrepreneurship Competition Winner",
      "Marketing Challenge Finalist",
    ],
    social: {
      instagram: "https://instagram.com/isabella_connects",
      whatsapp: "https://wa.me/1234567811",
      email: "isabella@school.edu",
    },
    department: "management",
  },
];

// Department icons
const departmentIcons = {
  management: <Users className="h-5 w-5" />,
  creative: <Palette className="h-5 w-5" />,
  technical: <Lightbulb className="h-5 w-5" />,
  logistics: <Coffee className="h-5 w-5" />,
};

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredMembers =
    activeTab === "all"
      ? teamMembers
      : teamMembers.filter((member) => member.department === activeTab);

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our Team
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            The dedicated individuals who worked tirelessly behind the scenes to
            create an unforgettable farewell experience for everyone.
          </p>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center space-y-4 mb-8"
          >
            <h2 className="text-xl font-semibold text-purple-400">
              Connect With Us
            </h2>
            <div className="flex items-center space-x-4">
              <SocialButton
                icon={<Instagram className="h-5 w-5" />}
                label="@farewell_2025"
                href="https://www.instagram.com/reminisce_2k25?igsh=Nm4yM2Q5ZnRyMGwy"
                color="from-purple-600 to-pink-600"
              />
              <SocialButton
                icon={<Phone className="h-5 w-5" />}
                label="WhatsApp Group"
                href="https://chat.whatsapp.com/JpnsDEX9mJ37VgroUT9vz6"
                color="from-green-600 to-green-500"
              />
            </div>
          </motion.div>

          {/* Fee Details Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-md mx-auto mb-16"
          >
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/30 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Farewell Pass Details
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Your all-inclusive pass to the farewell celebration
                  </p>

                  <div className="space-y-4">
                    <FeeItem
                      title="Food & Refreshments"
                      amount={10}
                      description="Gourmet dinner and refreshments throughout the event"
                      icon={<Coffee />}
                      color="text-yellow-500"
                    />
                    <FeeItem
                      title="Venue & Decorations"
                      amount={20}
                      description="Premium venue with elegant decorations"
                      icon={<Palette />}
                      color="text-blue-500"
                    />
                    <FeeItem
                      title="Entertainment"
                      amount={30}
                      description="Live music, performances and activities"
                      icon={<Music />}
                      color="text-green-500"
                    />
                    <FeeItem
                      title="Souvenirs & Gifts"
                      amount={40}
                      description="Personalized mementos to remember the occasion"
                      icon={<Heart />}
                      color="text-red-500"
                    />
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Total Amount</p>
                      <p className="text-2xl font-bold text-white">100</p>
                    </div>
                    <Link href="./pass">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Get Your Pass
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Team Filters */}
        <div className="mb-12">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto bg-gray-800">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-600"
              >
                All Team
              </TabsTrigger>
              <TabsTrigger
                value="management"
                className="data-[state=active]:bg-purple-600"
              >
                Management
              </TabsTrigger>
              <TabsTrigger
                value="creative"
                className="data-[state=active]:bg-purple-600"
              >
                Creative
              </TabsTrigger>
              <TabsTrigger
                value="technical"
                className="data-[state=active]:bg-purple-600"
              >
                Technical
              </TabsTrigger>
              <TabsTrigger
                value="logistics"
                className="data-[state=active]:bg-purple-600"
              >
                Logistics
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              index={index}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>

        {/* Team Member Modal */}
        <AnimatePresence>
          {selectedMember && (
            <TeamMemberModal
              member={selectedMember}
              onClose={() => setSelectedMember(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TeamMemberCard({ member, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -10 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
        <CardContent className="p-0">
          <div className="relative">
            <div className="absolute top-0 right-0 left-0 h-1/2 bg-gradient-to-b from-purple-600/30 to-transparent z-10"></div>
            <img
              src={member.photo || "/placeholder.svg"}
              alt={member.name}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
              {departmentIcons[member.department]}
              <span className="ml-1 capitalize">{member.department}</span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
            <p className="text-purple-400 text-sm mb-3">{member.role}</p>
            <p className="text-gray-400 text-sm line-clamp-3">
              {member.description}
            </p>

            <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between">
              <div className="flex space-x-2">
                {member.social.instagram && (
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {member.social.email && (
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                )}
              </div>
              <div className="text-purple-400 text-sm flex items-center">
                View Profile <Sparkles className="ml-1 h-3 w-3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TeamMemberModal({ member, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          <div className="relative">
            <img
              src={member.photo || "/placeholder.svg"}
              alt={member.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full inline-flex items-center mb-2">
                {departmentIcons[member.department]}
                <span className="ml-1 capitalize">{member.department}</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{member.name}</h2>
              <p className="text-purple-400">{member.role}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">About</h3>
              <p className="text-gray-300">{member.bio}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Achievements
              </h3>
              <ul className="space-y-2">
                {member.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Connect</h3>
              <div className="flex flex-wrap gap-2">
                {member.social.instagram && (
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2 rounded-md text-sm"
                  >
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </a>
                )}
                {member.social.whatsapp && (
                  <a
                    href={member.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gradient-to-r from-green-600 to-green-500 text-white px-3 py-2 rounded-md text-sm"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    WhatsApp
                  </a>
                )}
                {member.social.email && (
                  <a
                    href={`mailto:${member.social.email}`}
                    className="flex items-center bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-2 rounded-md text-sm"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </a>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700 flex justify-end">
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-900/20"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SocialButton({ icon, label, href, color }) {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center space-x-2 bg-gradient-to-r ${color} px-4 py-2 rounded-full text-white`}
    >
      {icon}
      <span>{label}</span>
    </motion.a>
  );
}

function FeeItem({ title, amount, description, icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start"
    >
      <div className={`${color} p-2 rounded-md mr-3`}>{icon}</div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-medium text-white">{title}</h4>
          <span className="font-bold text-white">₹{amount}</span>
        </div>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
    </motion.div>
  );
}
