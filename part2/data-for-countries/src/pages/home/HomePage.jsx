import { useEffect, useState } from 'react'
import countriesService from '../../services/api/countries'
import SearchResult from '../../pages/home/components/SearchResult'

const HomePage = () => {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const onSearch = (event) => {
    event.preventDefault()
  }

  const onSearchChange = (event) => {
    const value = event.target.value
    setSearchText(value)

    const filteredList = countries.filter(country => country.name.common.toLowerCase().includes(value.toLocaleLowerCase()))
    setFilteredCountries(filteredList)
  }

  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
  }, [])

  if(!countries) return null

  return (
    <>
      <form onSubmit={onSearch}>
        <div>
          find countries <input value={searchText} onChange={onSearchChange} type="text" />
        </div>
      </form>
      <SearchResult countries={filteredCountries} />
    </>
  )
}

export default HomePage
