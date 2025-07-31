import { WiHumidity, WiStrongWind, WiBarometer, WiSunrise, WiSunset, WiThermometer } from "react-icons/wi";
export default function WeatherCard({ weather, bgStyle }) {
    if (!weather)
        return <div className="text-center text-xl mt-50 text-gray-100">No weather data available. Please search for a city.</div>;

    const {
        name,
        main: { temp, humidity, pressure },
        weather: weatherDetails,
        wind: { speed },
    } = weather;

    const condition = weatherDetails[0]?.main || '';
    const iconCode = weatherDetails[0]?.icon || '01d';

    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
        <div className={`min-h-[200px] max-w-full bg-gradient-to-br ${bgStyle}  rounded-4xl p-4 transition-colors duration-500`}>
            <div className="grid grid-cols-2 items-center justify-between gap-6">
                {/* Weather Icon, City, Condition, Temperature */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0">
                    <img src={iconUrl} alt={condition} className="w-32 h-32" />
                    <div className="grid grid-cols-2 text-sm rounded-lg  bg-opacity-20 p-4 ">
                        <div className="flex flex-col items-center">
                            <p className="text-2xl py-3 ">{name}</p>
                            <p className="text-xl font-semibold ">{condition}</p>
                        </div>
                        <div>
                            <p className="text-2xl md:text-5xl font-semibold py-5 px-8 ">{Math.round(temp)}°C</p>
                        </div>
                    </div>
                </div>

                {/* Weather Details */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-4xl font-bold ">Weather Details</h2>
                    <div className="mt-10 space-y-3">
                        <p className=""><WiHumidity className="inline-block  text-2xl mr-2" />Humidity: {humidity}%</p>
                        <p className=""><WiStrongWind className="inline-block  text-2xl mr-2" />Wind Speed: {speed} m/s</p>
                        <p className=""><WiBarometer className="inline-block  text-2xl mr-2" />Pressure: {pressure} hPa</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
