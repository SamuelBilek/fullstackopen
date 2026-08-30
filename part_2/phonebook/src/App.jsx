import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilterValue, setNameFilterValue] = useState('')

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