"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Save, FileText, Copy } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { GridBackground } from "@/components/grid-background"
import { TechPattern } from "@/components/tech-pattern"
import { ResponsiveContainer } from "@/components/responsive-container"

export default function MarkdownPage() {
  const [markdown, setMarkdown] = useState<string>(`# Welcome to Markdown Notes

## Features
- Real-time preview
- Word count
- Save notes

## Example Content
This is a **bold text** and this is *italic text*.

### Code Example
\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

> This is a blockquote

1. Ordered list item 1
2. Ordered list item 2

- Unordered list item
- Another unordered list item

[Link Example](https://example.com)
`)
  const [title, setTitle] = useState<string>("Untitled Note")
  const [wordCount, setWordCount] = useState<number>(0)
  const [charCount, setCharCount] = useState<number>(0)
  const [saved, setSaved] = useState<boolean>(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Calculate word count
    const text = markdown.trim()
    setCharCount(text.length)

    const words = text
      .replace(/\n/g, " ")
      .replace(/[^\w\s]/g, "")
      .trim()
      .split(/\s+/)

    setWordCount(text ? words.length : 0)
    setSaved(false)
  }, [markdown, isMounted])

  const handleSave = () => {
    // In a real app, this would save to a database or localStorage
    setSaved(true)
    // Show a temporary "Saved" message
    setTimeout(() => {
      setSaved(true)
    }, 2000)
  }

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(markdown)
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
          <h1 className="text-2xl md:text-3xl font-bold ml-4 glow-text">Markdown Notes</h1>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-medium bg-background/50 border-border/40"
              placeholder="Note title"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopy} disabled={!isMounted}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              {saved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>

        <Card className="mb-4 border-border/40 bg-secondary/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle>Statistics</CardTitle>
            <CardDescription>Document information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Words</div>
                <div className="text-2xl font-bold text-primary">{wordCount}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Characters</div>
                <div className="text-2xl font-bold text-primary">{charCount}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <div className="text-2xl font-bold text-primary">{saved ? "Saved" : "Unsaved"}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-background/50">
            <TabsTrigger value="edit">
              <FileText className="h-4 w-4 mr-2" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="mt-4">
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="min-h-[500px] font-mono bg-background/50 border-border/40"
              placeholder="Write your markdown here..."
            />
          </TabsContent>
          <TabsContent value="preview" className="mt-4">
            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </ResponsiveContainer>
    </div>
  )
}
