import type { WeatherData } from "../types/weather";

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}?city=${encodeURIComponent(city)}&units=metric`);
  const data = await res.json();
  if (data.cod !== 200) throw new Error(data.message);
  return convert(data);
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}?lat=${lat}&lon=${lon}&units=metric`);
  const data = await res.json();
  if (data.cod !== 200) throw new Error(data.message);
  return convert(data);
}

function convert(data: any): WeatherData {
  return {
    lat: data.coord.lat,
    lon: data.coord.lon,
    timezone: data.timezone,
    timezone_offset: data.timezone,
    current: {
      dt: data.dt,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      dew_point: 0,
      uvi: 0,
      clouds: data.clouds.all,
      visibility: data.visibility,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      wind_gust: data.wind.gust ?? 0,
      weather: data.weather,
    },
  };
}