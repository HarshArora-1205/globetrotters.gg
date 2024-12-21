import { z } from "zod";

export const formSchema = z.object({
  destination: z.string(),
  dateRange: z.object({
    from: z.date(), 
    to: z.date(),   
  }),
  budget: z.number().min(0),
  numberOfPeople: z.number().min(1),
  travelerType: z.enum(["solo", "couple", "family", "friends"]),
  interests: z.string(),
  accommodationType: z.enum([
    "hostel",
    "hotel",
    "zostel",
    "bungalow",
    "villa",
    "resort",
  ]),
  travelMode: z.enum([
    "localTransport",
    "bikeRental",
    "carRental",
    "ownVehicle",
  ]),
  // ageRange: z.tuple([z.number(), z.number()]),
  dietaryRestrictions: z.enum([
    "vegan",
    "vegetarian",
    "eggetarian",
    "nonVegetarian",
    "lactoseIntolerant",
    "glutenFree",
    "jain",
  ]),
  fitnessLevel: z.enum(["sedentary", "moderate", "fit", "veryFit"]),
  paceOfTravel: z.enum(["relaxed", "medium", "fast"]),
});