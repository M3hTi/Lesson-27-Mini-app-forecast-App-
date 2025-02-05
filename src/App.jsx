import * as React from 'react'

import './App.css'

function App() {
  const [isDark, setIsDark] = React.useState(false)

  const [searchTerm, setSearchTerm] = React.useState('')

  const toggle = React.useCallback(() => {
    setIsDark(prevState => !prevState)
  }, [])

  const inputHandler = React.useCallback((e) => {
    const newValue = e.target.value 
    setSearchTerm(newValue)
  },[])

  return (
    <div className={isDark ? 'dark-mode' : 'light-mode'}>
      <Header isDark={isDark} onToggle={toggle} />
      <SearchForm value={searchTerm} onInputHandler={inputHandler}/>
    </div>
  )
}

function Header({ isDark, onToggle}) {
  return (
    <div className='header'>
      <h1>Forecast App</h1>
      <button onClick={onToggle}>
        {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  )
}






function SearchForm({value, onInputHandler}) {
  return(
    <form className='padding-32'  >
      <input type="text" className='padding-6' placeholder='Please enter the city name' value={value} onChange={onInputHandler}/>
      <button type='submit' className='padding-6'>Search</button>
    </form>
  )
}






export default App
