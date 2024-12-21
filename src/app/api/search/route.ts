// import { searchresults } from '@/data/results';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  
  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=${encodeURIComponent(query)}&language=en&key=${process.env.TRIPADVISOR_API_KEY}`,
      {
        headers: {
          'accept': 'application/json',
        }
      }
    );
    // !---- return mock data for test ---->
    // return NextResponse.json(searchresults);
    if (!response.ok) {
      throw new Error('TripAdvisor API request failed');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}