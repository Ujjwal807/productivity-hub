"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Plus, Trash2, ChevronRight } from "lucide-react"
import Link from "next/link"
import { format, addDays, startOfWeek, isSameDay } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GridBackground } from "@/components/grid-background"
import { TechPattern } from "@/components/tech-pattern"
import { ResponsiveContainer } from "@/components/responsive-container"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Event {
  id: string
  title: string
  day: number // 0-6 (Sunday-Saturday)
  startHour: number
  duration: number // in hours
  color: string
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([
    { id: "1", title: "Team Meeting", day: 1, startHour: 10, duration: 1, color: "bg-primary/20 border-primary/50" },
    {
      id: "2",
      title: "Project Planning",
      day: 2,
      startHour: 14,
      duration: 2,
      color: "bg-blue-500/20 border-blue-500/50",
    },
    { id: "3", title: "Client Call", day: 3, startHour: 11, duration: 1, color: "bg-amber-500/20 border-amber-500/50" },
    {
      id: "4",
      title: "Lunch Break",
      day: 4,
      startHour: 12,
      duration: 1,
      color: "bg-emerald-500/20 border-emerald-500/50",
    },
  ])
  const [newEvent, setNewEvent] = useState({
    title: "",
    day: 1,
    startHour: 9,
    duration: 1,
    color: "bg-primary/20 border-primary/50",
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const startOfCurrentWeek = startOfWeek(currentDate)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i))
  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM

  const colorOptions = [
    { value: "bg-primary/20 border-primary/50", label: "Teal" },
    { value: "bg-blue-500/20 border-blue-500/50", label: "Blue" },
    { value: "bg-amber-500/20 border-amber-500/50", label: "Amber" },
    { value: "bg-emerald-500/20 border-emerald-500/50", label: "Green" },
    { value: "bg-purple-500/20 border-purple-500/50", label: "Purple" },
    { value: "bg-rose-500/20 border-rose-500/50", label: "Rose" },
  ]

  const addEvent = () => {
    if (!newEvent.title.trim()) return

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      day: newEvent.day,
      startHour: newEvent.startHour,
      duration: newEvent.duration,
      color: newEvent.color,
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      day: 1,
      startHour: 9,
      duration: 1,
      color: "bg-primary/20 border-primary/50",
    })
  }

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const nextWeek = () => {
    setCurrentDate(addDays(currentDate, 7))
  }

  const prevWeek = () => {
    setCurrentDate(addDays(currentDate, -7))
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
          <h1 className="text-2xl md:text-3xl font-bold ml-4 glow-text">Weekly Calendar</h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={prevWeek}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Week
          </Button>
          <h2 className="text-xl font-semibold">
            {format(weekDays[0], "MMM d")} - {format(weekDays[6], "MMM d, yyyy")}
          </h2>
          <Button variant="outline" onClick={nextWeek}>
            Next Week
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-6 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background/95 backdrop-blur-sm border-border/40 w-[90%] max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>Create a new event for your weekly calendar.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="col-span-3 bg-background/50 border-border/40"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="day" className="text-right">
                  Day
                </Label>
                <Select
                  value={newEvent.day.toString()}
                  onValueChange={(value) => setNewEvent({ ...newEvent, day: Number.parseInt(value) })}
                >
                  <SelectTrigger className="col-span-3 bg-background/50 border-border/40">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Sunday</SelectItem>
                    <SelectItem value="1">Monday</SelectItem>
                    <SelectItem value="2">Tuesday</SelectItem>
                    <SelectItem value="3">Wednesday</SelectItem>
                    <SelectItem value="4">Thursday</SelectItem>
                    <SelectItem value="5">Friday</SelectItem>
                    <SelectItem value="6">Saturday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startHour" className="text-right">
                  Start Time
                </Label>
                <Select
                  value={newEvent.startHour.toString()}
                  onValueChange={(value) => setNewEvent({ ...newEvent, startHour: Number.parseInt(value) })}
                >
                  <SelectTrigger className="col-span-3 bg-background/50 border-border/40">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour.toString()}>
                        {hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration
                </Label>
                <Select
                  value={newEvent.duration.toString()}
                  onValueChange={(value) => setNewEvent({ ...newEvent, duration: Number.parseInt(value) })}
                >
                  <SelectTrigger className="col-span-3 bg-background/50 border-border/40">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="3">3 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Color
                </Label>
                <Select value={newEvent.color} onValueChange={(value) => setNewEvent({ ...newEvent, color: value })}>
                  <SelectTrigger className="col-span-3 bg-background/50 border-border/40">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full mr-2 ${color.value.split(" ")[0]}`}></div>
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addEvent} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Add Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {!isMounted ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-pulse">Loading calendar...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-8 gap-1">
                {/* Time column */}
                <div className="col-span-1">
                  <div className="h-12"></div> {/* Empty cell for header row */}
                  {hours.map((hour) => (
                    <div key={hour} className="h-16 flex items-center justify-center text-sm text-muted-foreground">
                      {hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`}
                    </div>
                  ))}
                </div>

                {/* Days columns */}
                {weekDays.map((day, index) => (
                  <div key={index} className="col-span-1">
                    <div className="h-12 flex items-center justify-center font-medium">
                      <div className={`flex flex-col items-center ${isSameDay(day, new Date()) ? "text-primary" : ""}`}>
                        <span>{format(day, "EEE")}</span>
                        <span className="text-sm">{format(day, "d")}</span>
                      </div>
                    </div>
                    {hours.map((hour) => (
                      <div key={hour} className="h-16 border-t border-border/20 relative"></div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Events */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {events.map((event) => {
                  const top = 10 * 16 + (event.startHour - 8) * 16 + 12 // 10rem for the header + offset for the hour + header height
                  const height = event.duration * 16
                  const left = (event.day + 1) * (100 / 8) // +1 because of the time column
                  const width = 100 / 8 - 1 // -1 for gap

                  return (
                    <div
                      key={event.id}
                      className={`absolute pointer-events-auto rounded-md border p-2 ${event.color}`}
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        left: `${left}%`,
                        width: `${width}%`,
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="text-sm font-medium truncate">{event.title}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 -mt-1 -mr-1"
                          onClick={() => deleteEvent(event.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {event.startHour > 12
                          ? `${event.startHour - 12} PM`
                          : event.startHour === 12
                            ? "12 PM"
                            : `${event.startHour} AM`}{" "}
                        -{" "}
                        {event.startHour + event.duration > 12
                          ? `${event.startHour + event.duration - 12} PM`
                          : event.startHour + event.duration === 12
                            ? "12 PM"
                            : `${event.startHour + event.duration} AM`}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </ResponsiveContainer>
    </div>
  )
}
