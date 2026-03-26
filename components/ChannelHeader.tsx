'use client'

import { formatNumber, formatDate } from '@/lib/utils'
import { ChannelInfo } from '@/types/youtube'
import { Search, Users, Eye, Video, Clock } from 'lucide-react'

interface ChannelHeaderProps {
  channel: ChannelInfo
  onSearchAnother: () => void
  fetchedAt: string
}

export default function ChannelHeader({ channel, onSearchAnother, fetchedAt }: ChannelHeaderProps) {
  return (
    <div className="space-y-4 sm:space-y-6 fade-in">
      {/* Channel Info */}
      <div className="flex flex-col gap-4 items-start">
        <div className="relative self-center sm:self-start">
          <img
            src={channel.thumbnail}
            alt={channel.title}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-border"
          />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </div>
        </div>
        
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{channel.title}</h1>
          {channel.customUrl && (
            <p className="text-muted-foreground text-base sm:text-lg">{channel.customUrl}</p>
          )}
          {channel.description && (
            <p className="text-muted-foreground max-w-3xl line-clamp-2 text-sm sm:text-base">
              {channel.description}
            </p>
          )}
        </div>
        
        <button
          onClick={onSearchAnother}
          className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all flex items-center justify-center gap-2 min-h-[44px]"
        >
          <Search className="h-4 w-4" />
          Search Another Channel
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        <div className="glass rounded-xl p-4 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm font-medium">Subscribers</span>
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            {formatNumber(parseInt(channel.subscriberCount))}
          </div>
        </div>
        
        <div className="glass rounded-xl p-4 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm font-medium">Total Views</span>
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            {formatNumber(parseInt(channel.viewCount))}
          </div>
        </div>
        
        <div className="glass rounded-xl p-4 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Video className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm font-medium">Total Videos</span>
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            {formatNumber(parseInt(channel.videoCount))}
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground border-t border-border/50 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span>Channel created: {formatDate(channel.publishedAt)}</span>
            {channel.country && <span>• {channel.country}</span>}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Last analyzed: {formatDate(fetchedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
