import { useState, useEffect } from "react";
import InputTabs from "./InputTabs";
import WeatherCard from "./WeatherCard";
import type { WeatherData } from "../types/weather";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../api/fetchWeather";
import { CloudSun } from "lucide-react";
import { getWeatherTheme } from "../utils/theme";

export default function WeatherDisplay() {
  const [mode, setMode] = useState<"city" | "coords" | "location">("city");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode === "location") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              setLoading(true);
              setError("");
              const data = await fetchWeatherByCoords(latitude, longitude);
              setWeather(data);
            } catch (e: any) {
              setWeather(null);
              setError(e.message);
            } finally {
              setLoading(false);
            }
          },
          () => setError("Unable to retrieve location.")
        );
      } else {
        setError("Geolocation not supported.");
      }
    }
  }, [mode]);

  const handleCitySubmit = async () => {
    try {
      if (!city || !/^[a-zA-Z\s-]{2,}$/.test(city)) {
        return setError("Invalid City Name");
      }
      setLoading(true);
      setError("");
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (e: any) {
      setWeather(null);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCoordsSubmit = async () => {
    try {
      if (isNaN(parseFloat(lat)) || isNaN(parseFloat(lon))) {
        return setError("Invalid Coordinates");
      }
      setLoading(true);
      setError("");
      const data = await fetchWeatherByCoords(parseFloat(lat), parseFloat(lon));
      setWeather(data);
    } catch (e: any) {
      setWeather(null);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const theme = weather
    ? getWeatherTheme(weather.current.weather[0].main, weather.current.temp)
    : { background: "from-sky-300 to-blue-500" };

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br ${theme.background} flex flex-col items-center justify-center px-4 py-12`}
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

      {loading && (
        <div className="flex flex-col items-center gap-3 mt-8">
          <CloudSun className="w-16 h-16 animate-spin text-yellow-400" />
          <span className="text-gray-700 font-medium text-yellow-400">
            Fetching weather...
          </span>
        </div>
      )}
      {!loading && weather && !error && <WeatherCard weather={weather} />}
    </div>
  );
}
