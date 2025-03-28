"use client"

import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Home() {
    // In a real implementation, we would check the user's authentication status
    // and redirect to the appropriate dashboard based on their role

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
            <div className="mx-auto max-w-md space-y-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">College Management System</h1>
                    <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Streamline attendance tracking across multiple colleges with our comprehensive management system
                    </p>
                </div>
                <div className="space-y-4">
                    <Button className="w-full" size="lg" onClick={() => redirect("/login")}>
                        Login to Dashboard
                    </Button>
                    <p className="text-xs text-gray-500">Secure authentication with role-based access control</p>
                </div>
            </div>
        </div>
    )
}

