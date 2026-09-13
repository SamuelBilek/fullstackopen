const PersonLabel = ({person, onDelete}) => {
    return (
        <>
        <label>
            {person.name} {person.number}
        </label>
        <button onClick={onDelete}>delete</button>
        <br/>
        </>
    )
}

const Persons = ({persons, onDelete}) => {
    return persons.map(person => <PersonLabel key={person.id} person={person} onDelete={() => onDelete(person)}/>)
}

export default Persons