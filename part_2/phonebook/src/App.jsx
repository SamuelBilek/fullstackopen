import { useState, useEffect } from 'react'
import personsService from './services/persons.service'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilterValue, setNameFilterValue] = useState('')

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
          })
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
      })
      .catch(error => {
        alert(error)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilterValue} onChange={handleFilterValueChange} />
      <h3>Add a new</h3>
      <PersonForm name={newName} number={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons persons={getFilteredPersons(nameFilterValue)} onDelete={handleDelete} />
    </div>
  )
}

export default App