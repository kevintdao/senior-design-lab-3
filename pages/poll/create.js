import React, { useRef, useState } from 'react'
import PrivateRoute from '../../components/PrivateRoute'

export default function create() {
    const title = useRef();
    const location = useRef();
    const notes = useRef();
    const dates = useRef();
    const start = useRef();
    const end = useRef();
    const [loadingPlus, setLoadingPlus] = useState(false);
    const numSB = useRef();
    const numSlot = useRef();
    const numPerson = useRef();
    const [loadingPublish, setLoadingPublish] = useState(false);

    async function handleSubmit(e){
        // e.preventDefault();

        // if(passwordRef.current.value !== passwordConfirmRef.current.value){
        //     return setError('Passwords do not match')
        // }

        // if(passwordRef.current.value.length < 6){
        //     return setError('Password should be at least 6 characters')
        // }

        // try{
        //     setError('')
        //     // prevent user from creating multiple accounts by clicking signup button repeatedly
        //     setLoading(true)
        //     await signup(emailRef.current.value, passwordRef.current.value).then(async (userCredential) => {
        //         await updateName(userCredential.user, fnameRef.current.value, lnameRef.current.value)
        //     })
        //     router.push('/dashboard');
        // } catch(e) {
        //     console.log(e);
        //     setError('Failed to create an account');
        // }
        setLoadingPlus(false);
        setLoadingPublish(false);
    }

    return PrivateRoute(
        <div>
            <form action="#" method="POST" onSubmit={handleSubmit} className="flex items-center justify-center py-2">
                <div className="w-1/2 max-w-md space-y-2 p-4 rounded-md bg-white shadow-md border border-gray-200 mt-10">
                    
                    <div className="flex flex-col">
                        <label htmlFor="create">Title*</label>
                        <input type="text" id="title" name="title" ref={title} className="border border-gray-300 rounded p-2"/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="create">Location</label>
                        <input type="text" id="location" name="location" ref={location} className="border border-gray-300 rounded p-2"/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="create">Notes/Comments</label>
                        <input type="text" id="notes" name="notes" ref={notes} className="border border-gray-300 rounded p-2"/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="create">Date*</label>
                        <input type="date" id="date" name="date" ref={dates} className="border border-gray-300 rounded p-2"/>
                        <p>Start Time*</p>
                        <input type="time" id="start" name="start" ref={start} className="border border-gray-300 rounded p-2"/>
                        <p>End Time*</p>
                        <input type="time" id="end" name="end" ref={end} className="border border-gray-300 rounded p-2"/>                   
                        <button className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2" onclick="myFunction()">+</button>
                    </div>

                    <div className="flex flex-col">
                        <p>Choose one*</p>
                        <div>
                            <input type="radio" id="slots" name="slots" className="border border-gray-300 rounded p-2" value="Slots"/>
                            <label htmlFor="create"> Number of Blocks</label>
                        </div>
                        <div>
                            <input type="radio" id="slots" name="slots" className="border border-gray-300 rounded p-2" value="Slots"/>
                            <label htmlFor="create"> Minutes per Time Slot</label>
                        </div>

                        <div>
                            <label htmlFor="create"> Number* </label>
                            <input type="number" id="number" name="number" ref={numSB} className="border border-gray-300 rounded p-2" min="1"/>  
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="create">Time Zone (US)</label>
                        <select className="border border-gray-300 rounded p-2">
                            <option value="select">Select One</option>
                            <option value="HST">HST</option>
                            <option value="AKST">AKST</option>
                            <option value="PST">PST</option>
                            <option value="MST">MST</option>
                            <option value="CST">CST</option>
                            <option value="EST">EST</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="create">Number of Votes per Time Slot</label>
                        <input type="number" id="numSlot" name="numSlot" ref={numSlot} className="border border-gray-300 rounded p-2" min="0"/>  
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="create">Number of Votes per Person</label>
                        <input type="number" id="numPerson" name="numPerson" ref={numPerson} className="border border-gray-300 rounded p-2" min="0"/>  
                    </div>

                    <div className="flex flex-col">
                        <p>Deadline for the poll</p>
                        <input type="date" id="deadlineDate" name="deadlineDate" ref={dates} className="border border-gray-300 rounded p-2"/>
                        <input type="time" id="deadlineTime" name="deadlineTime" ref={start} className="border border-gray-300 rounded p-2"/>
                    </div>

                    <div className="flex flex-col">
                        <button disabled={loadingPublish} className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2">Publish</button>
                    </div>

                </div>
            </form>
        </div>
    )
}