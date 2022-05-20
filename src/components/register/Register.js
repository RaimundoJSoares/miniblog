import { useState, useEffect } from "react"
import styles from './register.module.css'
import useAuthentication from "../../hooks/useAuthentication"

const Register = () => {
  const [ displayName, setDisplayName] = useState('')
  const [ email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const[ error01, setError01] = useState('')

  const {createUser , error:authError, loading} = useAuthentication()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
  

  setError01("")

  const user = {
    displayName,
    email,
    password,
  }

  if(password !== passwordConfirm) {
    setError01("Passwords need to be the same")
    return
  }

  const res = await createUser(user)

  console.log(user)
  }

  useEffect(() => {
    if(authError) {
      setError01(authError)
    }

  }, [authError])

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
       {!loading &&  <button className="btn" >Register</button>}
       {loading &&  <button className="btn" disabled>Wait...</button>}
        {error01 && <p className="error">{error01}</p>}
      </form>
    </div>
  )
}


export default Register