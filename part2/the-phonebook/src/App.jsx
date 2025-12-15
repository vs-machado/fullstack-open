import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    const newPerson = { name: newName }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleContactChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleContactChange}/>
        </div>
        <div>
          <button
            type="submit">add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      { persons.map ( person => 
        <p key={person.name}>{person.name}</p>
      ) }
    </div>
  )
}

export default App