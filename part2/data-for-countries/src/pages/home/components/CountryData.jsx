import { useEffect, useState } from "react"
import weatherService from "../../../services/api/weather"

const CountryData = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const [iconId, setIconId] = useState(null)

    useEffect(() => {
        weatherService
            .getCityWeather(country.capital)
            .then(weather => {
                setWeather(weather)
                setIconId(weather.weather[0].icon)
            })
    }, [country.capital])

    if(!weather && !iconId) return null

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>

            <h2>Languages</h2>
            <ul>
                { country.languages &&
                    Object.values(country.languages).map(language =>
                        <li key={language}>{language}</li>
                    )
                }
            </ul>
            <div>
                <img src={country.flags.png} alt="Country flag" />
            </div>

            <h2>Weather in {country.capital[0]}</h2>
            <p>Temperature {weather.main.temp} Celsius</p>
            <div>
                <img src={`https://openweathermap.org/img/wn/${iconId}@2x.png`} alt="Weather icon" />
            </div>
            <p>Wind {weather.wind.speed} m/s</p>
        </>
    )
}

export default CountryData