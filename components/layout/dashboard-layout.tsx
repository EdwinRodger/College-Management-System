"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import {
    BarChart3,
    BookOpen,
    Calendar,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    Users,
    X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { auth, db } from "@/lib/firebase"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [user, setUser] = useState<any>(null)
    const [role, setRole] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser)

                // Get user role from Firestore
                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid))
                    if (userDoc.exists()) {
                        setRole(userDoc.data().role)
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error)
                }
            } else {
                setUser(null)
                setRole(null)
                router.push("/login")
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [router])

    const handleLogout = async () => {
        try {
            await auth.signOut()
            router.push("/login")
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }

    // Navigation items based on user role
    const getNavItems = () => {
        const baseItems = [
            {
                title: "Dashboard",
                href: `/dashboard/${role}`,
                icon: LayoutDashboard,
            },
            {
                title: "Settings",
                href: `/dashboard/${role}/settings`,
                icon: Settings,
            },
        ]

        if (role === "superadmin") {
            return [
                ...baseItems,
                {
                    title: "Colleges",
                    href: "/dashboard/superadmin/colleges",
                    icon: GraduationCap,
                },
                {
                    title: "Principals",
                    href: "/dashboard/superadmin/principals",
                    icon: Users,
                },
            ]
        } else if (role === "principal") {
            return [
                ...baseItems,
                {
                    title: "Teachers",
                    href: "/dashboard/principal/teachers",
                    icon: Users,
                },
                {
                    title: "Courses",
                    href: "/dashboard/principal/courses",
                    icon: BookOpen,
                },
                {
                    title: "Subjects",
                    href: "/dashboard/principal/subjects",
                    icon: BookOpen,
                },
                {
                    title: "Semesters",
                    href: "/dashboard/principal/semesters",
                    icon: Calendar,
                },
            ]
        } else if (role === "teacher") {
            return [
                ...baseItems,
                {
                    title: "Students",
                    href: "/dashboard/teacher/students",
                    icon: Users,
                },
                {
                    title: "Attendance",
                    href: "/dashboard/teacher/attendance",
                    icon: Calendar,
                },
                {
                    title: "Reports",
                    href: "/dashboard/teacher/reports",
                    icon: BarChart3,
                },
            ]
        }

        return baseItems
    }

    const navItems = getNavItems()

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        )
    }

    if (!user) {
        router.push("/login")
        return null
    }

    return (
        <div className="flex min-h-screen flex-col">
            {/* Mobile header */}
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden">
                <Button variant="outline" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                <div className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6" />
                    <span className="font-semibold">College Management System</span>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar for mobile */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden">
                        <div className="fixed inset-y-0 left-0 z-40 w-72 animate-in slide-in-from-left bg-background shadow-lg">
                            <div className="flex h-14 items-center border-b px-4">
                                <Button variant="outline" size="icon" onClick={() => setSidebarOpen(false)}>
                                    <X className="h-5 w-5" />
                                    <span className="sr-only">Close Menu</span>
                                </Button>
                                <div className="flex items-center gap-2 ml-4">
                                    <GraduationCap className="h-6 w-6" />
                                    <span className="font-semibold">Menu</span>
                                </div>
                            </div>
                            <div className="py-4">
                                <nav className="grid gap-1 px-2">
                                    {navItems.map((item, index) => (
                                        <Button
                                            key={index}
                                            variant="ghost"
                                            className={cn("flex justify-start gap-2", pathname === item.href && "bg-muted")}
                                            onClick={() => {
                                                router.push(item.href)
                                                setSidebarOpen(false)
                                            }}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.title}
                                        </Button>
                                    ))}
                                    <Button variant="ghost" className="flex justify-start gap-2 mt-4" onClick={handleLogout}>
                                        <LogOut className="h-5 w-5" />
                                        Logout
                                    </Button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sidebar for desktop */}
                <div className="hidden border-r bg-muted/40 md:block md:w-64">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-6 w-6" />
                                <span className="font-semibold">Management System</span>
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto py-2">
                            <nav className="grid gap-1 px-2">
                                {navItems.map((item, index) => (
                                    <Button
                                        key={index}
                                        variant="ghost"
                                        className={cn("flex justify-start gap-2", pathname === item.href && "bg-muted")}
                                        onClick={() => router.push(item.href)}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.title}
                                    </Button>
                                ))}
                            </nav>
                        </div>
                        <div className="border-t p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                    <span className="text-xs font-medium">{user?.email?.charAt(0).toUpperCase() || "U"}</span>
                                </div>
                                <div>
                                    <div className="text-sm font-medium">{user?.email || "User"}</div>
                                    <div className="text-xs text-muted-foreground capitalize">{role || "User"}</div>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full flex justify-start gap-2" onClick={handleLogout}>
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}

