import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usersData from "../../user-data/users.json";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleLogin = (username) => {
    const user = usersData.find(
      (u) => u.username === username
    );

    if (user) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", username);
      navigate("/home");
    } else {
      setMessage("Invalid username");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    handleLogin(username);
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="username">
            Username:
          </label>
          <input
            className={styles["input-field"]}
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
}

export default LoginPage;
