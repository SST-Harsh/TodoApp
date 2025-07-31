import { motion } from 'framer-motion';

export default function WeatherList({ weatherList, onCityClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Other Cities</h2>

      {weatherList.length > 0 ? (
        <motion.ul 
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {weatherList.map((city, index) => (
            <motion.li
              key={`${city.name}-${index}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/20 rounded-xl p-4 backdrop-blur-sm cursor-pointer transition-colors hover:bg-white/30"
              onClick={() => onCityClick && onCityClick(city.name)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                    alt={city.weather[0].description}
                    className="w-16 h-16"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold text-white">
                      {city.name}, {city.sys?.country}
                    </h3>
                    <span className="text-xl font-bold text-white">
                      {Math.round(city.main.temp)}°C
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-white/80 capitalize">
                      {city.weather[0].description}
                    </span>
                    <div className="flex space-x-2 text-sm">
                      <span className="text-white/80">
                        H: {Math.round(city.main.temp_max)}°C
                      </span>
                      <span className="text-white/80">
                        L: {Math.round(city.main.temp_min)}°C
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-white/60">
                    <span>Humidity: {city.main.humidity}%</span>
                    <span>Wind: {Math.round(city.wind.speed)} m/s</span>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="inline-block animate-pulse">
            <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full"></div>
          </div>
          <p className="mt-4 text-white/80">Loading weather data...</p>
        </motion.div>
      )}
    </div>
  );
}