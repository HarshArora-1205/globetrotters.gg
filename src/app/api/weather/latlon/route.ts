import { NextResponse } from 'next/server'
// import { WeatherResponse } from '@/types/weather-details'
import { weatherResults } from '@/data/weather-details'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat or lon parameters' }, { status: 400 })
  }

  // const url = `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lon}`
  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY || ''}`

  try {
    // const response = await fetch(url, {
    //   headers: {
    //     'x-rapidapi-key': process.env.WEATHER_API_KEY || '',
    //     'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
    //   },
    // })

    // const response = await fetch(url);
    
    // const data: WeatherResponse = await response.json()
    
    // console.log("weather: ", data);
    
    // !---- return mock data for test ---->
    return NextResponse.json(weatherResults);
    // return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 })
  }
}