'use client'

import ZoomParallax from '@/components/sections/zoom-parallax'
import { useQuery } from '@tanstack/react-query'
// import { Loader2 } from 'lucide-react'
// import Image from 'next/image'
import { LocationDetails } from '@/types/location-details'
// import { PhotoResponse } from '@/types/photos-search'
// import { ReviewResponse } from '@/types/reviews-search'
// import { SearchPhotosResponse } from '@/types/unsplash-results'
// import { WeatherResponse } from '@/types/weather-details'
import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaMagic } from "react-icons/fa";

import Lenis from "@studio-freight/lenis";
import WeatherDisplay from '@/components/common/weather-board'

// import { Button } from '@/components/ui/button'
 
type Params = Promise<{ id: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MagicButton from '@/components/common/hover-button'
import AttractionsList from '@/components/sections/attractions'
import StayList from '@/components/sections/stays'
import RestaurantList from '@/components/sections/restaurants'


const fetchLocationDetails = async (id: string): Promise<LocationDetails> => {
  const response = await fetch(`/api/tripadvisor/details?id=${id}`)
  if (!response.ok) throw new Error('Failed to fetch location details')
  return response.json()
}

// const fetchTripAdvisorPhotos = async (id: string): Promise<PhotoResponse> => {
//   const response = await fetch(`/api/tripadvisor/photos?id=${id}`)
//   if (!response.ok) throw new Error('Failed to fetch TripAdvisor photos')
//   return response.json()
// }

// const fetchTripAdvisorReviews = async (id: string): Promise<ReviewResponse> => {
//   const response = await fetch(`/api/tripadvisor/reviews?id=${id}`)
//   if (!response.ok) throw new Error('Failed to fetch TripAdvisor reviews')
//   return response.json()
// }

// const fetchUnsplashPhotos = async (query: string): Promise<SearchPhotosResponse> => {
//   const response = await fetch(`/api/unsplash/photos?query=${encodeURIComponent(query)}`)
//   if (!response.ok) throw new Error('Failed to fetch Unsplash photos')
//   return response.json()
// }

// const fetchWeatherData = async (lat: string, lon: string): Promise<WeatherResponse> => {
//   const response = await fetch(`/api/weather/latlon?lat=${lat}&lon=${lon}`)
//   if (!response.ok) throw new Error('Failed to fetch weather data')
//   return response.json()
// }

// const fetchCityWeatherData = async (city: string): Promise<WeatherResponse> => {
//   const response = await fetch(`/api/weather/city?city=${city}`)
//   if (!response.ok) throw new Error('Failed to fetch weather data')
//   return response.json()
// }



export default function EscapePage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const router = useRouter()
  const params = use(props.params)
  const searchParams = use(props.searchParams)

  useEffect(() => {
    const lenis = new Lenis();
  
    function raf(time: number) {
      lenis.raf(time);
  
      requestAnimationFrame(raf);
    }
  
    requestAnimationFrame(raf);
  }, []);

  const id = params.id
  const escape = searchParams.escape
  const city = searchParams.city
  console.log(escape)
  console.log(id)
  console.log(city)

  const { data: locationDetails, isLoading: isLoadingDetails, error: locationError } = useQuery<LocationDetails>({
    queryKey: ['locationDetails', id],
    queryFn: () => fetchLocationDetails(id),
  })

  // const { data: tripAdvisorPhotos, isLoading: isLoadingPhotos, error: photosError } = useQuery<PhotoResponse>({
  //   queryKey: ['tripAdvisorPhotos', id],
  //   queryFn: () => fetchTripAdvisorPhotos(id),
  // })

  // const { data: tripAdvisorReviews, isLoading: isLoadingReviews, error: reviewsError } = useQuery<ReviewResponse>({
  //   queryKey: ['tripAdvisorReviews', id],
  //   queryFn: () => fetchTripAdvisorReviews(id),
  // })

  // const { data: unsplashPhotos, isLoading: isLoadingUnsplashPhotos, error: unsplashError } = useQuery<SearchPhotosResponse>({
  //   queryKey: ['unsplashPhotos', escape],
  //   queryFn: () => fetchUnsplashPhotos(String(escape)),
  //   enabled: !!escape,
  // })

  // Fetch weather data only after location details are available
  // const { data: weatherData, isLoading: isLoadingWeather, error: weatherError } = useQuery<WeatherResponse>({
  //   queryKey: ['weather', city],
  //   queryFn: () =>
  //     fetchCityWeatherData(String(city)),
  //   enabled: !!city,
  // })

  // const isLoading =
  //   isLoadingDetails || isLoadingPhotos || isLoadingReviews || isLoadingUnsplashPhotos || isLoadingWeather

  // const hasError =
  //   locationError || photosError || reviewsError || unsplashError || weatherError

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <Loader2 className="animate-spin text-primary" size={48} />
  //     </div>
  //   )
  // }

  // if (hasError || !locationDetails) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <p className="text-red-500">Error loading escape data. Please try again.</p>
  //     </div>
  //   )
  // }

  // const handleCreateItinerary = () => {
  //   router.push(`/wizard?id=${id}&city=${city}&escape=${escape}`)
  // }

  // Handle loading and error states
  if (isLoadingDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (locationError || !locationDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error loading location data. Please try again.</p>
      </div>
    );
  }
  

  return (
    <div className="w-full h-full flex flex-col items-center">
      <ZoomParallax lat={locationDetails.latitude} lon={locationDetails.longitude} escape={ locationDetails.address_obj.city || escape || locationDetails.address_obj.state || locationDetails.address_obj.country} subtext={locationDetails.address_obj.state || locationDetails.address_obj.country}/>
      <section className='w-screen flex gap-2 p-6'>

        <Tabs defaultValue="details" className="w-full">
          <div className="flex items-center">
            <h1 className="text-midnight-blue dark:text-frost-blue font-bold text-lg inline-block mr-16">
              EXPLORE
            </h1>
            <TabsList>
              <TabsTrigger value="details">DETAILS</TabsTrigger>
              <TabsTrigger value="attractions">ATTRACTIONS</TabsTrigger>
              <TabsTrigger value="stays">STAYS</TabsTrigger>
              <TabsTrigger value="restaurants">RESTAURANTS</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent className='w-full' value="details">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4 pt-6">
              <div className="w-full flex flex-col items-start max-w-lg gap-8 text-xl md:w-1/2 ">
                <p>
                  {locationDetails.description}
                </p>
                <MagicButton icon={<FaMagic className="h-4 w-4"/>} arialabel='generate trip' text='Build Itinerary' variant='sunset' onClick={() => {router.push(`/wizard?escape=${escape}`)}}/>
              </div>
              <div className="w-full md:w-1/2 flex justify-center items-center">
                <WeatherDisplay lat={locationDetails.latitude} lon={locationDetails.longitude}/>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="attractions" className='p-4'>
            <h1 className='mb-2 text-midnight-blue font-bold dark:text-frost-blue'>nearby attractions</h1>
            <AttractionsList id={id} lat={locationDetails.latitude} lon={locationDetails.longitude} />
          </TabsContent>
          <TabsContent value="stays" className='p-4'>
            <h1 className='mb-2 text-midnight-blue font-bold dark:text-frost-blue'>nearby hotels</h1>
            <StayList id={id} lat={locationDetails.latitude} lon={locationDetails.longitude} />
          </TabsContent>
          <TabsContent value="restaurants" className='p-4'>
            <h1 className='mb-2 text-midnight-blue font-bold dark:text-frost-blue'>nearby restaurants</h1>
            <RestaurantList id={id} lat={locationDetails.latitude} lon={locationDetails.longitude} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

