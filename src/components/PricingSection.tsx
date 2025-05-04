"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Basic",
      description: "Essential features for individuals and small projects",
      price: {
        monthly: 10,
        annually: 100,
      },
      features: ["1 user", "5 projects", "Basic analytics", "24-hour support response time", "Community access"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "Advanced features for professionals and growing teams",
      price: {
        monthly: 15,
        annually: 144,
      },
      features: [
        "5 users",
        "Unlimited projects",
        "Advanced analytics",
        "4-hour support response time",
        "API access",
        "Custom integrations",
        "Team collaboration tools",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    // {
    //   name: "Enterprise",
    //   description: "Custom solutions for large organizations",
    //   price: {
    //     monthly: 99,
    //     annually: 990,
    //   },
    //   features: [
    //     "Unlimited users",
    //     "Unlimited projects",
    //     "Premium analytics",
    //     "1-hour support response time",
    //     "Dedicated account manager",
    //     "Custom development",
    //     "Advanced security features",
    //     "SLA guarantees",
    //   ],
    //   cta: "Contact Sales",
    //   popular: false,
    // },
  ]

  return (
    <section className="py-16 px-4 w-full max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Simple, transparent pricing</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. Always know what you'll pay.
        </p>

        <div className="flex items-center justify-center mt-8 space-x-3">
          <span className={`text-sm ${!isAnnual ? "font-medium" : "text-muted-foreground"}`}>Monthly</span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} aria-label="Toggle annual billing" />
          <span className={`text-sm ${isAnnual ? "font-medium" : "text-muted-foreground"}`}>
            Annual <span className="text-emerald-600 font-medium">(Save 20%)</span>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 px-10">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg relative" : ""}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6 h-14 flex items-baseline">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isAnnual ? "annual" : "monthly"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-4xl font-bold"
                  >
                    ${isAnnual ? plan.price.annually : plan.price.monthly}
                  </motion.span>
                </AnimatePresence>
                {plan.price.monthly > 0 && (
                  <div className="relative ml-2 h-6 w-16">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isAnnual ? "annual-label" : "monthly-label"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                          delay: 0.05, // Slight delay to sync with price animation
                        }}
                        className="text-muted-foreground absolute left-0"
                      >
                        /{isAnnual ? "year" : "month"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
