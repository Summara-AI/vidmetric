'use client'

import { useState } from 'react'
import { Search, Loader2, AlertCircle } from 'lucide-react'

interface ChannelInputProps {
  onAnalyze: (url: string) => void
  isLoading?: boolean
  error?: string | null
}

const exampleChannels = [
  '@MrBeast',
  '@mkbhd', 
  '@LinusTechTips'
]

export default function ChannelInput({ onAnalyze, isLoading = false, error = null }: ChannelInputProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onAnalyze(url.trim())
    }
  }

  const handleExampleClick = (channel: string) => {
    const fullUrl = `https://youtube.com/${channel}`
    setUrl(fullUrl)
    // Auto-submit when example is clicked
    onAnalyze(fullUrl)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-3 sm:px-4 fade-in">
      <div className="max-w-3xl w-full space-y-6 sm:space-y-8 text-center">
        {/* Hero Section */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Analyze Any YouTube Channel
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Paste a competitor's channel URL and instantly see which videos are crushing it
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/@channelname"
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-card border border-border rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={!url.trim() || isLoading}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze'
              )}
            </button>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-2 text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 sm:px-4 py-3 fade-in">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Example Channels */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm text-muted-foreground">Try these popular channels:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {exampleChannels.map((channel) => (
              <button
                key={channel}
                onClick={() => handleExampleClick(channel)}
                disabled={isLoading}
                className="px-3 sm:px-4 py-2 bg-muted/50 border border-border rounded-lg text-muted-foreground hover:text-white hover:bg-muted hover:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {channel}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
