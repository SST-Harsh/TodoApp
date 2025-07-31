import { useState, useEffect } from 'react';
import axios from 'axios';
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
  // List of random cities to fetch weather data for
  const randomCities = [
    'Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', "New York", "London", "Tokyo", "Paris",
    "Sydney", "Beijing", "Berlin", "Moscow", "Dubai", "Rome", "Singapore", "Toronto", "San Francisco", "Los Angeles"
  ];

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
        } catch (err) {
          console.error(`Failed to fetch weather for ${city}`);
        }
      }

      setCityWeatherList(results);
    };

    fetchRandomCityWeather();
  }, []);

  const handleSearch = async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=72523f5b2c60cb33f7969c7c29310d51`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try another location.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };
  return (

    <div className="min-h-screen max-w-full bg-gradient-to-br from-blue-400 to-indigo-600 p-4  items-center justify-start pt-20">



      <Searchbar onSearch={handleSearch} loading={loading} />
      <div className='grid grid-cols-1 md:grid-cols-2  max-w-full md:max-w-5xl mx-auto mt-8'>
        <WeatherCard weather={weather} />

        <WeatherList weather={weather}
          weatherList={cityWeatherList} />
      </div>
      <TodaysHighlight />

    </div>



  );
}