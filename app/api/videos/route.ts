import { NextRequest, NextResponse } from 'next/server'
import { fetchChannelVideos } from '@/lib/youtube'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const channelId = searchParams.get('channelId')
    const maxResults = searchParams.get('maxResults')

    if (!channelId) {
      return NextResponse.json(
        { success: false, error: 'channelId parameter is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.YOUTUBE_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'YouTube API key not configured' },
        { status: 500 }
      )
    }

    const maxResultsNum = maxResults ? parseInt(maxResults, 10) : 30
    
    if (isNaN(maxResultsNum) || maxResultsNum < 1 || maxResultsNum > 50) {
      return NextResponse.json(
        { success: false, error: 'maxResults must be a number between 1 and 50' },
        { status: 400 }
      )
    }

    const videosData = await fetchChannelVideos(apiKey, channelId, maxResultsNum)

    return NextResponse.json({
      success: true,
      data: videosData,
      fetchedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Videos API Error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    const statusCode = errorMessage.includes('not found') ? 404 : 
                      errorMessage.includes('quota') ? 429 : 500

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: statusCode }
    )
  }
}
