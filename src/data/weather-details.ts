import { WeatherResponse } from "@/types/weather-details";

export const weatherResults: WeatherResponse = {
  coord: { lon: 77.5885, lat: 12.9625 },
  weather: [{ id: 701, main: "Mist", description: "mist", icon: "50n" }],
  base: "stations",
  main: {
    temp: 293.28,
    feels_like: 293.67,
    temp_min: 292.97,
    temp_max: 293.87,
    pressure: 1010,
    humidity: 89,
    sea_level: 1010,
    grnd_level: 914,
  },
  visibility: 4000,
  wind: { speed: 1.03, deg: 0 },
  clouds: { all: 20 },
  dt: 1734728440,
  sys: {
    type: 2,
    id: 2094842,
    country: "IN",
    sunrise: 1734743216,
    sunset: 1734784115,
  },
  timezone: 19800,
  id: 1277333,
  name: "Bengaluru",
  cod: 200,
};
