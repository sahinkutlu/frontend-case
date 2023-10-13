'use client';
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

// export const metadata: Metadata = {
//     title: 'AdCreative Frontend Case |  Mustafa Çor',
//     description: '',
// }

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="manifest" href="/manifest.json"/>
            <meta name="theme-color" content="#ffffff"/>
            <title>AdCreative Frontend Case | Mustafa Çor</title>
            <meta name="description" content="AdCreative Frontend Case"/>
            <meta name="keywords" content="AdCreative, Frontend, Case"/>
            <meta name="author" content="Mustafa Çor"/>
            <meta name="robots" content="index, follow"/>
            <meta name="googlebot" content="index, follow"/>
            <meta name="google" content="notranslate"/>
        </head>
        <body className={inter.className}>{children}</body>
        </html>
    )
}
