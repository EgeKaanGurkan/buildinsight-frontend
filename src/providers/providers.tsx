"use client"

import { ThemeProvider } from "@/providers/theme-provider"
import React from "react";

import {BuildInSightProvider, BuildInSight} from "buildinsight";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <BuildInSightProvider>
        <BuildInSight />
        <>{children}</>
      </BuildInSightProvider>
    </ThemeProvider>
  )
}