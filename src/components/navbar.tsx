"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus, X } from "lucide-react"
import useIsMobile from "@/lib/hooks/use-is-mobile"
import ChromaInlineText from "./chroma-text"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("What?") // Default active link
  const { scrollY } = useScroll()
  const isMobile = useIsMobile()
  const menuRef = useRef<HTMLDivElement>(null)
  const [isManualScroll, setIsManualScroll] = useState(false)

  const springScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
    restDelta: 0.001,
  })

  // Responsive width and height based on screen size
  const width = useTransform(
    springScrollY,
    [0, 300],
    isMobile ? ["90%", "90%"] : ["max(90%, 800px)", "max(90%, 600px)"],
  )
  const height = useTransform(springScrollY, [0, 300], isMobile ? ["3.5rem", "3rem"] : ["4rem", "4rem"])
  const padding = useTransform(springScrollY, [0, 300], isMobile ? ["1rem", "0.75rem"] : ["1.5rem", "1rem"])

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => setIsScrolled(latest > 50))
    return () => unsubscribe()
  }, [scrollY])

  // Map menu items to section IDs
  const sectionMap: Record<string, string> = {
    "Home": "home",
    "What is buildinsight?": "how",
    "Waitlist": "waitlist"
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const scrollToSection = (sectionId: string) => {
    const targetSectionId = sectionMap[sectionId]
    if (!targetSectionId) return

    const section = document.getElementById(targetSectionId)
    if (section) {
      setIsManualScroll(true)
      const navbarHeight = 100 // Height of navbar + some padding
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      
      closeMenu()
      setActiveLink(sectionId)
    }
  }

  // Update the Intersection Observer callback
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-50% 0px",
      threshold: 0,
    }

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isManualScroll) {
          // Find menu item by section ID using the reverse mapping
          const menuItem = Object.entries(sectionMap).find(pair => pair[1] === entry.target.id)?.[0]
          if (menuItem) {
            setActiveLink(menuItem)
          }
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)

    // Observe sections using the section map values
    Object.values(sectionMap).forEach((sectionId) => {
      const section = document.getElementById(sectionId)
      if (section) {
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  }, [isManualScroll, sectionMap])

  // Reset manual scroll flag after a delay
  useEffect(() => {
    if (isManualScroll) {
      const timer = setTimeout(() => {
        setIsManualScroll(false)
      }, 1000) // Reset after 1 second
      return () => clearTimeout(timer)
    }
  }, [isManualScroll])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  // Close menu with ESC key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isMenuOpen])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  const menuItems = ["Home", "What is buildinsight?", "Waitlist"]

  return (
    <>
      <div className="fixed top-10 z-[99999999999999999999999] flex w-full justify-center">
        <motion.nav
          className={cn(
            "flex items-center justify-between rounded-2xl max-w-6xl mx-auto",
            "bg-black/80 backdrop-blur-lg",
            "border border-white/10",
            isScrolled ? "shadow-lg shadow-black/20" : "shadow-md shadow-black/10",
          )}
          style={{ width, height, padding }}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Brand Logo */}
          <Link href="#" className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-white" />
            <span className="text-xl font-semibold tracking-tight lowercase text-white"><ChromaInlineText text="buildinsight" /></span>
          </Link>

          {/* Desktop Navigation & CTA */}
          <div className={cn("flex-1 items-center justify-center gap-8", isMobile ? "hidden" : "flex")}>
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={cn(
                  "relative text-base font-normal text-gray-400 transition-colors duration-200 ease-in-out",
                  "hover:text-white",
                  activeLink === item && "text-white font-medium",
                )}
              >
                {activeLink === item && (
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white" />
                )}
                {item}
              </button>
            ))}
          </div>
          {/* Desktop CTA Button */}
          <div className={cn("hidden md:flex", isMobile ? "hidden" : "flex")}>
            <Button
              className="relative bg-white text-black rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 ease-in-out
                         hover:translate-y-[-2px] hover:shadow-xl hover:bg-gray-100"
              onClick={() => scrollToSection("Waitlist")}
            >
              <span>Join the waitlist</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          {/* Mobile menu button (Hamburger) */}
          <button
            onClick={toggleMenu}
            className={cn(
              "block md:hidden focus:outline-none p-2 rounded-md",
              isMenuOpen ? "text-white" : "text-white",
              isMobile ? "flex" : "hidden",
            )}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="h-5 w-5 stroke-1" /> {/* Plus sign, large and thin */}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.nav>
      </div>

      {/* Full screen mobile menu - only on mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[99999999999999999999998] md:hidden flex flex-col bg-black"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div ref={menuRef} className="flex flex-col justify-between h-full p-8">
              {/* Close button at the top right */}
              <div className="flex justify-end">
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-md text-white focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <motion.div
                className="flex flex-col space-y-8 text-left"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                  },
                }}
              >
                {menuItems.map((item) => (
                  <motion.div
                    key={item}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 },
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => scrollToSection(item)}
                      className="text-4xl font-light text-white hover:text-gray-300 transition-colors"
                    >
                      {item}
                    </button>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile Menu Footer */}
              <div className="flex flex-col items-center space-y-4 pb-8">
                <motion.div
                  variants={{
                    open: { opacity: 1, y: 0, scale: 1 },
                    closed: { opacity: 0, y: 20, scale: 0.9 },
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="w-full"
                >
                  <Button
                    className="w-full bg-white text-black rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 ease-in-out
                               hover:translate-y-[-2px] hover:shadow-xl hover:bg-gray-100"
                    onClick={() => scrollToSection("Waitlist")}
                  >
                    <span>Join the waitlist</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                {/* <motion.div
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 },
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                >
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    onClick={closeMenu}
                  >
                    <Play className="h-4 w-4" />
                    <span>Watch the trailer video</span>
                  </Link>
                </motion.div> */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
