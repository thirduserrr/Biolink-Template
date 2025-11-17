"use client"

interface EntryScreenProps {
  onEnter: () => void
}

export function EntryScreen({ onEnter }: EntryScreenProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden cursor-pointer"
      onClick={onEnter}
    >
      <div className="absolute inset-0 backdrop-blur-sm">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent drop-shadow-2xl">
            $$$$
          </h1>
        </div>
      </div>
    </div>
  )
}
