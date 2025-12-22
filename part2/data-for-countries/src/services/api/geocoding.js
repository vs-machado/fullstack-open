import axios from "axios"

const geocodingBaseUrl = 'http://api.openweathermap.org/geo/1.0/'

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const getGeocodingByCityName = (cityName) => {
    const request = axios.get(`${geocodingBaseUrl}direct?q=${cityName}&appid=${OPENWEATHER_API_KEY}`)
    return request.then(response => response.data)
}

export default { getGeocodingByCityName }