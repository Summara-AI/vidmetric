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
      className="glass rounded-xl p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 fade-in-up"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both'
      }}
    >
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Video Thumbnail */}
        <div className="relative group">
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
        <div className="flex-1 space-y-2 sm:space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-white leading-tight line-clamp-2 hover:text-primary transition-colors text-sm sm:text-base">
            {video.title}
          </h3>

          {/* Published Date */}
          <div className="text-xs sm:text-sm text-muted-foreground">
            {formatDate(video.publishedAt)} • {daysAgo(video.publishedAt)} days ago
          </div>

          {/* Trending Badge */}
          <div>
            <TrendingBadge trendingScore={video.trendingScore} />
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {/* Views */}
            <div className="inline-flex items-center px-2 py-1 bg-muted/50 rounded-md text-xs text-muted-foreground">
              <span className="mr-1">👁</span>
              {formatNumber(video.viewCount)}
            </div>

            {/* Likes */}
            <div className="inline-flex items-center px-2 py-1 bg-muted/50 rounded-md text-xs text-muted-foreground">
              <span className="mr-1">👍</span>
              {formatNumber(video.likeCount)}
            </div>

            {/* Comments */}
            <div className="inline-flex items-center px-2 py-1 bg-muted/50 rounded-md text-xs text-muted-foreground">
              <span className="mr-1">💬</span>
              {formatNumber(video.commentCount)}
            </div>

            {/* Engagement Rate */}
            <div className="inline-flex items-center px-2 py-1 bg-primary/10 border border-primary/30 rounded-md text-xs text-primary font-medium">
              <span className="mr-1">📊</span>
              {video.engagementRate}%
            </div>
          </div>

          {/* Trending Score (always visible for analytics) */}
          <div className="text-xs text-muted-foreground">
            Trending Score: <span className="font-semibold text-white">{video.trendingScore}/100</span>
          </div>
        </div>
      </div>
    </div>
  )
}
