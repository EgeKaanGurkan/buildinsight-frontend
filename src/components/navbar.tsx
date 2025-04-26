"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Asterisk } from "lucide-react"
import { PlayfairDisplayFont } from "@/lib/fonts"
import {G} from "@shadergradient/react/dist/types-BucY9hJe";
import {ShaderGradient, ShaderGradientCanvas} from "@shadergradient/react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const springScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
    restDelta: 0.001,
  })

  const width        = useTransform(springScrollY, [0, 300], ["75%", "55%"])
  const height       = useTransform(springScrollY, [0, 300], ["4rem", "4rem"])
  const padding      = useTransform(springScrollY, [0, 300], ["1.5rem", "1rem"])
  const logoScale    = useTransform(springScrollY, [0, 300], [1, 0.9])
  const brandOpacity = useTransform(springScrollY, [0, 300], [1, 0])

  const shaderConfig: G = {
    /* Core mesh */
    type: "waterPlane",
    shader: "a",

    /* Colours */
    color1: "#ffbb00",
    color2: "#9500ff",
    color3: "#ff7200",

    /* Lighting / env */
    grain: "on",
    brightness: 1.3,
    lightType: "env",
    // envPreset: "city",

    /* Animation uniforms (speed is dynamic) */
    animate: "on",
    uStrength: 3,
    uDensity: 1.2,
    uSpeed: 1,

    /* Camera */
    cDistance: 5,
    cAzimuthAngle: 170,
    cPolarAngle: 70,

    /* Transform */
    positionX: 0.0,
    positionY: 0.9,
    positionZ: -0.3,
    rotationX: 50,
    rotationY: 0,
    rotationZ: 0,
  }

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => setIsScrolled(latest > 50))
    return () => unsubscribe()
  }, [scrollY])

  const animationSpeed = 1.2

  return (
    <div className="fixed top-10 z-50 flex w-full justify-center">
      <motion.nav
        className={cn(
          "flex items-center justify-between rounded-md border-white/20",
          "bg-gradient-to-br from-white/40 via-white/30 to-white/20",
          "backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
          isScrolled ? "shadow-md" : "shadow-sm shadow-black/10"
        )}
        style={{ width, height, padding }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="relative flex items-center justify-center"
            style={{scale: logoScale}}
          >
            {/*<motion.div*/}
            {/*  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#ff810a] to-[#73bfc4] p-2 text-white"*/}
            {/*  animate={{ rotate: 360 }}*/}
            {/*  transition={{*/}
            {/*    duration: animationSpeed * 15,*/}
            {/*    ease: "linear",*/}
            {/*    repeat: Number.POSITIVE_INFINITY,*/}
            {/*    repeatType: "loop",*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Asterisk className="h-5 w-5" />*/}
            {/*</motion.div>*/}
            <div className="relative w-[40px] h-[40px] rounded-full overflow-clip drop-shadow-lg">
              <ShaderGradientCanvas
                style={{position: "absolute", top: 0, zIndex: -2}}
              >
                <ShaderGradient {...shaderConfig} />
              </ShaderGradientCanvas>
            </div>

          </motion.div>

          <motion.span
            className="text-xl font-bold text-white"
            style={{opacity: brandOpacity}}
            transition={{duration: 0.2}}
          >
            BuildInSight
          </motion.span>
        </div>

        <div className="hidden space-x-6 md:flex">
          {["Product", "Features", "Pricing", "About"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-200 transition-colors hover:text-[#ff810a]"
            >
              {item}
            </Link>
          ))}
        </div>

        <Button className="relative overflow-hidden bg-gradient-to-r from-[#ff810a] to-[#73bfc4] text-white hover:opacity-90">
          <span className={cn("relative z-10", PlayfairDisplayFont.className)}>
            Get Started
          </span>
          <motion.span
            className="absolute inset-0 bg-white opacity-0"
            whileHover={{ opacity: 0.2 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </Button>
      </motion.nav>
    </div>
  )
}
