import { WiHumidity, WiStrongWind, WiBarometer, WiSunrise, WiSunset, WiThermometer } from "react-icons/wi";
import { FaEye, FaTemperatureLow, FaTemperatureHigh } from "react-icons/fa";
import { motion } from 'framer-motion';
export default function TodaysHighlight({ weather, bgStyle }) {
    if (!weather){
        return <div className="text-center text-xl mt-50 text-gray-100">No weather data available</div>;
    }

  const {
    main: { feels_like, humidity, pressure, temp_max, temp_min },
    wind: { speed, deg },
    visibility,
    sys: { sunrise, sunset }, 
    dt
  } = weather;

  const windDirection = deg => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  const formatTime = timestamp => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const highlights = [
    {
      icon: <WiThermometer className="text-4xl" />,
      title: "Feels Like",
      value: `${Math.round(feels_like)}°C`,
      description: "How it actually feels outside"
    },
    {
      icon: <WiHumidity className="text-4xl" />,
      title: "Humidity",
      value: `${humidity}%`,
      description: humidity > 70 ? "High humidity" : "Comfortable humidity"
    },
    {
      icon: <WiStrongWind className="text-4xl" />,
      title: "Wind",
      value: `${Math.round(speed)} m/s ${windDirection(deg)}`,
      description: windDirection(deg)
    },
    {
      icon: <WiBarometer className="text-4xl" />,
      title: "Pressure",
      value: `${pressure} hPa`,
      description: pressure > 1015 ? "High pressure" : "Low pressure"
    },
    {
      icon: <FaEye className="text-3xl" />,
      title: "Visibility",
      value: `${(visibility / 1000).toFixed(1)} km`,
      description: visibility > 10 ? "Excellent visibility" : "Reduced visibility"
    },
    {
      icon: <WiSunrise className="text-4xl" />,
      title: "Sunrise",
      value: formatTime(sunrise),
      description: "Dawn time"
    },
    {
      icon: <WiSunset className="text-4xl" />,
      title: "Sunset",
      value: formatTime(sunset),
      description: "Dusk time"
    },
    {
      icon: <FaTemperatureHigh className="text-3xl" />,
      title: "High Temp",
      value: `${Math.round(temp_max)}°C`,
      description: "Today's maximum"
    },
    {
      icon: <FaTemperatureLow className="text-3xl" />,
      title: "Low Temp",
      value: `${Math.round(temp_min)}°C`,
      description: "Today's minimum"
    }
  ];

  return (
    <div className={`${bgStyle} p-6 rounded-2xl backdrop-blur-sm transition-colors  mt-10 duration-500`}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Today's Highlights</h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {highlights.map((highlight, index) => (
          <div 
            key={index}
            className="bg-white/20 p-4 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-white">
                {highlight.icon}
              </div>
              <h3 className="text-lg font-semibold">{highlight.title}</h3>
            </div>
            <p className="text-2xl font-bold mb-1">{highlight.value}</p>
            <p className="text-sm opacity-80">{highlight.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}