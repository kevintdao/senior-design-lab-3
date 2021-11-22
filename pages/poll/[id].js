import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import Alert from '../../components/Alert'

export default function Poll() {
    const router = useRouter();
    const { id } = router.query;
    const [error, setError] = useState('');
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    async function getPoll(id){
        const ref = doc(db, "polls", id);
        const snapshot = await getDoc(ref);
        
        if(snapshot.exists()){
            return snapshot.data();
        }
        else{
            setError("Invalid ID");
            return;
        }
    }

    useEffect(() => {
        getPoll(id).then(response => {
            setData(response);
            setLoading(false);
        })
    }, [])

    if (loading){
        return <div></div>
    }

    if (!data) {
        return <div className="container mt-2 text-red-500">
            <h1>{error}</h1>
        </div>
    }

    return (
        <div className="container mt-2">
            <h1>{data.title}</h1>
            {id}
        </div>
    )
}
