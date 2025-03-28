"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data - in a real app, this would come from Firebase
const data = [
  {
    name: "Week 1",
    present: 92,
    absent: 8,
  },
  {
    name: "Week 2",
    present: 88,
    absent: 12,
  },
  {
    name: "Week 3",
    present: 90,
    absent: 10,
  },
  {
    name: "Week 4",
    present: 85,
    absent: 15,
  },
  {
    name: "Week 5",
    present: 87,
    absent: 13,
  },
  {
    name: "Week 6",
    present: 89,
    absent: 11,
  },
]

export function AttendanceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />
        <Bar dataKey="present" fill="#4ade80" radius={[4, 4, 0, 0]} stackId="a" name="Present" />
        <Bar dataKey="absent" fill="#f87171" radius={[4, 4, 0, 0]} stackId="a" name="Absent" />
      </BarChart>
    </ResponsiveContainer>
  )
}

