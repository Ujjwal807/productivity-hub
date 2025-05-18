"use client"

import { useState } from "react"
import { ChevronLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { GridBackground } from "@/components/grid-background"
import { TechPattern } from "@/components/tech-pattern"
import { ResponsiveContainer } from "@/components/responsive-container"

type Priority = "low" | "medium" | "high"
type Status = "todo" | "in-progress" | "completed"

interface Task {
  id: string
  title: string
  priority: Priority
  status: Status
  progress: number
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Create project plan", priority: "high", status: "in-progress", progress: 60 },
    { id: "2", title: "Design user interface", priority: "medium", status: "todo", progress: 0 },
    { id: "3", title: "Implement authentication", priority: "high", status: "completed", progress: 100 },
    { id: "4", title: "Write documentation", priority: "low", status: "in-progress", progress: 30 },
  ])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("medium")

  const addTask = () => {
    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      priority: newTaskPriority,
      status: "todo",
      progress: 0,
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle("")
    setNewTaskPriority("medium")
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const updateTaskProgress = (id: string, progress: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              progress,
              status: progress === 100 ? "completed" : progress > 0 ? "in-progress" : "todo",
            }
          : task,
      ),
    )
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-500/20"
      case "medium":
        return "text-yellow-500 bg-yellow-500/20"
      case "low":
        return "text-green-500 bg-green-500/20"
    }
  }

  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <TechPattern />
      <ResponsiveContainer className="py-6 md:py-10 relative z-10">
        <div className="flex items-center mb-6 md:mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold ml-4 glow-text">Task List</h1>
        </div>

        <Card className="mb-6 md:mb-8 border-border/40 bg-secondary/20 backdrop-blur-sm">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle>Add New Task</CardTitle>
            <CardDescription>Create a new task with priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input
                placeholder="Task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 bg-background/50 border-border/40"
              />
              <Select value={newTaskPriority} onValueChange={(value) => setNewTaskPriority(value as Priority)}>
                <SelectTrigger className="w-full sm:w-[180px] bg-background/50 border-border/40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={addTask}
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                disabled={!newTaskTitle.trim()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className="border-border/40 bg-secondary/20 backdrop-blur-sm hover:shadow-md hover:shadow-primary/5 transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg line-clamp-1">{task.title}</CardTitle>
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getPriorityColor(task.priority)}`}
                    >
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2 bg-secondary" indicatorClassName="bg-primary" />
                  <div className="pt-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="10"
                      value={task.progress}
                      onChange={(e) => updateTaskProgress(task.id, Number.parseInt(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {tasks.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No tasks yet. Add your first task above.
            </div>
          )}
        </div>
      </ResponsiveContainer>
    </div>
  )
}
