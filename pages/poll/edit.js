import React from 'react'
import { useRouter } from 'next/router'
import { collection, doc, setDoc, addDoc, query, getDocs, where } from 'firebase/firestore'
import { db } from '../../utils/firebase'

export default function edit() {
    const router = useRouter()
    const { id } = router.query

    async function getBlocks(pollId){
        const q = query(collection(db, 'blocks'), where('poll', '==', pollId));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        })
    }

    getBlocks(id);

    return (
        <div>
            <div className="bg-white shadow">
                <h1 className="text-4xl font-bold text-gray-900 py-3 container max-w-6xl lg:mx-auto">Create Poll</h1>
            </div>

            
        </div>
    )
}
