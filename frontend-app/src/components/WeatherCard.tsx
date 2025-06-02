import { motion } from "framer-motion";
import { Sun, Wind, CloudSun, Thermometer, Droplet } from "lucide-react";
import type { WeatherData } from "../types/weather";

export default function WeatherCard({ weather }: { weather: WeatherData }) {
  const icon = weather.current.weather[0].icon;
  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : "";

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto my-2 px-6 py-12 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-xl relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div className={`absolute -top-20 -left-20 w-72 h-72 bg-blue-400 bg-opacity-30 rounded-full blur-3xl animate-pulse`} />
      <motion.div className={`absolute -bottom-20 -right-20 w-72 h-72 bg-blue-400 bg-opacity-30 rounded-full blur-3xl animate-pulse`} />

      <div className="relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-10 mb-10"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.img
            src={iconUrl}
            alt="Weather icon"
            className="w-32 h-32 drop-shadow-lg"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
          />
          <div className="text-center md:text-left">
            <motion.h1
              className="text-5xl font-bold text-blue-800 drop-shadow-sm"
              whileHover={{ scale: 1.1 }}
            >
              {weather.current.weather[0].main}
            </motion.h1>
            <p className="capitalize text-lg text-gray-700 mt-2">
              {weather.current.weather[0].description}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { icon: <Thermometer className="w-6 h-6" />, label: `Temp: ${weather.current.temp}°F` },
            { icon: <Thermometer className="w-6 h-6" />, label: `Feels like: ${weather.current.feels_like}°F` },
            { icon: <Droplet className="w-6 h-6" />, label: `Humidity: ${weather.current.humidity}%` },
            { icon: <Wind className="w-6 h-6" />, label: `Wind: ${weather.current.wind_speed} m/s` },
            { icon: <CloudSun className="w-6 h-6" />, label: `Clouds: ${weather.current.clouds}%` },
            { icon: <Sun className="w-6 h-6" />, label: `Visibility: ${weather.current.visibility / 1000} km` },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl bg-white bg-opacity-60 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.07 }}
            >
              {item.icon}
              <span className="font-medium text-base text-gray-800">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}