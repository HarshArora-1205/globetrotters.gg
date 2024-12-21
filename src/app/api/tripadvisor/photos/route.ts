import { NextResponse } from 'next/server'
import { PhotoResponse } from '@/types/photos-search'
// import { photoResults } from '@/data/photo-results'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
  }

  const url = `https://api.content.tripadvisor.com/api/v1/location/${id}/photos?language=en&key=${process.env.TRIPADVISOR_API_KEY}`

  try {
    const response = await fetch(url, {
      headers: { accept: 'application/json' },
    })
    const data: PhotoResponse = await response.json()
    // console.log("trip advisor photos: ", data);
        
    // !---- return mock data for test ---->
    // return NextResponse.json(photoResults);
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching TripAdvisor photos:', error)
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 })
  }
}

