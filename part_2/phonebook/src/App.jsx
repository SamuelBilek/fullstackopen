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
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [nameFilterValue, setNameFilterValue] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterNames = (value) => {
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(value)))
  }

  const handleFilterValueChange = (event) => {
    let newValue = event.target.value
    setNameFilterValue(newValue)
    filterNames(newValue)
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
    setPersons(persons.concat({name: newName, number:newNumber}))
    setNewName('')
    setNewNumber('')
  }

  const NameLabel = ({person}) => {
    return (
      <>
        <label>
          {person.name} {person.number}
        </label>
        <br/>
      </>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={nameFilterValue} onChange={handleFilterValueChange} />
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br/>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <NameLabel key={person.id} person={person} />)}
    </div>
  )
}

export default App