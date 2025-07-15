import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = (props) => {
  return (
    <div>
      find countries <input value={props.value} onChange={props.handleChange} />
    </div>
  )
}

const Countries = (props) => {
  if (props.countries){
    if (props.countries.length === 1){
      if (!props.country) { 
        return null
      }

      return(
        <div>
          <h1>{props.country[0]}</h1>
          <p>Capital {props.country[2]}</p>
          <p>Area {props.country[4]} </p>
          <h2>Languages</h2>
          <p>{props.country[1].map(name => <li key={name}>{name}</li>)}</p>
          <img src={props.country[3]} />
        </div>
      )
    }

    return(
      <div>
        {props.countries.map(name => <p key={name}>{name} 
          <button onClick={() => props.setValue(name)}>Show</button>
        </p>)}
      </div>
    )
  }

  return(
    <div>
      Too many matches, specify another filter
    </div>
  )
}


const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    if (value) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const names = response.data.map(item => item.name.common)
          const filtered = names.filter(item => item.toLowerCase().includes(value.toLowerCase()))
          if (filtered.length === 1){
            countryCheck(filtered[0])
            setCountries(filtered)
          } else if (filtered.length < 11) {
            setCountries(filtered)
            setCountry(null)
          } else {
            setCountries(null)
          }
        })
    } else {
      setCountries(null)
    }
  }, [value])

  const countryCheck = (country) => {
    if (country) {
        axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
          .then(response => {
            const countryName = response.data.name.common
            const languages = Object.values(response.data.languages)
            const capital = response.data.capital
            const area = response.data.area
            const flag = response.data.flags.png
            const information = [countryName, languages, capital, flag, area]
            setCountry(information)
          })
      } else {
        setCountry(null)
      }
  }

  return (
    <div>
      <Search value={value} handleChange={handleChange} />
      <Countries country={country} countries={countries} setValue={setValue} />
    </div>
  )
}

export default App
