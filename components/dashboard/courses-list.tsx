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
const coursesData = [
  {
    id: "1",
    name: "Computer Science",
    code: "CS101",
    department: "Computer Science",
    studentsCount: 45,
    subjectsCount: 8,
    status: "active",
  },
  {
    id: "2",
    name: "Mathematics",
    code: "MATH101",
    department: "Mathematics",
    studentsCount: 38,
    subjectsCount: 6,
    status: "active",
  },
  {
    id: "3",
    name: "Physics",
    code: "PHYS101",
    department: "Physics",
    studentsCount: 32,
    subjectsCount: 7,
    status: "active",
  },
  {
    id: "4",
    name: "Chemistry",
    code: "CHEM101",
    department: "Chemistry",
    studentsCount: 28,
    subjectsCount: 6,
    status: "inactive",
  },
  {
    id: "5",
    name: "Biology",
    code: "BIO101",
    department: "Biology",
    studentsCount: 35,
    subjectsCount: 7,
    status: "active",
  },
]

interface CoursesListProps {
  limit?: number
}

export function CoursesList({ limit }: CoursesListProps) {
  const [courses, setCourses] = useState(limit ? coursesData.slice(0, limit) : coursesData)

  const handleDelete = (id: string) => {
    // In a real app, this would delete from Firebase
    setCourses(courses.filter((course) => course.id !== id))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Department</TableHead>
          <TableHead>Students</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.id}>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{course.name}</span>
                <span className="text-xs text-muted-foreground">{course.code}</span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{course.department}</TableCell>
            <TableCell>{course.studentsCount}</TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant={course.status === "active" ? "default" : "secondary"}>{course.status}</Badge>
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
                    <Link href={`/dashboard/principal/courses/${course.id}`} className="flex w-full items-center">
                      View details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/dashboard/principal/courses/${course.id}/edit`} className="flex w-full items-center">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(course.id)}>
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

