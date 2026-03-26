'use client'

import { VideoMetrics } from '@/types/youtube'
import VideoCard from './VideoCard'
import { Video, Search } from 'lucide-react'

interface VideoListProps {
  filteredVideos: VideoMetrics[]
}

export default function VideoList({ filteredVideos }: VideoListProps) {
  if (filteredVideos.length === 0) {
    return (
      <div className="glass rounded-xl p-8 sm:p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted/50 rounded-full flex items-center justify-center">
            <Search className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-semibold text-white">No videos match your filters</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Try adjusting your search terms, date range, or sorting options
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Video className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Video Performance ({filteredVideos.length} videos)
        </h2>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {filteredVideos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
