"use client"

import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GridBackground } from "@/components/grid-background"
import { TechPattern } from "@/components/tech-pattern"
import { ResponsiveContainer } from "@/components/responsive-container"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Timezone {
  name: string
  offset: string
  offsetValue: number
}

export default function TimezonePage() {
  const [sourceTime, setSourceTime] = useState<string>("")
  const [sourceTimezone, setSourceTimezone] = useState<string>("UTC+0")
  const [targetTimezones, setTargetTimezones] = useState<string[]>(["UTC-8", "UTC+1", "UTC+5:30", "UTC+9"])
  const [availableTimezones, setAvailableTimezones] = useState<Timezone[]>([])
  const [newTimezone, setNewTimezone] = useState<string>("UTC+0")
  const [isMounted, setIsMounted] = useState(false)

  // Initialize current time and timezones after mounting
  useEffect(() => {
    setIsMounted(true)

    // Set current time
    const now = new Date()
    setSourceTime(`${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`)

    // Generate timezone list
    const timezones: Timezone[] = []

    // UTC-12 to UTC+14
    for (let i = -12; i <= 14; i++) {
      const sign = i >= 0 ? "+" : "-"
      const absHours = Math.abs(i)
      const name = `UTC${sign}${absHours}`
      const offset = `${sign}${absHours}:00`
      timezones.push({ name, offset, offsetValue: i })
    }

    // Add some common half-hour offsets
    timezones.push({ name: "UTC+5:30 (India)", offset: "+5:30", offsetValue: 5.5 })
    timezones.push({ name: "UTC+9:30 (Australia)", offset: "+9:30", offsetValue: 9.5 })
    timezones.push({ name: "UTC-3:30 (Newfoundland)", offset: "-3:30", offsetValue: -3.5 })

    // Sort by offset
    timezones.sort((a, b) => a.offsetValue - b.offsetValue)

    setAvailableTimezones(timezones)
  }, [])

  const addTimezone = () => {
    if (!targetTimezones.includes(newTimezone)) {
      setTargetTimezones([...targetTimezones, newTimezone])
    }
  }

  const removeTimezone = (timezone: string) => {
    setTargetTimezones(targetTimezones.filter((tz) => tz !== timezone))
  }

  const convertTime = (time: string, fromTimezone: string, toTimezone: string) => {
    if (!time.match(/^\d{1,2}:\d{2}$/) || !isMounted) return "Loading..."

    // Parse the time
    const [hours, minutes] = time.split(":").map(Number)

    // Parse the timezones
    const fromOffset = parseOffset(fromTimezone)
    const toOffset = parseOffset(toTimezone)

    // Calculate the time difference
    const diffHours = toOffset - fromOffset

    // Create a date object for the calculation
    const date = new Date()
    date.setHours(hours)
    date.setMinutes(minutes)

    // Add the difference
    date.setHours(date.getHours() + diffHours)

    // Format the result
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
  }

  const parseOffset = (timezone: string) => {
    const match = timezone.match(/UTC([+-])(\d+)(?::(\d+))?/)
    if (!match) return 0

    const sign = match[1] === "+" ? 1 : -1
    const hours = Number.parseInt(match[2])
    const minutes = match[3] ? Number.parseInt(match[3]) / 60 : 0

    return sign * (hours + minutes)
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
          <h1 className="text-2xl md:text-3xl font-bold ml-4 glow-text">Time Zone Converter</h1>
        </div>

        <Card className="mb-8 border-border/40 bg-secondary/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Convert Time Across Time Zones</CardTitle>
            <CardDescription>Enter a time and select source time zone to convert</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Source Time</label>
                <Input
                  type="time"
                  value={sourceTime}
                  onChange={(e) => setSourceTime(e.target.value)}
                  className="bg-background/50 border-border/40"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Source Time Zone</label>
                <Select value={sourceTimezone} onValueChange={setSourceTimezone}>
                  <SelectTrigger className="bg-background/50 border-border/40">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimezones.map((tz) => (
                      <SelectItem key={tz.name} value={tz.name}>
                        {tz.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Add Time Zone</label>
                <div className="flex gap-2">
                  <Select value={newTimezone} onValueChange={setNewTimezone}>
                    <SelectTrigger className="bg-background/50 border-border/40">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimezones.map((tz) => (
                        <SelectItem key={tz.name} value={tz.name}>
                          {tz.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={addTimezone} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {targetTimezones.map((timezone) => (
            <Card
              key={timezone}
              className="border-border/40 bg-secondary/20 backdrop-blur-sm hover:shadow-md hover:shadow-primary/5 transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{timezone}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTimezone(timezone)}
                    className="h-8 px-2 text-xs"
                  >
                    Remove
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">
                  {convertTime(sourceTime, sourceTimezone, timezone)}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {isMounted
                    ? new Date().toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })
                    : "Loading..."}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ResponsiveContainer>
    </div>
  )
}
