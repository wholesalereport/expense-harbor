import type {Metadata} from "next";
import '@/src/styles/tailwind.css'
import {
    ClerkProvider,
} from '@clerk/nextjs'
import React, {Suspense, ReactNode} from "react";
import {MainMenu} from "@/src/components/navbarv2";


export const metadata: Metadata = {
    title: {
        template: '%s - Expenses Harbor',
        default: 'Get a Clear Breakdown of Your Online Orders with Expenses Harbor',
    },
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
                />
            </head>
            <body className="text-gray-950 antialiased">
            <MainMenu/>
            {children}
            </body>
            </html>
        </ClerkProvider>
    )
}
