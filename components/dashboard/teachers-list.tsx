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
const teachersData = [
  {
    id: "1",
    name: "Prof. John Smith",
    email: "john.smith@uot.edu",
    department: "Computer Science",
    joinDate: "2020-09-01",
    status: "active",
    coursesCount: 3,
  },
  {
    id: "2",
    name: "Prof. Maria Garcia",
    email: "maria.garcia@uot.edu",
    department: "Mathematics",
    joinDate: "2019-08-15",
    status: "active",
    coursesCount: 4,
  },
  {
    id: "3",
    name: "Prof. David Lee",
    email: "david.lee@uot.edu",
    department: "Physics",
    joinDate: "2021-01-10",
    status: "active",
    coursesCount: 2,
  },
  {
    id: "4",
    name: "Prof. Sarah Johnson",
    email: "sarah.johnson@uot.edu",
    department: "Chemistry",
    joinDate: "2018-09-01",
    status: "inactive",
    coursesCount: 0,
  },
  {
    id: "5",
    name: "Prof. Robert Williams",
    email: "robert.williams@uot.edu",
    department: "Biology",
    joinDate: "2022-01-15",
    status: "active",
    coursesCount: 3,
  },
]

interface TeachersListProps {
  limit?: number
}

export function TeachersList({ limit }: TeachersListProps) {
  const [teachers, setTeachers] = useState(limit ? teachersData.slice(0, limit) : teachersData)

  const handleDelete = (id: string) => {
    // In a real app, this would delete from Firebase
    setTeachers(teachers.filter((teacher) => teacher.id !== id))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Department</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead>Courses</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachers.map((teacher) => (
          <TableRow key={teacher.id}>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{teacher.name}</span>
                <span className="text-xs text-muted-foreground">{teacher.email}</span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{teacher.department}</TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant={teacher.status === "active" ? "default" : "secondary"}>{teacher.status}</Badge>
            </TableCell>
            <TableCell>{teacher.coursesCount}</TableCell>
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
                    <Link href={`/dashboard/principal/teachers/${teacher.id}`} className="flex w-full items-center">
                      View details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={`/dashboard/principal/teachers/${teacher.id}/edit`}
                      className="flex w-full items-center"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(teacher.id)}>
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

