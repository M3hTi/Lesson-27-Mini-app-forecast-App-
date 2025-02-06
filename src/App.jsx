import * as React from 'react'
import axios from 'axios'

import './App.css'

function reducer(state,action){
  switch (action.type) {
    case 'LOADING':
      return {city: {}, isLoading: true, isError: false}
    case 'LOADED':
      return {city: action.payload, isLoading: false, isError: false}
    case 'ERROR':
      return {city: {}, isLoading: false, isError: true}
    default:
      break;
  }
}

function App() {
  const [isDark, setIsDark] = React.useState(false)

  const [searchTerm, setSearchTerm] = React.useState('')
  const [confirmSearch, setConfirmSearch] = React.useState('')

  const initialState = {
    city: {},
    isLoading: false,
    isError: false
  }

  const [weatherData, dispatchWeatherData] =  React.useReducer(reducer, initialState)

  const toggle = React.useCallback(() => {
    setIsDark(prevState => !prevState)
  }, [])

  const inputHandler = React.useCallback((e) => {
    const newValue = e.target.value 
    setSearchTerm(newValue)
  },[])

  const searchHandler =  React.useCallback((e) => {
    e.preventDefault()
    setConfirmSearch(searchTerm)
  },[searchTerm])


  const fetchData  = React.useCallback(() => {
    if(!confirmSearch) return

    dispatchWeatherData({type: 'LOADING'})
    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${confirmSearch}`)
      .then(response => {
        if(response.status !== 200) throw new Error("status is not ok!");
        dispatchWeatherData({type: 'LOADED', payload: response.data})
      })
      .catch(error => {
        dispatchWeatherData({type: 'ERROR'})
        console.error("Error fetching forecast data:", error.message)
      })
  },[confirmSearch])

  React.useEffect(() => fetchData(),[fetchData])

  return (
    <div className={isDark ? 'dark-mode' : 'light-mode'}>
      <Header isDark={isDark} onToggle={toggle} />
      <SearchForm value={searchTerm} onInputHandler={inputHandler} onSearch={searchHandler}/>
      {weatherData.isError && <div className='forecast'><p className='error'>Something  Wrong</p></div>}
      {weatherData.isLoading ? (
        <div className="three col">
          <div className="loader" id="loader-2">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ):(<List item={weatherData.city} />)}
    </div>
  )
}

function Header({isDark, onToggle}) {
  return (
    <div className='header'>
      <h1>Forecast App</h1>
      <button onClick={onToggle}>
        {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  )
}






function SearchForm({value, onInputHandler, onSearch}) {
  return(
    <form onSubmit={onSearch}>
      <input 
        type="text" 
        placeholder='Enter city name...'
        value={value} 
        onChange={onInputHandler}
        aria-label="Search for a city"
      />
      <button 
        type='submit' 
        className='submit'
        disabled={!value}
        aria-label="Search weather"
      >
        Search
      </button>
    </form>
  )
}


function List({item}) {
  if (!item.current || !item.location) {
    return null;
  }

  const {current, location} = item
  const {name, country} = location
  const {condition:{icon, text}, feelslike_c, humidity, temp_c, uv, wind_kph} = current

  return(
    <div className='forecast'>
      <div className="forecast-header">
        <div>
          <h2 className="location">{name}</h2>
          <p className="country">{country}</p>
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature">
          {Math.round(temp_c)}°C
        </div>
        <div className="condition">
          <img src={icon} alt={text} />
          <p>{text}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="weather-detail-item">
          <span className="detail-label">Feels Like:</span>
          <span className="detail-value">{Math.round(feelslike_c)}°C</span>
        </div>
        
        <div className="weather-detail-item">
          <span className="detail-label">Humidity:</span>
          <span className="detail-value">{humidity}%</span>
        </div>
        
        <div className="weather-detail-item">
          <span className="detail-label">Wind Speed:</span>
          <span className="detail-value">{wind_kph} km/h</span>
        </div>
        
        <div className="weather-detail-item">
          <span className="detail-label">UV Index:</span>
          <span className="detail-value">{uv}</span>
        </div>
      </div>
    </div>
  )
}






export default App
