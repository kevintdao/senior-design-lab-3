import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc, getDocs, collection, query, where, orderBy, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import DisplayPoll from '../../components/DisplayPoll'

export default function Poll() {
    const router = useRouter();
    const { id } = router.query;
    const [error, setError] = useState('');
    const [poll, setPoll] = useState();
    const [blocks, setBlocks] = useState([]);
    const [times, setTimes] = useState([]);
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
        const q = query(collection(db, "blocks"), where("poll", "==", pollId));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            output.push({
                id: doc.id,
                data: doc.data()
            });
        });
        return output;
    }
    function handleSubmit() {
        var selected = document.querySelectorAll('input[type=checkbox]:checked');
        var name = document.getElementById('name').value;
        selected.forEach( async (s) => {
            const [bid, slot] = s.id.split("_");
            var pollRef = doc(db, 'blocks', bid);
            var field = "votes." + slot;
            await updateDoc(pollRef, {
                [field]: name
            });
        });
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
        return <div className="container max-w-6xl lg:mx-auto mt-2 text-red-500">
            <h1>{error}</h1>
        </div>
    }

    return (
        <div className="container max-w-6xl lg:mx-auto mt-2">
            <h2 className="text-center">{poll.title}</h2>
            <p className="text-center">by <strong>{poll.email}</strong></p>
            <table className="table-auto mt-2 mb-2">
                <tbody>
                    <tr>
                        <td>Location:</td>
                        <td>{poll.location}</td>
                    </tr>
                    <tr>
                        <td>Notes/Comments:</td>
                        <td>{poll.notes}</td>
                    </tr>
                    <tr>
                        <td>All times displays in:</td>
                        <td><u>{poll.timezone}</u></td>
                    </tr>
                </tbody>
            </table>
            <hr className="mb-2"/>
            <div>
                <label htmlFor="name">Enter your name: </label>
                <input type="text" id='name' />
            </div>
            <hr className="mb-2"/>
            <DisplayPoll blocks={blocks} vps={poll.votes_per_slot} vpu={poll.votes_per_user} />
            <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium" onClick={handleSubmit}>Submit</button>
        </div>
    )
}
