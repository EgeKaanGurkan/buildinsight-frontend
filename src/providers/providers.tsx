"use client"

import { ThemeProvider } from "@/providers/theme-provider"
import React from "react";

import {BuildInSightProvider, BuildInSight} from "buildinsight";
import {QueryClient, QueryClientProvider, useQueryClient} from "react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <BuildInSightProvider projectId={"5ca23b7b-9a4c-41a7-bb7d-053110495f48"} pageId={"8a17b876-b957-4360-94c7-13538bd5f042"} devOverlayVisible={true}>
            <BuildInSight />
            <>{children}</>
        </BuildInSightProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

// section#hero > div.md:h-[60svh].lg:h-[50svh].w-full.flex-col.pt-20.p-6 > div.h-full.flex.justify-between.items-center.flex-col.gap-8 > div.flex.flex-col.gap-3 > div.relative.group > div
// section#hero > div.md:h-[60svh].lg:h-[50svh].w-full.flex-col.pt-20.p-6 > div.h-full.flex.justify-between.items-center.flex-col.gap-8 > div.flex.flex-col.gap-3 > div.relative.group > div > p.text-8xl.sm:text-5xl.md:text-7xl.lg:text-8xl.spacing.tracking-tight