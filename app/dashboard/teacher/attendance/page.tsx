"use client"

import { useState } from "react"
import { Calendar, Check, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { AttendanceTable } from "@/components/attendance/attendance-table"
import { DatePicker } from "@/components/ui/date-picker"

// Sample data - in a real app, this would come from Firebase
const courses = [
  { id: "cs101", name: "CS101 - Introduction to Programming" },
  { id: "cs201", name: "CS201 - Data Structures" },
  { id: "cs301", name: "CS301 - Database Systems" },
  { id: "cs401", name: "CS401 - Software Engineering" },
]

const semesters = [
  { id: "sem1", name: "1st Semester" },
  { id: "sem2", name: "2nd Semester" },
  { id: "sem3", name: "3rd Semester" },
  { id: "sem4", name: "4th Semester" },
]

export default function AttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = () => {
    console.log("Submitting attendance for:", {
      course: selectedCourse,
      semester: selectedSemester,
      date: selectedDate,
    })
    // In a real app, this would save to Firebase
    alert("Attendance submitted successfully!")
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Attendance Management</h1>
            <p className="text-muted-foreground">Record and manage student attendance</p>
          </div>
        </div>

        <Tabs defaultValue="take" className="space-y-4">
          <TabsList>
            <TabsTrigger value="take">Take Attendance</TabsTrigger>
            <TabsTrigger value="view">View Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="take" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Take Attendance</CardTitle>
                <CardDescription>Record attendance for a specific course, semester, and date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                    <div>
                      <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {semesters.map((semester) => (
                            <SelectItem key={semester.id} value={semester.id}>
                              {semester.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <DatePicker date={selectedDate} setDate={setSelectedDate} />
                    </div>
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

                  {selectedCourse && selectedSemester ? (
                    <div>
                      <AttendanceTable searchQuery={searchQuery} date={selectedDate} />
                      <div className="mt-4 flex justify-end">
                        <Button onClick={handleSubmit}>
                          <Check className="mr-2 h-4 w-4" />
                          Submit Attendance
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                      <div className="text-center">
                        <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-medium">No Course Selected</h3>
                        <p className="text-sm text-muted-foreground">
                          Please select a course and semester to take attendance
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="view" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>View Attendance Records</CardTitle>
                <CardDescription>View and filter attendance records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <Select>
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
                    <div>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {semesters.map((semester) => (
                            <SelectItem key={semester.id} value={semester.id}>
                              {semester.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <DatePicker date={selectedDate} setDate={setSelectedDate} />
                    </div>
                  </div>

                  <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                    <div className="text-center">
                      <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium">No Records Selected</h3>
                      <p className="text-sm text-muted-foreground">
                        Please select a course, semester, and date to view attendance records
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

