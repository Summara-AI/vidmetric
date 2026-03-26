'use client'

import { useState, useEffect, useMemo } from 'react'
import { VideoMetrics } from '@/types/youtube'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'
import { daysAgo } from '@/lib/utils'

interface FilterBarProps {
  videos: VideoMetrics[]
  onFilteredVideos: (filtered: VideoMetrics[]) => void
}

type SortOption = 'mostViewed' | 'mostLiked' | 'mostCommented' | 'highestEngagement' | 'trendingScore' | 'newestFirst' | 'oldestFirst'
type DateFilter = 'allTime' | 'thisMonth' | 'last3Months' | 'last6Months' | 'thisYear'

const sortOptions = [
  { value: 'mostViewed', label: 'Most Viewed' },
  { value: 'mostLiked', label: 'Most Liked' },
  { value: 'mostCommented', label: 'Most Commented' },
  { value: 'highestEngagement', label: 'Highest Engagement' },
  { value: 'trendingScore', label: 'Trending Score' },
  { value: 'newestFirst', label: 'Newest First' },
  { value: 'oldestFirst', label: 'Oldest First' }
]

const dateFilterOptions = [
  { value: 'allTime', label: 'All Time' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'last3Months', label: 'Last 3 Months' },
  { value: 'last6Months', label: 'Last 6 Months' },
  { value: 'thisYear', label: 'This Year' }
]

export default function FilterBar({ videos, onFilteredVideos }: FilterBarProps) {
  const [sortBy, setSortBy] = useState<SortOption>('trendingScore')
  const [dateFilter, setDateFilter] = useState<DateFilter>('allTime')
  const [searchQuery, setSearchQuery] = useState('')

  const filterAndSortVideos = useMemo(() => {
    let filtered = [...videos]

    // Apply date filter
    if (dateFilter !== 'allTime') {
      const now = new Date()
      const cutoffDate = new Date()

      switch (dateFilter) {
        case 'thisMonth':
          cutoffDate.setMonth(now.getMonth() - 1)
          break
        case 'last3Months':
          cutoffDate.setMonth(now.getMonth() - 3)
          break
        case 'last6Months':
          cutoffDate.setMonth(now.getMonth() - 6)
          break
        case 'thisYear':
          cutoffDate.setFullYear(now.getFullYear() - 1)
          break
      }

      filtered = filtered.filter(video => new Date(video.publishedAt) >= cutoffDate)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'mostViewed':
          return b.viewCount - a.viewCount
        case 'mostLiked':
          return b.likeCount - a.likeCount
        case 'mostCommented':
          return b.commentCount - a.commentCount
        case 'highestEngagement':
          return b.engagementRate - a.engagementRate
        case 'trendingScore':
          return b.trendingScore - a.trendingScore
        case 'newestFirst':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        case 'oldestFirst':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [videos, sortBy, dateFilter, searchQuery])

  useEffect(() => {
    onFilteredVideos(filterAndSortVideos)
  }, [filterAndSortVideos])

  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Sort Dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Sort by</label>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-full sm:w-48 bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Filter */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Date range</label>
            <Select value={dateFilter} onValueChange={(value) => setDateFilter(value as DateFilter)}>
              <SelectTrigger className="w-full sm:w-40 bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateFilterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="flex flex-col space-y-2 flex-1">
            <label className="text-sm font-medium text-muted-foreground">Search videos</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>
        </div>

        {/* Video Count Badge */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
          <Filter className="h-4 w-4" />
          <span>Showing {filterAndSortVideos.length} of {videos.length} videos</span>
        </div>
      </div>
    </div>
  )
}
