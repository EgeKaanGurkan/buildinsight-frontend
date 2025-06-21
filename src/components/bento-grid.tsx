import SkeletonMockup from "@/components/skeleton-mockup";
import HeatmapOverlay from "@/components/heatmap-overlay";
import React from "react";
import VersionHistoryMockup from "@/components/version-history-mockup";
import { motion, type Variants } from "motion/react";
import ChromaInlineText from "./chroma-text";

export default function BentoGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth animation
      },
    },
  };

  return (
    <section id="features" className="w-full flex items-center bg-background flex-col gap-6 mt-16">
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary w-full max-w-7xl"
      >
        <ChromaInlineText theme="dark" text="Features" duration={1} gradientBlur="0px" className="font-medium" />
      </h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-7xl tracking-tight"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Top Left - spans 7 cols */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-xl overflow-hidden min-h-[300px] md:min-h-[380px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-2xl flex flex-col justify-end p-6 col-span-1 md:col-span-7 row-span-1">
          <SkeletonMockup showBuildInSight={true}/>
          {/*{targetElement && (*/}
          {/*  <BuildInSightElementOverlay element={targetElement} onRemove={() => setTargetElement(null)} />*/}
          {/*)}*/}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-[6]">
            {/*semi-transparent black gradient*/}
          </div>
          <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center pointer-events-none">
          </div>
          <div className="relative z-[10]">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">View feedback on your live website</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Gather feedback with utmost detail and precision from your end users or UI/UX designers, then view them on your live domain.
            </p>
          </div>
        </motion.div>
        {/* Top Right - spans 5 cols */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-xl overflow-hidden min-h-[300px] md:min-h-[380px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-2xl flex flex-col justify-end p-6 col-span-1 md:col-span-5 row-span-1">
          <SkeletonMockup>
            <HeatmapOverlay/>
          </SkeletonMockup>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-[6]">
            {/*semi-transparent black gradient*/}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[6]">
            {/* Slightly less opaque gradient to ensure heatmap is somewhat visible under text */}
          </div>
          <div className="relative z-[10]">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">Collect valuable insights</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Understand user intent via click heat maps and scroll statistics, and proactively collect valuable insight
              from frequent regions.
            </p>
          </div>
        </motion.div>
        {/* Bottom Left - spans 5 cols */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-xl overflow-hidden min-h-[300px] md:min-h-[380px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-2xl flex flex-col justify-end p-6 col-span-1 md:col-span-5 row-span-1">
          <VersionHistoryMockup/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-[6]"></div>
          <div className="relative z-[10]">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">Version your feedback</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Track exactly what users were saying for each commit to production and see a timeline of feedback by connecting your repository.
            </p>
          </div>
        </motion.div>
        {/* Bottom Right - spans 7 cols */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-xl overflow-hidden min-h-[300px] md:min-h-[380px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-2xl flex flex-col justify-end p-6 col-span-1 md:col-span-7 row-span-1">
            <SkeletonMockup showAlternativeGeneratorDemo={true} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-[6] pointer-events-none">
            {/*semi-transparent black gradient*/}
          </div>
          <div className="relative z-[10]">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">Generate alternatives</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Cycle through alternatives to your components that are automatically generated based on your users&apos;
              feedback.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
