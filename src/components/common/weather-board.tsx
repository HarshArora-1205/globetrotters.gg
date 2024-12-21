"use client";

import {
  Cloud,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { WeatherResponse } from "@/types/weather-details";
import { useQuery } from "@tanstack/react-query";

interface Props {
  lat: string;
  lon: string;
}

const fetchWeatherData = async (
  lat: string,
  lon: string,
): Promise<WeatherResponse> => {
  const response = await fetch(`/api/weather/latlon?lat=${lat}&lon=${lon}`);
  if (!response.ok) throw new Error("Failed to fetch weather data");
  return response.json();
};

export default function WeatherDisplay({ lat, lon }: Props) {
  // Convert kelvin to celsius
  const toCelsius = (kelvin: number) => Math.round(kelvin - 273.15);
  const {
    data: weatherData,
    isLoading: isLoadingWeather,
    error: weatherError,
  } = useQuery<WeatherResponse>({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeatherData(lat, lon),
    enabled: !!lat && !!lon,
  });

  // Get weather icon based on condition and time
  const getWeatherIcon = (condition: string, isDay: boolean) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return isDay ? (
          <Sun className="h-16 w-16 text-sunset-gold" />
        ) : (
          <Sun className="h-16 w-16 text-slate-200" />
        );
      case "clouds":
        return <Cloud className="h-16 w-16 text-sunset-gold" />;
      case "rain":
        return <CloudRain className="h-16 w-16 text-sunset-gold" />;
      case "snow":
        return <CloudSnow className="h-16 w-16 text-sunset-gold" />;
      default:
        return <CloudSun className="h-16 w-16 text-sunset-gold" />;
    }
  };


  
  if (isLoadingWeather) {
    return (
      <Card className="w-full max-w-xl bg-gradient-to-br ">
        <CardContent className="space-y-6 p-6">
          <div className="h-6 bg-slate-700 rounded animate-pulse w-1/3"></div>
          <div className="h-16 bg-slate-700 rounded animate-pulse w-2/3"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-6 bg-slate-700 rounded animate-pulse"></div>
            <div className="h-6 bg-slate-700 rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (weatherError) {
    return (
      <Card className="w-full max-w-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <CardContent className="space-y-6 p-6 text-center">
          <p className="text-lg text-red-500">Failed to load weather data.</p>
          <p className="text-sm text-slate-400">
            Please check your internet connection or try again later.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const data = weatherData!;
  console.log("weather: ", data);
  
  
  // Check if current time is between sunrise and sunset
  const isDay = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > data.sys.sunrise && currentTime < data.sys.sunset;
  };
  return (
    <Card className="w-full max-w-lg bg-gradient-to-br tracking-widest from-slate-900 to-slate-800 text-frost-blue">
      <CardContent className="space-y-8 py-6 px-4 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {getWeatherIcon(data.weather[0].main, isDay())}
            <div className="text-5xl font-bold">
              {toCelsius(data.main.temp)}°C
            </div>
          </div>
          <div className="text-xl max-w-[10ch] font-bold uppercase text-sunset-gold">
            {data.weather[0].description}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xl font-bold">
            <span className="text-sunset-gold text-sm ">TODAY&apos;S LOW: </span>
            {toCelsius(data.main.temp_min)}°C
          </div>
          <div className="text-xl font-bold">
            <span className="text-sunset-gold text-sm">TODAY&apos;S HIGH: </span>
            {toCelsius(data.main.temp_max)}°C
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 uppercase">
            <div className="flex items-center gap-2">
              <Sunrise className="text-sunset-gold" />
              <span className="text-sm  font-bold">Sunrise</span>
            </div>
            <div className="text-lg">
              {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div className="space-y-2 uppercase">
            <div className="flex items-center gap-2">
              <Sunset className="text-sunset-gold" />
              <span className="text-sm font-bold">Sunset</span>
            </div>
            <div className="text-lg">
              {new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-sunset-gold">HUMIDITY: </span>
            {data.main.humidity}%
          </div>
          <div>
            <span className="text-sunset-gold">WIND: </span>
            {Math.round(data.wind.speed * 3.6)} km/h
          </div>
          <div>
            <span className="text-sunset-gold">PRESSURE: </span>
            {data.main.pressure} hPa
          </div>
          <div>
            <span className="text-sunset-gold">VISIBILITY: </span>
            {data.visibility / 1000} km
          </div>
        </div>

        <div className="border-t border-slate-700 pt-4">
          <div className="text-lg">
            <span className="text-sunset-gold">LOCATION: </span>
            {data.name}, {data.sys.country}
          </div>
          <div className="text-sm text-slate-400">
            {data.coord.lat}°N, {data.coord.lon}°E
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
