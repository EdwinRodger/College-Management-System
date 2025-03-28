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
const studentsData = [
    {
        id: "1",
        name: "Alex Johnson",
        email: "alex.johnson@student.edu",
        rollNumber: "S2023001",
        course: "Computer Science",
        semester: "3rd",
        attendanceRate: "92%",
        status: "active",
    },
    {
        id: "2",
        name: "Emma Williams",
        email: "emma.williams@student.edu",
        rollNumber: "S2023002",
        course: "Mathematics",
        semester: "3rd",
        attendanceRate: "88%",
        status: "active",
    },
    {
        id: "3",
        name: "Michael Brown",
        email: "michael.brown@student.edu",
        rollNumber: "S2023003",
        course: "Physics",
        semester: "3rd",
        attendanceRate: "95%",
        status: "active",
    },
    {
        id: "4",
        name: "Sophia Garcia",
        email: "sophia.garcia@student.edu",
        rollNumber: "S2023004",
        course: "Chemistry",
        semester: "3rd",
        attendanceRate: "55%",
        status: "warning",
    },
    {
        id: "5",
        name: "Daniel Martinez",
        email: "daniel.martinez@student.edu",
        rollNumber: "S2023005",
        course: "Biology",
        semester: "3rd",
        attendanceRate: "85%",
        status: "active",
    },
]

interface StudentsListProps {
    limit?: number
}

export function StudentsList({ limit }: StudentsListProps) {
    const [students, setStudents] = useState(limit ? studentsData.slice(0, limit) : studentsData)

    const handleDelete = (id: string) => {
        // In a real app, this would delete from Firebase
        setStudents(students.filter((student) => student.id !== id))
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Course</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students.map((student) => (
                    <TableRow key={student.id}>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="font-medium">{student.name}</span>
                                <span className="text-xs text-muted-foreground">{student.rollNumber}</span>
                            </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{student.course}</TableCell>
                        <TableCell>{student.attendanceRate}</TableCell>
                        <TableCell className="hidden md:table-cell">
                            <Badge variant={student.status === "active" ? "default" : "destructive"}>{student.status}</Badge>
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
                                        <Link href={`/dashboard/teacher/students/${student.id}`} className="flex w-full items-center">
                                            View details
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href={`/dashboard/teacher/students/${student.id}/edit`} className="flex w-full items-center">
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(student.id)}>
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

