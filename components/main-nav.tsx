"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { ResponsiveContainer } from "@/components/responsive-container"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNav() {
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ResponsiveContainer className="flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-foreground">
              <span className="text-primary">Productivity</span>Hub
            </span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === "/"}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={isToolsPage ? "text-primary" : ""}>Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                          href="/tools"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">All Tools</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Access all productivity tools in one place to streamline your workflow
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link href="/tasks" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Task List</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Organize tasks with priority levels
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/notes" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Sticky Notes</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Create and organize colorful notes
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/pomodoro" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Pomodoro Timer</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Stay focused with timed sessions
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/markdown" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Markdown Notes</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Write and preview markdown notes
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* Pricing link removed */}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button size="sm" className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started
          </Button>
          <MobileNav />
        </div>
      </ResponsiveContainer>
    </header>
  )
}
