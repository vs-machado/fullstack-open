import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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

    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
    setPersons(persons.concat(newPerson))
    setNewName('')
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

  const contactsToShow = filter === '' ? persons : persons.filter( person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()) )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addContact}>
        <div> name: <input value={newName} onChange={handleContactChange}/> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button
            type="submit">add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      { contactsToShow.map ( person => 
        <p key={person.name}>{person.name} {person.number}</p>
      ) }
    </div>
  )
}

export default App