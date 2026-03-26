'use client'

import { VideoMetrics } from '@/types/youtube'
import { formatNumber, formatDuration, formatDate, daysAgo } from '@/lib/utils'
import TrendingBadge from './TrendingBadge'

interface VideoCardProps {
  video: VideoMetrics
  index: number
}

export default function VideoCard({ video, index }: VideoCardProps) {
  const handleClick = () => {
    window.open(video.url, '_blank')
  }

  return (
    <div
      onClick={handleClick}
      className="flex flex-col sm:flex-row gap-3 p-3 md:p-4 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 fade-in-up overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both'
      }}
    >
      {/* Video Thumbnail */}
      <div className="w-full sm:w-40 md:w-48 flex-shrink-0 relative group">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-lg"
        />
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
          {formatDuration(video.duration)}
        </div>
        {/* Play button overlay on hover */}
        <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Title */}
        <h3 className="text-sm md:text-base font-semibold text-white leading-tight line-clamp-2 hover:text-primary transition-colors">
          {video.title}
        </h3>

        {/* Published Date */}
        <div className="text-xs text-muted-foreground">
          {formatDate(video.publishedAt)} • {daysAgo(video.publishedAt)} days ago
        </div>

        {/* Trending Badge */}
        <div>
          <TrendingBadge trendingScore={video.trendingScore} />
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap gap-2 mt-2">
          {/* Views */}
          <div className="text-xs px-2 py-1 rounded-full bg-[#1a1a2e] whitespace-nowrap">
            👁 {formatNumber(video.viewCount)}
          </div>

          {/* Likes */}
          <div className="text-xs px-2 py-1 rounded-full bg-[#1a1a2e] whitespace-nowrap">
            👍 {formatNumber(video.likeCount)}
          </div>

          {/* Comments */}
          <div className="text-xs px-2 py-1 rounded-full bg-[#1a1a2e] whitespace-nowrap">
            💬 {formatNumber(video.commentCount)}
          </div>

          {/* Engagement Rate */}
          <div className="text-xs px-2 py-1 rounded-full bg-primary/10 border border-primary/30 whitespace-nowrap">
            📊 {video.engagementRate}%
          </div>
        </div>

        {/* Trending Score */}
        <div className="text-xs text-muted-foreground">
          Trending Score: <span className="font-semibold text-white">{video.trendingScore}/100</span>
        </div>
      </div>
    </div>
  )
}
