import { useState, useEffect} from 'react'

import { db } from '../firebase/config'

import { doc, getDoc} from 'firebase/firestore'


export const useFetchPosts = (docCollection,id) => {
    const [posts, setPosts] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading]= useState(null)

    //memory leak detection

    const [cancelled, setCanceled]= useState(false)

    useEffect(() => {
        async function loadDocuments() {
            if(cancelled) return;

            setLoading(true)

            try {

                const collectionRef = await doc(db, docCollection, id)

                const post = await getDoc(collectionRef)

                setPosts(post.data())

                setLoading(false)

            }
            catch (error) {

                console.log(error)
                setError(error.message)

                setLoading(true)

            }
        }
        loadDocuments()

    }, [docCollection, id, cancelled])

    useEffect(() => {
        return() => setCanceled(true)
    },[])

    return {posts, loading, error};
}
