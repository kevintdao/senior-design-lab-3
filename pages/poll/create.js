import React, { useRef, useState } from 'react'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import PrivateRoute from '../../components/PrivateRoute'
import Alert from '../../components/Alert'
import PollTime from '../../components/PollTime';
import { useAuth } from '../../AuthContext'

export default function create() {
    const titleRef = useRef();
    const locationRef = useRef();
    const notesRef = useRef();
    const numSBRef = useRef();
    const numSlotRef = useRef();
    const numPersonRef = useRef();
    const deadlineDateRef = useRef();
    const timezoneRef = useRef();
    const [error, setError] = useState('');
    const [dateList, setDateList] = useState([]);
    const { currentUser } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        // var errorMsg = "";

        // if (isEmpty(title.current.value)) {
        //     errorMsg += "Enter a title!\n\n"
        // }

        // if (isEmpty(date.current.value)) {
        //     errorMsg += "Enter a date!\n"
        // }

        // if (isEmpty(start.current.value)) {
        //     errorMsg += "Enter a start time!\n"
        // }

        // if (isEmpty(end.current.value)) {
        //     errorMsg += "Enter an end time!\n"
        // }

        // if (!document.getElementById('slot').checked && !document.getElementById('block').checked) {
        //     errorMsg += "Make a selection: Number of Blocks or Minutes per Time Slot!\n"
        // }

        // if (document.getElementById('slot').checked && numSB.current.value < 5) {
        //     errorMsg += "Time Slots must be at least 5 minutes!\n"
        // }

        // if (isEmpty(numSB.current.value)) {
        //     errorMsg += "Enter a number!\n"
        // }

        //return setError(errorMsg);

        // add new document for poll
        const newPollRef = doc(collection(db, 'polls'));
        insertPoll(newPollRef);
    }

    async function insertPoll(newPollRef) {
        let [year, month, date] = deadlineDateRef.current.value.split('-');

        await setDoc(newPollRef, {
            email: currentUser.email,
            end: new Date(year, month - 1, date, 0, 0, 0),
            location: locationRef.current.value,
            notes: notesRef.current.value,
            start: new Date(),
            timezone: timezoneRef.current.value,
            title: titleRef.current.value,
            votes_per_slot: numSlotRef.current.value,
            votes_per_user: numPersonRef.current.value
        });
    }

    function insertBlock() {

    }

    function insertTime() {

    }

    // TODO: the functionality of + button 
    // add components/class for the list of dates
    // and in the render() function use the list to print all of them
    function addDate() {
        setDateList(dateList.concat(
            <PollTime key={dateList.length} index={dateList.length} />
        ));
    }

    function AddButton() {
        return (
            <div>
                <button onClick={addDate} className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2">+</button>
            </div>
        )
    }

    return PrivateRoute(
        <div>
            <div className="bg-white shadow">
                <h1 className="text-4xl font-bold text-gray-900 py-3 container max-w-6xl lg:mx-auto">Create Poll</h1>
            </div>

            {/* error alert */}
            {error && <Alert text={error} />}

            <div className="container py-2 flex items-center flex-col">
                <div className="md:mx-auto w-full rounded-md bg-white shadow-md border border-gray-200 p-4">
                    <div className="flex md:flex-row md:space-x-2 justify-between flex-col">
                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="title">Title*</label>
                            <input type="text" id="title" name="title" ref={titleRef} className="border border-gray-300 rounded p-2" />
                        </div>

                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="location">Location</label>
                            <input type="text" id="location" name="location" ref={locationRef} className="border border-gray-300 rounded p-2" />
                        </div>

                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="notes">Notes/Comments</label>
                            <input type="text" id="notes" name="notes" ref={notesRef} className="border border-gray-300 rounded p-2" />
                        </div>
                    </div>

                    <div className="flex md:flex-row md:space-x-2 justify-between flex-col">
                        <div className="flex flex-col w-full space-y-1">
                            <p>Deadline for the poll</p>
                            <input type="date" id="deadlineDate" name="deadlineDate" ref={deadlineDateRef} className="border border-gray-300 rounded p-2" />
                        </div>

                        <div className="flex flex-col w-full">
                        </div>

                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="timezone">Time Zone (US)</label>
                            <select id="timezone" className="border border-gray-300 rounded p-2" ref={timezoneRef}>
                                <option value=""></option>
                                <option value="HST">HST</option>
                                <option value="AKST">AKST</option>
                                <option value="PST">PST</option>
                                <option value="MST">MST</option>
                                <option value="CST">CST</option>
                                <option value="EST">EST</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p>Choose one*</p>
                        <div>
                            <div>
                                <input type="radio" id="block" name="SB" className="border border-gray-300 rounded p-2" value="block" />
                                <label htmlFor="block"> Number of Blocks</label>
                            </div>

                            <div>
                                <input type="radio" id="slot" name="SB" className="border border-gray-300 rounded p-2" value="slot" />
                                <label htmlFor="slot"> Minutes per Time Slot</label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="number"> Number* </label>
                            <input type="number" id="number" name="number" ref={numSBRef} className="border border-gray-300 rounded p-2" min="1" />
                        </div>
                    </div>

                    <div className="flex md:flex-row md:space-x-2 justify-between flex-col">
                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="numSlot">Votes per Slot</label>
                            <input type="number" id="numSlot" name="numSlot" ref={numSlotRef} className="border border-gray-300 rounded p-2" min="0" />
                        </div>

                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="numPerson">Votes per Person</label>
                            <input type="number" id="numPerson" name="numPerson" ref={numPersonRef} className="border border-gray-300 rounded p-2" min="0" />
                        </div>
                    </div>

                    <hr className="mt-2 mb-2" />

                    {dateList}

                    <AddButton />

                    <div>
                        <button onClick={handleSubmit} className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2">Publish</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
