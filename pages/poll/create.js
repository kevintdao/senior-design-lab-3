import { isEmpty } from '@firebase/util';
import React, { useRef, useState } from 'react'
import PrivateRoute from '../../components/PrivateRoute'
import Alert from '../../components/Alert'

export default function create() {
    const title = useRef();
    const location = useRef();
    const notes = useRef();
    const date = useRef();
    const start = useRef();
    const end = useRef();
    const [loadingPlus, setLoadingPlus] = useState(false);
    const numSB = useRef();
    const numSlot = useRef();
    const numPerson = useRef();
    const [loadingPublish, setLoadingPublish] = useState(false);
    const deadlineDate = useRef();
    const deadlineTime = useRef();
    const [error, setError] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        var errorMsg = "";
        
        if(isEmpty(title.current.value)){
            errorMsg += "Enter a title!\n\n"
        }
        
        if (isEmpty(date.current.value)){
            errorMsg += "Enter a date!\n"
        }

        if (isEmpty(start.current.value)){
            errorMsg += "Enter a start time!\n"
        }

        if (isEmpty(end.current.value)){
            errorMsg += "Enter an end time!\n"
        }

        if (!document.getElementById('slot').checked && !document.getElementById('block').checked){
            errorMsg += "Make a selection: Number of Blocks or Minutes per Time Slot!\n"
        }

        if (document.getElementById('slot').checked && numSB.current.value < 5){
            errorMsg += "Time Slots must be at least 5 minutes!\n"
        }

        if (isEmpty(numSB.current.value)){
            errorMsg += "Enter a number!\n"
        }

        setLoadingPlus(false);
        setLoadingPublish(false);
        return setError(errorMsg);
    }

    function myFunction() {
        document.getElementById("myDIV").innerHTML="myDIV";
    }


    return PrivateRoute(
        <div>
            <form action="#" method="POST" onSubmit={handleSubmit} className="flex items-center justify-center py-2">
                <div className="w-1/2 max-w-md space-y-2 p-4 rounded-md bg-white shadow-md border border-gray-200 mt-10">
                    
                    {/* error alert */}
                    {error && <Alert text={error} />}

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
                        <input type="date" id="date" name="date" ref={date} className="border border-gray-300 rounded p-2"/>
                        <p>Start Time*</p>
                        <input type="time" id="start" name="start" ref={start} className="border border-gray-300 rounded p-2"/>
                        <p>End Time*</p>
                        <input type="time" id="end" name="end" ref={end} className="border border-gray-300 rounded p-2"/>                   
                        <button onclick={myFunction} disabled={loadingPlus} className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2">+</button>
                    </div>

                    <div className="flex flex-col">
                        <p>Choose one*</p>
                        <div>
                            <input type="radio" id="block" name="SB" className="border border-gray-300 rounded p-2" value="block"/>
                            <label htmlFor="create"> Number of Blocks</label>
                            <p>
                                
                            </p>
                            <input type="radio" id="slot" name="SB" className="border border-gray-300 rounded p-2" value="slot"/>
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
                        <input type="date" id="deadlineDate" name="deadlineDate" ref={deadlineDate} className="border border-gray-300 rounded p-2"/>
                        <input type="time" id="deadlineTime" name="deadlineTime" ref={deadlineTime} className="border border-gray-300 rounded p-2"/>
                    </div>

                    <div>
                        <button className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2">Publish</button>
                    </div>

                </div>
            </form>
        </div>
    )
}
