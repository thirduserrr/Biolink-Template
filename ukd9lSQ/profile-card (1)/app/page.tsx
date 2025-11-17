"use client"

import { useState } from "react"
import { EntryScreen } from "@/components/entry-screen"
import { ProfileCard } from "@/components/profile-card"

export default function Home() {
  const [showProfile, setShowProfile] = useState(false)

  if (!showProfile) {
    return <EntryScreen onEnter={() => setShowProfile(true)} />
  }

  return <ProfileCard />
}
