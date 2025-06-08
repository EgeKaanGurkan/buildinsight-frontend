"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Asterisk } from "lucide-react"
import { useStripeCreateCheckoutSession } from "@/api/hooks/stripe"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const router = useRouter()
  const stripeCreateCheckoutSessionMutation = useStripeCreateCheckoutSession()

  const springScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
    restDelta: 0.001,
  })

  const width = useTransform(springScrollY, [0, 300], ["70%", "55%"])
  const height = useTransform(springScrollY, [0, 300], ["4rem", "4rem"])
  const padding = useTransform(springScrollY, [0, 300], ["1.5rem", "1rem"])
  const logoScale = useTransform(springScrollY, [0, 300], [1, 0.9])
  const brandOpacity = useTransform(springScrollY, [0, 300], [1, 0])

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => setIsScrolled(latest > 50))
    return () => unsubscribe()
  }, [scrollY])

  async function handleStartStripeFlow() {
    const { url } = await stripeCreateCheckoutSessionMutation.mutateAsync({
      productId: "prod_SEJdLhTa3lqQYT",
      priceId: "price_1RJr0DDF5WhxqTFqJZEd3VJn",
      successUrl: `${window.location.origin}/payment-success`,
      cancelUrl: `${window.location.origin}/payment-canceled`,
    })
    void router.push(url)
  }

  return (
    <div className="fixed top-10 z-[99999999999999999999999] flex w-full justify-center">
      <motion.nav
        className={cn(
          "flex items-center justify-between rounded-md",
          "bg-background",
          "backdrop-blur-lg",
          isScrolled ? "shadow-md border border-slate-700/30" : "shadow-sm shadow-black/10",
        )}
        style={{ width, height, padding }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          <motion.div className="relative flex items-center justify-center" style={{ scale: logoScale }}>
            <motion.div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 p-2 text-white"
              animate={{ rotate: 360 }}
              transition={{
                duration: 18,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              <Asterisk className="h-5 w-5" />
            </motion.div>
          </motion.div>

          <motion.span
            className="text-2xl font-bold text-white tracking-tight"
            style={{ opacity: brandOpacity }}
            transition={{ duration: 0.2 }}
          >
            BuildInSight
          </motion.span>
        </div>

        <div className="hidden space-x-6 md:flex">
          {["Product", "Features", "Pricing", "About"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-200 transition-colors hover:text-amber-400"
            >
              {item}
            </Link>
          ))}
        </div>

        <Button
          className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:opacity-90 transition-all"
          onClick={handleStartStripeFlow}
        >
          <span className="font-medium">Get Started</span>
        </Button>
      </motion.nav>
    </div>
  )
}
