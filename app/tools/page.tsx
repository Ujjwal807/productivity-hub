import type React from "react"
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
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GridBackground } from "@/components/grid-background"
import { TechPattern } from "@/components/tech-pattern"
import { ResponsiveContainer } from "@/components/responsive-container"

interface ToolCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

function ToolCard({ title, description, icon, href }: ToolCardProps) {
  return (
    <Link href={href} className="block h-full">
      <Card className="h-full border-border/40 bg-secondary/20 backdrop-blur-sm hover:shadow-md hover:shadow-primary/5 transition-shadow">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function ToolsPage() {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <TechPattern />
      <ResponsiveContainer className="py-6 md:py-10 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-secondary/80 px-3 py-1 text-sm text-primary mb-4">
              Productivity Tools
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl glow-text">
              All-in-One Productivity Suite
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Access all your productivity tools in one place to streamline your workflow
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ToolCard
            title="Task List"
            description="Organize tasks with priority levels and track progress with visual indicators."
            icon={<CheckSquare className="h-6 w-6 text-primary" />}
            href="/tasks"
          />
          <ToolCard
            title="Sticky Notes"
            description="Create, edit, and organize colorful sticky notes for quick reminders."
            icon={<StickyNote className="h-6 w-6 text-primary" />}
            href="/notes"
          />
          <ToolCard
            title="Pomodoro Timer"
            description="Stay focused with a simple Pomodoro timer featuring reset functionality."
            icon={<Clock className="h-6 w-6 text-primary" />}
            href="/pomodoro"
          />
          <ToolCard
            title="Markdown Notes"
            description="Write and preview markdown notes with real-time word count."
            icon={<FileText className="h-6 w-6 text-primary" />}
            href="/markdown"
          />
          <ToolCard
            title="Weekly Calendar"
            description="Plan your week with a visual calendar featuring draggable task blocks."
            icon={<Calendar className="h-6 w-6 text-primary" />}
            href="/calendar"
          />
          <ToolCard
            title="Time Zone Converter"
            description="Convert times between different time zones with an intuitive interface."
            icon={<Globe className="h-6 w-6 text-primary" />}
            href="/timezone"
          />
          <ToolCard
            title="JSON Viewer/Editor"
            description="View and edit JSON with collapsible nodes for better visualization."
            icon={<Code className="h-6 w-6 text-primary" />}
            href="/json"
          />
          <ToolCard
            title="Mind Map Builder"
            description="Create visual mind maps with auto-expanding nodes to organize your thoughts."
            icon={<Network className="h-6 w-6 text-primary" />}
            href="/mindmap"
          />
          <ToolCard
            title="Snippet Manager"
            description="Store and organize code snippets with language filtering and search."
            icon={<FileCode className="h-6 w-6 text-primary" />}
            href="/snippets"
          />
          <ToolCard
            title="Regex Tester"
            description="Test regular expressions with color-coded match highlights."
            icon={<Terminal className="h-6 w-6 text-primary" />}
            href="/regex"
          />
        </div>
      </ResponsiveContainer>
    </div>
  )
}
