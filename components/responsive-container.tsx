import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function ResponsiveContainer({ children, className, as: Component = "div" }: ResponsiveContainerProps) {
  return <Component className={cn("w-full px-4 sm:px-6 md:px-8 mx-auto max-w-7xl", className)}>{children}</Component>
}
