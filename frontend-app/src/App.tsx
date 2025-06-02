import WeatherCard from "./components/WeatherCard";
import type { WeatherData } from "./types/weather";

function App() {

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
          icon: "01d"
        }
      ]
    }
  };
  
  return <WeatherCard weather={dummyWeatherData} />;
}

export default App;
