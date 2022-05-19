import { useState, useEffect} from 'react'
import {
  getAuth,
  CreateUserWithEmailAndPassword,
  SignInWithEmailAndPassword,
  updateProfile,
  SignOut,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { type } from '@testing-library/user-event/dist/type';

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

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      )
      await updateProfile(user,{displayName: data.displayName})
      return user
      
    } catch (error) {
      console.log(error.message)
      console.log(typeof error.Message)
      
    }
    setLoading(false)
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
