"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  useEffect,
  useState, // ← NEW
  useRef,
} from "react"
import { useBuildInSight, GainInSight, Spotlight } from "buildinsight"
import { useStripeCreateCheckoutSession } from "@/api/hooks/stripe"
import { useRouter } from "next/navigation"
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/ui/code-block"
import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "@/components/ui/snippet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NpmIcon, PnpmIcon, YarnIcon } from "@/components/icons"
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react"
import type { BundledLanguage } from "@/components/ui/code-block"
import BentoGrid from "@/components/bento-grid"
import useIsMobile from "@/lib/hooks/use-is-mobile"
import Lanyard from "@/components/lanyard"
import { ShareIcon } from "lucide-react"

type typeT = "plane" | "sphere" | "waterPlane"

const bgShaderConfig = {
  /* Core mesh */
  type: "waterPlane" as typeT,
  shader: "a",

  /* Colours */
  color1: "#ff2f00",
  color2: "#a73af1",
  color3: "#ff7200",

  /* Lighting / env */
  grain: "off" as const,
  brightness: 1.2,
  lightType: "3d" as const,
  // envPreset: "city",

  /* Animation uniforms (speed is dynamic) */
  animate: "on" as const,
  uStrength: 3,
  uDensity: 1.3,
  uSpeed: 0.15,

  /* Camera */
  cDistance: 1.6,
  cAzimuthAngle: 180,
  cPolarAngle: 90,

  /* Transform */
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 50,
}

/*───────────────────────────────────────────────────────────*/
/*   HOME COMPONENT                                           */
/*───────────────────────────────────────────────────────────*/
export default function Home() {
  /* ─────────────── Speed slider state ─────────────── */
  const [speed] = useState(1) // 1 × = normal
  const animationSpeed = 0.6 / speed // re-use everywhere

  // Add state for lanyard form
  const [nameInput, setNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  // const [submittedData, setSubmittedData] = useState<{ name: string; email: string } | null>({name: "Efe Barlas", email: "efe@buildsinsight.dev"})
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string } | null>(null)

  // const router = useRouter()
  const isMobile = useIsMobile()

  /* ─────────────── BuildInsight click log ─────────── */
  const { clickedElements, setIsTriggerVisible, isTriggerVisible, isExpandedVisible, setIsExpandedVisible } = useBuildInSight()
  useEffect(() => console.log(clickedElements), [clickedElements])

  // const stripeCreateCheckoutSessionMutation = useStripeCreateCheckoutSession()

  // async function handleStartStripeFlow() {
  //   console.log("handleStartStripeFlow")
  //   const { url } = await stripeCreateCheckoutSessionMutation.mutateAsync({
  //     productId: "prod_SEJdLhTa3lqQYT",
  //     priceId: "price_1RJr0DDF5WhxqTFqJZEd3VJn",
  //     successUrl: `${window.location.origin}/payment-success`,
  //     cancelUrl: `${window.location.origin}/payment-canceled`,
  //     // customerId?: string,
  //   })

  //   void router.push(url)
  // }

  // Split headline into words for staggered animation
  const headlineWords = ["Understand", "exactly", "what", "users", "want", "from", "your", "website"]

  // Snippet commands and state for tabs
  const commands = [
    {
      label: "npm",
      icon: NpmIcon,
      code: "npm install buildinsight",
    },
    {
      label: "pnpm",
      icon: PnpmIcon,
      code: "pnpm add buildinsight",
    },
    {
      label: "yarn",
      icon: YarnIcon,
      code: "yarn add buildinsight",
    },
  ]
  const [snippetTab, setSnippetTab] = useState(commands[0].label)
  const activeCommand = commands.find((command) => command.label === snippetTab)

  const waitlistRef = useRef<HTMLDivElement>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)

  useEffect(() => {
    // if (!isMobile) {
      // setIsTriggerVisible(true)
    // }

    // setIsExpandedVisible(true)
  }, [])

  /* ─────────────── JSX ─────────────────────────────── */
  return (
    <>
      {/*────────── Hero Section ──────────*/}
      <section id="hero" className={"bg-background"}>
        {/* Shader canvas */}
        {/* {MemoizedSparkles} */}
        {/* <Spotlight /> */}

        {/*────────── Headline / sub copy ──────────*/}
        {/* <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      /> */}
        <GainInSight name={"hero"}>
          <div className="h-full w-full flex-col pt-14 p-6 relative">
            <div className="absolute top-0 left-0 w-full h-full z-[-11] bg-black ">
              {/*<ShaderGradientCanvas*/}
              {/*  style={{*/}
              {/*    position: 'absolute',*/}
              {/*    top: 0,*/}
              {/*  }}*/}
              {/*  lazyLoad={true}*/}
              {/*  pointerEvents="none"*/}
              {/*>*/}
              {/*  <ShaderGradient {...bgShaderConfig} />*/}
              {/*</ShaderGradientCanvas>*/}
            </div>
            <div className="h-full flex justify-center items-center flex-col gap-12 pt-24">
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
              <div className="flex max-w-[80rem] gap-12">
                <div className="flex md:flex-[0.7] w-full flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    <div className="relative flex group">
                      <div className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl spacing tracking-tight font-medium text-foreground flex flex-wrap gap-x-1 md:gap-x-2 gap-y-2">
                        {headlineWords.map((word, index) => (
                          <div key={word} className="overflow-hidden">
                            <motion.span
                              initial={{ y: "100%", opacity: 0 }}
                              animate={{ y: "0%", opacity: 1 }}
                              transition={{
                                duration: 0.8 * animationSpeed,
                                delay: (0.4 + index * 0.1) * animationSpeed,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className={`inline-block `}
                              // style={
                              //   word === "exactly"
                              //     ? {
                              //       textShadow: "0 0 20px rgba(255, 187, 0, 0.6)",
                              //     }
                              //     : {}
                              // }
                            >
                              {word}
                            </motion.span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* <motion.p
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
                  </motion.p> */}
                  </div>

                  {/* Sub-headline */}

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8 * animationSpeed,
                      delay: 1.6 * animationSpeed,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col gap-6"
                  >
                    <motion.p className="text-md sm:text-xl md:text-2xl lg:text-2xl spacing tracking-tight text-foreground">
                      Hold a spotlight on UX issues using instant, meaningful and actionable user feedback on a
                      component level
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8 * animationSpeed,
                        delay: 1.6 * animationSpeed,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-center"
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
                          // onClick={handleStartStripeFlow}
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
                          onClick={async () => {
                            const prev = isTriggerVisible;
                            setIsTriggerVisible(false);
                            setIsAutoScrolling(true);
                            if (waitlistRef?.current) {
                              const handle = () => {
                                setTimeout(() => {
                                  setIsTriggerVisible(prev);
                                  setIsAutoScrolling(false);
                                }, 500);
                                window.removeEventListener('scroll', handle);
                              };
                              window.addEventListener('scroll', handle);
                              waitlistRef.current.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          <span>Join the waitlist</span>
                          <span>→</span>
                        </motion.button>
                        {/* <motion.button
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
                    </motion.button> */}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
                {!isMobile && (
                  <div className={"flex md:flex-[0.3] flex-col gap-3"}>
                    {/* CodeBlock component for Providers example */}
                    <div className="">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8 * animationSpeed,
                          delay: 1.8 * animationSpeed,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Snippet value={snippetTab} onValueChange={setSnippetTab}>
                          <SnippetHeader>
                            <SnippetTabsList>
                              {commands.map((command) => (
                                <SnippetTabsTrigger key={command.label} value={command.label}>
                                  <command.icon width={16} height={16} />
                                  <span>{command.label}</span>
                                </SnippetTabsTrigger>
                              ))}
                            </SnippetTabsList>
                            {activeCommand && (
                              <SnippetCopyButton
                                value={activeCommand.code}
                                onCopy={() => console.log(`Copied "${activeCommand.code}" to clipboard`)}
                                onError={() => console.error(`Failed to copy "${activeCommand.code}" to clipboard`)}
                              />
                            )}
                          </SnippetHeader>
                          {commands.map((command) => (
                            <SnippetTabsContent key={command.label} value={command.label}>
                              {command.code}
                            </SnippetTabsContent>
                          ))}
                        </Snippet>
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8 * animationSpeed,
                        delay: 2.0 * animationSpeed,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <CodeBlock
                        data={[
                          {
                            language: "tsx",
                            filename: "Providers.tsx",
                            code: `"use client"
import React from "react";
import {BuildInsightProvider} from "buildinsight";

export function Providers({children}: { children: React.ReactNode }) {
return (
  <BuildInsightProvider
    projectId="4083aef7-122e-49b3-8a23-8b0e59f67594"
  >
    <>{children}</>
  </BuildInsightProvider>
)
}`,
                          },
                        ]}
                        defaultValue="tsx"
                      >
                        <CodeBlockHeader>
                          <CodeBlockFiles>
                            {(item) => (
                              <CodeBlockFilename key={item.language} value={item.language}>
                                {item.filename}
                              </CodeBlockFilename>
                            )}
                          </CodeBlockFiles>
                          <CodeBlockCopyButton
                            onCopy={() => console.log("Copied code to clipboard")}
                            onError={() => console.error("Failed to copy code to clipboard")}
                          />
                        </CodeBlockHeader>
                        <CodeBlockBody>
                          {(item) => (
                            <CodeBlockItem key={item.language} value={item.language}>
                              <CodeBlockContent language={item.language as BundledLanguage}>
                                {item.code}
                              </CodeBlockContent>
                            </CodeBlockItem>
                          )}
                        </CodeBlockBody>
                      </CodeBlock>
                    </motion.div>
                  </div>
                )}
              </div>
              {/* Tagline */}
              <div
                className={"relative flex w-full h-[45svh] overflow-hidden rounded-md max-w-[95%] group"}
                onMouseEnter={() => {
                  if (!isAutoScrolling) setIsTriggerVisible(true)
                }}
                onMouseLeave={() => setIsTriggerVisible(false)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <div className="flex items-center gap-2 transition-opacity duration-300 opacity-70">
                    <div className="text-white flex items-center gap-2 overflow-hidden text-xl tracking-tight font-bold">
                      <AnimatePresence mode="wait">
                        {!isTriggerVisible && !isExpandedVisible && (
                          <motion.span
                            key="hover"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: [0, 1, 0, 1] }}
                          >
                            Hover over to try!
                          </motion.span>
                        )}
                        {isTriggerVisible && !isExpandedVisible && (
                          <motion.div
                            key="press-y"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: [0, 1, 0, 1] }}
                            className="flex items-center gap-2"
                          >
                            <span>Press</span>
                            <kbd className="size-7 text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm flex items-center justify-center text-lg font-mono">
                              Y
                            </kbd>
                            <span>on your keyboard to give insight.</span>
                          </motion.div>
                        )}
                        {isExpandedVisible && (
                          <motion.span
                            key="click-element"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: [0, 1, 0, 1] }}
                          >
                            Click on any element on the page!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-background"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
                >
                  <ShaderGradientCanvas
                    style={{
                      position: "absolute",
                      top: 0,
                    }}
                    lazyLoad={false}
                    pointerEvents="none"
                  >
                    <ShaderGradient {...bgShaderConfig} />
                  </ShaderGradientCanvas>
                </motion.div>
                <div className="absolute bg-white rounded-sm z-20 m-2"></div>
              </div>
            </div>
          </div>
        </GainInSight>
      </section>
      {/*────────── Bento Grid Section ──────────*/}
      <BentoGrid />
      {/* Lanyard Form and 3D Card */}
      <div ref={waitlistRef} className="h-screen w-full flex flex-col items-center justify-center gap-8 relative">
        <AnimatePresence mode="wait">
          {!formSubmitted ? (
            <motion.div
              key="waitlist-form"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full max-w-xl p-8 space-y-6 rounded-xl flex-col"
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-primary/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] bg-gradient-to-b from-primary/20 to-primary/10 border border-primary/30 backdrop-blur-sm">
                    <span className="flex items-center gap-1.5">
                      <span className="relative top-px">Claim your early bird lanyard badge for special surprises</span>
                    </span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-card-foreground">Join Our Early Bird Waitlist!</h2>
                <p className="text-muted-foreground">Get updates on new features, influence development and get special pricing on launch. Of course, you will be the first to know!</p>
              </div>
              <form
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault()
                  setLoading(true)
                  // Mock API call
                  await new Promise((resolve) => setTimeout(resolve, 1200))
                  setSubmittedData({ name: nameInput, email: emailInput })
                  setFormSubmitted(true)
                  setLoading(false)
                  setNameInput("")
                  setEmailInput("")
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="name-waitlist" className="text-card-foreground">
                    Name
                  </Label>
                  <Input
                    id="name-waitlist"
                    type="text"
                    placeholder="Enter your name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="bg-background text-foreground placeholder:text-muted-foreground"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-waitlist" className="text-card-foreground">
                    Email
                  </Label>
                  <Input
                    id="email-waitlist"
                    type="email"
                    placeholder="you@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="bg-background text-foreground placeholder:text-muted-foreground"
                    required
                    disabled={loading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={loading}
                >
                  {loading ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>
            </motion.div>
          ) : (
          <motion.div
              key="lanyard-success"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full flex flex-col items-center justify-center"
            >
              {/* <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-card-foreground">Welcome to the Waitlist!</h2>
                <p className="text-muted-foreground">Thank you for joining, {submittedData?.name}!</p>
              </div> */}
              <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="w-full flex items-center justify-center">
                <Lanyard name={submittedData?.name} email={submittedData?.email} />
              </motion.div>
            </motion.div>
          )}

          
        </AnimatePresence>
        
        {formSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute z-[9999999999999999999999999999999] top-0 left-0 w-full h-full flex flex-col items-center justify-end pointer-events-none"
            >
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-row px-5 bg-transparent mb-24  w-full justify-center pointer-events-auto">
                <div className="grid grid-cols-12 w-full max-w-3xl">
                  <div className="col-span-12  px-5 py-2">
                    <h2 className="text-4xl tracking-tight font-medium text-card-foreground">Thank you for joining, {submittedData?.name.split(" ")[0]}! We can't wait to hear your thoughts.</h2>
                  </div>
                  <div className="col-span-12 px-5 py-2">
                    <p className="text-muted-foreground">We will be in touch soon about development updates, early access and special pricing on launch.</p>
                  </div>
                  <div className="col-span-4 px-5 py-2">
                    <div className="flex flex-row gap-2">
                      <Button className="m-0" variant={"secondary"}>
                        <ShareIcon className="w-4 h-4" />
                        Share a Link to Your Tag
                      </Button>
                    </div>
                  </div>
                </div>
                {/* <p className="text-muted-foreground">We will be in touch soon.</p>
                <Button onClick={() => setFormSubmitted(false)}>Back to Waitlist</Button> */}
              </motion.div>
            </motion.div>
          )}
      </div>
    </>
  )
}
