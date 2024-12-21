import { NextResponse } from 'next/server'
import { LocationData } from '@/types/atractions'
// import { attractions } from '@/data/attractions'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!id || !lat || !lon) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const url = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?category=hotels&language=en&latLong=${lat}%2C${lon}&key=${process.env.TRIPADVISOR_API_KEY}`

  try {
    const response = await fetch(url, {
      headers: { accept: 'application/json' },
    })
    const data: LocationData = await response.json()
    console.log("location: ", data);
        
    // !---- return mock data for test ---->
    // return NextResponse.json(attractions);
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching TripAdvisor hotels details:', error)
    return NextResponse.json({ error: 'Failed to fetch hotels details' }, { status: 500 })
  }
}