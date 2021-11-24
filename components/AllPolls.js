import React, { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'
import { query, collection, where, orderBy, getDocs } from '@firebase/firestore'
import { db } from '../utils/firebase'

export default function AllPolls() {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const currentDate = new Date(); 
    const [activePolls, setActivePolls] = useState([]);
    const [pastPolls, setPastPolls] = useState([]);

    async function getPolls(email){
        const output = [];
        const q = query(collection(db, "polls"), where("email", "==", email), orderBy("end"));
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
        var active = [];
        var past = [];
        getPolls(currentUser.email).then(response => {
            response.forEach((poll) => {
                if (currentDate < poll.data.end.toDate()){
                    active.push(poll);
                }
                else{
                    past.push(poll);
                }
            })
            setActivePolls(active);
            setPastPolls(past);
            setLoading(false);
        })
    }, [])

    if(loading){
        return <div></div>
    }

    function Polls(props){
        const polls = props.polls
        if(polls.length == 0){
            return (
                <p>No Active Poll(s)</p>
            )
        }
        else{
            return (
                <table className="divide-y divide-gray-200 min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>More Info</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {polls.map((poll, i) => {
                            const [sDay, sMonth, sDate, sYear] = poll.data.start.toDate().toString().split(" ");
                            const [eDay, eMonth, eDate, eYear] = poll.data.end.toDate().toString().split(" ");
                            const pollLink = `/poll/${poll.id}`

                            return (
                                <tr key={i}>
                                    <td>{poll.data.title}</td>
                                    <td>{sMonth} {sDate} {sYear}</td>
                                    <td>{eMonth} {eDate} {eYear}</td>
                                    <td><a href={pollLink}>View</a></td>
                                    <td>Edit</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )
        }
    }

    return (
        <div className="flex md:flex-row md:justify-between mt-2 justify-start flex-col">
            <div className="border rounded-md mb-2 w-full mr-4 p-2">
                <h5 className="text-center mb-2">Active Poll(s)</h5>
                <Polls polls={activePolls} />
            </div>

            <div className="border rounded-md mb-2 w-full p-2">
                <h5 className="text-center">Past Poll(s)</h5>
                <Polls polls={pastPolls} />
            </div>
        </div>
    )
}
