'use client'

import { useQuery } from '@tanstack/react-query'
import { LocationData, Location } from '@/types/atractions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface StayListProps {
  id: string
  lat: string
  lon: string
}

const fetchTripAdvisorStays = async (id: string, lat: string, lon: string): Promise<LocationData> => {
  const response = await fetch(`/api/tripadvisor/stays?id=${id}&lat=${lat}&lon=${lon}`)
  if (!response.ok) throw new Error('Failed to fetch TripAdvisor stays')
  return response.json()
}

export default function StayList({ id, lat, lon }: StayListProps) {
  const { data, isLoading, error } = useQuery<LocationData>({
    queryKey: ['stays', id, lat, lon],
    queryFn: () => fetchTripAdvisorStays(id, lat, lon),
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

  if (error) return <div>Error loading stays</div>
  if (!data || data.data.length === 0) return <div>No stays found</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.data.map((stay: Location) => (
        <Card key={stay.location_id} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{stay.name}</CardTitle>
            <CardDescription>{stay.distance}km away</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{stay.address_obj.address_string}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
