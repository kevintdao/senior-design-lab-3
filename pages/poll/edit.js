import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { collection, doc, setDoc, addDoc, query, getDocs, where, getDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import PollForm from '../../components/PollForm'
import { useAuth } from '../../AuthContext'

export default function edit() {
    const router = useRouter();
    const { id } = router.query;
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
        const output = []
        const q = query(collection(db, 'blocks'), where('poll', '==', pollId));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            output.push({
                id: doc.id,
                data: doc.data()
            })
        })
        return output;
    }

    useEffect(() => {
        getPoll(id).then(poll => {
            setPoll(poll);
        })
        getBlocks(id).then(blocks => {
            setBlocks(blocks);
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
                <PollForm type={"edit"} pollData={poll} blockData={blocks} id={id} />
            </div>
        </div>
    )
}
