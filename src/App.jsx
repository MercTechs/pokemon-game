import "./App.css";
import { useState } from "react"; // Import useState
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/homepage/homepage";
import GameScreen from "./components/GameScreen/GameScreen";
import LoginPage from "./components/LoginPage/LoginPage";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [darkMode, setDarkMode] = useState(false); // State variable for dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      <Router>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage darkMode={darkMode} />} />
          <Route
            path="/game/:level"
            element={<GameScreen darkMode={darkMode} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
