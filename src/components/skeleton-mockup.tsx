"use client"

import {ReactNode, useEffect, useRef, useState} from "react"
import {motion, useInView, AnimatePresence} from "framer-motion";
import {BuildInSightElementOverlay} from "buildinsight";
import {cn} from "@/lib/utils";
import { Loader2, RotateCcw } from "lucide-react";

// Add phase type for alternative generator demo
type AlternativeGeneratorPhase = 'overlay' | 'loading' | 'newLayout';

const SkeletonMockup = ({ children, showBuildInSight=false, showAlternativeGeneratorDemo=false }: { children?: ReactNode, showBuildInSight?: boolean, showAlternativeGeneratorDemo?: boolean }) => {

  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [alternativeGeneratorPhase, setAlternativeGeneratorPhase] = useState<AlternativeGeneratorPhase>('overlay')
  
  const alternativeGeneratorRef = useRef<HTMLDivElement>(null)
  const buildInSightRef = useRef<HTMLDivElement>(null)
  const isAlternativeGeneratorInView = useInView(alternativeGeneratorRef, {
    // once: true,
    margin: "0px 0px -100px 0px"
  })
  const isBuildInSightInView = useInView(buildInSightRef, {
    // once: true,
    margin: "0px 0px -100px 0px"
  })

  useEffect(() => {
    if ((isAlternativeGeneratorInView && showAlternativeGeneratorDemo) || (isBuildInSightInView && showBuildInSight)) {
      const element = document.querySelector(showAlternativeGeneratorDemo ? ".targetElementAlternativeGeneratorDemo" : ".targetElement") as HTMLElement
      if (element) {
        setTimeout(() => setTargetElement(element), 1000)
      }
    }
  }, [isAlternativeGeneratorInView, isBuildInSightInView, showBuildInSight, showAlternativeGeneratorDemo])

  // Handle alternative generator demo phases
  useEffect(() => {
    if (targetElement && showAlternativeGeneratorDemo) {
      // Phase 1: Show overlay for 1.5 seconds
      const overlayTimer = setTimeout(() => {
        setAlternativeGeneratorPhase('loading')
      }, 1500)

      // Phase 2: Show loading for 2 seconds
      const loadingTimer = setTimeout(() => {
        setAlternativeGeneratorPhase('newLayout')
      }, 3500) // 1.5s overlay + 2s loading

      return () => {
        clearTimeout(overlayTimer)
        clearTimeout(loadingTimer)
      }
    }
  }, [targetElement, showAlternativeGeneratorDemo])

  // Function to retry generation
  const retryGeneration = () => {
    setAlternativeGeneratorPhase('loading')
    setTimeout(() => {
      setAlternativeGeneratorPhase('newLayout')
    }, 2000) // 2s loading
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 z-[1] pointer-events-none">
      <div className="w-full h-full bg-black/25 dark:bg-white/10 backdrop-blur-sm rounded-lg shadow-2xl opacity-80 flex flex-col overflow-hidden">
        {/* macOS-style Window Controls Bar */}
        <div className="flex-shrink-0 h-6 sm:h-7 bg-neutral-800/30 dark:bg-neutral-700/20 flex items-center px-2 sm:px-3 space-x-1.5">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-neutral-700/70 dark:bg-neutral-600/60"></div>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-neutral-700/70 dark:bg-neutral-600/60"></div>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-neutral-700/70 dark:bg-neutral-600/60"></div>
        </div>

        {/* SaaS Content Area */}
        <div className="flex-grow flex flex-col p-2 sm:p-3 space-y-2 sm:space-y-3">
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between h-6 sm:h-7 px-1 sm:px-2">
            {/* Logo placeholder */}
            <div className="w-16 sm:w-20 h-3 sm:h-3.5 bg-neutral-700/60 dark:bg-neutral-600/50 rounded"></div>
            {/* Nav items placeholder */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 sm:w-12 h-2.5 sm:h-3 bg-neutral-700/60 dark:bg-neutral-600/50 rounded"></div>
              <div className="w-10 sm:w-12 h-2.5 sm:h-3 bg-neutral-700/60 dark:bg-neutral-600/50 rounded"></div>
              <div className="w-12 sm:w-16 h-3.5 sm:h-4 bg-neutral-700/80 dark:bg-neutral-600/70 rounded-sm"></div>
            </div>
          </div>

          {/* Hero Section */}
          <div ref={alternativeGeneratorRef} className={cn("relative flex-grow flex flex-col items-center justify-center px-2 sm:px-3 py-1 sm:py-2 space-y-2 sm:space-y-3", showAlternativeGeneratorDemo && "targetElementAlternativeGeneratorDemo")}>
              
            {/* Alternative Generator Demo Overlay */}
            <AnimatePresence>
              {targetElement && showAlternativeGeneratorDemo && alternativeGeneratorPhase === 'overlay' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-50"
                >
                  <BuildInSightElementOverlay
                    element={targetElement}
                    highlightColor={"#808080"}
                    onRemove={() => setTargetElement(null)}
                    showActions={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading State */}
            <AnimatePresence>
              {showAlternativeGeneratorDemo && alternativeGeneratorPhase === 'loading' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-40 bg-neutral-800/90 dark:bg-neutral-700/90 backdrop-blur-sm flex items-center justify-center"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <Loader2 className="w-8 h-8 text-neutral-300 animate-spin" />
                    <p className="text-neutral-300 text-sm font-medium tracking-tight">Generating alternative layout based on feedback...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Original Hero Layout or New Layout */}
            <AnimatePresence mode="wait">
              {showAlternativeGeneratorDemo && alternativeGeneratorPhase === 'newLayout' ? (
                <motion.div
                  key="newLayout"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full flex flex-col space-y-3 relative"
                >
                  {/* Animated border */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r from-[#ff7200] to-[#a73af1] p-[1px] z-[-1]"
                  >
                    <div className="w-full h-full rounded-lg bg-neutral-700" />
                  </motion.div>
                  
                  {/* Retry button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    onClick={retryGeneration}
                    className="absolute -top-3 w-6 h-6 rounded-full flex items-center justify-center transition-colors pointer-events-auto z-10"
                  >
                    <RotateCcw className="w-3 h-3 text-white" />
                  </motion.button>
                  
                  {/* Simple header element */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="w-3/5 h-4 bg-neutral-700/60 dark:bg-neutral-600/50 rounded mx-auto"
                  />
                  
                  {/* Two side-by-side simple boxes */}
                  <div className="flex space-x-4 justify-center">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      className="w-1/3 h-16 bg-neutral-700/50 dark:bg-neutral-600/40 rounded"
                    />
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      className="w-1/3 h-16 bg-neutral-700/50 dark:bg-neutral-600/40 rounded"
                    />
                  </div>

                  {/* Central text elements */}
                  <div className="flex flex-col items-center space-y-2 flex-1 justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.0, duration: 0.4 }}
                      className="w-2/3 h-3 bg-neutral-700/60 dark:bg-neutral-600/50 rounded"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.4 }}
                      className="w-1/2 h-3 bg-neutral-700/50 dark:bg-neutral-600/40 rounded"
                    />
                    
                    {/* Simple button-like element */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4, duration: 0.4 }}
                      className="w-1/4 h-5 bg-neutral-700/70 dark:bg-neutral-600/60 rounded mt-3"
                    />
                  </div>
                </motion.div>
              ) : !showAlternativeGeneratorDemo || alternativeGeneratorPhase === 'overlay' ? (
                <motion.div
                  key="originalLayout"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex flex-col items-center justify-center space-y-2 sm:space-y-3"
                >
                  <div ref={buildInSightRef} className={cn("w-3/4 sm:w-2/3 h-5 sm:h-6 bg-neutral-700/70 dark:bg-neutral-600/60 rounded", showBuildInSight && "targetElement")}>
                    {targetElement && showBuildInSight && (
                      <BuildInSightElementOverlay
                        element={targetElement}
                        highlightColor={"#3451FF"}
                        onRemove={() => setTargetElement(null)}
                        showActions={false}
                      />
                    )}
                  </div>
                  <div className="w-full sm:w-5/6 h-3 sm:h-3.5 bg-neutral-700/50 dark:bg-neutral-600/40 rounded"></div>
                  <div className="w-full sm:w-5/6 h-3 sm:h-3.5 bg-neutral-700/50 dark:bg-neutral-600/40 rounded"></div>
                  <div className="w-1/2 sm:w-1/3 h-3 sm:h-3.5 bg-neutral-700/50 dark:bg-neutral-600/40 rounded mt-1"></div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Content Boxes Area - Only show if not in alternative generator new layout */}
          {!(showAlternativeGeneratorDemo && alternativeGeneratorPhase === 'newLayout') && (
            <div className="grid grid-cols-2 gap-2 sm:gap-3 p-1 sm:p-2 h-1/3 sm:h-2/5">
              <div className="bg-neutral-800/40 dark:bg-neutral-700/30 rounded-md p-1.5 sm:p-2 space-y-1.5 sm:space-y-2">
                <div className="h-2.5 sm:h-3 bg-neutral-700/50 dark:bg-neutral-600/40 rounded w-3/4"></div>
                <div className="h-2 sm:h-2.5 bg-neutral-700/50 dark:bg-neutral-600/40 rounded w-full"></div>
                <div className="h-2 sm:h-2.5 bg-neutral-700/50 dark:bg-neutral-600/40 rounded w-5/6"></div>
              </div>
              <div className="bg-neutral-800/40 dark:bg-neutral-700/30 rounded-md p-1.5 sm:p-2 space-y-1.5 sm:space-y-2">
                <div className="h-2.5 sm:h-3 bg-neutral-700/50 dark:bg-neutral-600/40 rounded w-3/4"></div>
                <div className="h-2 sm:h-2.5 bg-neutral-700/50 dark:bg-neutral-600/40 rounded w-full"></div>
                <div className="h-2 sm:h-2.5 bg-neutral-700/50 dark:bg-neutral-600/40 rounded w-5/6"></div>
              </div>
            </div>
          )}
        </div>
        {/* Children (like heatmap) will be rendered here, clipped by this container */}
        {children}
      </div>
    </div>
  )
}

export default SkeletonMockup
