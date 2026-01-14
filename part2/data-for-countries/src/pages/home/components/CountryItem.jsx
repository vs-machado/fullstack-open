import { useState } from "react"
import CountryData from "./CountryData"

const CountryItem = ({ country }) => {
    const [showCountry, setShowCountry] = useState(false)
    return (
        <>
            {country.name.common}
            <button onClick={() => setShowCountry(!showCountry)}>
                {showCountry ? "Hide" : "Show" }
            </button>
            {showCountry && <CountryData country={country}/>}
        </>
    )
}

export default CountryItem