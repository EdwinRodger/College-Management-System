"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  ListChecks,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 lg:block lg:w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <GraduationCap className="h-6 w-6" />
            <span>College Attendance</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === "/" ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/courses"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === "/courses" ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <GraduationCap className="h-4 w-4" />
              Courses
            </Link>
            <Link
              href="/students"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === "/students" ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <Users className="h-4 w-4" />
              Students
            </Link>
            <Link
              href="/take-attendance"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === "/take-attendance" ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <ListChecks className="h-4 w-4" />
              Take Attendance
            </Link>
            <Link
              href="/schedule"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === "/schedule" ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <CalendarDays className="h-4 w-4" />
              Schedule
            </Link>
            <Link
              href="/reports"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === "/reports" ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <BarChart className="h-4 w-4" />
              Reports
            </Link>
          </nav>
        </div>
        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-2 py-2">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <span className="text-xs font-medium">JD</span>
            </div>
            <div>
              <div className="text-sm font-medium">Prof. John Doe</div>
              <div className="text-xs text-muted-foreground">Computer Science</div>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

