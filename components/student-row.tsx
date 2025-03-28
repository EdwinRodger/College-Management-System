"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Student {
  id: number
  name: string
  studentId: string
  avatar: string
}

interface StudentRowProps {
  student: Student
  status: string
  onStatusChange: (status: string) => void
}

export function StudentRow({ student, status, onStatusChange }: StudentRowProps) {
  return (
    <div className="grid grid-cols-12 items-center gap-4 p-4">
      <div className="col-span-6 flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={student.avatar} alt={student.name} />
          <AvatarFallback>
            {student.name.charAt(0)}
            {student.name.split(" ")[1]?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{student.name}</p>
        </div>
      </div>
      <div className="col-span-2 text-sm">{student.studentId}</div>
      <div className="col-span-4">
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Mark status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
            <SelectItem value="late">Late</SelectItem>
            <SelectItem value="excused">Excused</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

