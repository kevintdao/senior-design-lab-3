import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import Alert from '../../components/Alert'

export default function Poll() {
    const router = useRouter();
    const { id } = router.query;
    const [error, setError] = useState('');

    async function getPoll(id){
        const ref = doc(db, "polls", id);
        const snapshot = await getDoc(ref);
        
        if(snapshot.exists()){
            console.log(snapshot.data());
        }
        else{
            setError("Invalid ID");
        }
    }

    const data = getPoll(id);

    return (
        <div>
            {error && <Alert text={error} />}
            {id}
        </div>
    )
}
