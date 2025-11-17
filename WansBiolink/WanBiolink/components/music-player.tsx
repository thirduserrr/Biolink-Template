"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [hasError, setHasError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.loop = true
      audioRef.current.addEventListener("ended", () => setIsPlaying(false))
      audioRef.current.addEventListener("pause", () => setIsPlaying(false))
      audioRef.current.addEventListener("play", () => setIsPlaying(true))
      audioRef.current.addEventListener("loadstart", () => setHasError(false))
    }
  }, [volume])

  const togglePlay = async () => {
    if (audioRef.current && !hasError) {
      try {
        if (isPlaying) {
          audioRef.current.pause()
        } else {
          await audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
      } catch (error) {
        console.error("Audio play failed:", error)
        setIsPlaying(false)
        setHasError(true)
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current && !hasError) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasError) return

    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const audio = e.currentTarget
    let errorMessage = "Unknown audio error"

    if (audio.error) {
      switch (audio.error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          errorMessage = "Audio loading was aborted"
          break
        case MediaError.MEDIA_ERR_NETWORK:
          errorMessage = "Network error while loading audio"
          break
        case MediaError.MEDIA_ERR_DECODE:
          errorMessage = "Audio decoding error"
          break
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage = "Audio format not supported"
          break
        default:
          errorMessage = `Audio error code: ${audio.error.code}`
      }
    }

    console.error("Audio loading error:", errorMessage)
    setHasError(true)
    setIsPlaying(false)
  }

  if (hasError) {
    return null
  }

  return (
    <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
      <audio ref={audioRef} src="/background-music.mp3" preload="auto" onError={handleAudioError} />

      <Button variant="ghost" size="sm" onClick={togglePlay} className="h-8 w-8 p-0 text-white hover:bg-white/20">
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      <Button variant="ghost" size="sm" onClick={toggleMute} className="h-8 w-8 p-0 text-white hover:bg-white/20">
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
        className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  )
}
