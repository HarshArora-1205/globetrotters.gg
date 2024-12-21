import { NextResponse } from 'next/server'
import { LocationData } from '@/types/atractions'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!id || !lat || !lon) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  const apiKey = process.env.TRIPADVISOR_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'TripAdvisor API key not configured' }, { status: 500 })
  }

  const url = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?category=restaurants&latLong=${lat},${lon}&key=${apiKey}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`TripAdvisor API responded with status: ${response.status}`)
    }
    const data: LocationData = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching TripAdvisor restaurants:', error)
    return NextResponse.json({ error: 'Failed to fetch restaurants data' }, { status: 500 })
  }
}

