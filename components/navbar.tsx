"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LogIn, UserPlus, Instagram, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/videos", label: "Videos" },
  { href: "/voting", label: "Voting" },
  { href: "/event-details", label: "Event" },
  { href: "/gallery", label: "Gallery" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/games", label: "Games" },
  { href: "/team", label: "Team" },
  { href: "/pass", label: "Passes" },
]

export default function Navbar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would be replaced with actual auth state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-2 shadow-lg shadow-purple-900/10" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Reminisce</span>
        </Link>

        {isMobile ? (
          <MobileNav isLoggedIn={isLoggedIn} currentPath={pathname} />
        ) : (
          <DesktopNav isLoggedIn={isLoggedIn} currentPath={pathname} />
        )}
      </div>
    </header>
  )
}

function DesktopNav({ isLoggedIn, currentPath }) {
  return (
    <div className="flex items-center gap-6">
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm transition-colors hover:text-purple-400 ${
              currentPath === link.href ? "text-purple-400" : "text-gray-300"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-4 border-l border-gray-700 pl-4">
        <Link
          href="https://www.instagram.com/reminisce_2k25?igsh=Nm4yM2Q5ZnRyMGwy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-purple-400 transition-colors"
        >
          <Instagram className="h-5 w-5" />
        </Link>
        <Link
          href="https://chat.whatsapp.com/JpnsDEX9mJ37VgroUT9vz6"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-green-500 transition-colors"
        >
          <Phone className="h-5 w-5" />
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-purple-900">US</AvatarFallback>
          </Avatar>
        ) : (
          <>
            <Button asChild variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
              <Link href="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/signup">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

function MobileNav({ isLoggedIn, currentPath }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-white" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gray-900 border-gray-800">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Farewell
              </span>
            </Link>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <X className="h-6 w-6 text-white" />
                <span className="sr-only">Close menu</span>
              </Button>
            </SheetTrigger>
          </div>

          <nav className="flex flex-col gap-2 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  currentPath === link.href
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center gap-4 py-4 border-t border-b border-gray-800">
            <Link
              href="https://www.instagram.com/reminisce_2k25?igsh=Nm4yM2Q5ZnRyMGwy5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </Link>
            <Link
              href="https://chat.whatsapp.com/farewell2025"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-green-500 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>WhatsApp</span>
            </Link>
          </div>

          <div className="mt-auto pb-6 pt-6 border-t border-gray-800">
            {isLoggedIn ? (
              <div className="flex items-center gap-4 px-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-purple-900">US</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">User Name</p>
                  <p className="text-xs text-gray-400">user@example.com</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-4">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button asChild size="sm" className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white">
                  <Link href="/signup">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
