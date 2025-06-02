import { useState } from "react";
import InputTabs from "./InputTabs";
import WeatherCard from "./WeatherCard";
import type { WeatherData } from "../types/weather";

export default function WeatherDisplay() {
  const dummyWeatherData: WeatherData = {
    lat: 40.7128,
    lon: -74.006,
    timezone: "America/New_York",
    timezone_offset: -14400,
    current: {
      dt: 1717332000,
      temp: 75.2,
      feels_like: 76.5,
      pressure: 1012,
      humidity: 60,
      dew_point: 60.2,
      uvi: 5.1,
      clouds: 1,
      visibility: 10000,
      wind_speed: 4.61,
      wind_deg: 240,
      wind_gust: 7.2,
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      ],
    },
  };
  const [mode, setMode] = useState<"city" | "coords" | "location">("city");
  const [weather, setWeather] = useState<WeatherData>(dummyWeatherData);
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCoordsSubmit = () => {};

  const handleCitySubmit = () => {};

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br from-sky-300 to-blue-500 flex flex-col items-center justify-center px-4 py-12`}
    >
      <InputTabs
        mode={mode}
        setMode={setMode}
        city={city}
        setCity={setCity}
        lat={lat}
        lon={lon}
        setLat={setLat}
        setLon={setLon}
        onCitySubmit={handleCitySubmit}
        onCoordsSubmit={handleCoordsSubmit}
        onLocationRequest={() => setMode("location")}
        error={error}
      />

      <WeatherCard weather={weather} />
    </div>
  );
}
