import { motion, AnimatePresence } from "framer-motion";

export default function InputTabs({
  mode,
  setMode,
  city,
  setCity,
  lat,
  lon,
  setLat,
  setLon,
  onCitySubmit,
  onCoordsSubmit,
  onLocationRequest,
  error
}: any) {
  return (
    <div className="w-full max-w-md bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md">
      <div className="flex justify-center gap-3 mb-4">
        {["city", "coords", "location"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              mode === m ? "bg-blue-600 text-white" : "bg-white/50 text-gray-800"
            }`}
          >
            {m === "city" ? "City" : m === "coords" ? "Lat/Lon" : "My Location"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {mode === "city" && (
          <motion.div key="city" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex gap-2">
              <input
                className="w-full px-4 py-2 rounded-md border"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button onClick={onCitySubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
            </div>
          </motion.div>
        )}

        {mode === "coords" && (
          <motion.div key="coords" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Latitude"
              className="px-4 py-2 rounded-md border"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
            <input
              type="text"
              placeholder="Longitude"
              className="px-4 py-2 rounded-md border"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
            />
            <button
              onClick={onCoordsSubmit}
              className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Search by Coordinates
            </button>
          </motion.div>
        )}

        {mode === "location" && (
          <motion.div key="location" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
            <button onClick={onLocationRequest} className="text-blue-600 underline">Use current location</button>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
    </div>
  );
}
