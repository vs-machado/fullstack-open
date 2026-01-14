import axios from "axios"
import geocodingService from "./geocoding"

const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/'

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const getCityWeather = async (cityName) => {
    const geocodingResponse = await geocodingService.getGeocodingByCityName(cityName)
    const { lat, lon } = geocodingResponse[0]
    const request = axios.get(`${weatherBaseUrl}weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`)
    return request.then(response => response.data)
}

export default { getCityWeather }