import { ChannelInfo, VideoMetrics } from '@/types/youtube'
import { calculateEngagementRate, calculateTrendingScore, daysAgo } from './utils'

export interface ChannelIdentifier {
  type: 'handle' | 'id' | 'custom'
  value: string
}

export function extractChannelIdentifier(url: string): ChannelIdentifier {
  const cleanUrl = url.replace(/^https?:\/\/(www\.)?youtube\.com\//, '')
  
  if (cleanUrl.startsWith('@')) {
    return { type: 'handle', value: cleanUrl.substring(1) }
  }
  
  if (cleanUrl.startsWith('channel/')) {
    return { type: 'id', value: cleanUrl.replace('channel/', '').split('/')[0] }
  }
  
  if (cleanUrl.startsWith('c/')) {
    return { type: 'custom', value: cleanUrl.replace('c/', '').split('/')[0] }
  }
  
  if (cleanUrl.startsWith('user/')) {
    return { type: 'custom', value: cleanUrl.replace('user/', '').split('/')[0] }
  }
  
  throw new Error(`Invalid YouTube URL format: ${url}`)
}

export async function fetchChannelInfo(apiKey: string, identifier: ChannelIdentifier): Promise<ChannelInfo> {
  try {
    let apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&key=${apiKey}`
    
    if (identifier.type === 'handle') {
      apiUrl += `&forHandle=${identifier.value}`
    } else if (identifier.type === 'id') {
      apiUrl += `&id=${identifier.value}`
    } else if (identifier.type === 'custom') {
      apiUrl += `&forUsername=${identifier.value}`
    }
    
    const response = await fetch(apiUrl)
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`YouTube API Error: ${errorData.error?.message || response.statusText}`)
    }
    
    const data = await response.json()
    
    if (!data.items || data.items.length === 0) {
      throw new Error(`Channel not found for ${identifier.type}: ${identifier.value}`)
    }
    
    const channel = data.items[0]
    const snippet = channel.snippet
    const statistics = channel.statistics
    const brandingSettings = channel.brandingSettings
    
    return {
      id: channel.id,
      title: snippet.title,
      description: snippet.description,
      thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default?.url || '',
      subscriberCount: statistics.subscriberCount || '0',
      videoCount: statistics.videoCount || '0',
      viewCount: statistics.viewCount || '0',
      customUrl: snippet.customUrl || '',
      publishedAt: snippet.publishedAt,
      country: snippet.country || '',
      bannerUrl: brandingSettings?.image?.bannerExternalUrl
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch channel info: ${error.message}`)
    }
    throw new Error('Failed to fetch channel info: Unknown error')
  }
}

export async function fetchChannelVideos(apiKey: string, channelId: string, maxResults: number = 30): Promise<VideoMetrics[]> {
  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`
    
    const searchResponse = await fetch(searchUrl)
    
    if (!searchResponse.ok) {
      const errorData = await searchResponse.json()
      throw new Error(`YouTube API Search Error: ${errorData.error?.message || searchResponse.statusText}`)
    }
    
    const searchData = await searchResponse.json()
    
    if (!searchData.items || searchData.items.length === 0) {
      return []
    }
    
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',')
    
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`
    
    const videosResponse = await fetch(videosUrl)
    
    if (!videosResponse.ok) {
      const errorData = await videosResponse.json()
      throw new Error(`YouTube API Videos Error: ${errorData.error?.message || videosResponse.statusText}`)
    }
    
    const videosData = await videosResponse.json()
    
    return videosData.items.map((item: any): VideoMetrics => {
      const snippet = item.snippet
      const statistics = item.statistics
      const contentDetails = item.contentDetails
      
      const viewCount = parseInt(statistics.viewCount || '0')
      const likeCount = parseInt(statistics.likeCount || '0')
      const commentCount = parseInt(statistics.commentCount || '0')
      const publishedAt = snippet.publishedAt
      const daysOld = daysAgo(publishedAt)
      
      return {
        id: item.id,
        title: snippet.title,
        thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default?.url || '',
        publishedAt,
        viewCount,
        likeCount,
        commentCount,
        duration: contentDetails.duration,
        durationSeconds: parseDurationToSeconds(contentDetails.duration),
        engagementRate: calculateEngagementRate(viewCount, likeCount, commentCount),
        trendingScore: calculateTrendingScore(viewCount, daysOld, likeCount),
        tags: snippet.tags || [],
        description: snippet.description,
        url: `https://www.youtube.com/watch?v=${item.id}`
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch channel videos: ${error.message}`)
    }
    throw new Error('Failed to fetch channel videos: Unknown error')
  }
}

function parseDurationToSeconds(isoDuration: string): number {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  if (!match) return 0
  
  const hours = parseInt(match[1]?.replace('H', '') || '0')
  const minutes = parseInt(match[2]?.replace('M', '') || '0')
  const seconds = parseInt(match[3]?.replace('S', '') || '0')
  
  return hours * 3600 + minutes * 60 + seconds
}
