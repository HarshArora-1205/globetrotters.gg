import { z } from "zod";

// Define the schema for coordinates
const coordinatesSchema = z.object({
  latitude: z.number().describe("Latitude of the location"),
  longitude: z.number().describe("Longitude of the location"),
});

// Define the schema for a recommended place
export const recommendedPlaceSchema = z.object({
  name: z
    .string()
    .describe("The name of the recommended place (e.g., tourist spot, park)."),
  description: z
    .string()
    .describe(
      "A short description of the place (e.g., famous for scenic views).",
    ),
  estimatedCost: z
    .number()
    .describe("The estimated cost to visit the place (in local currency)."),
  category: z
    .string()
    .describe(
      "Category of the place (e.g., adventure, cultural, natural, historical).",
    ),
  bestTimeToVisit: z
    .string()
    .describe(
      "Recommended time to visit the place (e.g., winter, rainy season, festival time).",
    ),
  distanceFromCurrentLocation: z
    .number()
    .describe("Distance from the current location (in kilometers or miles)."),
  coordinates: coordinatesSchema.describe("The geographical coordinates of the place."),
});

// Define the main trip schema with added recommendation parameters
export const tripSchema = z.object({
  days: z.array(
    z.object({
      date: z
        .string()
        .describe('The date of the day in the itinerary (e.g., "2024-12-21").'),
      activities: z
        .array(z.object({
          name: z.string().describe("The name of the activity."),
          description: z.string().describe("A brief description of the activity."),
          estimatedCost: z.number().optional().describe("The estimated cost of the activity (if applicable)."),
          coordinates: coordinatesSchema.describe("The geographical coordinates of the activity location."),
        }))
        .describe("A list of activities planned for the day with their locations."),
      meals: z.array(
        z.object({
          type: z
            .string()
            .describe("The type of meal (e.g., breakfast, lunch, dinner)."),
          suggestion: z
            .string()
            .describe(
              "A recommended dish or meal for the day (e.g., local curry).",
            ),
          estimatedCost: z
            .number()
            .describe(
              "The estimated cost of the meal (in the local currency).",
            ),
        }),
      ),
      accommodation: z.object({
        name: z
          .string()
          .describe("The name of the accommodation (e.g., hotel, guesthouse)."),
        estimatedCost: z
          .number()
          .describe(
            "The estimated cost for the accommodation per night (in the local currency).",
          ),
        coordinates: coordinatesSchema.describe("The geographical coordinates of the accommodation."),
      }),
    }),
  ),
  mustTryFoods: z
    .array(z.string())
    .describe(
      "A list of foods to try during the trip (e.g., butter chicken, samosa).",
    ),
  travelTips: z
    .array(z.string())
    .describe(
      "A list of useful travel tips for the trip (e.g., carry a power bank).",
    ),
  totalEstimatedCost: z
    .number()
    .describe(
      "The total estimated cost of the entire trip (in the local currency).",
    ),
  recommendedPlaces: z
    .array(recommendedPlaceSchema)
    .describe("Suggested places based on budget, duration, and preferences."),
  duration: z
    .number()
    .describe("The duration of the trip in days (e.g., 7 days)."),
  budget: z
    .number()
    .describe("The total budget for the trip (in local currency)."),
  preferredCategory: z
    .string()
    .optional()
    .describe(
      "Preferred category of places (e.g., adventure, nature, cultural).",
    ),
  travelDates: z
    .object({
      startDate: z
        .string()
        .describe('The start date of the trip (e.g., "2024-12-21").'),
      endDate: z
        .string()
        .describe('The end date of the trip (e.g., "2024-12-28").'),
    })
    .describe("The start and end dates of the trip."),
});

export type TripSchema = z.infer<typeof tripSchema>;

