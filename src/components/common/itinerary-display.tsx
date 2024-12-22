import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { TripSchema } from "@/schema/ai";

export function ItineraryDisplay({
  itinerary,
  isLoading,
}: {
  itinerary: TripSchema;
  isLoading: boolean;
}) {
  if (!itinerary || isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Itinerary</h2>
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-72" />

        <Accordion type="single" collapsible className="w-full">
          {[...Array(3)].map((_, index) => (
            <AccordionItem key={index} value={`day-${index}`}>
              <AccordionTrigger>
                <Skeleton className="h-6 w-48" />
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Skeleton className="h-6 w-24" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-24 w-full" />
                  </CardContent>
                </Card>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>
                      <Skeleton className="h-6 w-16" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>
                      <Skeleton className="h-6 w-32" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-12 w-full" />
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-24" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>

        <Skeleton className="h-10 w-48" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Itinerary</h2>
      <p className="text-lg">
        Total Estimated Cost: ${itinerary.totalEstimatedCost.toFixed(2)}
      </p>
      <p className="text-lg">Duration: {itinerary.duration} days</p>
      <p className="text-lg">
        Travel Dates: {itinerary.travelDates.startDate} to{" "}
        {itinerary.travelDates.endDate}
      </p>
      {itinerary.preferredCategory && (
        <p className="text-lg">
          Preferred Category: {itinerary.preferredCategory}
        </p>
      )}

      <Accordion type="single" collapsible className="w-full">
        {itinerary.days.map((day, index) => (
          <AccordionItem key={index} value={`day-${index}`}>
            <AccordionTrigger>
              Day {index + 1}: {day.date}
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5">
                    {day.activities.map((activity, actIndex) => (
                      <li key={actIndex}>
                        <strong>{activity.name}</strong>: {activity.description}
                        {activity.estimatedCost &&
                          ` ($${activity.estimatedCost.toFixed(2)})`}
                        <br />
                        <small>
                          Coordinates: {activity.coordinates.latitude},{" "}
                          {activity.coordinates.longitude}
                        </small>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Meals</CardTitle>
                </CardHeader>
                <CardContent>
                  {day.meals.map((meal, mealIndex) => (
                    <div key={mealIndex} className="mb-2">
                      <strong>{meal.type}:</strong> {meal.suggestion} ($
                      {meal.estimatedCost.toFixed(2)})
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Accommodation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    {day.accommodation.name} ($
                    {day.accommodation.estimatedCost.toFixed(2)})
                  </p>
                  <small>
                    Coordinates: {day.accommodation.coordinates.latitude},{" "}
                    {day.accommodation.coordinates.longitude}
                  </small>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Places</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {itinerary.recommendedPlaces.map((place, index) => (
              <li key={index}>
                <strong>{place.name}</strong> - {place.category}
                <br />
                {place.description}
                <br />
                Best Time to Visit: {place.bestTimeToVisit}
                <br />
                Estimated Cost: ${place.estimatedCost.toFixed(2)}
                <br />
                Distance: {place.distanceFromCurrentLocation} km/miles
                <br />
                Coordinates: {place.coordinates.latitude},{" "}
                {place.coordinates.longitude}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Must-Try Foods</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {itinerary.mustTryFoods.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Travel Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {itinerary.travelTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Button onClick={() => window.print()} className="mt-4">
        Download Itinerary
      </Button>
    </div>
  );
}
