'use client'

import { useState } from 'react'
import { VideoMetrics } from '@/types/youtube'
import { Download, CheckCircle } from 'lucide-react'
import { formatDate, formatDuration } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ExportButtonProps {
  filteredVideos: VideoMetrics[]
  channelName: string
}

export default function ExportButton({ filteredVideos, channelName }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exported, setExported] = useState(false)

  const exportToCSV = () => {
    setIsExporting(true)

    try {
      // Prepare CSV data
      const headers = [
        'Title',
        'Views',
        'Likes', 
        'Comments',
        'Engagement Rate',
        'Trending Score',
        'Published Date',
        'Duration',
        'URL'
      ]

      const csvData = filteredVideos.map(video => [
        `"${video.title.replace(/"/g, '""')}"`, // Escape quotes in title
        video.viewCount.toString(),
        video.likeCount.toString(),
        video.commentCount.toString(),
        video.engagementRate.toString() + '%',
        video.trendingScore.toString(),
        formatDate(video.publishedAt),
        formatDuration(video.duration),
        video.url
      ])

      // Create CSV content
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => row.join(','))
      ].join('\n')

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      // Sanitize channel name for filename
      const sanitizedName = channelName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
      const date = new Date().toISOString().split('T')[0]
      const filename = `vidmetric-export-${sanitizedName}-${date}.csv`
      
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Show success state
      setExported(true)
      setTimeout(() => setExported(false), 2000)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      onClick={exportToCSV}
      disabled={isExporting || filteredVideos.length === 0}
      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white min-h-[44px]"
    >
      {exported ? (
        <>
          <CheckCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Exported!</span>
          <span className="sm:hidden">Exported</span>
        </>
      ) : isExporting ? (
        <>
          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span className="hidden sm:inline">Exporting...</span>
          <span className="sm:hidden">Exporting</span>
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export CSV</span>
          <span className="sm:hidden">Export</span>
        </>
      )}
    </Button>
  )
}
