import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

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

const Persons = (props) => {
  return(
    <div>
      {props.names.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => props.removing(person.id, person.name)}> delete </button></p>)}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [userMessage, setUserMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    const nameObject = {
      name: newName,
      number: newNumber
    }

    for (i=0, len=persons.length; i<len; i++) {
      if (persons[i].name == newName) {
        status=false
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personService
            .update(persons[i].id, nameObject)
            .then(response => {
              setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))
              setUserMessage(`Changed ${newName}`)
              setTimeout(() => {
                setUserMessage(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage(`Information of ${newName} has already been removed from server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
        }
      }
    }
    
    if (status) {
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setUserMessage(`Added ${newName}`)
          setTimeout(() => {
            setUserMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) 

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .removeName(id)
        .then(response => {
          setPersons(persons.filter(person => person.id != response.data.id))
        })
      setUserMessage(`Deleted ${name}`)
      setTimeout(() => {
        setUserMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={userMessage} error={errorMessage} />
      <Filter filter={newFilter} handler={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm add={addName} name={newName} namehandler={handleNameChange} number={newNumber} numberhandler={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons names={namesToShow} removing={removePerson} />
    </div>
  )

}

export default App
