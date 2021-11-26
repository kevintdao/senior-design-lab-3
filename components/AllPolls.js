import React, { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'
import { query, collection, where, orderBy, getDocs } from '@firebase/firestore'
import { db } from '../utils/firebase'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

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
                <p>No Polls</p>
            )
        }
        else{
            return (
                <table className="divide-y divide-gray-200 min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-grat-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-grat-500 uppercase tracking-wider">Start Date</th>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-grat-500 uppercase tracking-wider">End Date</th>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-grat-500 uppercase tracking-wider">Timezone</th>
                            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-grat-500 uppercase tracking-wider">Invite</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {polls.map((poll, i) => {
                            const [sDay, sMonth, sDate, sYear] = poll.data.start.toDate().toString().split(" ");
                            const [eDay, eMonth, eDate, eYear] = poll.data.end.toDate().toString().split(" ");

                            return (
                                <tr key={i}>
                                    <td className="px-2 py-3 text-sm font-medium text-gray-900">{poll.data.title}</td>
                                    <td className="px-2 py-3 text-sm font-medium text-gray-900">{sMonth} {sDate} {sYear}</td>
                                    <td className="px-2 py-3 text-sm font-medium text-gray-900">{eMonth} {eDate} {eYear}</td>
                                    <td className="px-2 py-3 text-sm font-medium text-gray-900">{poll.data.timezone}</td>
                                    <td className="px-2 py-3 text-sm font-medium text-gray-900">
                                        <InvitePopup />
                                    </td>
                                    <td className="px-2 py-3 text-sm font-medium text-gray-900">
                                        <div className="flex flex-row space-x-1">
                                            <a href={`/poll/${poll.id}`} className="text-indigo-600 hover:text-indigo-900">View</a>
                                            <p>/</p>
                                            <a href={`/poll/edit?id=${poll.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )
        }
    }

    function InvitePopup(){
        return (
            <Popup trigger={<a className="text-indigo-600 hover:text-indigo-900 cursor-pointer">Invite</a>} modal>
                <div>Popup</div>
            </Popup>
        )
    }

    return (
        <div className="flex mt-2 justify-start flex-col">
            <div className="border rounded-md mb-2 w-full p-2 bg-white shadow-sm">
                <h5 className="text-center mb-2">Active Poll(s)</h5>
                <Polls polls={activePolls} />
            </div>

            <div className="border rounded-md mb-2 w-full p-2 bg-white shadow-sm">
                <h5 className="text-center mb-2">Past Poll(s)</h5>
                <Polls polls={pastPolls} />
            </div>
        </div>
    )
}
