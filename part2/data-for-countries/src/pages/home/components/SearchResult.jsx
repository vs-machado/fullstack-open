import CountryData from "./CountryData"
import CountryItem from "./CountryItem"

/**
 * @param { { countries: Array<> }} props 
 */
const SearchResult =  ({ countries }) => {
    const countryCount = countries.length

    if(countryCount === 1) return <CountryData country={countries[0]} /> 

    if (countryCount > 1 && countryCount <= 10) {
        return (
            <>
                <ul>
                    { countries.map( country =>
                        <li key={country.name.common}> <CountryItem country={country}/> </li>
                    ) }
                </ul>
            </>
        )
    }

    if (countryCount > 10) {
        return (
            <>
                <p>Too many matches, specify another filter</p>
            </>
        )
    }

    return (
        <>
            <p>No countries found</p>
        </>
    )
}

export default SearchResult