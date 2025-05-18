import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GridBackground } from "@/components/grid-background"
import { TechPattern } from "@/components/tech-pattern"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer } from "@/components/responsive-container"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <GridBackground />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <TechPattern />
        <ResponsiveContainer className="relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-secondary/80 px-3 py-1 text-sm text-primary mb-4">
                Productivity Suite
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none glow-text">
                Turn work-life balance from
                <br />a dream into your daily reality
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                The Smart Way To Track, Minimize Risk, Maximize Gains. Get Access. Trading Capital With Arrows.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Try for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tools">Access Tools</Link>
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Tools Section */}
      <section className="relative py-12 md:py-24">
        <ResponsiveContainer className="relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">All the tools you need</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Created to adapt to your working style. Boost your productivity with our suite of tools.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm hover:shadow-md hover:shadow-primary/5 transition-shadow">
              <CardHeader>
                <CardTitle>Task Management</CardTitle>
                <CardDescription>Organize and prioritize your tasks efficiently</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Priority levels</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Progress tracking</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Visual indicators</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/tasks">Open Task Manager</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm hover:shadow-md hover:shadow-primary/5 transition-shadow">
              <CardHeader>
                <CardTitle>Time Management</CardTitle>
                <CardDescription>Maximize your productivity with time tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Pomodoro timer</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Weekly calendar</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Time zone converter</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/pomodoro">Open Pomodoro Timer</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm hover:shadow-md hover:shadow-primary/5 transition-shadow">
              <CardHeader>
                <CardTitle>Note Taking</CardTitle>
                <CardDescription>Capture and organize your thoughts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Sticky notes</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Markdown editor</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Real-time preview</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/notes">Open Sticky Notes</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/tools">
                View All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ResponsiveContainer>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 md:py-24">
        <ResponsiveContainer className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
              Starting has never been <span className="text-primary glow-text">easier</span>
            </h2>
            <p className="mb-8 text-muted-foreground">
              Get started with our productivity tools today and transform your workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Try for free</Button>
              <Button variant="outline" asChild>
                <Link href="/tools">Access Tools</Link>
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
      </section>
    </div>
  )
}
