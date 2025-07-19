"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>
        <div
          className="absolute inset-0 bg-[url('/john.jpg')] bg-cover bg-center"
          style={{
            transform: `translateY(${scrollY * 0.2}px) scale(${1 + scrollY * 0.0005})`,
            opacity: 1 - scrollY * 0.001,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            <span className="block">Reminisce</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">2k25</span>
          </h1>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Celebrate the memories, friendships, and achievements as we say goodbye to our school days.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
            <Link href="/signup">Join Now</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-purple-600 text-purple-400 hover:bg-purple-900/20"
          >
            <Link href="/videos">Watch Videos</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <ChevronDown className="h-8 w-8 text-purple-400" />
      </motion.div>
    </section>
  )
}
