"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { db } from "@/lib/firebase"

interface AddCollegeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddCollegeDialog({ open, onOpenChange }: AddCollegeDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    principalEmail: "",
    principalName: "",
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, this would add the college to Firebase
      // and create a principal account if needed
      await addDoc(collection(db, "colleges"), {
        ...formData,
        status: "active",
        createdAt: serverTimestamp(),
        studentsCount: 0,
        teachersCount: 0,
      })

      // Reset form and close dialog
      setFormData({
        name: "",
        location: "",
        principalEmail: "",
        principalName: "",
      })
      onOpenChange(false)

      // Refresh the page to show the new college
      router.refresh()
    } catch (error) {
      console.error("Error adding college:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New College</DialogTitle>
            <DialogDescription>Enter the details of the new college and assign a principal.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">College Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="principalName">Principal Name</Label>
              <Input
                id="principalName"
                name="principalName"
                value={formData.principalName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="principalEmail">Principal Email</Label>
              <Input
                id="principalEmail"
                name="principalEmail"
                type="email"
                value={formData.principalEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add College"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

