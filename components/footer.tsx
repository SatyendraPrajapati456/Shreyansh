"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

// Team member data
const teamMembers = [
  {
    name: "Maria Kujur",
    role: "Event Manager",
    photo: "/mario.jpeg",
    description: "Coordinated all aspects of the farewell event, ensuring everything runs smoothly.",
    social: {
      instagram: "https://www.instagram.com/mariaakujur?igsh=eGpyMmpjYWs2MXY0",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Shourya Singh",
    role: "Collection Head",
    photo: "/shaurya.jpeg",
    description: "Managed fundraising and budget allocation for all farewell activities.",
    social: {
      instagram: "https://www.instagram.com/_shouryasinghhh_?igsh=MTN1NDlncXJkbTVuMw==",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Karishma Khatri",
    role: "Decoration Manager",
    photo: "/karishmanew.jpeg",
    description: "Managed fundraising and budget allocation for all farewell activities.",
    social: {
      instagram: "https://www.instagram.com/karishmalovesraita?igsh=amg0enlwaXl6ZTY=",
      facebook: "https://facebook.com",
    },
  },
  {
    name: "Ketan Dubey",
    role: "Social Media Manager",
    photo: "/karan.jpeg",
    description: "Created and curated all digital content for the farewell website and social media.",
    social: {
      instagram: "https://www.instagram.com/_ketandubey?igsh=MXE0dGZpdjlra21iMQ==",
      twitter: "https://twitter.com",
    },
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* About Us Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The dedicated individuals who worked tirelessly to make this farewell event memorable for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-t border-gray-800">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <Link href="/rem.png" className="inline-block mb-4">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Reminisce 2k25
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Celebrating the memories, friendships, and achievements as we say goodbye to our school days.
            </p>
            <div className="flex space-x-3">
              <SocialIcon icon={<Facebook size={18} />} href="https://facebook.com" />
              <SocialIcon icon={<Instagram size={18} />} href="https://www.instagram.com/reminisce_2k25?igsh=Nm4yM2Q5ZnRyMGwy" />
              <SocialIcon icon={<Twitter size={18} />} href="https://twitter.com" />
              <SocialIcon icon={<Linkedin size={18} />} href="https://linkedin.com" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/videos">Teacher Videos</FooterLink>
              <FooterLink href="/voting">Live Voting</FooterLink>
              <FooterLink href="/event-details">Event Details</FooterLink>
              <FooterLink href="/gallery">Gallery</FooterLink>
              <FooterLink href="/sponsors">Sponsors</FooterLink>
              <FooterLink href="/games">Games</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                <span className="text-gray-400">reminisce@school.edu</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                <span className="text-gray-400">Street-30 Sector-10 , Bhilai</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for updates about the farewell event.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Farewell Event. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function TeamMemberCard({ member, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20">
        <div className="relative h-64 overflow-hidden">
          <img
            src={member.photo || "/placeholder.svg"}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-70"
            }`}
          ></div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-300 text-sm mb-4">{member.description}</p>
            <div className="flex space-x-2">
              {member.social.instagram && (
                <SocialIcon icon={<Instagram size={16} />} href={member.social.instagram} small />
              )}
              {member.social.twitter && <SocialIcon icon={<Twitter size={16} />} href={member.social.twitter} small />}
              {member.social.linkedin && (
                <SocialIcon icon={<Linkedin size={16} />} href={member.social.linkedin} small />
              )}
              {member.social.facebook && (
                <SocialIcon icon={<Facebook size={16} />} href={member.social.facebook} small />
              )}
            </div>
          </motion.div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-white">{member.name}</h3>
          <p className="text-purple-400 text-sm">{member.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

function SocialIcon({ icon, href, small = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${
        small ? "h-8 w-8" : "h-10 w-10"
      } flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-purple-600 hover:text-white transition-colors duration-300`}
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
        {children}
      </Link>
    </li>
  )
}
