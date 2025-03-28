import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'College Management System',
    description: 'Created By Vaidik Lotan and Trishansh Sahane',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
