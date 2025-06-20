import { motion } from "framer-motion"
import ChromaInlineText from "@/components/chroma-text"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Puzzle, Link, MousePointerClick, Eye } from "lucide-react"
import BentoGrid from "@/components/bento-grid"
import { useRef } from "react"

export default function HowItWorksSection() {
  const whatIsHeadingRef = useRef<HTMLHeadingElement>(null)
  return (
    <section id="how" className="relative w-full flex-col flex justify-center items-center p-8 md:p-12 bg-background overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6 "
      >
        <div className="flex flex-col gap-3">
          <h2
            ref={whatIsHeadingRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary"
          >
            <ChromaInlineText theme="dark" text="What is buildinsight?" className="font-medium" duration={1} gradientBlur="0px" />
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground ">
            Gathering UI/UX feedback should be more engaging and less intrusive. Buildinsight provides a way to collect feedback directly
            on your live domain, specifically on a component level. Users can give feedback by clicking on a specific component, and you can see all the feedback when you log into the website with your magic link.
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <h2
            ref={whatIsHeadingRef}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary"
          >
            <ChromaInlineText theme="dark" text="How it works" duration={1} gradientBlur="0px" className="font-medium" />
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground">
            Integrating <ChromaInlineText text="buildinsight" delay={0.6} duration={1} gradientBlur="0px" className="font-medium" /> in your website is a piece of cake! You will just need to follow the steps below.
            <div className="text-sm text-muted-foreground mt-2">We promise we&apos;ll add proper documentation when we launch!</div>
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                icon: Puzzle,
                title: "Embed Provider",
                description: "Embed the BuildInsightProvider in your component tree.",
              },
              {
                icon: Link,
                title: "Share Magic Link or Enable Anonymous Feedback",
                description:
                  "Send a magic link to people you want to gather feedback from, or enable anonymous feedback for all users.",
              },
              {
                icon: MousePointerClick,
                title: "Collect Feedback",
                description: "Feedback is given directly on your website by selecting specific components.",
              },
              {
                icon: Eye,
                title: "View Insights",
                description: "See all the feedback when you log into the website with your magic link.",
              },
            ].map((step, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="">
                <AccordionTrigger className="flex items-center text-lg font-semibold text-foreground hover:no-underline">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-primary/8">0{index + 1}</span>
                    </div>
                    <span className="text-lg font-semibold text-foreground tracking-tight">{step.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed text-left pl-4">
                  {step.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>
      <BentoGrid />
    </section>
  )
} 