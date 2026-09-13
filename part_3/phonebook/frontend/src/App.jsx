import { useState, useEffect } from 'react'
import personsService from './services/persons.service'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilterValue, setNameFilterValue] = useState('')
  const [messageType, setMessageType] = useState('info')
  const [messageValue, setMessageValue] = useState(null)

  useEffect(() => {
    console.log('Retrieving persons from database');
    personsService.getAllPersons().then(retrievedPersons => {
      setPersons(retrievedPersons)
      console.log('Retrieval successful');
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const getFilteredPersons = (value) => {
    return persons.filter(person => person.name.toLowerCase().includes(value))
  }

  const handleFilterValueChange = (event) => {
    let newValue = event.target.value
    setNameFilterValue(newValue)
  }

  const isDuplicateName = (name) => {
    return persons.map(person => person.name).includes(name)
  }

  const dispatchMessage = (msgType, msgValue) => {
    setMessageType(msgType)
    setMessageValue(msgValue)
    setTimeout(() => {
      setMessageValue(null)
    }, 5000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPerson = {name: newName, number: newNumber}

    if (isDuplicateName(newName)) {
      if (confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find(p => p.name === newName)
        personsService
          .updatePerson(existingPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
            setNewName('')
            setNewNumber('')
            dispatchMessage('info', `${updatedPerson.name}'s number was updated`)
          })
          .catch(error => {
            dispatchMessage('error', `Error while updating ${existingPerson.name}`)
          })
        return
      } else {
        setNewName('')
        return
      }
    }

    personsService
      .createPerson(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
        dispatchMessage('info', `Added ${createdPerson.name}`)
      })
  }

  const handleDelete = person => {
    if (!confirm(`Delete ${person.name}?`)) {
      return
    }
    personsService
      .deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        dispatchMessage('info', `Deleted ${person.name}`)
      })
      .catch(error => {
        alert(error)
        dispatchMessage('error', `Error while deleting ${person.name}`)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className={messageType} message={messageValue} />
      <Filter value={nameFilterValue} onChange={handleFilterValueChange} />
      <h3>Add a new</h3>
      <PersonForm name={newName} number={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons persons={getFilteredPersons(nameFilterValue)} onDelete={handleDelete} />
    </div>
  )
}

export default App