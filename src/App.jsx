import * as React from 'react'
import axios from 'axios'

import './App.css'

const apiKey = '3eb8b7903c2740898db112352250502'

function App() {
  const [isDark, setIsDark] = React.useState(false)

  const [searchTerm, setSearchTerm] = React.useState('')
  const [confirmSearch, setConfirmSearch] = React.useState('')

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

    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${confirmSearch}`)
      .then(response => {
        if(response.status !== 200) throw new Error("status is not ok!");
        console.log(response.data);
      })
      .catch(error => console.error("Error fetching forecast data:", error.message))
  },[confirmSearch])

  React.useEffect(() => fetchData(),[fetchData])

  return (
    <div className={isDark ? 'dark-mode' : 'light-mode'}>
      <Header isDark={isDark} onToggle={toggle} />
      <SearchForm value={searchTerm} onInputHandler={inputHandler} onSearch={searchHandler}/>
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
    <form className='padding-32' onSubmit={onSearch} >
      <input type="text" className='padding-6' placeholder='Please enter the city name' value={value} onChange={onInputHandler}/>
      <button type='submit' className='padding-8 submit'>Search</button>
    </form>
  )
}






export default App
