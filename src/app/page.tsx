"use client"

import { motion } from "framer-motion"
import { Asterisk } from "lucide-react"
import {
  CourierPrimeFont,
  PlayfairDisplayFont,
  SyneMonoFont,
} from "@/lib/fonts"
import { cn } from "@/lib/utils"
import React, {
  useEffect,
  useMemo,
  useState,       // ← NEW
} from "react"
import {
  ShaderGradient,
  ShaderGradientCanvas,
} from "@shadergradient/react"
import { SparklesCore } from "@/components/ui/sparkles"
import { useBuildInSight } from "buildinsight"
// @ts-expect-error cant find it for some reason
import {G} from "@shadergradient/react/dist/types-BucY9hJe";

/*───────────────────────────────────────────────────────────*/
/* Spotlight (unchanged)                                      */
/*───────────────────────────────────────────────────────────*/
function Spotlight() {
  return (
    <div
      style={{ filter: "blur(16px)" }}
      className="absolute top-0 left-0 w-full flex justify-center h-[30svh] pointer-events-none -z-10 opacity-75 blur-lg"
    >
      <motion.div
        className="w-[60%] h-[40svh] blur-[6px]"
        style={{
          background:
            "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(255, 187, 0, 0.5) 20%, transparent 100%)",
          clipPath: "polygon(50% 0%, 90% 100%, 10% 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{
          width: ["100%", "60%"],
          opacity: [
            0, 0.5, 0.1, 0.7, 0.1, 0.5, 0.2, 0.5, 0.1, 1, 0.5, 1, 1, 1,
          ],
        }}
        transition={{
          duration: 2.2,
          times: [
            0, 0.07, 0.13, 0.21, 0.29, 0.36, 0.45, 0.58, 0.7, 0.8, 0.88, 0.93,
            0.97, 1,
          ],
          ease: "easeInOut",
          width: {
            duration: 0.2,
            delay: 2,
            ease: "easeInOut",
          },
        }}
      />
    </div>
  )
}

/*───────────────────────────────────────────────────────────*/
/*   HOME COMPONENT                                           */
/*───────────────────────────────────────────────────────────*/
export default function Home() {
  /* ─────────────── Speed slider state ─────────────── */
  const [speed, setSpeed] = useState(1)          // 1 × = normal
  const animationSpeed = 0.6 / speed             // re-use everywhere

  /* ─────────────── BuildInsight click log ─────────── */
  const { clickedElements } = useBuildInSight()
  useEffect(() => console.log(clickedElements), [clickedElements])

  /* ─────────────── Sparkles (memoised) ────────────── */
  const MemoizedSparkles = useMemo(
    () => (
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.2}
        particleDensity={20}
        className="w-full h-full absolute z-[-1]"
        particleColor="rgb(255, 187, 0)"
      />
    ),
    [],
  )

  /* ─────────────── Shader config ───────────────────── */
  const config: G = {
    /* Core mesh */
    type: "waterPlane",
    shader: "a",

    /* Colours */
    color1: "#ffbb00",
    color2: "#b145ff",
    color3: "#ff7200",

    /* Lighting / env */
    grain: "on",
    brightness: 1.3,
    lightType: "3d",
    // envPreset: "city",

    /* Animation uniforms (speed is dynamic) */
    animate: "on",
    uStrength: 3,
    uDensity: 1.2,
    uSpeed: speed,

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
  // const config: G = {
  //   /* Core mesh */
  //   type: "waterPlane",
  //   shader: "a",
  //
  //   /* Colours */
  //   color1: "#5606FF",
  //   color2: "#FE8989",
  //   color3: "#000000",
  //
  //   /* Lighting / env */
  //   grain: "on",
  //   brightness: 1.1,
  //   lightType: "env",
  //   envPreset: "city",
  //
  //   /* Animation uniforms (speed is dynamic) */
  //   animate: "on",
  //   uStrength: 2,
  //   uDensity: 1.3,
  //   uSpeed: speed,
  //
  //   /* Camera */
  //   cDistance: 3.9,
  //   cAzimuthAngle: 180,
  //   cPolarAngle: 115,
  //
  //   /* Transform */
  //   positionX: 0.5,
  //   positionY: 0.1,
  //   positionZ: 0.5,
  //   rotationX: 0,
  //   rotationY: 0,
  //   rotationZ: 235,
  // }

  /* ─────────────── JSX ─────────────────────────────── */
  return (
    <>
      {/*────────── Hero Section ──────────*/}
      <section id="hero">
        {/* Shader canvas */}
        {MemoizedSparkles}
        <Spotlight />

        {/*────────── Headline / sub copy ──────────*/}
        <div className="md:h-[60svh] lg:h-[50svh] w-full flex-col pt-20 p-6">
          <div className="h-full flex justify-between items-center flex-col gap-8">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8 * animationSpeed,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl spacing tracking-tight"
            ></motion.p>

            {/* Headline */}
            <div className="flex flex-col gap-3">
              <div className="relative group">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8 * animationSpeed,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.4 * animationSpeed,
                  }}
                  className="text-8xl sm:text-5xl md:text-7xl lg:text-8xl spacing tracking-tight"
                >
                  Move fast and break things
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 360,
                  }}
                  transition={{
                    duration: 0.6 * animationSpeed,
                    ease: "easeOut",
                    delay: 0.8 * animationSpeed,
                    rotate: {
                      duration: animationSpeed,
                      ease: [1, 0, 0, 1],
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.8 * animationSpeed,
                      origin: "center",
                    },
                  }}
                  className="absolute -top-1 -right-4"
                >
                  <Asterisk className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-brand-primary" />
                </motion.div>
              </div>

              {/* Sub-headline */}
              <div className="flex relative justify-center">
                <div className="relative">
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6 * animationSpeed,
                      ease: "easeOut",
                      delay: 0.8 * animationSpeed,
                    }}
                    className="absolute -left-4 -top-1"
                  >
                    <Asterisk className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-brand-primary" />
                  </motion.span>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8 * animationSpeed,
                      delay: 1.2 * animationSpeed,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={cn(
                      "text-lg sm:text-2xl md:text-3xl lg:text-5xl spacing font-medium tracking-tight",
                      PlayfairDisplayFont.className,
                    )}
                  >
                    with insight
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8 * animationSpeed,
                delay: 1.6 * animationSpeed,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex gap-2 justify-center items-center"
            >
              <motion.p className="text-md sm:text-xl md:text-2xl lg:text-3xl spacing tracking-tight text-center">
                Hold a spotlight on UX issues using instant, meaningful user
                feedback
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* filler section */}
        <div className="h-[50svh] w-full flex-col pt-40">
          <div className="w-full flex justify-center">
            <div className="w-[90%] rounded-lg h-[70vh] bg-gray-700"></div>
          </div>
        </div>
      </section>

      {/*────────── Global speed slider (outside hero container) ──────────*/}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur px-4 py-2 text-sm text-white">
        <span>Speed</span>
        <input
          type="range"
          min={0.2}
          max={3}
          step={0.1}
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="h-2 w-32 cursor-pointer accent-orange-400"
        />
        <span>{speed.toFixed(1)}×</span>
      </div>
    </>
  )
}
