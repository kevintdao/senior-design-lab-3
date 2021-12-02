import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc, getDocs, collection, query, where, orderBy, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import DisplayPoll from '../../components/DisplayPoll'
import Alert from '../../components/Alert'

export default function Poll() {
    const router = useRouter();
    const { id } = router.query;
    const [error, setError] = useState('');
    const [poll, setPoll] = useState();
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertMsg, setAlertMsg] = useState('');

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
        if(name == ""){
            alert("Please enter a name!");
            return;
        }

        var selectTimes = [];
        selected.forEach((element) => {
            let date = element.parentNode.parentNode.children[0].innerText;
            console.log(element.parentNode.parentNode);
            let time = element.parentNode.children[1].innerText;

            selectTimes.push({
                date: date.trim(),
                time: time.trim()
            })
        })

        let timeMsg = "";
        selectTimes.forEach((select) => {
            timeMsg += `${select.date}, ${select.time}\n`;
        })

        selected.forEach( async (s) => {
            const [bid, slot] = s.id.split("_");
            var pollRef = doc(db, 'blocks', bid);
            var field = "votes." + slot;
            await updateDoc(pollRef, {
                [field]: arrayUnion(name)
            });
        });

        let msg = `Submitted!\n
            Title: ${poll.title}\n
            Location: ${poll.location}\n
            Name: ${name}\n
            Selected Time(s): \n${timeMsg}\n`;

        msg = msg.split('\n').map((str, i) => <p key={i}>{str}</p>);
        setAlertMsg(msg);
    }

    useEffect(() => {
        getPoll(id).then(response => {
            setPoll(response);
        })
        getBlocks(id).then(response => {
            setBlocks(response);
            setLoading(false);
        })
    }, [alertMsg])

    if (loading){
        return <div></div>
    }

    if (alertMsg){
        return (
            <div className="container max-w-6xl lg:mx-auto mt-2">
                <Alert text={alertMsg} bgColor={'bg-green-100'} textColor={'text-green-700'} borderColor={'border-green-400'} />
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
                <div className="mb-2">
                    <label htmlFor="name">Enter your name: </label>
                    <input type="text" id='name' className="border border-gray-300 rounded p-2"/>
                </div>
                <DisplayPoll blocks={blocks} vps={poll.votes_per_slot} vpu={poll.votes_per_user} />
            </div>
        )
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
            <div className="mb-2">
                <label htmlFor="name">Enter your name: </label>
                <input type="text" id='name' className="border border-gray-300 rounded p-2"/>
            </div>
            <DisplayPoll blocks={blocks} vps={poll.votes_per_slot} vpu={poll.votes_per_user} />
            <button id='submit' disabled className="disabled:bg-indigo-300 disabled:cursor-not-allowed bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium mb-2" onClick={handleSubmit}>Submit</button>
        </div>
    )
}
