import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage/homepage'
import GameScreen from './components/GameScreen/GameScreen'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/game/:level" element={<GameScreen />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
