"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, Plus, X, Edit2, Save, Trash2 } from "lucide-react"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GridBackground } from "@/components/grid-background"
import { TechPattern } from "@/components/tech-pattern"
import { ResponsiveContainer } from "@/components/responsive-container"

interface Note {
  id: string
  title: string
  content: string
  color: string
  position?: { x: number; y: number }
  size?: { width: number; height: number }
  zIndex?: number
}

type ResizeDirection =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | null

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Meeting Notes",
      content: "Discuss project timeline and deliverables",
      color: "bg-amber-500/20 text-amber-500",
      position: { x: 0, y: 0 },
      size: { width: 280, height: 200 },
      zIndex: 1,
    },
    {
      id: "2",
      title: "Shopping List",
      content: "Milk\nEggs\nBread\nFruit",
      color: "bg-emerald-500/20 text-emerald-500",
      position: { x: 0, y: 0 },
      size: { width: 280, height: 200 },
      zIndex: 2,
    },
    {
      id: "3",
      title: "Ideas",
      content: "New feature: dark mode\nImprove performance",
      color: "bg-blue-500/20 text-blue-500",
      position: { x: 0, y: 0 },
      size: { width: 280, height: 200 },
      zIndex: 3,
    },
    {
      id: "4",
      title: "Reminders",
      content: "Call dentist\nPay bills\nGym at 6pm",
      color: "bg-primary/20 text-primary",
      position: { x: 0, y: 0 },
      size: { width: 280, height: 200 },
      zIndex: 4,
    },
  ])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newNote, setNewNote] = useState({ title: "", content: "", color: "bg-primary/20 text-primary" })
  const [showNewNoteForm, setShowNewNoteForm] = useState(false)
  const [draggedNote, setDraggedNote] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizingNote, setResizingNote] = useState<string | null>(null)
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection>(null)
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [maxZIndex, setMaxZIndex] = useState(4) // Start with the highest current zIndex
  const notesContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  const colors = [
    "bg-primary/20 text-primary",
    "bg-amber-500/20 text-amber-500",
    "bg-emerald-500/20 text-emerald-500",
    "bg-blue-500/20 text-blue-500",
    "bg-purple-500/20 text-purple-500",
    "bg-rose-500/20 text-rose-500",
  ]

  // Initialize random positions for notes
  useEffect(() => {
    if (notesContainerRef.current) {
      const containerWidth = notesContainerRef.current.clientWidth
      const containerHeight = notesContainerRef.current.clientHeight

      // For mobile, stack notes vertically
      if (isMobile) {
        let currentY = 20
        setNotes(
          notes.map((note, index) => {
            const noteHeight = note.size?.height || 200
            const y = currentY
            currentY += noteHeight + 20 // Add some spacing between notes
            return {
              ...note,
              position: {
                x: 20,
                y,
              },
              size: {
                width: containerWidth - 40, // Full width minus margins
                height: noteHeight,
              },
            }
          }),
        )
      } else {
        // For desktop, position randomly
        setNotes(
          notes.map((note) => {
            if (!note.position || (note.position.x === 0 && note.position.y === 0)) {
              // Only set random position if not already positioned
              return {
                ...note,
                position: {
                  x: Math.random() * (containerWidth - (note.size?.width || 280)),
                  y: Math.random() * (containerHeight - (note.size?.height || 200)),
                },
              }
            }
            return note
          }),
        )
      }
    }
  }, [isMobile, isTablet])

  const addNote = () => {
    if (!newNote.title.trim() && !newNote.content.trim()) return

    // Calculate a position for the new note
    let newPosition = { x: 20, y: 20 }
    let newSize = { width: 280, height: 200 }

    if (notesContainerRef.current) {
      const containerWidth = notesContainerRef.current.clientWidth
      const containerHeight = notesContainerRef.current.clientHeight

      if (isMobile) {
        // For mobile, place at the top
        newPosition = { x: 20, y: 20 }
        newSize = { width: containerWidth - 40, height: 200 }
      } else {
        // For desktop, random position
        newPosition = {
          x: Math.random() * (containerWidth - 280),
          y: Math.random() * (containerHeight - 200),
        }
      }
    }

    const newZIndex = maxZIndex + 1
    setMaxZIndex(newZIndex)

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title || "Untitled",
      content: newNote.content,
      color: newNote.color,
      position: newPosition,
      size: newSize,
      zIndex: newZIndex,
    }

    setNotes([...notes, note])
    setNewNote({ title: "", content: "", color: "bg-primary/20 text-primary" })
    setShowNewNoteForm(false)
  }

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, ...updates } : note)))
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const startEditing = (id: string) => {
    // Bring note to front when editing
    bringToFront(id)
    setEditingId(id)
  }

  const stopEditing = () => {
    setEditingId(null)
  }

  const bringToFront = (id: string) => {
    const newZIndex = maxZIndex + 1
    setMaxZIndex(newZIndex)
    updateNote(id, { zIndex: newZIndex })
  }

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent, noteId: string) => {
    // Don't start drag if we're editing or clicking on buttons
    if (
      editingId === noteId ||
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).tagName === "INPUT" ||
      (e.target as HTMLElement).tagName === "TEXTAREA" ||
      (e.target as HTMLElement).classList.contains("resize-handle")
    ) {
      return
    }

    const note = notes.find((n) => n.id === noteId)
    if (!note || !note.position) return

    // Bring note to front when dragging
    bringToFront(noteId)

    // Calculate the offset between mouse position and note position
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    setDraggedNote(noteId)
    setDragOffset({ x: offsetX, y: offsetY })

    // Prevent text selection during drag
    e.preventDefault()
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, noteId: string) => {
    // Don't start drag if we're editing or touching buttons
    if (
      editingId === noteId ||
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).tagName === "INPUT" ||
      (e.target as HTMLElement).tagName === "TEXTAREA" ||
      (e.target as HTMLElement).classList.contains("resize-handle")
    ) {
      return
    }

    const note = notes.find((n) => n.id === noteId)
    if (!note || !note.position) return

    // Bring note to front when dragging
    bringToFront(noteId)

    // Calculate the offset between touch position and note position
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const touch = e.touches[0]
    const offsetX = touch.clientX - rect.left
    const offsetY = touch.clientY - rect.top

    setDraggedNote(noteId)
    setDragOffset({ x: offsetX, y: offsetY })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!notesContainerRef.current || !draggedNote) return

    const containerRect = notesContainerRef.current.getBoundingClientRect()
    const touch = e.touches[0]

    const x = Math.max(
      0,
      Math.min(
        touch.clientX - containerRect.left - dragOffset.x,
        containerRect.width - (notes.find((n) => n.id === draggedNote)?.size?.width || 280),
      ),
    )

    const y = Math.max(
      0,
      Math.min(
        touch.clientY - containerRect.top - dragOffset.y,
        containerRect.height - (notes.find((n) => n.id === draggedNote)?.size?.height || 200),
      ),
    )

    // Update the note position
    setNotes(notes.map((note) => (note.id === draggedNote ? { ...note, position: { x, y } } : note)))

    // Prevent scrolling while dragging
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!notesContainerRef.current) return

    const containerRect = notesContainerRef.current.getBoundingClientRect()

    // Handle dragging
    if (draggedNote) {
      const x = Math.max(
        0,
        Math.min(
          e.clientX - containerRect.left - dragOffset.x,
          containerRect.width - (notes.find((n) => n.id === draggedNote)?.size?.width || 280),
        ),
      )

      const y = Math.max(
        0,
        Math.min(
          e.clientY - containerRect.top - dragOffset.y,
          containerRect.height - (notes.find((n) => n.id === draggedNote)?.size?.height || 200),
        ),
      )

      // Update the note position
      setNotes(notes.map((note) => (note.id === draggedNote ? { ...note, position: { x, y } } : note)))
    }

    // Handle resizing
    if (resizingNote && resizeDirection) {
      const note = notes.find((n) => n.id === resizingNote)
      if (!note || !note.position || !note.size) return

      const mouseX = e.clientX - containerRect.left
      const mouseY = e.clientY - containerRect.top

      let newWidth = note.size.width
      let newHeight = note.size.height
      let newX = note.position.x
      let newY = note.position.y

      // Calculate new dimensions based on resize direction
      if (resizeDirection.includes("right")) {
        newWidth = Math.max(150, Math.min(mouseX - note.position.x, containerRect.width - note.position.x))
      }
      if (resizeDirection.includes("bottom")) {
        newHeight = Math.max(100, Math.min(mouseY - note.position.y, containerRect.height - note.position.y))
      }
      if (resizeDirection.includes("left")) {
        const deltaX = mouseX - resizeStart.x
        newWidth = Math.max(150, resizeStart.width - deltaX)
        newX = Math.min(resizeStart.x + deltaX, resizeStart.x + resizeStart.width - 150)
      }
      if (resizeDirection.includes("top")) {
        const deltaY = mouseY - resizeStart.y
        newHeight = Math.max(100, resizeStart.height - deltaY)
        newY = Math.min(resizeStart.y + deltaY, resizeStart.y + resizeStart.height - 100)
      }

      // Update the note size and position
      setNotes(
        notes.map((n) =>
          n.id === resizingNote
            ? {
                ...n,
                size: { width: newWidth, height: newHeight },
                position: { x: newX, y: newY },
              }
            : n,
        ),
      )
    }
  }

  const handleMouseUp = () => {
    setDraggedNote(null)
    setResizingNote(null)
    setResizeDirection(null)
  }

  const handleTouchEnd = () => {
    setDraggedNote(null)
  }

  const handleResizeStart = (e: React.MouseEvent, noteId: string, direction: ResizeDirection) => {
    e.stopPropagation()
    e.preventDefault()

    const note = notes.find((n) => n.id === noteId)
    if (!note || !note.position || !note.size) return

    // Bring note to front when resizing
    bringToFront(noteId)

    setResizingNote(noteId)
    setResizeDirection(direction)
    setResizeStart({
      x: note.position.x,
      y: note.position.y,
      width: note.size.width,
      height: note.size.height,
    })
  }

  // Get cursor style based on resize direction
  const getResizeCursor = (direction: ResizeDirection): string => {
    switch (direction) {
      case "top":
      case "bottom":
        return "ns-resize"
      case "left":
      case "right":
        return "ew-resize"
      case "topLeft":
      case "bottomRight":
        return "nwse-resize"
      case "topRight":
      case "bottomLeft":
        return "nesw-resize"
      default:
        return "default"
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
          <h1 className="text-2xl md:text-3xl font-bold ml-4 glow-text">Sticky Notes</h1>
        </div>

        <div className="mb-6">
          {!showNewNoteForm ? (
            <Button
              onClick={() => setShowNewNoteForm(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          ) : (
            <Card className={`p-4 mb-6 ${newNote.color} border-border/40 bg-secondary/20 backdrop-blur-sm`}>
              <div className="flex flex-col sm:flex-row justify-between mb-2 gap-2">
                <Input
                  placeholder="Title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="border-none bg-transparent font-medium text-lg focus-visible:ring-0 p-0 h-auto"
                />
                <div className="flex gap-1 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full ${color.split(" ")[0]} ${newNote.color === color ? "ring-2 ring-offset-2 ring-foreground/30" : ""}`}
                      onClick={() => setNewNote({ ...newNote, color })}
                    />
                  ))}
                </div>
              </div>
              <Textarea
                placeholder="Note content..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="border-none bg-transparent resize-none min-h-[100px] focus-visible:ring-0 p-0"
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="ghost" size="sm" onClick={() => setShowNewNoteForm(false)}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={addNote}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </Card>
          )}
        </div>

        <div
          ref={notesContainerRef}
          className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] border border-border/20 rounded-lg p-4 bg-secondary/5 overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {notes.map((note) => (
            <Card
              key={note.id}
              className={`p-4 ${note.color} border-border/40 bg-secondary/20 backdrop-blur-sm hover:shadow-md hover:shadow-primary/5 transition-shadow absolute ${draggedNote === note.id || resizingNote === note.id ? "shadow-lg" : ""}`}
              style={{
                left: `${note.position?.x || 0}px`,
                top: `${note.position?.y || 0}px`,
                width: `${note.size?.width || 280}px`,
                height: `${note.size?.height || 200}px`,
                cursor: draggedNote === note.id ? "move" : "default",
                zIndex: note.zIndex || 1,
              }}
              onMouseDown={(e) => handleMouseDown(e, note.id)}
              onTouchStart={(e) => handleTouchStart(e, note.id)}
              onTouchMove={handleTouchMove}
            >
              {/* Resize handles - only show on non-mobile */}
              {!isMobile && (
                <>
                  <div
                    className="resize-handle absolute top-0 left-0 right-0 h-2 cursor-ns-resize"
                    onMouseDown={(e) => handleResizeStart(e, note.id, "top")}
                  />
                  <div
                    className="resize-handle absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize"
                    onMouseDown={(e) => handleResizeStart(e, note.id, "bottom")}
                  />
                  <div
                    className="resize-handle absolute top-0 bottom-0 left-0 w-2 cursor-ew-resize"
                    onMouseDown={(e) => handleResizeStart(e, note.id, "left")}
                  />
                  <div
                    className="resize-handle absolute top-0 bottom-0 right-0 w-2 cursor-ew-resize"
                    onMouseDown={(e) => handleResizeStart(e, note.id, "right")}
                  />

                  {/* Corner resize handles */}
                  <div
                    className="resize-handle absolute top-0 left-0 w-4 h-4 cursor-nwse-resize"
                    onMouseDown={(e) => handleResizeStart(e, note.id, "topLeft")}
                  />
                  <div
                    className="resize-handle absolute top-0 right-0 w-4 h-4 cursor-nesw-resize"
                    onMouseDown={(e) => handleResizeStart(e, note.id, "topRight")}
                  />
                  <div
                    className="resize-handle absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize"
                    onMouseDown={(e) => handleResizeStart(e, note.id, "bottomLeft")}
                  />
                  <div
                    className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
                    onMouseDown={(e) => handleResizeStart(e, note.id, "bottomRight")}
                  />
                </>
              )}

              {editingId === note.id ? (
                <>
                  <div className="flex flex-col sm:flex-row justify-between mb-2 gap-2">
                    <Input
                      value={note.title}
                      onChange={(e) => updateNote(note.id, { title: e.target.value })}
                      className="border-none bg-transparent font-medium text-lg focus-visible:ring-0 p-0 h-auto"
                    />
                    <div className="flex gap-1 flex-wrap">
                      {colors.map((color) => (
                        <button
                          key={color}
                          className={`w-5 h-5 rounded-full ${color.split(" ")[0]} ${note.color === color ? "ring-2 ring-offset-2 ring-foreground/30" : ""}`}
                          onClick={() => updateNote(note.id, { color })}
                        />
                      ))}
                    </div>
                  </div>
                  <Textarea
                    value={note.content}
                    onChange={(e) => updateNote(note.id, { content: e.target.value })}
                    className="border-none bg-transparent resize-none h-[calc(100%-80px)] focus-visible:ring-0 p-0 w-full"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="ghost" size="sm" onClick={stopEditing}>
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={stopEditing}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg mb-2 line-clamp-1">{note.title}</h3>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => startEditing(note.id)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => deleteNote(note.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="whitespace-pre-line overflow-auto h-[calc(100%-50px)]">{note.content}</div>
                </>
              )}
            </Card>
          ))}
          {notes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No notes yet. Click "Add Note" to create one.
            </div>
          )}
        </div>
        <div className="mt-4 text-sm text-muted-foreground text-center">
          {isMobile
            ? "Tap and drag notes to move them."
            : "Drag notes to move them. Drag from the edges or corners to resize."}
        </div>
      </ResponsiveContainer>
    </div>
  )
}
