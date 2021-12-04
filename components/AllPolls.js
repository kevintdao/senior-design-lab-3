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
            setError('Failed to send invitations!');
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
