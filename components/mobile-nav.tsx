"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ThemeToggle } from "@/components/theme-toggle"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const pathname = usePathname()

  const isToolsPage =
    pathname?.startsWith("/tools") ||
    pathname?.startsWith("/tasks") ||
    pathname?.startsWith("/notes") ||
    pathname?.startsWith("/pomodoro") ||
    pathname?.startsWith("/markdown") ||
    pathname?.startsWith("/calendar") ||
    pathname?.startsWith("/timezone") ||
    pathname?.startsWith("/json") ||
    pathname?.startsWith("/mindmap") ||
    pathname?.startsWith("/snippets") ||
    pathname?.startsWith("/regex")

  const tools = [
    { name: "All Tools", href: "/tools" },
    { name: "Task List", href: "/tasks" },
    { name: "Sticky Notes", href: "/notes" },
    { name: "Pomodoro Timer", href: "/pomodoro" },
    { name: "Markdown Notes", href: "/markdown" },
    { name: "Weekly Calendar", href: "/calendar" },
    { name: "Time Zone Converter", href: "/timezone" },
    { name: "JSON Viewer/Editor", href: "/json" },
    { name: "Mind Map Builder", href: "/mindmap" },
    { name: "Snippet Manager", href: "/snippets" },
    { name: "Regex Tester", href: "/regex" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] max-w-sm">
        <div className="flex flex-col gap-6 pt-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" onClick={() => setOpen(false)} className="text-lg font-bold">
              <span className="text-primary">Productivity</span>Hub
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Home
          </Link>

          <Collapsible open={toolsOpen} onOpenChange={setToolsOpen} className="w-full">
            <CollapsibleTrigger asChild>
              <button
                className={cn(
                  "flex w-full items-center justify-between text-sm font-medium transition-colors hover:text-primary",
                  isToolsPage ? "text-primary" : "text-muted-foreground",
                )}
              >
                Tools
                <ChevronDown className={cn("h-4 w-4 transition-transform", toolsOpen ? "rotate-180" : "")} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2 pl-4">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block text-sm transition-colors hover:text-primary",
                    pathname === tool.href ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {tool.name}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <div className="flex flex-col gap-2 mt-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setOpen(false)}>
              Get Started
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
