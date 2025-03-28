import Link from "next/link"
import { CalendarDays, Clock, Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/sidebar"

// Sample course data
const courses = [
  {
    id: "cs301",
    name: "CS301 - Data Structures",
    instructor: "Prof. John Doe",
    department: "Computer Science",
    students: 32,
    schedule: "Mon, Wed, Fri",
    time: "10:00 AM - 11:30 AM",
    room: "Tech Building 305",
    description: "Advanced data structures and algorithms with practical applications.",
  },
  {
    id: "math201",
    name: "MATH201 - Calculus II",
    instructor: "Prof. Sarah Johnson",
    department: "Mathematics",
    students: 45,
    schedule: "Tue, Thu",
    time: "1:00 PM - 3:00 PM",
    room: "Science Hall 201",
    description: "Continuation of Calculus I, covering integration techniques and applications.",
  },
  {
    id: "eng102",
    name: "ENG102 - Composition",
    instructor: "Prof. Emily Wilson",
    department: "English",
    students: 28,
    schedule: "Mon, Wed",
    time: "2:00 PM - 3:30 PM",
    room: "Humanities 105",
    description: "Advanced writing skills with emphasis on research and argumentation.",
  },
  {
    id: "phys101",
    name: "PHYS101 - Physics I",
    instructor: "Prof. Michael Chen",
    department: "Physics",
    students: 38,
    schedule: "Tue, Thu",
    time: "9:00 AM - 11:00 AM",
    room: "Science Hall 305",
    description: "Introduction to classical mechanics and thermodynamics.",
  },
  {
    id: "bio220",
    name: "BIO220 - Genetics",
    instructor: "Prof. Lisa Rodriguez",
    department: "Biology",
    students: 30,
    schedule: "Mon, Wed, Fri",
    time: "11:00 AM - 12:00 PM",
    room: "Life Sciences 210",
    description: "Principles of inheritance, gene expression, and genetic engineering.",
  },
]

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
              <div className="flex items-center gap-2">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Course
                </Button>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader className="border-b bg-muted/40 p-4">
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="text-sm">{course.description}</div>
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{course.students} Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          <span>{course.schedule}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{course.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xs text-muted-foreground">{course.department}</span>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/take-attendance?course=${course.id}`}>Take Attendance</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

