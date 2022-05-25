import { useState, useEffect} from 'react'

import { db } from '../firebase/config'

import { collection, query, orderBy, onSnapshot, where, QuerySnapshot } from 'firebase/firestore'


export const useFetchDocuments = (docCollection, search=null, uid=null) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading]= useState(null)

    //memory leak detection

    const [cancelled, setCanceled]= useState(false)

    useEffect(() => {
        async function loadData() {
            if(cancelled) return;

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {

                let q;

                //busca
                //dashboard

                q = await query(collectionRef, orderBy('createdAt', 'desc'))

                await onSnapshot(q, (QuerySnapshot) => {
                    setDocument(
                        QuerySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                })

                setLoading(false)
                
            } catch (error) {

                console.log(error)
                setError(error.message)

                setLoading(false)
                
            } 
        }
        loadData()

    }, [docCollection, search, uid, cancelled])

    useEffect(() => {
        return() => setCanceled(true)
    },[])

    return {document, loading, error};
}
