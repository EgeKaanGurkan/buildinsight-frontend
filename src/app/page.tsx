"use client"

import { motion } from "framer-motion"
import { Asterisk, SquareDashedMousePointer } from "lucide-react"
import { PlayfairDisplayFont } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import {
  useEffect,
  useMemo,
  useState, // ← NEW
} from "react"
import { SparklesCore } from "@/components/ui/sparkles"
import { useBuildInSight, GainInSight } from "buildinsight"
import { useStripeCreateCheckoutSession } from "@/api/hooks/stripe"
import { useRouter } from "next/navigation"
import PricingSection from "@/components/PricingSection"
import { ShaderGradientCanvas, G } from "@shadergradient/react"
import { ShaderGradient } from "@shadergradient/react"
import * as reactSpring from '@react-spring/three'

type typeT = 'plane' | 'sphere' | 'waterPlane';

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
        className="w-[60%] h-[70vh] blur-[7px]"
        style={{
          background: "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(255, 187, 0, 0.5) 20%, transparent 100%)",
          clipPath: "polygon(50% 0%, 90% 100%, 10% 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{
          width: ["100%", "60%"],
          opacity: [0, 0.5, 0.1, 0.7, 0.1, 0.5, 0.2, 0.5, 0.1, 1, 0.5, 1, 1, 1],  // flicker effect
        }}
        transition={{
          duration: 2.2,
          times: [0, 0.07, 0.13, 0.21, 0.29, 0.36, 0.45, 0.58, 0.7, 0.8, 0.88, 0.93, 0.97, 1],
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

const colourfulShaderConfig: G = {
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
  cDistance: 3,
  cAzimuthAngle: 180,
  cPolarAngle: 90,

  /* Transform */
  positionX: 0.0,
  positionY: 0.9,
  positionZ: -0.3,
  rotationX: 50,
  rotationY: 0,
  rotationZ: 0,
}

const bgShaderConfig: G = {
  /* Core mesh */
  type: "waterPlane" as typeT,
  shader: "a",

  /* Colours */
  color1: "#ff7f17",
  color2: "#744e55",
  color3: "#000000",

  /* Lighting / env */
  grain: "on",
  brightness: 1.2,
  lightType: "3d",
  // envPreset: "city",

  /* Animation uniforms (speed is dynamic) */
  animate: "on",
  uStrength: 4,
  uDensity: 1.3,
  uSpeed: 0.15,

  /* Camera */
  cDistance: 3.6,
  cAzimuthAngle: 180,
  cPolarAngle: 90,

  /* Transform */
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 10,
  rotationZ: 50,
}

/*───────────────────────────────────────────────────────────*/
/*   HOME COMPONENT                                           */
/*───────────────────────────────────────────────────────────*/
export default function Home() {
  /* ─────────────── Speed slider state ─────────────── */
  const [speed, setSpeed] = useState(1) // 1 × = normal
  const animationSpeed = 0.6 / speed // re-use everywhere

  const router = useRouter()

  /* ─────────────── BuildInsight click log ─────────── */
  const { clickedElements, setIsVisible } = useBuildInSight()
  useEffect(() => console.log(clickedElements), [clickedElements])

  const stripeCreateCheckoutSessionMutation = useStripeCreateCheckoutSession()

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

  async function handleStartStripeFlow() {
    console.log("handleStartStripeFlow")
    const { url } = await stripeCreateCheckoutSessionMutation.mutateAsync({
      productId: "prod_SEJdLhTa3lqQYT",
      priceId: "price_1RJr0DDF5WhxqTFqJZEd3VJn",
      successUrl: `${window.location.origin}/payment-success`,
      cancelUrl: `${window.location.origin}/payment-canceled`,
      // customerId?: string,
    })

    void router.push(url)
  }

  /* ─────────────── JSX ─────────────────────────────── */
  return (
    <>
      {/*────────── Hero Section ──────────*/}
      <section id="hero bg-white">
        {/* Shader canvas */}
        {/* {MemoizedSparkles} */}
        {/* <Spotlight /> */}

        {/*────────── Headline / sub copy ──────────*/}
        <GainInSight name={"hero bg-transparent"}>
          <div className="h-[100svh] md:h-[100svh] lg:h-[100svh] w-full flex-col pt-20 p-6 relative">
            <div className="absolute top-0 left-0 w-full h-full z-[-11] bg-black ">
              <ShaderGradientCanvas
                style={{
                  position: 'absolute',
                  top: 0,
                }}
                lazyLoad={true}
                pointerEvents="none"
              >
                <ShaderGradient {...bgShaderConfig} />
              </ShaderGradientCanvas>
            </div>
            <div className="h-full flex justify-center items-center flex-col gap-12">
              {/* <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8 * animationSpeed,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl spacing tracking-tight"
              ></motion.p> */}

              {/* Headline */}
              <div className="flex flex-col gap-3">
                <div className="relative flex justify-center group">
                  <GainInSight name={"heroText"}>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8 * animationSpeed,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.4 * animationSpeed,
                      }}
                      className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl spacing tracking-tight"
                    >
                      Move fast and break things
                    </motion.p>
                  </GainInSight>
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
                        repeat: Number.POSITIVE_INFINITY,
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
                className="flex flex-col gap-6 justify-center items-center"
              >
                <motion.p className="text-md sm:text-xl md:text-2xl lg:text-3xl spacing tracking-tight text-center">
                  Hold a spotlight on UX issues using instant, meaningful user feedback
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8 * animationSpeed,
                    delay: 1.6 * animationSpeed,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex justify-center items-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8 * animationSpeed,
                      delay: 2.0 * animationSpeed,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex justify-center gap-4"
                  >
                    <motion.button
                      onClick={handleStartStripeFlow}
                      className="relative text-black font-medium py-2 px-6 rounded-md border border-gray-300 hover:border-gray-400 bg-white flex items-center gap-2 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        scale: {
                          type: "spring",
                          stiffness: 300,
                          damping: 17,
                        },
                      }}
                    >
                      <span>Get Started</span>
                      <span>→</span>
                    </motion.button>
                    <motion.button
                      className="relative text-black font-medium py-2 px-6 rounded-md border border-gray-300 hover:border-gray-400 bg-white flex items-center gap-2 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        scale: {
                          type: "spring",
                          stiffness: 300,
                          damping: 17,
                        },
                      }}
                      onClick={() => setIsVisible(true)}
                    >
                      <span>Try Live</span>
                      <SquareDashedMousePointer className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
              
            </div>
          </div>
        </GainInSight>

        {/*────────── Pricing Section ──────────*/}
        <PricingSection />

        {/* filler section */}
        <div className="h-[50svh] w-full flex-col pt-40">
          <div className="w-full flex justify-center">
            <div className="w-[90%] rounded-lg h-[70vh] bg-gray-700"></div>
          </div>
        </div>
      </section>
    </>
  )
}
