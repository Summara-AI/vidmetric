import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number): string {
  if (n >= 1000000) {
    return (n / 1000000).toFixed(1) + 'M'
  }
  if (n >= 1000) {
    return (n / 1000).toFixed(1) + 'K'
  }
  return n.toString()
}

export function formatDuration(iso: string): string {
  const match = iso.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  if (!match) return '0:00'
  
  const hours = parseInt(match[1]?.replace('H', '') || '0')
  const minutes = parseInt(match[2]?.replace('M', '') || '0')
  const seconds = parseInt(match[3]?.replace('S', '') || '0')
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

export function daysAgo(iso: string): number {
  const date = new Date(iso)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function calculateEngagementRate(views: number, likes: number, comments: number): number {
  if (views === 0) return 0
  const engagement = ((likes + comments) / views) * 100
  return Math.round(engagement * 100) / 100
}

export function calculateTrendingScore(views: number, daysOld: number, likes: number): number {
  if (daysOld === 0) daysOld = 1
  const viewsPerDay = views / daysOld
  const recencyWeight = Math.max(0.1, 1 - (daysOld / 365))
  const likeRatio = likes / Math.max(1, views)
  const score = (viewsPerDay * recencyWeight * 0.7 + likeRatio * 100 * 0.3)
  return Math.min(100, Math.max(0, Math.round(score)))
}
