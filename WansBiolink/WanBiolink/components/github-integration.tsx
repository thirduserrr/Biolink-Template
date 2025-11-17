"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Star, GitFork, ExternalLink } from "lucide-react"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

interface GitHubUser {
  login: string
  name: string
  followers: number
  following: number
  public_repos: number
  avatar_url: string
}

interface GitHubIntegrationProps {
  username: string
}

export function GitHubIntegration({ username }: GitHubIntegrationProps) {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGitHubData = useCallback(async () => {
    try {
      setLoading(true)

      // Fetch user data and repositories in parallel for better performance
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`),
      ])

      if (!userResponse.ok || !reposResponse.ok) {
        throw new Error("Failed to fetch GitHub data")
      }

      const [userData, reposData] = await Promise.all([userResponse.json(), reposResponse.json()])

      setUser(userData)
      setRepos(reposData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    fetchGitHubData()
  }, [fetchGitHubData])

  const stats = useMemo(() => {
    if (!user) return null
    return [
      { label: "Followers", value: user.followers, color: "text-green-400" },
      { label: "Repos", value: user.public_repos, color: "text-purple-400" },
    ]
  }, [user])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Github className="w-5 h-5 text-gray-400" />
          <span className="text-lg font-semibold text-gray-300">GitHub</span>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Github className="w-5 h-5 text-red-400" />
          <span className="text-lg font-semibold text-red-400">GitHub Error</span>
        </div>
        <p className="text-sm text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* GitHub Stats */}
      <div className="flex items-center gap-2 mb-4">
        <Github className="w-5 h-5 text-gray-300" />
        <span className="text-lg font-semibold text-gray-300">GitHub</span>
      </div>

      {stats && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
              <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Top Repositories */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-400 mb-3">Recent Repositories</h4>
        {repos.slice(0, 4).map((repo) => (
          <Card key={repo.id} className="bg-white/5 border-white/10 p-3 hover:bg-white/10 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="text-sm font-medium text-white truncate">{repo.name}</h5>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                    onClick={() => window.open(repo.html_url, "_blank")}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
                {repo.description && <p className="text-xs text-gray-400 mb-2 line-clamp-2">{repo.description}</p>}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {repo.language && (
                    <Badge variant="outline" className="text-xs px-1 py-0 border-gray-600 text-gray-400">
                      {repo.language}
                    </Badge>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3" />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
