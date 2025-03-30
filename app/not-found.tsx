// app/not-found.js
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Card className="w-[400px] text-center shadow-lg">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold text-red-600">Work In Progress/404</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Oops! The page you're looking for is in Work In Progress or it doesn't exist.
                    </p>
                    {/* <Button asChild>
                        <Link href="/dashboard/superadmin">Go Back Home</Link>
                    </Button> */}
                </CardContent>
            </Card>
        </div>
    );
}
