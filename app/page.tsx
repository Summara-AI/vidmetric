'use client'

import { useState, useCallback } from 'react'
import ChannelInput from '@/components/ChannelInput'
import ChannelHeader from '@/components/ChannelHeader'
import FilterBar from '@/components/FilterBar'
import VideoList from '@/components/VideoList'
import MetricsChart from '@/components/MetricsChart'
import ExportButton from '@/components/ExportButton'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { ChannelInfo, VideoMetrics } from '@/types/youtube'

type State = 'idle' | 'loading' | 'success' | 'error'

export default function Home() {
  const [state, setState] = useState<State>('idle')
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null)
  const [videos, setVideos] = useState<VideoMetrics[]>([])
  const [filteredVideos, setFilteredVideos] = useState<VideoMetrics[]>([])
  const [error, setError] = useState<string | null>(null)
  const [fetchedAt, setFetchedAt] = useState<string>('')

  const handleFilteredVideos = useCallback((filtered: VideoMetrics[]) => {
    setFilteredVideos(filtered)
  }, [])

  const handleAnalyze = async (url: string) => {
    setState('loading')
    setError(null)

    try {
      // Fetch channel info
      const channelResponse = await fetch(`/api/channel?url=${encodeURIComponent(url)}`)
      const channelData = await channelResponse.json()

      if (!channelData.success) {
        throw new Error(channelData.error || 'Failed to fetch channel')
      }

      // Fetch videos
      const videosResponse = await fetch(`/api/videos?channelId=${channelData.data.id}`)
      const videosData = await videosResponse.json()

      if (!videosData.success) {
        throw new Error(videosData.error || 'Failed to fetch videos')
      }

      setChannelInfo(channelData.data)
      setVideos(videosData.data)
      setFilteredVideos(videosData.data)
      setFetchedAt(videosData.fetchedAt)
      setState('success')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      setState('error')
    }
  }

  const handleSearchAnother = () => {
    setState('idle')
    setChannelInfo(null)
    setVideos([])
    setFilteredVideos([])
    setError(null)
    setFetchedAt('')
  }

  const renderContent = () => {
    switch (state) {
      case 'idle':
        return (
          <div className="relative">
            {/* Background gradient for hero */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
            <ChannelInput
              onAnalyze={handleAnalyze}
              isLoading={false}
              error={error}
            />
          </div>
        )

      case 'loading':
        return (
          <div className="space-y-8">
            <ChannelInput
              onAnalyze={() => {}}
              isLoading={true}
              error={null}
            />
            <LoadingSkeleton />
          </div>
        )

      case 'success':
        return (
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
            <ChannelHeader
              channel={channelInfo!}
              onSearchAnother={handleSearchAnother}
              fetchedAt={fetchedAt}
            />
            
            <div className="flex flex-col gap-4 sm:gap-6">
              <FilterBar
                videos={videos}
                onFilteredVideos={handleFilteredVideos}
              />
              <ExportButton
                filteredVideos={filteredVideos}
                channelName={channelInfo!.title}
              />
            </div>
            
            <MetricsChart videos={filteredVideos} />
            
            <VideoList filteredVideos={filteredVideos} />
          </div>
        )

      case 'error':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
            <ChannelInput
              onAnalyze={handleAnalyze}
              isLoading={false}
              error={error}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col flex-1">
      {renderContent()}
    </div>
  )
}
