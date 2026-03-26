'use client'

import { VideoMetrics } from '@/types/youtube'
import { formatNumber } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, Heart } from 'lucide-react'

interface MetricsChartProps {
  videos: VideoMetrics[]
}

export default function MetricsChart({ videos }: MetricsChartProps) {
  // Prepare data for views chart (top 10 by views)
  const viewsData = videos
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 10)
    .map(video => ({
      name: video.title.length > 15 ? video.title.substring(0, 15) + '...' : video.title,
      views: Number(video.viewCount),
      likes: Number(video.likeCount),
      comments: Number(video.commentCount),
      engagement: Number(video.engagementRate),
      fullTitle: video.title
    }))

  // Prepare data for engagement chart (top 10 by engagement rate)
  const engagementData = videos
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, 10)
    .map(video => ({
      name: video.title.length > 15 ? video.title.substring(0, 15) + '...' : video.title,
      views: Number(video.viewCount),
      likes: Number(video.likeCount),
      comments: Number(video.commentCount),
      engagement: Number(video.engagementRate),
      fullTitle: video.title
    }))

  // Custom tooltip for views chart
  const ViewsTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="glass p-3 rounded-lg border border-border/50">
          <p className="font-semibold text-white text-sm mb-2">{data.fullTitle}</p>
          <div className="space-y-1 text-xs">
            <p className="text-muted-foreground">
              Views: <span className="text-white font-medium">{formatNumber(data.views)}</span>
            </p>
            <p className="text-muted-foreground">
              Likes: <span className="text-white font-medium">{formatNumber(data.likes)}</span>
            </p>
            <p className="text-muted-foreground">
              Comments: <span className="text-white font-medium">{formatNumber(data.comments)}</span>
            </p>
            <p className="text-muted-foreground">
              Engagement: <span className="text-white font-medium">{data.engagement}%</span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  // Custom tooltip for engagement chart
  const EngagementTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="glass p-3 rounded-lg border border-border/50">
          <p className="font-semibold text-white text-sm mb-2">{data.fullTitle}</p>
          <div className="space-y-1 text-xs">
            <p className="text-muted-foreground">
              Engagement Rate: <span className="text-white font-medium">{data.engagement}%</span>
            </p>
            <p className="text-muted-foreground">
              Views: <span className="text-white font-medium">{formatNumber(data.views)}</span>
            </p>
            <p className="text-muted-foreground">
              Likes: <span className="text-white font-medium">{formatNumber(data.likes)}</span>
            </p>
            <p className="text-muted-foreground">
              Comments: <span className="text-white font-medium">{formatNumber(data.comments)}</span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  if (videos.length === 0) {
    return null
  }

  return (
    <div className="glass rounded-xl p-6 space-y-6" style={{ minHeight: '500px' }}>
      <div className="flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-white">Performance Analytics</h2>
      </div>

      <Tabs defaultValue="views" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50 border border-border/50">
          <TabsTrigger value="views" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Views Overview
          </TabsTrigger>
          <TabsTrigger value="engagement" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Engagement Rate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="views" className="space-y-4">
          <div style={{ minHeight: '400px' }} className="overflow-x-auto">
            <div className="min-w-[600px] h-full">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart 
                  data={viewsData} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2E" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94A3B8"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="#94A3B8"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => formatNumber(value)}
                  />
                  <Tooltip content={<ViewsTooltip />} />
                  <Bar 
                    dataKey="views" 
                    fill="#3B82F6"
                    radius={[8, 8, 0, 0]}
                    minPointSize={3}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div style={{ minHeight: '400px' }} className="overflow-x-auto">
            <div className="min-w-[600px] h-full">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart 
                  data={engagementData} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2E" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94A3B8"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="#94A3B8"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<EngagementTooltip />} />
                  <Bar 
                    dataKey="engagement" 
                    fill="url(#engagementGradient)"
                    radius={[8, 8, 0, 0]}
                    minPointSize={3}
                  />
                  <defs>
                    <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
