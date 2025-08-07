import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const Search = (props) => {
  return (
    <div>
      find countries <input value={props.value} onChange={props.handleChange} />
    </div>
  )
}

const Countries = (props) => {
  if (props.countries.length > 0){
    if (props.countries.length === 1){
      if (props.country.length <= 0) { 
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
          <h2>Weather in {props.country[2]}</h2>
          <p>Temperature {props.weather[0]} Celcius</p>
          <img src={props.weather[2]} />
          <p>Wind {props.weather[1]} m/s</p>
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
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState([])
  const [weather, setWeather] = useState([])

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
            setCountry([])
          } else {
            setCountries([])
          }
        })
    } else {
      setCountries([])
    }
  }, [value])

  const countryCheck = (targetCountry) => {
    if (targetCountry) {
        axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${targetCountry}`)
          .then(response => {
            const countryName = response.data.name.common
            const languages = Object.values(response.data.languages)
            const capital = response.data.capital
            const area = response.data.area
            const flag = response.data.flags.png
            const lat = response.data.capitalInfo.latlng[0]
            const lng = response.data.capitalInfo.latlng[1]
            const information = [countryName, languages, capital, flag, area, lat, lng]
            setCountry(information)

            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${information[5]}&lon=${information[6]}&appid=${api_key}`)
            .then(response => {
              const temperatureNow = Math.round((response.data.main.temp - 273.15) * 100) / 100
              const wind = response.data.wind.speed
              const weatherIcon = response.data.weather[0].icon
              const iconLink = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
              const weatherInformation = [temperatureNow, wind, iconLink]
              setWeather(weatherInformation)
            })
          })
      } else {
        setCountry([])
      }
  }

  return (
    <div>
      <Search value={value} handleChange={handleChange} />
      <Countries country={country} countries={countries} setValue={setValue} weather={weather} />
    </div>
  )
}

export default App
