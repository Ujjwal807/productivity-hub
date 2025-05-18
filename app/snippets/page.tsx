"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Plus, Trash2, Copy } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GridBackground } from "@/components/grid-background"
import { TechPattern } from "@/components/tech-pattern"
import { ResponsiveContainer } from "@/components/responsive-container"

interface Snippet {
  id: string
  title: string
  code: string
  language: string
  description: string
}

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "python", label: "Python" },
]

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([
    {
      id: "1",
      title: "React useState Hook",
      code: "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}",
      language: "javascript",
      description: "Basic example of React useState hook for managing component state",
    },
    {
      id: "2",
      title: "Fetch API Example",
      code: "async function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error fetching data:', error);\n  }\n}",
      language: "javascript",
      description: "Example of using the Fetch API with async/await",
    },
  ])

  const [title, setTitle] = useState("")
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [description, setDescription] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const addSnippet = () => {
    if (!title.trim() || !code.trim()) return

    const newSnippet: Snippet = {
      id: Date.now().toString(),
      title,
      code,
      language,
      description,
    }

    setSnippets([newSnippet, ...snippets])
    setTitle("")
    setCode("")
    setLanguage("javascript")
    setDescription("")
  }

  const deleteSnippet = (id: string) => {
    setSnippets(snippets.filter((snippet) => snippet.id !== id))
  }

  const copySnippet = (id: string, code: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(code)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  // Filter snippets based on search term
  const filteredSnippets = snippets.filter((snippet) => {
    return (
      searchTerm === "" ||
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

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
          <h1 className="text-2xl md:text-3xl font-bold ml-4 glow-text">Snippet Manager</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle>Add New Snippet</CardTitle>
                <CardDescription>Save code snippets for later use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-background/50 border-border/40"
                      placeholder="Snippet title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full rounded-md border border-border/40 bg-background/50 p-2"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Code</label>
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[150px] font-mono text-sm bg-background/50 border-border/40"
                      placeholder="Paste your code here"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-background/50 border-border/40"
                      placeholder="Brief description of what this code does"
                    />
                  </div>

                  <Button
                    onClick={addSnippet}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!title.trim() || !code.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Save Snippet
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle>Search</CardTitle>
                <CardDescription>Find your code snippets</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search snippets..."
                  className="bg-background/50 border-border/40"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-4">
              {filteredSnippets.length > 0 ? (
                filteredSnippets.map((snippet) => (
                  <Card
                    key={snippet.id}
                    className="border-border/40 bg-secondary/20 backdrop-blur-sm hover:shadow-md hover:shadow-primary/5 transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{snippet.title}</CardTitle>
                        <div className="text-sm text-muted-foreground">{snippet.language}</div>
                      </div>
                      <CardDescription>{snippet.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-background/50 border border-border/40 rounded-md p-4 overflow-auto">
                        <pre className="text-xs font-mono">{snippet.code}</pre>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copySnippet(snippet.id, snippet.code)}
                          disabled={!isMounted}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          {copied === snippet.id ? "Copied!" : "Copy"}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteSnippet(snippet.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <h3 className="text-xl font-medium mb-2">No snippets found</h3>
                  <p className="text-muted-foreground mb-4">
                    {snippets.length === 0
                      ? "You haven't added any code snippets yet."
                      : "No snippets match your current search."}
                  </p>
                  {snippets.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Add your first snippet using the form on the left.</p>
                  ) : (
                    <Button variant="outline" onClick={() => setSearchTerm("")}>
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  )
}
