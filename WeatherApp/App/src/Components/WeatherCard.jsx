import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import{motion } from 'framer-motion';
export default function WeatherCard({ weather , geoLocation }) {
 

    const {
        name,
        main: { temp, humidity, pressure },
        weather: weatherDetails,
        wind: { speed },
    } = weather;

    const condition = weatherDetails[0]?.main || 'no data';
    const iconCode = weatherDetails[0]?.icon || 'no icon';
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const weatherStyles = {
        Thunderstorm: 'from-gray-700 to-gray-900 text-white',
        Drizzle: 'from-blue-400 to-blue-200 text-gray-800',
        Rain: 'from-blue-600 to-blue-400 text-white',
        Snow: 'from-blue-100 to-blue-50 text-gray-800',
        Clear: 'from-blue-400 to-blue-200 text-white',
        LightRain: 'from-blue-200 to-blue-600 text-gray-500',
        overCastClouds:' from-gray-200 to-gray-400 text-white',
        Clouds: 'from-gray-400 to-gray-600 text-white',
        default: 'from-blue-400 to-indigo-600 text-white',
    };

    const cardWeather = weatherStyles[condition] || weatherStyles.default;
    return (
        <div
         className={`min-h-[200px] max-w-full bg-gradient-to-br ${cardWeather} rounded-4xl p-4 transition-colors duration-300`}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-6">
                {/* Left section: Icon and Basic Info */}   
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <img src={iconUrl} alt={condition} className="w-32 h-32" />
                  
                    <div className="grid grid-cols-2 text-sm rounded-lg bg-opacity-20 p-4">
                        <div className="flex flex-col items-center">
                            <p className="text-xl md:text-2xl py-3">{name} {geoLocation}</p>
                            <p className="text-xl font-semibold capitalize">{weatherDetails[0]?.description}</p>
                        </div>
                        <div>
                            <p className="text-2xl md:text-5xl font-semibold py-5 px-8">
                                {Math.round(temp)}°C
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right section: Weather Details */}
                <div className="flex flex-col  items-center md:items-start text-center md:text-left">
                    <h2 className="text-4xl font-bold">Weather Details</h2>
                    <div className="mt-10 space-y-3">
                        <p><WiHumidity className="inline-block text-2xl mr-2" />Humidity: {humidity}%</p>
                        <p className="text-xs md:text-2xl"><WiStrongWind className="inline-block text-2xl mr-2" />Wind Speed: {speed} m/s</p>
                        <p><WiBarometer className="inline-block text-2xl  mr-2" />Pressure: {pressure} hPa</p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
