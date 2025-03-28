"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data - in a real app, this would come from Firebase
const collegesData = [
  {
    id: "1",
    name: "University of Technology",
    location: "New York, NY",
    principalName: "Dr. Sarah Johnson",
    principalEmail: "sarah.johnson@uot.edu",
    status: "active",
    studentsCount: 3245,
    teachersCount: 142,
  },
  {
    id: "2",
    name: "State College of Engineering",
    location: "Boston, MA",
    principalName: "Dr. Michael Chen",
    principalEmail: "michael.chen@sce.edu",
    status: "active",
    studentsCount: 2876,
    teachersCount: 118,
  },
  {
    id: "3",
    name: "Metropolitan Arts College",
    location: "Chicago, IL",
    principalName: "Dr. Emily Wilson",
    principalEmail: "emily.wilson@mac.edu",
    status: "active",
    studentsCount: 1932,
    teachersCount: 87,
  },
  {
    id: "4",
    name: "Coastal Community College",
    location: "San Francisco, CA",
    principalName: "Dr. James Martinez",
    principalEmail: "james.martinez@ccc.edu",
    status: "inactive",
    studentsCount: 1245,
    teachersCount: 65,
  },
  {
    id: "5",
    name: "Midwest Technical Institute",
    location: "Detroit, MI",
    principalName: "Dr. Lisa Rodriguez",
    principalEmail: "lisa.rodriguez@mti.edu",
    status: "active",
    studentsCount: 2134,
    teachersCount: 93,
  },
]

interface CollegesListProps {
  limit?: number
}

export function CollegesList({ limit }: CollegesListProps) {
  const [colleges, setColleges] = useState(limit ? collegesData.slice(0, limit) : collegesData)

  const handleDelete = (id: string) => {
    // In a real app, this would delete from Firebase
    setColleges(colleges.filter((college) => college.id !== id))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Principal</TableHead>
          <TableHead className="hidden md:table-cell">Location</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {colleges.map((college) => (
          <TableRow key={college.id}>
            <TableCell className="font-medium">{college.name}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span>{college.principalName}</span>
                <span className="text-xs text-muted-foreground">{college.principalEmail}</span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{college.location}</TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant={college.status === "active" ? "default" : "secondary"}>{college.status}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/dashboard/superadmin/colleges/${college.id}`} className="flex w-full items-center">
                      View details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={`/dashboard/superadmin/colleges/${college.id}/edit`}
                      className="flex w-full items-center"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(college.id)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

