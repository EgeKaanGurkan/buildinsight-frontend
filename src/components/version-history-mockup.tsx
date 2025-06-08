"use client"

import { GitCommit, MessageSquare, ExternalLink } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const VersionHistoryMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const inView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -100px 0px"
  })

  // Helper function to format numbers in a human-friendly way
  const formatFeedbackCount = (count: number): string => {
    if (count < 1000) {
      return count.toString()
    } else if (count < 10000) {
      const formatted = (count / 1000).toFixed(1)
      return formatted.endsWith('.0') ? `${Math.floor(count / 1000)}K` : `${formatted}K`
    } else {
      return `${Math.floor(count / 1000)}K+`
    }
  }

  const commitVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
  }

  const commitData = [
    {
      hash: "a1b2c3d",
      message: "release: v3.14.15",
      date: "10 hours ago",
      feedbackCount: 140,
      isLatest: true, // Mark the latest commit
      feedback: [
        { id: 1, textLength: "w-3/4" },
        { id: 2, textLength: "w-1/2" },
        // { id: 3, textLength: "w-5/6" },
      ],
    },
    {
      hash: "e4f5g6h",
      message: "release: v3.14.14",
      date: "5 days ago",
      feedbackCount: 12000,
      isLatest: true,
      feedback: [
        { id: 1, textLength: "w-2/3" },
        { id: 3, textLength: "w-5/6" },
      ],
    },
    {
      hash: "i7j8k9l",
      message: "release: v3.14.13",
      date: "1 week ago",
      feedbackCount: 0,
      isLatest: true,
      feedback: [],
      hiddenOnSmall: true,
    },
  ]

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 md:p-5 z-[1] pointer-events-none">
      <div className="w-full h-full bg-black/20  backdrop-blur-sm rounded-lg shadow-xl p-3 sm:p-4 space-y-3 sm:space-y-4 opacity-90 overflow-y-auto no-scrollbar tracking-tight">
        {commitData.map((commit, index) => (
          inView && (
            <motion.div
              key={commit.hash}
              className={`p-2 sm:p-3 bg-neutral-800/50 dark:bg-neutral-700/40 rounded-md space-y-2 ${
                commit.hiddenOnSmall && index === 2 ? "hidden sm:block" : ""
              }`}
              initial="initial"
              animate="animate"
              variants={commitVariants}
              transition={{ 
                duration: 0.5, 
                ease: "easeOut", 
                delay: index * 0.15 
              }}
            >
              {/* Commit Info */}
              <div className="flex flex-row sm:items-center sm:space-x-3 space-y-1 sm:space-y-0 text-xs text-neutral-400 dark:text-neutral-500">
                <div className="flex items-center space-x-1.5">
                  <GitCommit className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-600" />
                  <span className="font-mono text-neutral-300 dark:text-neutral-400">{commit.hash}</span>
                </div>
                <span className="flex-grow text-neutral-300/90 dark:text-neutral-400/90 truncate" title={commit.message}>
                  {commit.message}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-neutral-500 dark:text-neutral-600 whitespace-nowrap">{commit.date}</span>
                  {commit.isLatest && (
                    <ExternalLink className="w-3.5 h-3.5 text-sky-400 dark:text-sky-500" />
                  )}
                </div>
              </div>

              {/* Feedback Count & List */}
              {commit.feedbackCount > 0 && (
                <div className="pl-1 sm:pl-2 space-y-1.5">
                  <div className="flex items-center space-x-1 text-xs text-neutral-500 dark:text-neutral-600 mb-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>Feedback: {formatFeedbackCount(commit.feedbackCount)}</span>
                  </div>
                  {commit.feedback.map((fb) => (
                    <div key={fb.id} className="flex items-center space-x-2 pl-3 sm:pl-4">
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-neutral-700/60 dark:bg-neutral-600/50"></div>
                      <div className={`h-2.5 bg-neutral-600/50 dark:bg-neutral-500/40 rounded ${fb.textLength}`}></div>
                    </div>
                  ))}
                </div>
              )}
              {commit.feedbackCount === 0 && (
                <div className="pl-1 sm:pl-2 text-xs text-neutral-600 dark:text-neutral-700 italic">
                  No feedback for this version.
                </div>
              )}
            </motion.div>
          )
        ))}
      </div>
    </div>
  )
}

export default VersionHistoryMockup
