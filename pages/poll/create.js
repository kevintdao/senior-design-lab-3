import React, { useRef, useState } from 'react'
import PrivateRoute from '../../components/PrivateRoute'
import Alert from '../../components/Alert'
import PollTime from '../../components/PollTime';

export default function create() {
    const title = useRef();
    const location = useRef();
    const notes = useRef();
    const date = useRef();
    const start = useRef();
    const end = useRef();
    const numSB = useRef();
    const numSlot = useRef();
    const numPerson = useRef();
    const deadlineDate = useRef();
    const deadlineTime = useRef();
    const [error, setError] = useState('');
    const [dateList, setDateList] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        var errorMsg = "";

        if (title.current.value == "") {
            errorMsg += "Enter a title!\n"
        }

        // ADD: poll cannot be created in the past!
        if (deadlineDate.current.value == "") {
            errorMsg += "Enter a valid deadline date!\n"
        }

        if (deadlineTime.current.value == "") {
            errorMsg += "Enter a deadline Time!\n"
        }

        if (!document.getElementById('slot').checked && !document.getElementById('block').checked) {
            errorMsg += "Make a selection: Number of Blocks or Minutes per Time Slot!\n"
        }

        if (numSB.current.value == "") {
            errorMsg += "Enter a number!\n"
        }

        if (document.getElementById('slot').checked && numSB.current.value < 5) {
            errorMsg += "Time Slots must be at least 5 minutes!\n"
        }

        errorMsg += (date.current == null)
        // if (date.current.value) {
        //     errorMsg += "Enter a start time!"
        // }

        // if (isEmpty(start.current.value)) {
        //     errorMsg += "Enter a start time!"
        // }

        // if (isEmpty(end.current.value)) {
        //     errorMsg += "Enter an end time!"
        // }

        return setError(errorMsg.split('\n').map(str => <p>{str}</p>));
    }

    function addDate() {
        setDateList(dateList.concat(
            <PollTime key={dateList.length} date={date} start={start} end={end} index={dateList.length} />
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

            <form action="#" method="POST" onSubmit={handleSubmit} className="container py-2 flex items-center flex-col">
                <div className="md:mx-auto w-full rounded-md bg-white shadow-md border border-gray-200 p-4">
                    <div className="flex md:flex-row md:space-x-2 justify-between flex-col">
                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="title">Title*</label>
                            <input type="text" id="title" name="title" ref={title} className="border border-gray-300 rounded p-2" />
                        </div>

                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="location">Location</label>
                            <input type="text" id="location" name="location" ref={location} className="border border-gray-300 rounded p-2" />
                        </div>

                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="notes">Notes/Comments</label>
                            <input type="text" id="notes" name="notes" ref={notes} className="border border-gray-300 rounded p-2" />
                        </div>
                    </div>

                    <div className="flex md:flex-row md:space-x-2 justify-between flex-col">
                        <div className="flex flex-col w-full space-y-1">
                            <p>Deadline for the poll</p>
                            <input type="date" id="deadlineDate" name="deadlineDate" ref={deadlineDate} className="border border-gray-300 rounded p-2" />
                            <input type="time" id="deadlineTime" name="deadlineTime" ref={deadlineTime} className="border border-gray-300 rounded p-2" />
                        </div>

                        <div className="flex flex-col w-full">
                        </div>

                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="timezone">Time Zone (US)</label>
                            <select id="timezone" className="border border-gray-300 rounded p-2">
                                <option value="select">Select One</option>
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
                                <label htmlFor="slot"> Minutes per Time Slot!</label>
                                <div>Note*: Minutes per time slot must be at least 5</div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="number"> Number* </label>
                            <input type="number" id="number" name="number" ref={numSB} className="border border-gray-300 rounded p-2" min="1" />
                        </div>
                    </div>

                    <div className="flex md:flex-row md:space-x-2 justify-between flex-col">
                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="numSlot">Votes per Slot</label>
                            <input type="number" id="numSlot" name="numSlot" ref={numSlot} className="border border-gray-300 rounded p-2" min="0" />
                        </div>

                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="numPerson">Votes per Person</label>
                            <input type="number" id="numPerson" name="numPerson" ref={numPerson} className="border border-gray-300 rounded p-2" min="0" />
                        </div>
                    </div>

                    <hr className="mt-2 mb-2" />

                    {dateList}

                    <AddButton />

                    <div>
                        <button className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2">Publish</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
