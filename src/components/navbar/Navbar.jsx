import { useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar({ darkMode, toggleDarkMode }) {
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add(styles.darkMode);
    } else {
      document.body.classList.remove(styles.darkMode);
    }
  }, [darkMode]);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
        </li>
      </ul>
    </nav>
  );
}

// Define PropTypes for darkMode and toggleDarkMode
Navbar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Navbar;
