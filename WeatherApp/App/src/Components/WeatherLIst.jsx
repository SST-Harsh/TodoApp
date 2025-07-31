export default function WeatherList({ weatherList }) {

  return (
    <div className="max-w-full md:max-w-9xl mx-auto p-4  hover:scale-112 hover:duration-100 bg-white/5 drop-shadow-2xl backdrop-blur-3xl shadow-md rounded-lg mt-8">
      <h1 className="text-2xl  text-center font-bold text-gray-100">Other Cities</h1>

      {weatherList.length > 0 ? (
        <ul className="w-full mt-4 space-y-2">
          {weatherList.map((city, index) => (
            <li
              key={index}
              className="flex items-center bg-white justify-between   hover:scale-110 hover:duration-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={`https://openweathermap.org/img/wn/${city.weather[0].icon}.png`}
                alt={city.weather[0].description}
                className="w-12 h-12"
              />
              <div className="flex flex-col ml-5 gap-2 flex-grow">
                <span className="text-gray-800 font-semibold">{city.name}</span>
                <span className="text-gray-500 text-sm">
                  {city.weather[0].main} — High: {Math.round(city.main.temp_max)}°C | Low: {Math.round(city.main.temp_min)}°C
                </span>
              </div>
              <div className="text-gray-800 text-lg  py-4 px-5 font-bold">
                {Math.round(city.main.temp)}°C
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center mt-10 text-gray-600 animate-bounce">Loading...</p>
      )}
    </div>
  );
}
