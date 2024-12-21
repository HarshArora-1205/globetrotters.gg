export const defaultTripValues = {
  days: [
    {
      date: new Date().toISOString().split('T')[0], // today's date
      activities: ["Sightseeing", "Relaxing"],
      meals: [
        { type: "Breakfast", suggestion: "Pancakes", estimatedCost: 5 },
        { type: "Lunch", suggestion: "Local curry", estimatedCost: 15 },
        { type: "Dinner", suggestion: "Pasta", estimatedCost: 20 },
      ],
      accommodation: { name: "Hotel XYZ", estimatedCost: 100 },
    },
  ],
  mustTryFoods: ["Butter chicken", "Samosa", "Dosa"],
  travelTips: ["Carry a power bank", "Stay hydrated", "Book tickets in advance"],
  totalEstimatedCost: 500,
  recommendedPlaces: [
    {
      name: "Beach Resort",
      description: "A beautiful beachfront resort.",
      estimatedCost: 150,
      category: "Resort",
      bestTimeToVisit: "Winter",
      distanceFromCurrentLocation: 10,
    },
    {
      name: "Mountain Retreat",
      description: "A peaceful retreat in the mountains.",
      estimatedCost: 100,
      category: "Adventure",
      bestTimeToVisit: "Summer",
      distanceFromCurrentLocation: 50,
    },
  ],
  duration: 7,
  budget: 1000,
  preferredCategory: "Nature",
  travelDates: {
    startDate: new Date().toISOString().split('T')[0], // today's date
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], // 7 days later
  },
};