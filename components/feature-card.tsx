import Link from "next/link"
import {
  CheckSquare,
  StickyNote,
  Clock,
  FileText,
  Calendar,
  Globe,
  Code,
  Network,
  FileCode,
  Terminal,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  href: string
  className?: string
}

export function FeatureCard({ title, description, icon, href, className }: FeatureCardProps) {
  const icons: Record<string, LucideIcon> = {
    CheckSquare,
    StickyNote,
    Clock,
    FileText,
    Calendar,
    Globe,
    Code,
    Network,
    FileCode,
    Terminal,
  }

  const Icon = icons[icon] || CheckSquare

  return (
    <Link href={href}>
      <Card
        className={cn("transition-all hover:shadow-md hover:border-purple-200 dark:hover:border-purple-800", className)}
      >
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
            <Icon className="h-6 w-6 text-purple-600 dark:text-purple-300" />
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
