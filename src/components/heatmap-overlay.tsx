"use client"

import {motion, useInView} from "framer-motion"
import {useRef} from "react";

const HeatmapOverlay = () => {
  const spotVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
  }

  const containerRef = useRef<HTMLDivElement>(null)

  const inView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -100px 0px"
  })

  return (
    <div ref={containerRef} className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      {/* Red hotspots - strongest intensity */}
      {inView && (
        <motion.div
          className="absolute top-[25%] left-[30%] w-16 h-16 sm:w-20 sm:h-20 bg-red-600/50 rounded-full blur-xl"
          initial="initial"
          animate="animate"
          variants={spotVariants}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        />
      )}
      {inView && (
        <motion.div
          className="absolute top-[40%] left-[55%] w-12 h-12 sm:w-16 sm:h-16 bg-red-600/50 rounded-full blur-lg"
          initial="initial"
          animate="animate"
          variants={spotVariants}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
        />
      )}

      {/* Orange hotspots - medium intensity */}
      {inView && (
        <motion.div
          className="absolute top-[50%] left-[20%] w-20 h-20 sm:w-24 sm:h-24 bg-orange-500/50 rounded-full blur-xl"
          initial="initial"
          animate="animate"
          variants={spotVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />
      )}
      {inView && (
        <motion.div
          className="absolute top-[65%] left-[65%] w-16 h-16 sm:w-20 sm:h-20 bg-orange-500/50 rounded-full blur-xl"
          initial="initial"
          animate="animate"
          variants={spotVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        />
      )}

      {/* Yellow hotspots - lower intensity */}
      {inView && (
        <motion.div
          className="absolute top-[15%] left-[60%] w-14 h-14 sm:w-16 sm:h-16 bg-green-400/50 rounded-full blur-xl"
          initial="initial"
          animate="animate"
          variants={spotVariants}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
        />
      )}
      {inView && (
        <motion.div
          className="absolute bottom-[10%] right-[15%] w-12 h-12 sm:w-14 sm:h-14 bg-green-400/50 rounded-full blur-lg"
          initial="initial"
          animate="animate"
          variants={spotVariants}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
        />
      )}
      {inView && (
        <motion.div
          className="absolute top-[30%] left-[5%] w-10 h-10 sm:w-12 sm:h-12 bg-green-400/20 rounded-full blur-md"
          initial="initial"
          animate="animate"
          variants={spotVariants}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
        />
      )}
    </div>
  )
}

export default HeatmapOverlay
