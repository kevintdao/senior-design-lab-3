import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { collection, doc, setDoc, addDoc, query, getDocs, where, getDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import PollForm from '../../components/PollForm'
import { useAuth } from '../../AuthContext'


export default function edit() {
    const router = useRouter();
    const { id } = router.query;
    const { currentUser } = useAuth();
    const [poll, setPoll] = useState();
    const [blocks, setBlocks] = useState();
    const [loading, setLoading] = useState(true);

    async function getPoll(pollId){
        const pollRef = doc(db, 'polls', pollId);
        const snapshot = await getDoc(pollRef);

        if(snapshot.exists()){
            return snapshot.data();
        }
        else{
            setError("Invalid ID");
            return;
        }
    }

    async function getBlocks(pollId){
        const q = query(collection(db, 'blocks'), where('poll', '==', pollId));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            console.log(doc.data());
        })
    }

    useEffect(() => {
        getPoll(id).then(poll => {
            console.log(poll)
            setPoll(poll);
            setLoading(false);  
        })
    }, [])

    if (loading){
        return <div></div>
    }

    return (
        <div>
            <div className="bg-white shadow">
                <h1 className="text-4xl font-bold text-gray-900 py-3 container max-w-6xl lg:mx-auto">Edit Poll</h1>
            </div>

            <div>
                <PollForm pollData={poll} blockData={""} />
            </div>
        </div>
    )
}
