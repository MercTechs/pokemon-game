import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/homepage/homepage";
import GameScreen from "./components/GameScreen/GameScreen";
import LoginPage from "./components/LoginPage/LoginPage";

function App() {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/game/:level" element={<GameScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
