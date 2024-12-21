import { NextResponse } from 'next/server'
import { LocationDetailsResponse } from '@/types/location-details'
// import { locationDetails } from '@/data/location-details'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!id || !lat || !lon) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const url = `https://api.content.tripadvisor.com/api/v1/location/${id}/nearby_search?category=attractions&language=en&latLong=${lat}%2C${lon}&key=${process.env.TRIPADVISOR_API_KEY}`

  try {
    const response = await fetch(url, {
      headers: { accept: 'application/json' },
    })
    const data: LocationDetailsResponse = await response.json()
    // console.log("location: ", data);
        
    // !---- return mock data for test ---->
    // return NextResponse.json(locationDetails);
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching TripAdvisor location details:', error)
    return NextResponse.json({ error: 'Failed to fetch location details' }, { status: 500 })
  }
}