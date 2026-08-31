import { useState, useEffect } from 'react'
import axios from 'axios'
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('Retrieval successful');
        
        setPersons(response.data)
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
    if (isDuplicateName(newName)) {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      return
    }
    setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilterValue} onChange={handleFilterValueChange} />
      <h3>Add a new</h3>
      <PersonForm name={newName} number={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons persons={getFilteredPersons(nameFilterValue)} />
    </div>
  )
}

export default App