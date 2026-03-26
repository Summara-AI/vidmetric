import { NextRequest, NextResponse } from 'next/server'
import { extractChannelIdentifier, fetchChannelInfo } from '@/lib/youtube'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL parameter is required' },
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

    const identifier = extractChannelIdentifier(url)
    const channelData = await fetchChannelInfo(apiKey, identifier)

    return NextResponse.json({
      success: true,
      data: channelData
    })
  } catch (error) {
    console.error('Channel API Error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    const statusCode = errorMessage.includes('not found') ? 404 : 
                      errorMessage.includes('Invalid YouTube URL') ? 400 : 500

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: statusCode }
    )
  }
}
