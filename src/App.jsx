import { useState } from 'react'
import './App.css'
import HomePage from './components/homepage/homepage'

function App() {
  return (
    <>
      <HomePage/>
      <div>
        <a href="https://www.pokemon.com/" target="_blank">
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png' className="logo" alt="Pokemon logo" />
        </a>

      </div>
      <h1>POKEMON FLIPCARD GAME</h1>
      <strong className='select-mode'>Select Mode</strong>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

      </div>

    </>
  )
}

export default App
