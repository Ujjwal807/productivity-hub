"use client"

import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { GridBackground } from "@/components/grid-background"
import { TechPattern } from "@/components/tech-pattern"
import { ResponsiveContainer } from "@/components/responsive-container"

interface RegexMatch {
  index: number
  length: number
  value: string
}

export default function RegexPage() {
  const [pattern, setPattern] = useState<string>("")
  const [flags, setFlags] = useState<string>("g")
  const [testString, setTestString] = useState<string>(
    "The quick brown fox jumps over the lazy dog. The dog barks, but the fox keeps running.",
  )
  const [matches, setMatches] = useState<RegexMatch[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const testRegex = () => {
    if (!pattern) {
      setMatches([])
      setError(null)
      return
    }

    try {
      const regex = new RegExp(pattern, flags)
      const results: RegexMatch[] = []

      // Only run this on the client side
      if (typeof window !== "undefined") {
        let match
        if (flags.includes("g")) {
          // Reset lastIndex to ensure we start from the beginning
          regex.lastIndex = 0

          while ((match = regex.exec(testString)) !== null) {
            results.push({
              index: match.index,
              length: match[0].length,
              value: match[0],
            })
          }
        } else {
          match = regex.exec(testString)
          if (match) {
            results.push({
              index: match.index,
              length: match[0].length,
              value: match[0],
            })
          }
        }
      }

      setMatches(results)
      setError(null)
    } catch (err) {
      setError((err as Error).message)
      setMatches([])
    }
  }

  const highlightMatches = () => {
    if (!matches.length) return testString

    const result = []
    let lastIndex = 0

    // Sort matches by index to ensure correct order
    const sortedMatches = [...matches].sort((a, b) => a.index - b.index)

    for (const match of sortedMatches) {
      // Add text before the match
      if (match.index > lastIndex) {
        result.push(testString.substring(lastIndex, match.index))
      }

      // Add the highlighted match
      result.push(
        <span key={match.index} className="bg-primary/30 text-primary-foreground px-0.5 rounded">
          {match.value}
        </span>,
      )

      lastIndex = match.index + match.length
    }

    // Add any remaining text
    if (lastIndex < testString.length) {
      result.push(testString.substring(lastIndex))
    }

    return result
  }

  // Don't run regex testing during server-side rendering
  useEffect(() => {
    if (isMounted && pattern) {
      testRegex()
    }
  }, [isMounted, pattern, flags, testString])

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
          <h1 className="text-2xl md:text-3xl font-bold ml-4 glow-text">Regex Tester</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle>Regular Expression</CardTitle>
                <CardDescription>Enter your regular expression pattern</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="text-lg mr-2">/</div>
                    <Input
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      className="flex-1 bg-background/50 border-border/40 font-mono"
                      placeholder="Pattern"
                    />
                    <div className="text-lg mx-2">/</div>
                    <Input
                      value={flags}
                      onChange={(e) => setFlags(e.target.value)}
                      className="w-20 bg-background/50 border-border/40 font-mono"
                      placeholder="Flags"
                    />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="flag-g"
                        checked={flags.includes("g")}
                        onChange={() => {
                          if (flags.includes("g")) {
                            setFlags(flags.replace("g", ""))
                          } else {
                            setFlags(flags + "g")
                          }
                        }}
                      />
                      <label htmlFor="flag-g">Global (g)</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="flag-i"
                        checked={flags.includes("i")}
                        onChange={() => {
                          if (flags.includes("i")) {
                            setFlags(flags.replace("i", ""))
                          } else {
                            setFlags(flags + "i")
                          }
                        }}
                      />
                      <label htmlFor="flag-i">Case Insensitive (i)</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="flag-m"
                        checked={flags.includes("m")}
                        onChange={() => {
                          if (flags.includes("m")) {
                            setFlags(flags.replace("m", ""))
                          } else {
                            setFlags(flags + "m")
                          }
                        }}
                      />
                      <label htmlFor="flag-m">Multiline (m)</label>
                    </div>
                  </div>

                  {error && <div className="text-sm text-red-500 p-2 bg-red-500/10 rounded-md">Error: {error}</div>}

                  <Button
                    onClick={testRegex}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!isMounted}
                  >
                    Test Regex
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle>Test String</CardTitle>
                <CardDescription>Enter text to test against your regex</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  className="min-h-[150px] bg-background/50 border-border/40"
                  placeholder="Enter text to test"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle>Results</CardTitle>
                <CardDescription>
                  {isMounted
                    ? matches.length
                      ? `Found ${matches.length} match${matches.length !== 1 ? "es" : ""}`
                      : "No matches found"
                    : "Loading..."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isMounted ? (
                  <div className="p-4 bg-background/50 rounded-md border border-border/40 text-center text-muted-foreground">
                    Loading regex tester...
                  </div>
                ) : matches.length > 0 ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-background/50 rounded-md border border-border/40">
                      <p className="mb-2 text-sm text-muted-foreground">Highlighted Matches:</p>
                      <div className="font-mono text-sm whitespace-pre-wrap">{highlightMatches()}</div>
                    </div>

                    <div className="space-y-2">
                      {matches.map((match, index) => (
                        <div key={index} className="p-2 bg-background/50 rounded-md border border-border/40">
                          <div className="flex justify-between">
                            <div className="text-sm font-medium">Match {index + 1}</div>
                            <div className="text-sm text-muted-foreground">Index: {match.index}</div>
                          </div>
                          <div className="mt-1 font-mono text-sm">{match.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-background/50 rounded-md border border-border/40 text-center text-muted-foreground">
                    {pattern ? "No matches found" : "Enter a pattern to test"}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle>Regex Cheatsheet</CardTitle>
                <CardDescription>Common regex patterns and syntax</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-mono">\d</div>
                  <div>Any digit</div>
                  <div className="font-mono">\w</div>
                  <div>Word character</div>
                  <div className="font-mono">\s</div>
                  <div>Whitespace</div>
                  <div className="font-mono">.</div>
                  <div>Any character</div>
                  <div className="font-mono">^</div>
                  <div>Start of string</div>
                  <div className="font-mono">$</div>
                  <div>End of string</div>
                  <div className="font-mono">*</div>
                  <div>0 or more</div>
                  <div className="font-mono">+</div>
                  <div>1 or more</div>
                  <div className="font-mono">?</div>
                  <div>0 or 1</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  )
}
