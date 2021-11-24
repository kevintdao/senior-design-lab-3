import React, { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'
import { query, collection, where, orderBy, getDocs } from '@firebase/firestore'
import { db } from '../utils/firebase'

export default function AllPolls() {
    const { currentUser } = useAuth();
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentDate = new Date(); 

    async function getPolls(email){
        const output = [];
        const q = query(collection(db, "polls"), where("email", "==", email), orderBy("deadline"));
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
        getPolls(currentUser.email).then(response => {
            setPolls(response);
            setLoading(false);
        })
    }, [])

    if(loading){
        return <div></div>
    }

    // no polls
    if(polls.length == 0) {
        console.log(currentDate);
        return <div className="flex md:flex-row md:justify-between mt-2 justify-start flex-col">
            <div className="border rounded-md mb-2 w-full mr-4 p-2">
                <h5>Active Poll(s)</h5>
                <p>No Active Poll</p>
            </div>

            <div className="border rounded-md mb-2 w-full p-2">
                <h5>Past Poll(s)</h5>
                <p>No Active Poll</p>
            </div>
        </div>
    }

    return (
        <div>
            {/* {polls[0].data.deadline.toDate().toString()} */}
        </div>
    )
}
