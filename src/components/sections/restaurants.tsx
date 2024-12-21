'use client'

import { useQuery } from '@tanstack/react-query'
import { LocationData, Location } from '@/types/atractions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface RestaurantListProps {
  id: string
  lat: string
  lon: string
}

const fetchTripAdvisorRestaurants = async (id: string, lat: string, lon: string): Promise<LocationData> => {
  const response = await fetch(`/api/tripadvisor/restaurants?id=${id}&lat=${lat}&lon=${lon}`)
  if (!response.ok) throw new Error('Failed to fetch TripAdvisor restaurants')
  return response.json()
}

export default function RestaurantList({ id, lat, lon }: RestaurantListProps) {
  const { data, isLoading, error } = useQuery<LocationData>({
    queryKey: ['restaurants', id, lat, lon],
    queryFn: () => fetchTripAdvisorRestaurants(id, lat, lon),
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) return <div>Error loading restaurants</div>
  if (!data || data.data.length === 0) return <div>No restaurants found</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.data.map((restaurant: Location) => (
        <Card key={restaurant.location_id} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{restaurant.name}</CardTitle>
            <CardDescription>{restaurant.distance}km away</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{restaurant.address_obj.address_string}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

