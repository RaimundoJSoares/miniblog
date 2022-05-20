import { db } from '../firebase/config'
import { useState, useEffect} from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  SignInWithEmailAndPassword,
  updateProfile,
  SignOut,

} from 'firebase/auth'

export const useAuthentication = () => {
  const[error, setError] =useState(null);
  const [loading, setLoading] =useState(null)

  //cleanup
  //dealwith memory leak

  const [canceled, setCanceled] = useState(false);
  const auth = getAuth()

  function checkIfIsCanceled() {
    if(canceled) {
      return
    }
  }
  const createUser = async(data) => {
    checkIfIsCanceled()

    setLoading(true)

    setError(null)

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      )
      await updateProfile(user,
        { displayName: data.displayName })
        setLoading(false)

      return user
      
    } catch (error) {
      console.log(error.message)
      console.log(typeof error.Message)
      
       let systemErrorMessage

       if(error.message.includes('Password')) {
        systemErrorMessage = 'Password need to have 6 characteres'
       }
       else if (error.message.includes('email-already')) {
        systemErrorMessage = 'This email already exists'
        } else{
          systemErrorMessage = ' Error, please try later! '
        }

        setLoading(false)
        setError(systemErrorMessage)
    }
   
  }

  useEffect(() => {
    return () => setCanceled(true)
  }, [])

  return {
    auth, 
    createUser, 
    error,
    loading
  }
}

export default useAuthentication