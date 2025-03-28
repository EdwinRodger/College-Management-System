"use client"

import { useState } from "react"
import { Check, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "@/components/sidebar"
import { StudentRow } from "@/components/student-row"

// Sample data
const courses = [
  { id: "cs301", name: "CS301 - Data Structures" },
  { id: "math201", name: "MATH201 - Calculus II" },
  { id: "eng102", name: "ENG102 - Composition" },
  { id: "phys101", name: "PHYS101 - Physics I" },
  { id: "bio220", name: "BIO220 - Genetics" },
]

const students = [
  { id: 1, name: "Olivia Martin", studentId: "S10001", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 2, name: "Jackson Lee", studentId: "S10002", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 3, name: "Isabella Nguyen", studentId: "S10003", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 4, name: "William Kim", studentId: "S10004", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 5, name: "Sofia Davis", studentId: "S10005", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 6, name: "Ethan Johnson", studentId: "S10006", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 7, name: "Ava Williams", studentId: "S10007", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 8, name: "Noah Brown", studentId: "S10008", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 9, name: "Mia Jones", studentId: "S10009", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 10, name: "Lucas Garcia", studentId: "S10010", avatar: "/placeholder.svg?height=32&width=32" },
]

export default function TakeAttendance() {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [attendanceData, setAttendanceData] = useState<Record<number, string>>({})

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAttendanceChange = (studentId: number, status: string) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const handleSubmit = () => {
    console.log("Submitting attendance for course:", selectedCourse)
    console.log("Attendance data:", attendanceData)
    // Here you would typically send this data to your backend
    alert("Attendance submitted successfully!")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">Take Attendance</h1>
              <div className="flex items-center gap-2">
                <Button onClick={handleSubmit} disabled={!selectedCourse || Object.keys(attendanceData).length === 0}>
                  <Check className="mr-2 h-4 w-4" />
                  Submit Attendance
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Form</CardTitle>
                <CardDescription>Select a course and mark attendance for students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search students..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {selectedCourse ? (
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 gap-4 p-4 font-medium">
                        <div className="col-span-6">Student</div>
                        <div className="col-span-2">ID</div>
                        <div className="col-span-4">Status</div>
                      </div>
                      <div className="divide-y">
                        {filteredStudents.map((student) => (
                          <StudentRow
                            key={student.id}
                            student={student}
                            status={attendanceData[student.id] || ""}
                            onStatusChange={(status) => handleAttendanceChange(student.id, status)}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                      <div className="text-center">
                        <h3 className="text-lg font-medium">No Course Selected</h3>
                        <p className="text-sm text-muted-foreground">Please select a course to view the student list</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

