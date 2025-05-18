"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, Play, Pause, RotateCcw, Settings } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GridBackground } from "@/components/grid-background"
import { TechPattern } from "@/components/tech-pattern"
import { ResponsiveContainer } from "@/components/responsive-container"

export default function PomodoroPage() {
  const [mode, setMode] = useState<"work" | "shortBreak" | "longBreak">("work")
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [settings, setSettings] = useState({
    work: 25,
    shortBreak: 5,
    longBreak: 15,
  })
  const [cycles, setCycles] = useState(0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Set initial time based on mode
  useEffect(() => {
    switch (mode) {
      case "work":
        setTimeLeft(settings.work * 60)
        break
      case "shortBreak":
        setTimeLeft(settings.shortBreak * 60)
        break
      case "longBreak":
        setTimeLeft(settings.longBreak * 60)
        break
    }
    setIsActive(false)
  }, [mode, settings])

  // Timer logic
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Timer completed
            clearInterval(intervalRef.current as NodeJS.Timeout)

            // Handle cycle completion
            if (mode === "work") {
              const newCycles = cycles + 1
              setCycles(newCycles)

              // After 4 work sessions, take a long break
              if (newCycles % 4 === 0) {
                setMode("longBreak")
              } else {
                setMode("shortBreak")
              }
            } else {
              // After break, go back to work
              setMode("work")
            }

            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, mode, cycles])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    switch (mode) {
      case "work":
        setTimeLeft(settings.work * 60)
        break
      case "shortBreak":
        setTimeLeft(settings.shortBreak * 60)
        break
      case "longBreak":
        setTimeLeft(settings.longBreak * 60)
        break
    }

    setIsActive(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getProgress = () => {
    let total
    switch (mode) {
      case "work":
        total = settings.work * 60
        break
      case "shortBreak":
        total = settings.shortBreak * 60
        break
      case "longBreak":
        total = settings.longBreak * 60
        break
      default:
        total = settings.work * 60
    }
    return 100 - (timeLeft / total) * 100
  }

  const getModeColor = () => {
    switch (mode) {
      case "work":
        return "text-red-500"
      case "shortBreak":
        return "text-emerald-500"
      case "longBreak":
        return "text-blue-500"
    }
  }

  const getProgressColor = () => {
    switch (mode) {
      case "work":
        return "bg-red-500"
      case "shortBreak":
        return "bg-emerald-500"
      case "longBreak":
        return "bg-blue-500"
    }
  }

  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <TechPattern />
      <ResponsiveContainer className="py-6 md:py-10 relative z-10">
        <div className="flex items-center mb-6 md:mb-8">
          <Link href="/tools">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Tools
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold ml-4 glow-text">Pomodoro Timer</h1>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Pomodoro Timer</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background/95 backdrop-blur-sm border-border/40 w-[90%] max-w-md">
                    <DialogHeader>
                      <DialogTitle>Timer Settings</DialogTitle>
                      <DialogDescription>Customize your timer durations (in minutes)</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="work" className="text-right">
                          Work
                        </Label>
                        <Input
                          id="work"
                          type="number"
                          value={settings.work}
                          onChange={(e) => setSettings({ ...settings, work: Number.parseInt(e.target.value) || 1 })}
                          min="1"
                          max="60"
                          className="col-span-3 bg-background/50 border-border/40"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shortBreak" className="text-right">
                          Short Break
                        </Label>
                        <Input
                          id="shortBreak"
                          type="number"
                          value={settings.shortBreak}
                          onChange={(e) =>
                            setSettings({ ...settings, shortBreak: Number.parseInt(e.target.value) || 1 })
                          }
                          min="1"
                          max="30"
                          className="col-span-3 bg-background/50 border-border/40"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="longBreak" className="text-right">
                          Long Break
                        </Label>
                        <Input
                          id="longBreak"
                          type="number"
                          value={settings.longBreak}
                          onChange={(e) =>
                            setSettings({ ...settings, longBreak: Number.parseInt(e.target.value) || 1 })
                          }
                          min="1"
                          max="60"
                          className="col-span-3 bg-background/50 border-border/40"
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>Focus on your work with timed sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <div className="grid grid-cols-3 gap-2 w-full">
                  <Button
                    variant={mode === "work" ? "default" : "outline"}
                    onClick={() => setMode("work")}
                    className={mode === "work" ? "bg-red-500 hover:bg-red-600" : ""}
                  >
                    Work
                  </Button>
                  <Button
                    variant={mode === "shortBreak" ? "default" : "outline"}
                    onClick={() => setMode("shortBreak")}
                    className={mode === "shortBreak" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                  >
                    Short Break
                  </Button>
                  <Button
                    variant={mode === "longBreak" ? "default" : "outline"}
                    onClick={() => setMode("longBreak")}
                    className={mode === "longBreak" ? "bg-blue-500 hover:bg-blue-600" : ""}
                  >
                    Long Break
                  </Button>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className={`text-5xl sm:text-7xl font-bold mb-4 ${getModeColor()}`}>{formatTime(timeLeft)}</div>
                <Progress value={getProgress()} className={`h-2 bg-secondary ${getProgressColor()}`} />
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={resetTimer}>
                  <RotateCcw className="h-5 w-5" />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  className="h-16 w-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={toggleTimer}
                >
                  {isActive ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </Button>
              </div>

              <div className="mt-6 text-center text-sm text-muted-foreground">Completed cycles: {cycles}</div>
            </CardContent>
          </Card>
        </div>
      </ResponsiveContainer>
    </div>
  )
}
