import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Searchbar from '../Components/Searchbar';
import WeatherCard from '../Components/WeatherCard';
import WeatherList from '../Components/WeatherLIst';
import TodaysHighlight from '../Components/TodayHighlight';
export default function WeatherPage() {

  // State to hold weather data, loading state, error message, and list of other cities
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityWeatherList, setCityWeatherList] = useState([]);
  const [geoLocation, setGeoLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [bgStyle, setBgStyle] = useState('bg-gradient-to-br from-blue-400 to-indigo-600');

  // geoLocation handling
  useEffect(() => {
    const fetchGeoLocation = async () => {


      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=72523f5b2c60cb33f7969c7c29310d51&units=metric`
            );
            setWeather(response.data);
            setCurrentLocation(response.data.name);
            setGeoLocation(response.data.sys.country);
          } catch (error) {
            setError("Failed to fetch weather data for current location.");
            console.error("Failed to fetch weather for current location", error);
          }
        });
      }
    };
    fetchGeoLocation();

  }, []);



  // List of random cities to fetch weather data for
  const randomCities = [
    'Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', "New York", "London", "Tokyo", "Paris",
    "Sydney", "Beijing", "Berlin", "Moscow", "Dubai", "Rome", "Singapore", "Toronto", "San Francisco", "Los Angeles"
  ];

  console.log("Random Counter code:", randomCities)
  //  Function to pick 5 unique random cities
  const getRandomCities = () => {
    const shuffled = [...randomCities].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  //  Fetch weather for 5 random cities on page load
  useEffect(() => {
    const fetchRandomCityWeather = async () => {
      const selectedCities = getRandomCities();
      const results = [];

      for (const city of selectedCities) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=72523f5b2c60cb33f7969c7c29310d51`
          );
          results.push(response.data);
        } catch (error) {
          setError(`Failed to fetch weather for ${city}`);
          console.error(`Failed to fetch weather for ${city}`, error);
        }
      }

      setCityWeatherList(results);
    };
    fetchRandomCityWeather();
  }, []);



  //  Update background style based on current weather condition
  useEffect(() => {
    const condition = weather?.weather[0]?.main || '';
    switch (condition) {

      case 'Clear':
        setBgStyle('bg-gradient-to-br from-blue-500 to-blue-400 text-white');
        break;
      case 'Clouds':
        setBgStyle('bg-gradient-to-br from-gray-300 to-gray-600  text-white');
        break;
      case 'overCastClouds':
        setBgStyle('bg-gradient-to-br from-gray-200 to-gray-400 text-white ');
        break;
      case 'Light Rain':
        setBgStyle('bg-gradient-to-br from-blue-400 to-gray-200 text-gray-500');
        break;
      case 'Rain':
        setBgStyle('bg-gradient-to-br from-blue-600 to-gray-400 text-white');
        break;
      case 'Thunderstorm':
        setBgStyle('bg-gradient-to-br from-gray-700 to-gray-900 text-white');
        break;
      case 'Drizzle':
        setBgStyle('bg-gradient-to-br from-blue-400 to-blue-200 text-gray-800');
        break;
      case 'Snow':
        setBgStyle('bg-gradient-to-br from-blue-100 to-blue-50 text-gray-800');
        break;
      default:
        setBgStyle('bg-gradient-to-br from-blue-400 to-indigo-600 text-white');
    }
  }, [weather]);
  // Function to Handle the Weather List Click to show data in weather app
  const handleCityClick = async (cityName) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=72523f5b2c60cb33f7969c7c29310d51`
      );
      setWeather(response.data);
      setCurrentLocation(response.data.name);
      setGeoLocation(response.data.sys.country);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data for city:", error);
      setError("Failed to fetch weather data. Please try again.");
    }

  }

  const handleSearch = async (city) => {
    if (!city.trim()) return;
    setLoading(true);

    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=72523f5b2c60cb33f7969c7c29310d51`
      );
      setWeather(response.data);
      setCurrentLocation(response.data.name);
      setGeoLocation(response.data.sys.country);

    } catch (error) {
      setError("City not found. Please try another location.");
      console.error("Error fetching weather data:", error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };
  return (

    <div className={`min-h-screen max-w-full bg-gradient-to-br ${bgStyle} p-4 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto">
        <Searchbar onSearch={handleSearch}
          loading={loading}
          currentLocation={currentLocation}
          geoLocation={geoLocation} />

        {loading === true ?
          (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center h-64"
            >
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-white">Loading weather data...</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-white"
            >
              <p className="text-xl mb-4">{error}</p>

            </motion.div>
          ) : weather ?
            (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2  gap-6">
                  <WeatherCard weather={weather}
                    bgStyle={bgStyle}
                    geoLocation={geoLocation} />

                  <TodaysHighlight weather={weather} bgStyle={bgStyle} />
                </div>
                <div className="lg:col-span-1">
                  <WeatherList weather={weather}
                    weatherList={cityWeatherList}
                    loading={loading}
                    WeatherCard={WeatherCard}
                    onClickCityName={handleCityClick} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center h-64"
              >
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-white">Loading weather data...</p>
                </div>
              </motion.div>
            )}



      </div>
    </div>



  );
}