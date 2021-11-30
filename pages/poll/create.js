import React, { useRef, useState } from 'react'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import PrivateRoute from '../../components/PrivateRoute'
import Alert from '../../components/Alert'
import PollTime from '../../components/PollTime';
import { useAuth } from '../../AuthContext'

export default function create() {
    const title = useRef();
    const location = useRef();
    const notes = useRef();
    const numSB = useRef();
    const numSlot = useRef();
    const numPerson = useRef();
    const deadlineDate = useRef();
    const timezone = useRef();
    const [error, setError] = useState('');
    const [dateList, setDateList] = useState([]);
    const { currentUser } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        var errorMsg = "";

        if (title.current.value == "") {
            errorMsg += "Enter a title!\n"
        }

        if (deadlineDate.current.value == "") {
            errorMsg += "Enter a deadline date!\n";
        }

        if (!document.getElementById('slots').checked && !document.getElementById('blocks').checked) {
            errorMsg += "Make a selection: Number of Blocks or Minutes per Time Slot!\n"
        }

        if (numSB.current.value == "") {
            errorMsg += "Enter a number!\n"
        }

        if (document.getElementById('slots').checked && numSB.current.value < 5) {
            errorMsg += "Time Slots must be at least 5 minutes!\n"
        }

        // errorMsg += (date.current == null)
        // if (date.current.value) {
        //     errorMsg += "Enter a start time!"
        // }

        // if (isEmpty(start.current.value)) {
        //     errorMsg += "Enter a start time!"
        // }

        // if (isEmpty(end.current.value)) {
        //     errorMsg += "Enter an end time!"
        // }

        if (error){
            return setError(errorMsg.split('\n').map(str => <p>{str}</p>));
        }
        else{
            // add new document for poll
            const newPollRef = doc(collection(db, 'polls'));
            getBlocks();
            // insertPoll(newPollRef);
        }
    }

    async function insertPoll(newPollRef) {
        let [year, month, date] = deadlineDate.current.value.split('-');
        let blocks = getBlocks();

        await setDoc(newPollRef, {
            email: currentUser.email,
            end: new Date(year, month - 1, date, 0, 0, 0),
            location: location.current.value,
            notes: notes.current.value,
            start: new Date(),
            timezone: timezone.current.value,
            title: title.current.value,
            votes_per_slot: numSlot.current.value,
            votes_per_user: numPerson.current.value
        });
    }

    function getBlocks() {
        let blocks = document.querySelectorAll('[id^="block-"]');

        blocks.forEach((block) => {
            let date = block.querySelector('[id^="date"]').value;
            let start = block.querySelector('[id^="start"]').value;
            let end = block.querySelector('[id^="end"]').value;

            splitTime(date, start, end, 'blocks', 5);
            splitTime(date, start, end, 'slots', 15);
        })

        return [];
    }

    function splitTime(date, start, end, type, number) {
        let [startHour, startMin] = start.split(':');
        let [endHour, endMin] = end.split(':');
        
        let startTime = startHour * 60 + (startMin - 0);
        let endTime = endHour * 60 + (endMin - 0);

        let blockDuration = endTime - startTime;

        let output = [];
        if(type == 'blocks'){
            let eachBlockDuration = blockDuration / number;
            
            output = createDates(startTime, endTime, eachBlockDuration, number, date);
        }
        else{
            let numOfSlot = blockDuration / number;
            
            output = createDates(startTime, endTime, number, numOfSlot, date);
        }
        console.log(output);
    }

    function createDates(startTime, endTime, duration, slots, date){
        let [year, month, day] = date.split('-');
        console.log(duration);

        let output = [];
        for(let i = 0; i < slots; i++){
            let blockStart = startTime + duration * i;
            let blockEnd = startTime + duration * (i + 1);

            let blockStartHour = Math.floor(blockStart / 60);
            let blockStartMin = blockStart - blockStartHour * 60;
            let blockEndHour = Math.floor(blockEnd / 60);
            let blockEndMin = blockEnd - blockEndHour * 60;

            output.push({
                start: new Date(year, month - 1, day, blockStartHour, blockStartMin),
                end: new Date(year, month - 1, day, blockEndHour, blockEndMin)
            });
        }
        return output;
    }

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
                        </div>

                        <div className="flex flex-col w-full">
                        </div>

                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="timezone">Time Zone (US)</label>
                            <select id="timezone" className="border border-gray-300 rounded p-2" ref={timezone}>
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
                                <input type="radio" id="blocks" name="SB" className="border border-gray-300 rounded p-2" value="block" />
                                <label htmlFor="blocks"> Number of Blocks</label>
                            </div>

                            <div>
                                <input type="radio" id="slots" name="SB" className="border border-gray-300 rounded p-2" value="slot" />
                                <label htmlFor="slots"> Minutes per Time Slot!</label>
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
                        <button onClick={handleSubmit} className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2">Publish</button>
                    </div>
                </div>
            </div>
        </div>
    )
}