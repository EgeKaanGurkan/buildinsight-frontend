"use client"

import { type ElementType, type HTMLAttributes, useEffect, useMemo, useRef } from "react"
import { motion, useAnimation, type HTMLMotionProps, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface ChromaInlineTextProps extends HTMLAttributes<HTMLSpanElement> {
  text: string
  startAnimation?: boolean
  as?: ElementType // Allows specifying the HTML tag for the animated text, e.g., 'span', 'strong'
  theme?: "light" | "dark"
  duration?: number // Duration of the gradient sweep
  delay?: number // Delay before the sweep starts
  gradientBlur?: string // CSS blur value for the gradient, e.g., "1px" or "2px"
  className?: string // For custom styling like font size, weight, etc.
}

export default function ChromaInlineText({
  text,
  startAnimation,
  as: Tag = "span", // Default to 'span' for inline behavior
  className,
  theme = "dark",
  duration = 0.9,
  delay = 0.1,
  gradientBlur = "0px",
  ...props
}: ChromaInlineTextProps) {
  const gradientControls = useAnimation()
  const textControls = useAnimation()
  const rootRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(rootRef, { margin: "0px 0px -40px 0px" })

  const themeColors = useMemo(() => {
    // For inline text, theme primarily affects the final text color.
    // Parent element's background will determine overall light/dark context.
    return {
      textBaseColor: theme === "dark" ? "#FFFFFF" : "#000000",
    }
  }, [theme])

  const textGradient = useMemo(() => {
    const base = themeColors.textBaseColor
    // Gradient starts and ends with the base color to ensure smooth transition
    // return `linear-gradient(90deg, ${base} 0%, ${base} 25%, #c679c4 40%, #fa3d1d 45%, #ffb005 50%, #e1e1fe 55%, #0358f7 60%, ${base} 75%, ${base} 100%)`
    return `linear-gradient(90deg, ${base} 0%, ${base} 25%, #A443EA 40%, #EE4574 45%, #FB7E29 50%, #e1e1fe 55%, #0358f7 60%, ${base} 75%, ${base} 100%)`
  }, [themeColors.textBaseColor])

  const MotionTag = motion[Tag as keyof typeof motion] as ElementType<HTMLMotionProps<any>>

  // Variants for the bottom layer (blurred gradient)
  const gradientLayerVariants = {
    initial: {
      backgroundPosition: "120% 0",
      filter: `blur(${gradientBlur})`,
    },
    animate: {
      backgroundPosition: "0% 0",
      filter: `blur(${gradientBlur})`,
      transition: { duration, ease: "easeOut", delay },
    },
    done: {
      filter: "blur(0px)",
      transition: { duration: 0.3 },
    },
  }

  // Variants for the top layer (sharp text, transitions to solid color)
  const textLayerVariants = {
    initial: {
      WebkitTextFillColor: "transparent", // Start transparent to show gradient
    },
    animate: {
      WebkitTextFillColor: "transparent", // Stay transparent during sweep
    },
    done: {
      WebkitTextFillColor: themeColors.textBaseColor, // Transition to solid color
      transition: { duration: 0.3, delay: 0.1 },
    },
  }

  useEffect(() => {
    const shouldAnimate = typeof startAnimation === "boolean" ? startAnimation : inView
    const sequence = async () => {
      if (shouldAnimate) {
        gradientControls.set("initial")
        textControls.set("initial")
        await gradientControls.start("animate")
        await Promise.all([textControls.start("done"), gradientControls.start("done")])
      }
    }
    sequence()
  }, [startAnimation, inView, gradientControls, textControls, themeColors.textBaseColor])

  const commonTextStyles = "whitespace-nowrap tracking-tight" // Prevent wrapping during animation

  return (
    <span ref={rootRef} className={cn("relative inline-block", className)} {...props}>
      {/* Layer 1: Blurred Gradient (Bottom) */}
      <MotionTag
        aria-hidden="true"
        className={cn("absolute inset-0", commonTextStyles, className)} // Inherit className for font styles
        style={{
          backgroundImage: textGradient,
          backgroundSize: "400% 100%", // Make gradient wider for sweep
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent", // Fallback
        }}
        variants={gradientLayerVariants}
        initial="initial"
        animate={gradientControls}
      >
        {text}
      </MotionTag>

      {/* Layer 2: Sharp Text (Top) */}
      <MotionTag
        className={cn("relative", commonTextStyles, className)} // Inherit className for font styles
        style={{
          color: themeColors.textBaseColor, // Final text color
        }}
        variants={textLayerVariants}
        initial="initial"
        animate={textControls}
      >
        {text}
      </MotionTag>
    </span>
  )
}
