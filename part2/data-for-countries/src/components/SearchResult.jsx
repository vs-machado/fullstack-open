/**
 * @param { { countries: Array<> }} props 
 */
const SearchResult =  ({ countries }) => {
    const countryCount = countries.length

    if (countryCount === 1) {
        return (
            <>
                <h1>{countries[0].name.common}</h1>
                <p>Capital {countries[0].capital}</p>
                <p>Area {countries[0].area}</p>

                <h2>Languages</h2>
                <ul>
                    { countries[0].languages &&
                        Object.values(countries[0].languages).map(language =>
                            <li key={language}>{language}</li>
                        )
                    }
                </ul>
                <div>
                    <img src={countries[0].flags.png} alt="Country flag" />
                </div>
            </>
        )
    }

    if (countryCount > 1 && countryCount <= 10) {
        return (
            <>
                <ul>
                    { countries.map( country =>
                        <li key={country.name.common}>{country.name.common}</li>
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