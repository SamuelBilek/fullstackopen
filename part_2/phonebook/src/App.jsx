import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
      {persons.map(person => <NameLabel key={person.name} person={person} />)}
    </div>
  )
}

export default App