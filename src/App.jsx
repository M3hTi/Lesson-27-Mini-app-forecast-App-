import * as React from 'react'

import './App.css'

function App() {
  const [isDark, setIsDark] = React.useState(false)

  const toggle = React.useCallback(() => {
    setIsDark(prevState => !prevState)
  }, [])

  return (
    <div className={isDark ? 'dark-mode' : 'light-mode'}>
      <Header isDark={isDark} onToggle={toggle} />
    </div>
  )
}

function Header({ isDark, onToggle }) {
  return (
    <div className='header'>
      <h1>Forecast App</h1>
      <button onClick={onToggle}>
        {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  )
}






export default App
