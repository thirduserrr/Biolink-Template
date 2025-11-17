"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TypewriterText } from "./typewriter-text"
import { GitHubIntegration } from "./github-integration"
import { DiscordIntegration } from "./discord-integration"
import { ThemeToggle } from "./theme-toggle"
import { Github, ExternalLink, Code2, MapPin } from "lucide-react"

export function ProfileCard() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src="/background.png" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/50" />
      </div>

      {/* Theme Toggle - Top Right with better positioning */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-xl bg-card/80 backdrop-blur-2xl border-border/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.6)] transition-all duration-500">
          <div className="relative w-full h-32 overflow-hidden">
            <img
              src="/banner.jpg"
              alt="Banner"
              className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          </div>

          <div className="p-6 space-y-5 -mt-12 relative z-10">
            <div className="flex items-start gap-5">
              <div className="relative group">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-3 border-card shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card shadow-lg">
                  <div className="w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground mb-2 text-shadow-glow bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  wan
                </h1>
                <p className="text-muted-foreground text-sm mb-2 font-medium">Full Stack Developer · Python and C++</p>

                {/* Bio */}
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">Your average dev</p>

                {/* Location with better styling */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/20 rounded-full px-2 py-1 w-fit">
                  <MapPin className="w-3 h-3" />
                  <span>Digital Nomad</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-muted/30 to-muted/20 rounded-2xl p-4 border border-border/20 backdrop-blur-sm">
              <TypewriterText
                texts={["young and wealthy", "optimizing performance"]}
                className="text-lg font-semibold text-primary"
                speed={120}
                deleteSpeed={60}
                pauseTime={2500}
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Tech Stack
              </h3>

              <div className="bg-gradient-to-br from-muted/20 to-muted/10 rounded-2xl p-4 border border-border/20">
                <div className="flex flex-wrap gap-2">
                  <Badge className="text-xs px-2 py-1 bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25 transition-colors cursor-pointer flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                    Python
                  </Badge>
                  <Badge className="text-xs px-2 py-1 bg-purple-500/15 text-purple-400 border-purple-500/30 hover:bg-purple-500/25 transition-colors cursor-pointer flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-sm"></div>
                    C++
                  </Badge>
                  <Badge className="text-xs px-2 py-1 bg-blue-600/15 text-blue-300 border-blue-600/30 hover:bg-blue-600/25 transition-colors cursor-pointer flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                    TypeScript
                  </Badge>
                  <Badge className="text-xs px-2 py-1 bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/25 transition-colors cursor-pointer flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                    FastAPI
                  </Badge>
                  <Badge className="text-xs px-2 py-1 bg-cyan-500/15 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/25 transition-colors cursor-pointer flex items-center gap-1">
                    <div className="w-2 h-2 bg-cyan-500 rounded-sm"></div>
                    React
                  </Badge>
                  <Badge className="text-xs px-2 py-1 bg-gray-500/15 text-gray-400 border-gray-500/30 hover:bg-gray-500/25 transition-colors cursor-pointer flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-sm"></div>
                    Next.js
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Links
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  className="h-9 justify-start text-xs text-foreground hover:text-primary-foreground hover:bg-primary/90 border-border/30 hover:border-primary/50 transition-all duration-300 bg-muted/10 hover:shadow-lg hover:scale-[1.02]"
                  onClick={() => window.open("https://github.com/thirduserrr", "_blank")}
                >
                  <Github className="w-3 h-3 mr-2" />
                  <span>GitHub</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-9 justify-start text-xs text-foreground hover:text-primary-foreground hover:bg-primary/90 border-border/30 hover:border-primary/50 transition-all duration-300 bg-muted/10 hover:shadow-lg hover:scale-[1.02]"
                  onClick={() => window.open("https://ammo.lol/sniped", "_blank")}
                >
                  <ExternalLink className="w-3 h-3 mr-2" />
                  <span>ammo.lol/sniped</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-9 justify-start text-xs text-foreground hover:text-primary-foreground hover:bg-primary/90 border-border/30 hover:border-primary/50 transition-all duration-300 bg-muted/10 hover:shadow-lg hover:scale-[1.02]"
                  onClick={() => window.open("https://haunt.gg/wan", "_blank")}
                >
                  <ExternalLink className="w-3 h-3 mr-2" />
                  <span>haunt.gg/wan</span>
                </Button>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-border/20">
              <div className="grid grid-cols-1 gap-3">
                <GitHubIntegration username="thirduserrr" />
                <DiscordIntegration userId="1190143245678805106" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
