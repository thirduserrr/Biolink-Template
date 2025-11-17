"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card } from "@/components/ui/card"

interface DiscordActivity {
  name: string
  type: number
  state?: string
  details?: string
  timestamps?: {
    start?: number
    end?: number
  }
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
  }
  application_id?: string
  created_at?: number
}

interface DiscordData {
  discord_user: {
    username: string
    discriminator: string
    id: string
    avatar: string
    global_name?: string
    public_flags?: number
    display_name?: string
  }
  discord_status: string
  activities: DiscordActivity[]
  listening_to_spotify?: boolean
  spotify?: {
    track_id: string
    timestamps: {
      start: number
      end: number
    }
    song: string
    artist: string
    album_art_url: string
    album: string
  }
  kv?: Record<string, any>
  active_on_discord_web?: boolean
  active_on_discord_desktop?: boolean
  active_on_discord_mobile?: boolean
}

const getActivityTypeText = (type: number) => {
  switch (type) {
    case 0:
      return "Playing"
    case 1:
      return "Streaming"
    case 2:
      return "Listening to"
    case 3:
      return "Watching"
    case 4:
      return "" // Custom status
    case 5:
      return "Competing in"
    default:
      return "Activity"
  }
}

const formatTimestamp = (timestamp: number) => {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`
  }
  return `${minutes}m`
}

export function DiscordIntegration({ userId }: { userId: string }) {
  const [discordData, setDiscordData] = useState<DiscordData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDiscordData = useCallback(async () => {
    try {
      const lanyardResponse = await fetch(`https://api.lanyard.rest/v1/users/${userId}`)
      const lanyardData = await lanyardResponse.json()

      if (lanyardData.success) {
        setDiscordData(lanyardData.data)
        setError(null)
      } else {
        setError("Failed to fetch Discord data")
      }
    } catch (err) {
      setError("Error connecting to Discord")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchDiscordData()
    const interval = setInterval(fetchDiscordData, 30000) // Update every 30 seconds instead of 10
    return () => clearInterval(interval)
  }, [fetchDiscordData])

  const statusColor = useMemo(() => {
    if (!discordData) return "bg-gray-500"
    switch (discordData.discord_status) {
      case "online":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }, [discordData])

  const statusText = useMemo(() => {
    if (!discordData) return "Offline"
    switch (discordData.discord_status) {
      case "online":
        return "Online"
      case "idle":
        return "Away"
      case "dnd":
        return "Do Not Disturb"
      default:
        return "Offline"
    }
  }, [discordData])

  if (loading) {
    return (
      <Card className="bg-card/60 backdrop-blur-sm border-border/20 p-3">
        <div className="animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-full"></div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-20"></div>
              <div className="h-2 bg-muted rounded w-14"></div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-card/60 backdrop-blur-sm border-border/20 p-3">
        <div className="text-red-400 text-xs">{error}</div>
      </Card>
    )
  }

  if (!discordData) {
    return (
      <Card className="bg-card/60 backdrop-blur-sm border-border/20 p-3">
        <div className="text-muted-foreground text-xs">No Discord data available</div>
      </Card>
    )
  }

  return (
    <Card className="bg-card/60 backdrop-blur-sm border-border/20 p-3 space-y-3">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={`https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png?size=48`}
            alt="Discord Avatar"
            className="w-10 h-10 rounded-full ring-2 ring-border/20"
            onError={(e) => {
              e.currentTarget.src = `https://cdn.discordapp.com/embed/avatars/${Number.parseInt(discordData.discord_user.discriminator) % 5}.png`
            }}
          />
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${statusColor}`} />
        </div>
        <div>
          <div className="text-foreground font-medium text-sm">
            {discordData.discord_user.global_name ||
              discordData.discord_user.display_name ||
              discordData.discord_user.username}
          </div>
          <div className="text-xs text-muted-foreground">{statusText}</div>
        </div>
      </div>

      {/* Activities */}
      {discordData.activities && discordData.activities.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">Activities</div>
          {discordData.activities.slice(0, 2).map((activity, index) => (
            <div key={index} className="bg-muted/20 rounded-lg p-2 space-y-1">
              <div className="flex items-center gap-2">
                {activity.assets?.large_image && (
                  <img
                    src={
                      activity.assets.large_image.startsWith("mp:")
                        ? `https://media.discordapp.net/${activity.assets.large_image.slice(3)}`
                        : activity.application_id
                          ? `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
                          : "/activity-icon.png"
                    }
                    alt={activity.assets.large_text || "Activity"}
                    className="w-6 h-6 rounded"
                    onError={(e) => {
                      e.currentTarget.src = "/classic-game-controller.png"
                    }}
                  />
                )}
                <div className="text-xs font-medium text-foreground">
                  {getActivityTypeText(activity.type)} {activity.name}
                </div>
              </div>
              {activity.details && <div className="text-xs text-muted-foreground">{activity.details}</div>}
              {activity.state && activity.type !== 4 && (
                <div className="text-xs text-muted-foreground">{activity.state}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Spotify Integration */}
      {discordData.listening_to_spotify && discordData.spotify && (
        <div className="space-y-2">
          <div className="text-xs font-medium text-green-400 flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            Listening to Spotify
          </div>
          <div className="bg-muted/20 rounded-lg p-2 flex items-center gap-2">
            <img
              src={discordData.spotify.album_art_url || "/placeholder.svg?height=32&width=32&query=spotify+album"}
              alt="Album Art"
              className="w-8 h-8 rounded"
              onError={(e) => {
                e.currentTarget.src = "/single-music-note.png"
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-foreground truncate">{discordData.spotify.song}</div>
              <div className="text-xs text-muted-foreground truncate">by {discordData.spotify.artist}</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
