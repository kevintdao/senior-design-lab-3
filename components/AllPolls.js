import React, { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'
import { query, collection, where, orderBy, getDocs } from '@firebase/firestore'
import { db } from '../utils/firebase'

export default function AllPolls() {
    const { currentUser } = useAuth();
    const [polls, setPolls] = useState([]);
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
            console.log(response);
            setPolls(response);
        })
    }, [])

    // no polls
    if(polls.length == 0) {
        console.log(currentDate);
        return <div className="flex justify-between border mt-2 rounded-md">
            <div>
                <h5>Active Poll(s)</h5>
            </div>

            <div>
                <h5>Past Poll(s)</h5>
            </div>
        </div>
    }

    return (
        <div className="border ">
            {/* {polls[0].data.deadline.toDate().toString()} */}
        </div>
    )
}
