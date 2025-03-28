"use client"

import { useState } from "react"
import { Download, Plus, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sidebar } from "@/components/sidebar"

// Sample student data
const students = [
  {
    id: 1,
    name: "Olivia Martin",
    studentId: "S10001",
    email: "olivia.martin@example.edu",
    major: "Computer Science",
    year: "Junior",
    gpa: "3.8",
  },
  {
    id: 2,
    name: "Jackson Lee",
    studentId: "S10002",
    email: "jackson.lee@example.edu",
    major: "Mathematics",
    year: "Sophomore",
    gpa: "3.5",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    studentId: "S10003",
    email: "isabella.nguyen@example.edu",
    major: "English",
    year: "Senior",
    gpa: "3.9",
  },
  {
    id: 4,
    name: "William Kim",
    studentId: "S10004",
    email: "william.kim@example.edu",
    major: "Physics",
    year: "Freshman",
    gpa: "3.6",
  },
  {
    id: 5,
    name: "Sofia Davis",
    studentId: "S10005",
    email: "sofia.davis@example.edu",
    major: "Biology",
    year: "Junior",
    gpa: "3.7",
  },
  {
    id: 6,
    name: "Ethan Johnson",
    studentId: "S10006",
    email: "ethan.johnson@example.edu",
    major: "Computer Science",
    year: "Senior",
    gpa: "3.4",
  },
  {
    id: 7,
    name: "Ava Williams",
    studentId: "S10007",
    email: "ava.williams@example.edu",
    major: "Chemistry",
    year: "Sophomore",
    gpa: "3.8",
  },
  {
    id: 8,
    name: "Noah Brown",
    studentId: "S10008",
    email: "noah.brown@example.edu",
    major: "Mathematics",
    year: "Junior",
    gpa: "3.2",
  },
  {
    id: 9,
    name: "Mia Jones",
    studentId: "S10009",
    email: "mia.jones@example.edu",
    major: "Psychology",
    year: "Freshman",
    gpa: "3.9",
  },
  {
    id: 10,
    name: "Lucas Garcia",
    studentId: "S10010",
    email: "lucas.garcia@example.edu",
    major: "Engineering",
    year: "Senior",
    gpa: "3.7",
  },
]

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.major.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">Students</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-8 w-full md:max-w-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Major</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>GPA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.major}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{student.gpa}</TableCell>
                    </TableRow>
                  ))}
                  {filteredStudents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No students found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

