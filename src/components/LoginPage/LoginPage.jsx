import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usersData from "../../user-data/users.json";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleLogin = (username, password) => {
    const user = usersData.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", username);
      navigate("/home");
    } else {
      setMessage("Invalid username or password.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    handleLogin(username, password);
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
        <div>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            className={styles["input-field"]}
            type="password"
            id="password"
            name="password"
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
