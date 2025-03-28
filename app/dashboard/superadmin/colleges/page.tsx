"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { CollegesList } from "@/components/dashboard/colleges-list"
import { AddCollegeDialog } from "@/components/colleges/add-college-dialog"

export default function CollegesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Colleges</h1>
            <p className="text-muted-foreground">Manage colleges and assign principals</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add College
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search colleges..."
              className="pl-8 w-full md:max-w-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Colleges</CardTitle>
            <CardDescription>View and manage all colleges in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <CollegesList />
          </CardContent>
        </Card>
      </div>

      <AddCollegeDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </DashboardLayout>
  )
}

