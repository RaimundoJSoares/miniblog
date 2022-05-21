import { useState, useEffect } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import styles from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error01, setError01] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError01("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError01(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>LogIn</h1>
      <p>Login to post or comment</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span> Email: </span>
          <input
            type="email"
            name="email"
            required
            placeholder="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span> Password: </span>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {!loading && <button className="btn">Enter</button>}
        {loading && (
          <button className="btn" disabled>
            Wait...
          </button>
        )}
        {error01 && <p className="error">{error01}</p>}
      </form>
    </div>
  );
};

export default Login;
