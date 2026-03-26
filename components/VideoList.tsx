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
      <div className="glass rounded-xl p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">No videos match your filters</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms, date range, or sorting options
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Video className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-white">
          Video Performance ({filteredVideos.length} videos)
        </h2>
      </div>
      
      <div className="space-y-4">
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
