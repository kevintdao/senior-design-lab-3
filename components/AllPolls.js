import React, { useState, useEffect, ReactDOM } from 'react'
import { useAuth } from '../AuthContext'
import { query, collection, where, orderBy, getDocs } from '@firebase/firestore'
import { db } from '../utils/firebase'
import Popup from 'reactjs-popup'
import Alert from './Alert'
import 'reactjs-popup/dist/index.css'

export default function AllPolls() {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const currentDate = new Date();
    const [activePolls, setActivePolls] = useState([]);
    const [pastPolls, setPastPolls] = useState([]);
    const [alert, setAlert] = useState('');
    const [error, setError] = useState('');

    async function getPolls(email) {
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
                currentDate < poll.data.end.toDate() ? active.push(poll) : past.push(poll);
            })
            setActivePolls(active);
            setPastPolls(past);
            setLoading(false);
        })
    }, [])

    if (loading) {
        return <div></div>
    }

    function Polls(props) {
        const polls = props.polls
        const invite = props.invite

        if (polls.length == 0) {
            return (
                <p className="px-2">No Polls</p>
            )
        }
        else {
            return (
                <table className="divide-y divide-gray-200 min-w-full table-fixed">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="w-1/6 px-2 py-3 text-left text-xs font-medium text-grat-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="w-1/6 px-2 py-3 text-center text-xs font-medium text-grat-500 uppercase tracking-wider">Start Date</th>
                            <th scope="col" className="w-1/6 px-2 py-3 text-center text-xs font-medium text-grat-500 uppercase tracking-wider">End Date</th>
                            <th scope="col" className="w-1/6 px-2 py-3 text-center text-xs font-medium text-grat-500 uppercase tracking-wider">Timezone</th>
                            <th scope="col" className="w-1/6 px-2 py-3 text-center text-xs font-medium text-grat-500 uppercase tracking-wider">{invite == true ? "Invite" : ""}</th>
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
                                    <td className="px-2 py-3 text-center text-sm font-medium text-gray-900">{sMonth} {sDate} {sYear}</td>
                                    <td className="px-2 py-3 text-center text-sm font-medium text-gray-900">{eMonth} {eDate} {eYear}</td>
                                    <td className="px-2 py-3 text-center text-sm font-medium text-gray-900">{poll.data.timezone}</td>
                                    <td className="px-2 py-3 text-center text-sm font-medium text-gray-900">
                                        {invite == true && <InvitePopup id={poll.id} />}
                                    </td>
                                    <td className="px-2 py-3 text-center text-sm font-medium text-gray-900">
                                        <div className="flex flex-row justify-center space-x-1">
                                            <a href={`/poll/${poll.id}`} className="text-indigo-600 hover:text-indigo-900">View</a>
                                            {invite == true && <p>/</p>}
                                            {invite == true && <a href={`/poll/edit?id=${poll.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</a>}
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

    function InvitePopup(props) {
        const id = props.id;

        return (
            <Popup trigger={<a className="text-indigo-600 hover:text-indigo-900 cursor-pointer">Invite</a>} modal>
                {close => (
                    <div className="container flex flex-col modal space-y-2 mb-2">
                        <h1 className="text-4xl font-bold text-gray-900 py-3 text-center">Invite users</h1>
                        <p>Enter emails in seperate line for the users you want to invite to this poll</p>
                        <textarea name="users" id="users" cols="30" rows="7" className="border border-gray-300 rounded p-2 none"></textarea>
                        <button onClick={() => { sendEmail(id); close(); }} className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-md h-8">Submit</button>
                    </div>
                )}
            </Popup>
        )
    }

    async function sendEmail(id) {
        const users = document.getElementById("users").value.trim().split("\n");
        const formData = {};

        formData['id'] = id;
        formData['users'] = users;
        console.log(formData);
        const response = await fetch('/api/mail', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        const data = await response.json();
        
        setAlert('');
        setError('');
        if(data.status == 'Ok'){
            setAlert('Invites successfully sent!');
        }
        else{
            setError('Failed to sent invitation');
        }
    }

    return (
        <div className="flex mt-2 justify-start flex-col">
            {alert && <Alert text={alert} bgColor={'bg-green-100'} textColor={'text-green-700'} borderColor={'border-green-400'} />}
            {error && <Alert text={error} />}

            <div className="border rounded-md mb-2 w-full p-2 bg-white shadow-sm">
                <h5 className="text-center mb-2">Active Poll(s)</h5>
                <Polls polls={activePolls} invite={true} />
            </div>

            <div className="border rounded-md mb-2 w-full p-2 bg-white shadow-sm">
                <h5 className="text-center mb-2">Past Poll(s)</h5>
                <Polls polls={pastPolls} invite={false}/>
            </div>
        </div>
    )
}
