"use client"

import { useState } from "react"
import { format } from "date-fns"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data - in a real app, this would come from Firebase
const studentsData = [
  {
    id: "1",
    name: "Alex Johnson",
    rollNumber: "S2023001",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Emma Williams",
    rollNumber: "S2023002",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Michael Brown",
    rollNumber: "S2023003",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Sophia Garcia",
    rollNumber: "S2023004",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "Daniel Martinez",
    rollNumber: "S2023005",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "6",
    name: "Olivia Wilson",
    rollNumber: "S2023006",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "7",
    name: "William Taylor",
    rollNumber: "S2023007",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "8",
    name: "Ava Anderson",
    rollNumber: "S2023008",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

interface AttendanceTableProps {
  searchQuery?: string
  date?: Date
}

export function AttendanceTable({ searchQuery = "", date }: AttendanceTableProps) {
  const [attendanceData, setAttendanceData] = useState<Record<string, string>>({})

  const filteredStudents = studentsData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Roll No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">{date ? format(date, "dd MMM yyyy") : "Today"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.rollNumber}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>
                      {student.name.charAt(0)}
                      {student.name.split(" ")[1]?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {student.name}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Select
                  value={attendanceData[student.id] || ""}
                  onValueChange={(value) => handleAttendanceChange(student.id, value)}
                >
                  <SelectTrigger className="w-[130px] ml-auto">
                    <SelectValue placeholder="Mark" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                    <SelectItem value="excused">Excused</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
          {filteredStudents.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                No students found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

