"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GridBackground } from "@/components/grid-background"
import { TechPattern } from "@/components/tech-pattern"
import { ResponsiveContainer } from "@/components/responsive-container"

interface Node {
  id: string
  text: string
  x: number
  y: number
  color: string
  parentId: string | null
  children: string[]
}

export default function MindMapPage() {
  const [nodes, setNodes] = useState<Record<string, Node>>({
    root: {
      id: "root",
      text: "Central Idea",
      x: 0,
      y: 0,
      color: "bg-primary text-primary-foreground",
      parentId: null,
      children: [],
    },
  })
  const [selectedNodeId, setSelectedNodeId] = useState<string>("root")
  const [newNodeText, setNewNodeText] = useState<string>("")
  const [isMounted, setIsMounted] = useState(false)

  // Only run client-side code after mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const addNode = () => {
    if (!newNodeText.trim() || !selectedNodeId) return

    const parentNode = nodes[selectedNodeId]
    if (!parentNode) return

    const id = `node-${Date.now()}`
    const angle = (parentNode.children.length * ((2 * Math.PI) / 8)) % (2 * Math.PI)
    const distance = 150

    const newNode: Node = {
      id,
      text: newNodeText,
      x: parentNode.x + Math.cos(angle) * distance,
      y: parentNode.y + Math.sin(angle) * distance,
      color: "bg-primary text-primary-foreground",
      parentId: parentNode.id,
      children: [],
    }

    setNodes((prev) => ({
      ...prev,
      [id]: newNode,
      [parentNode.id]: {
        ...parentNode,
        children: [...parentNode.children, id],
      },
    }))

    setNewNodeText("")
  }

  const deleteNode = (id: string) => {
    if (id === "root") return // Can't delete root node

    const nodeToDelete = nodes[id]
    if (!nodeToDelete) return

    // Create new nodes object without the deleted node
    const newNodes = { ...nodes }
    delete newNodes[id]

    // Remove the node from its parent's children array
    if (nodeToDelete.parentId) {
      const parentNode = newNodes[nodeToDelete.parentId]
      newNodes[nodeToDelete.parentId] = {
        ...parentNode,
        children: parentNode.children.filter((childId) => childId !== id),
      }
    }

    setNodes(newNodes)

    // If the selected node was deleted, select the root
    if (selectedNodeId === id) {
      setSelectedNodeId("root")
    }
  }

  // Render connections between nodes
  const renderConnections = () => {
    if (!isMounted) return null

    const connections = []

    Object.values(nodes).forEach((node) => {
      if (node.parentId) {
        const parent = nodes[node.parentId]
        if (parent) {
          const startX = parent.x
          const startY = parent.y
          const endX = node.x
          const endY = node.y

          connections.push(
            <line
              key={`${parent.id}-${node.id}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
            />,
          )
        }
      }
    })

    return connections
  }

  // Don't render the interactive elements until client-side
  if (!isMounted) {
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
            <h1 className="text-2xl md:text-3xl font-bold ml-4 glow-text">Mind Map Builder</h1>
          </div>
          <div className="flex justify-center items-center h-[500px]">
            <div className="animate-pulse">Loading mind map...</div>
          </div>
        </ResponsiveContainer>
      </div>
    )
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
          <h1 className="text-2xl md:text-3xl font-bold ml-4 glow-text">Mind Map Builder</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle>Add Node</CardTitle>
                <CardDescription>Create a new connected node</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Parent Node</label>
                    <select
                      value={selectedNodeId}
                      onChange={(e) => setSelectedNodeId(e.target.value)}
                      className="w-full rounded-md border border-border/40 bg-background/50 p-2"
                    >
                      {Object.values(nodes).map((node) => (
                        <option key={node.id} value={node.id}>
                          {node.text}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Node Text</label>
                    <Input
                      value={newNodeText}
                      onChange={(e) => setNewNodeText(e.target.value)}
                      className="bg-background/50 border-border/40"
                      placeholder="Enter node text"
                    />
                  </div>

                  <Button
                    onClick={addNode}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!newNodeText.trim() || !selectedNodeId}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Node
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="border-border/40 bg-secondary/20 backdrop-blur-sm h-[500px] overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>Mind Map Canvas</CardTitle>
                <CardDescription>Click on nodes to select them</CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-73px)]">
                <div className="w-full h-full relative overflow-hidden">
                  <div
                    className="absolute"
                    style={{
                      transform: `translate(${typeof window !== "undefined" ? window.innerWidth / 4 : 300}px, ${250}px)`,
                    }}
                  >
                    <svg
                      width="2000"
                      height="2000"
                      viewBox="-1000 -1000 2000 2000"
                      style={{ position: "absolute", top: "-1000px", left: "-1000px" }}
                    >
                      {renderConnections()}
                    </svg>

                    {Object.values(nodes).map((node) => (
                      <div
                        key={node.id}
                        className={`absolute px-4 py-2 rounded-lg shadow-lg cursor-pointer bg-primary text-primary-foreground ${
                          selectedNodeId === node.id ? "ring-2 ring-white" : ""
                        }`}
                        style={{
                          transform: `translate(${node.x - 50}px, ${node.y - 20}px)`,
                          minWidth: "100px",
                          textAlign: "center",
                        }}
                        onClick={() => setSelectedNodeId(node.id)}
                        onDoubleClick={() => node.id !== "root" && deleteNode(node.id)}
                      >
                        {node.text}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="mt-2 text-sm text-center text-muted-foreground">
              Double-click on a node to delete it (except the central idea)
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  )
}
