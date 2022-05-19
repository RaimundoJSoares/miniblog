import { useState, useEffect } from "react"
import styles from './register.module.css'

const Register = () => {
  const [ displayName, setDisplayName] = useState('')
  const [ email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const[ error, setError] = useState('')

  

  const handleSubmit = (e) => {
    e.preventDefault()
  

  setError("")

  const user = {
    displayName,
    email,
    password,
  }

  if(password !== passwordConfirm) {
    setError("Passwords need to be the same")
    return
  }

  console.log(user)
  }

  return (
    <div className={styles.register}>
      <h1>Register for to post</h1>
      <p>Create your user and share your history</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span> Name: </span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="UserName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
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
        <label>
          <span> Confirm Password: </span>
          <input
            type="password"
            name="ConfirmPassWord"
            required
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </label>
        <button className="btn" >Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register
