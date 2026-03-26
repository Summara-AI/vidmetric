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
    <div className="p-4 md:p-6 space-y-4 fade-in">
      {/* Top Section - Channel Info */}
      <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
        <div className="relative">
          <img
            src={channel.thumbnail}
            alt={channel.title}
            className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-border"
          />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center">
            <Users className="h-3 w-3 md:h-4 md:w-4 text-white" />
          </div>
        </div>
        
        <div className="flex-1 space-y-2">
          <h1 className="text-xl md:text-3xl font-bold text-white">{channel.title}</h1>
          {channel.customUrl && (
            <p className="text-muted-foreground text-sm md:text-base">{channel.customUrl}</p>
          )}
          {channel.description && (
            <p className="text-muted-foreground max-w-3xl line-clamp-2 text-sm md:text-base">
              {channel.description}
            </p>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mt-4">
        <div className="p-3 text-center rounded-lg bg-[#1a1a2e]">
          <div className="text-lg md:text-2xl font-bold text-white">
            {formatNumber(parseInt(channel.subscriberCount))}
          </div>
          <div className="text-xs text-slate-400">Subscribers</div>
        </div>
        
        <div className="p-3 text-center rounded-lg bg-[#1a1a2e]">
          <div className="text-lg md:text-2xl font-bold text-white">
            {formatNumber(parseInt(channel.viewCount))}
          </div>
          <div className="text-xs text-slate-400">Total Views</div>
        </div>
        
        <div className="p-3 text-center rounded-lg bg-[#1a1a2e]">
          <div className="text-lg md:text-2xl font-bold text-white">
            {formatNumber(parseInt(channel.videoCount))}
          </div>
          <div className="text-xs text-slate-400">Total Videos</div>
        </div>
      </div>

      {/* Bottom Row - Date and Reset Button */}
      <div className="flex flex-col gap-2 md:flex-row md:justify-between mt-4">
        <div className="text-xs text-muted-foreground text-center md:text-left">
          <div>Channel created: {formatDate(channel.publishedAt)}</div>
          {channel.country && <div>{channel.country}</div>}
        </div>
        <button
          onClick={onSearchAnother}
          className="w-full md:w-auto px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all flex items-center justify-center gap-2 min-h-[44px]"
        >
          <Search className="h-4 w-4" />
          Search Another Channel
        </button>
      </div>
    </div>
  )
}
