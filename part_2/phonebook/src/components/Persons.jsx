const PersonLabel = ({person}) => {
    return (
        <>
        <label>
            {person.name} {person.number}
        </label>
        <br/>
        </>
    )
}

const Persons = ({persons}) => {
    return persons.map(person => <PersonLabel key={person.id} person={person} />)
}

export default Persons