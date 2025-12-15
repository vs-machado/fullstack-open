import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      { persons.map ( person => 
        <p key={person.name}>{person.name} {person.number}</p>
      ) }
    </div>
  )
}

export default App