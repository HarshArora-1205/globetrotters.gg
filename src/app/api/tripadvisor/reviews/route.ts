import { NextResponse } from 'next/server'
import { ReviewResponse } from '@/types/reviews-search'
// import { reviewResults } from '@/data/review-results'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
  }

  const url = `https://api.content.tripadvisor.com/api/v1/location/${id}/reviews?key=${process.env.TRIPADVISOR_API_KEY}`

  try {
    const response = await fetch(url, {
      headers: { accept: 'application/json' },
    })
    const data: ReviewResponse = await response.json()

    // console.log("reviews: ", data);
        
    // !---- return mock data for test ---->
    // return NextResponse.json(reviewResults);
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching TripAdvisor reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}