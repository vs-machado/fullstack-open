import { useState, useEffect } from 'react'
import Filter from './pages/components/phonebook/Filter'
import AddContact from './pages/components/phonebook/AddContact'
import ContactList from './pages/components/phonebook/ContactList'
import contactsService from "./services/contacts"
import Notification from './pages/components/notifications/Notification'
import { NotificationType } from './constants/notificationType'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  const addContact = (event) => {
    event.preventDefault()

    const alreadyAdded = persons.some(person => person.name === newName)
    const person = persons.find(person => person.name === newName)
    const newPerson = { name: newName, number: newNumber }
    if (alreadyAdded && (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`))) {
      contactsService
        .update(person.id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
          setNotification({ message: `${newPerson.name} number updated.`, type: NotificationType.SUCCESS }) 
          setNewName('')
          setNewNumber('')
        })
        .catch(() => {
          setNotification({ message: `Information of ${newPerson.name} has already been removed from server`, type: NotificationType.ERROR })
          setPersons(persons.filter(p => p.id !== person.id))
        })
      return
    }
    
    contactsService
      .create(newPerson)
      .then(returnedPerson => { 
        setPersons(persons.concat(returnedPerson))
        setNotification({ message: `Added ${newPerson.name}`, type: NotificationType.SUCCESS })
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        if(error.response.status === 400) {
          setNotification({ message: "ERROR: The name must be at least 3 characters long.", type: NotificationType.ERROR })
        }
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
        .catch( error => {
          if (error.status === 404) {
            setNotification({ message: `${person.name} contact not found on server.`, type: NotificationType.ERROR })
            setPersons(persons.filter(p => p.id !== person.id)) 
          }
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

  if(!persons){
    return null
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />  
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>    
      <AddContact addContact={addContact} newName={newName} newNumber={newNumber} handleContactChange={handleContactChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>  
      <ContactList contactsToShow={contactsToShow} onDeleteContact={onDeleteContact}/>
    </div>
  )
}

export default App