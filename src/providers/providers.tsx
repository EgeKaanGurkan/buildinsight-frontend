"use client"

import {ThemeProvider} from "@/providers/theme-provider"
import React from "react";

import {BuildInsightProvider, BuildInSight} from "buildinsight";
import {QueryClient, QueryClientProvider} from "react-query";
import useIsMobile from "@/lib/hooks/use-is-mobile";

export function Providers({children}: { children: React.ReactNode }) {


  const isMobile = useIsMobile()
  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <BuildInsightProvider
          projectId="testProject"
        >
          <>{children}</>
          <BuildInSight />
        </BuildInsightProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

// section#hero > div.md:h-[60svh].lg:h-[50svh].w-full.flex-col.pt-20.p-6 > div.h-full.flex.justify-between.items-center.flex-col.gap-8 > div.flex.flex-col.gap-3 > div.relative.group > div
// section#hero > div.md:h-[60svh].lg:h-[50svh].w-full.flex-col.pt-20.p-6 > div.h-full.flex.justify-between.items-center.flex-col.gap-8 > div.flex.flex-col.gap-3 > div.relative.group > div > p.text-8xl.sm:text-5xl.md:text-7xl.lg:text-8xl.spacing.tracking-tight