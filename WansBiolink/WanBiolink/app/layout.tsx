import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Wan - Young & Wealthy Developer",
  description: "Your average dev - optimizing performance and building scalable systems.",
  keywords: [
    "software developer",
    "python",
    "c++",
    "typescript",
    "fastapi",
    "backend engineer",
    "performance optimization",
  ],
  authors: [{ name: "Wan" }],
  openGraph: {
    title: "Wan - Young & Wealthy Developer",
    description: "Your average dev - optimizing performance and building scalable systems.",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Wan - Developer Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "wan - Young & Wealthy Developer",
    description: "Your average dev - optimizing performance and building scalable systems.",
    images: ["/profile.jpg"],
  },
  icons: {
    icon: "/profile.jpg",
    apple: "/profile.jpg",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
