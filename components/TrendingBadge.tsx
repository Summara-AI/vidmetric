interface TrendingBadgeProps {
  trendingScore: number
}

export default function TrendingBadge({ trendingScore }: TrendingBadgeProps) {
  if (trendingScore >= 80) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-orange-500 text-white">
        🔥 Hot
      </span>
    )
  }

  if (trendingScore >= 60) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white">
        📈 Trending
      </span>
    )
  }

  if (trendingScore >= 40) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        ⚡ Rising
      </span>
    )
  }

  return null
}
