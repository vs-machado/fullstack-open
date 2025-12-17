import { useState, useEffect } from 'react'
import Filter from './pages/phonebook/Filter'
import AddContact from './pages/phonebook/AddContact'
import ContactList from './pages/phonebook/ContactList'
import contactsService from "./services/contacts"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    const alreadyAdded = persons.some(person => person.name === newName || person.number === newNumber)
    if (alreadyAdded) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }
    contactsService
      .create(newPerson)
      .then(returnedPerson => { 
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleContactChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const onDeleteContact = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      contactsService
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const contactsToShow = filter === '' ? persons : persons.filter( person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()) )

  useEffect(() => {
    contactsService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>  
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>    
      <AddContact addContact={addContact} newName={newName} newNumber={newNumber} handleContactChange={handleContactChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>  
      <ContactList contactsToShow={contactsToShow} onDeleteContact={onDeleteContact}/>
    </div>
  )
}

export default App