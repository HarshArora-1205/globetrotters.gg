import { NextResponse } from "next/server";
import { openai } from '@ai-sdk/openai';
import { generateObject } from "ai";
import { auth } from "@/auth";
import {prisma} from "@/lib/db";
import { tripSchema } from "@/schema/ai";

export const maxDuration = 120

const modelName = "gpt-4o-2024-08-06"
export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user || user.availableCredits <= 0) {
    return new NextResponse("Insufficient credits", { status: 402 });
  }

  const values = await req.json();
  const { destination, dateRange, budget, numberOfPeople, travelerType, interests, accommodationType, travelMode, dietaryRestrictions, fitnessLevel, paceOfTravel } = values
  const prompt = `Generate a detailed itinerary for a trip to ${destination} with the following preferences:
  - Date Range: ${dateRange.from} to ${dateRange.to}
  - Budget: ${budget} US Dollars
  - Number of People: ${numberOfPeople}
  - Traveler Type: ${travelerType}
  - Interests: ${interests}
  - Accommodation Type: ${accommodationType}
  - Travel Mode: ${travelMode}
  - Dietary Restrictions: ${dietaryRestrictions}
  - Fitness Level: ${fitnessLevel}
  - Pace of Travel: ${paceOfTravel}
  Provide a day-by-day itinerary with activities, recommended restaurants, and points of interest. Include estimated costs for activities and meals. Also, provide a list of must-try local foods and travel tips specific to the destination.
  
  For each activity, accommodation, and recommended place, please include its geographical coordinates (latitude and longitude) so they can be marked on a map.
  
  See all the budget is in dollars, so based on the location you need to convert the expense there to reflect overall estimated costs in budget.
  You need to focus very much on budget. Budget is in USD unit so the result generated should be estimated around that only.`;
  
  
  const { object } = await generateObject({
    model: openai(modelName),
    schema: tripSchema,
    prompt: prompt
    
  })

  console.log("received: ", values);
  console.log("here is object: ", object);
  
  // Update user's available credits
  await prisma.user.update({
    where: { id: session.user.id },
    data: { availableCredits: { decrement: 1 } },
  });

  return NextResponse.json(object);
}

