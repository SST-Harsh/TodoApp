export default function WeatherCard({ weather }) {
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
        <div className="max-w-full md:max-w-5xl mx-auto p-4 bg-white/80 drop-shadow-2xl backdrop-blur-md shadow-md rounded-lg mt-8">
            <div className="grid grid-cols-2 items-center justify-between gap-6">
                {/* Weather Icon, City, Condition, Temperature */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0">
                    <img src={iconUrl} alt={condition} className="w-32 h-32" />
                    <div className="grid grid-cols-2 text-sm text-gray-600">
                        <div className="flex flex-col items-center">
                            <p className="text-2xl py-3 text-gray-600">{name}</p>
                            <p className="text-xl font-semibold text-gray-800">{condition}</p>
                        </div>
                        <div>
                            <p className="text-5xl font-semibold py-5 px-8 text-gray-800">{Math.round(temp)}°C</p>
                        </div>
                    </div>
                </div>

                {/* Weather Details */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-4xl font-bold text-gray-800">Weather Details</h2>
                    <div className="mt-10 space-y-3">
                        <p className="text-gray-600">Humidity: {humidity}%</p>
                        <p className="text-gray-600">Wind Speed: {speed} m/s</p>
                        <p className="text-gray-600">Pressure: {pressure} hPa</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
