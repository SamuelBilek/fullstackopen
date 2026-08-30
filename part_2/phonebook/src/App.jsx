import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNameSubmit = (event) => {
    event.preventDefault()
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }

  const NameLabel = ({text}) => {
    return (
      <>
        <label>
          {text}
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
        </div>
        <div>
          <button type="submit" onClick={handleNameSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <NameLabel key={person.name} text={person.name} />)}
    </div>
  )
}

export default App