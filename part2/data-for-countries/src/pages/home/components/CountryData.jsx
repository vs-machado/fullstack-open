const CountryData = ({ country }) => {
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
        </>
    )
}

export default CountryData