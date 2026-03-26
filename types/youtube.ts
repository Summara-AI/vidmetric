export interface ChannelInfo {
  id: string
  title: string
  description: string
  thumbnail: string
  subscriberCount: string
  videoCount: string
  viewCount: string
  customUrl: string
  publishedAt: string
  country: string
  bannerUrl?: string
}

export interface VideoMetrics {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  viewCount: number
  likeCount: number
  commentCount: number
  duration: string
  durationSeconds: number
  engagementRate: number
  trendingScore: number
  tags: string[]
  description: string
  url: string
}

export interface AnalyticsData {
  channel: ChannelInfo
  videos: VideoMetrics[]
  fetchedAt: string
}
