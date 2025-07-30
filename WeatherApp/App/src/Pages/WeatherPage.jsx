import axios from 'axios'
import { useEffect, useState } from 'react'
import Searchbar from '../Components/Searchbar'
export default function WeatherPage() {
    const [weather, setWeather] = useState(null)
    const [Search,setSearch]=useState('')


    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=22.3&lon=73.2&units=metric&appid=72523f5b2c60cb33f7969c7c29310d51')
                console.log(response.data)
                setWeather(response.data)

            } catch (error) {
                console.log("Error in fetching data:", error)
            }
        }
        fetchWeather()
    }, [])


    return (
            
            <div className='max-w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-indigo-500 p-4'>
                <Searchbar  />

                <div className='mt-6 w-full max-w-md text-black'>
                 

                    {weather  && (
                        <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg backdrop-blur-md space-y-3">
                            <h2 className="text-2xl font-semibold text-center">{weather.name}</h2>
                            <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
                            <p><strong>Condition:</strong> {weather.weather[0].main}</p>
                            <p><strong>Description:</strong> {weather.weather[0].description}</p>
                            <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
                            <div className="flex justify-center">
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                    alt="Weather icon"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
    
    )
}