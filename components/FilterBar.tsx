'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
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
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Reset date filter and search query when videos change (new channel analyzed)
  useEffect(() => {
    if (dateFilter !== 'allTime') {
      setDateFilter('allTime')
    }
    setSearchTerm('')
  }, [videos])

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
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(query)
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
  }, [videos, sortBy, dateFilter, searchTerm])

  // Generate suggestions for autocomplete
  const suggestions = useMemo(() => {
    if (searchTerm.length < 2) return []
    
    return videos
      .filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 6)
      .map(video => ({
        title: video.title,
        thumbnail: video.thumbnail,
        id: video.id
      }))
  }, [videos, searchTerm])

  // Handle click outside to hide suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Show/hide suggestions based on search term
  useEffect(() => {
    setShowSuggestions(searchTerm.length >= 2)
  }, [searchTerm])

  // Handle suggestion click
  const handleSuggestionClick = (title: string) => {
    setSearchTerm(title)
    setShowSuggestions(false)
  }

  // Highlight matching text in suggestions
  const highlightMatch = (text: string, match: string) => {
    const regex = new RegExp(`(${match})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, index) => 
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    )
  }

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
            <div className="relative" ref={searchInputRef}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
                onFocus={() => setShowSuggestions(searchTerm.length >= 2)}
              />
              
              {/* Autocomplete Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div 
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg shadow-lg z-50 animate-in fade-in-0 slide-in-from-top-2"
                >
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion.title)}
                      className="flex items-center gap-3 p-3 hover:bg-[#2a2a3e] cursor-pointer transition-colors"
                    >
                      <img 
                        src={suggestion.thumbnail} 
                        alt={suggestion.title}
                        className="w-10 h-10 rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white truncate">
                          {highlightMatch(suggestion.title, searchTerm)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
