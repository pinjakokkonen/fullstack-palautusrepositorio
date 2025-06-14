import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  return(
    <div>
      filter shown with <input value={props.filter} onChange={props.handler}/> 
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.add}>
      <div>
        name: <input value={props.name} onChange={props.namehandler}/>
      </div>
      <div>
        number: <input value={props.number} onChange={props.numberhandler}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({names}) => {
  return(
    <div>
      {names.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    let status=true
    let i, len=''
    for (i=0, len=persons.length; i<len; i++) {
      if (persons[i].name == newName) {
        status=false
        alert(`${newName} is already added to phonebook`)
      }
    }
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (status) {
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handler={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm add={addName} name={newName} namehandler={handleNameChange} number={newNumber} numberhandler={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons names={namesToShow} />
    </div>
  )

}

export default App
