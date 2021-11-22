import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc, getDocs, collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import DisplayPoll from '../../components/DisplayPoll'

export default function Poll() {
    const router = useRouter();
    const { id } = router.query;
    const [error, setError] = useState('');
    const [poll, setPoll] = useState();
    const [blocks, setBlocks] = useState([]);
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

    async function getBlocks(pollId){
        const output = [];
        const q = query(collection(db, "blocks"), where("poll", "==", pollId), orderBy("date"));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            output.push({
                id: doc.id,
                data: doc.data()
            });
        });
        return output;
    }

    useEffect(() => {
        getPoll(id).then(response => {
            setPoll(response);
        })
        getBlocks(id).then(response => {
            setBlocks(response);
            setLoading(false);
        })
    }, [])

    if (loading){
        return <div></div>
    }

    if (!poll) {
        return <div className="container mt-2 text-red-500">
            <h1>{error}</h1>
        </div>
    }

    return (
        <div className="container mt-2">
            <h1 className="text-center">{poll.title}</h1>
            <p>{poll.location}</p>
            <p>{poll.notes}</p>
            <p>All times displays in: <u>{poll.timezone}</u></p>
            <DisplayPoll blocks={blocks} />
        </div>
    )
}
