"use client"

import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { GridBackground } from "@/components/grid-background"
import { TechPattern } from "@/components/tech-pattern"
import { ResponsiveContainer } from "@/components/responsive-container"

export default function JsonPage() {
  const [jsonInput, setJsonInput] = useState<string>(`{
  "name": "ProductivityHub",
  "version": "1.0.0",
  "description": "All-in-one productivity suite",
  "features": [
    "Task Management",
    "Pomodoro Timer",
    "Notes",
    "Calendar"
  ],
  "settings": {
    "theme": "dark",
    "notifications": true,
    "autoSave": true
  },
  "stats": {
    "users": 1000,
    "tasks": {
      "completed": 5000,
      "pending": 2500
    }
  }
}`)
  const [formattedJson, setFormattedJson] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const formatJson = () => {
    try {
      const obj = JSON.parse(jsonInput)
      const formatted = JSON.stringify(obj, null, 2)
      setFormattedJson(formatted)
      setError(null)
    } catch (err) {
      setError((err as Error).message)
      setFormattedJson("")
    }
  }

  const copyJson = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(formattedJson || jsonInput)
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
          <h1 className="text-2xl md:text-3xl font-bold ml-4 glow-text">JSON Viewer/Editor</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle>JSON Editor</CardTitle>
                <CardDescription>Edit your JSON data</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="min-h-[400px] font-mono text-sm bg-background/50 border-border/40"
                />
                {error && <div className="mt-2 text-sm text-red-500">Error: {error}</div>}
                <div className="flex gap-2 mt-4">
                  <Button onClick={formatJson} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Format JSON
                  </Button>
                  <Button variant="outline" onClick={copyJson} disabled={!isMounted}>
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle>JSON Viewer</CardTitle>
                <CardDescription>View formatted JSON structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-background/50 border border-border/40 rounded-md p-4 min-h-[400px] overflow-auto font-mono text-sm whitespace-pre">
                  {formattedJson ? (
                    <pre className="text-primary">{formattedJson}</pre>
                  ) : (
                    <div className="text-muted-foreground text-center py-8">
                      {error ? "Invalid JSON" : "Click 'Format JSON' to view"}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  )
}
