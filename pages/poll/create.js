import React, { useRef, useState, useEffect } from 'react'
import { collection, doc, setDoc, addDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
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
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        var errorMsg = "";

        // if (title.current.value === "") {
        //     errorMsg += "Enter a title!\n"
        // }

        // if (deadlineDate.current.value === "") {
        //     errorMsg += "Enter a deadline date!\n";
        // }
        // // since there's only a deadline date, I set the deadline time to be 11:59 PM
        // else if (!greaterThanCurrentDate(deadlineDate.current.value, "23:59")) {
        //     errorMsg += "Enter a valid deadline date!\n";
        // }

        // if (!document.getElementById('slots').checked && !document.getElementById('blocks').checked) {
        //     errorMsg += "Make a selection: Number of Blocks or Minutes per Time Slot!\n"
        // }

        // if (numSB.current.value === "") {
        //     errorMsg += "Enter a number!\n"
        // }

        // if (document.getElementById('slots').checked && numSB.current.value < 5) {
        //     errorMsg += "Time Slots must be at least 5 minutes!\n"
        // }

        // if (dateList.length > 0) {
        //     for (var i = 0; i < dateList.length; i++) {
        //         let d = document.getElementById("date-" + i).value;
        //         let s = document.getElementById("start-" + i).value;
        //         let e = document.getElementById("end-" + i).value;
        //         if (d == "" || s == "" || e == "") {
        //             errorMsg += "Enter valid dates and times!\n";
        //         }
        //         else if (s >= e)
        //         {
        //             errorMsg += "Start times must be before End times!\n";
        //         }
        //         // start time cannot be same as current time or anytime before that
        //         else if (!greaterThanCurrentDate(d, s))
        //         {
        //             errorMsg += "Invlaid times or dates!\n";
        //         }
        //     }
        // }
        // else {
        //     errorMsg += "Add a date to the poll!\n";
        // }

        if (errorMsg != ""){
            return setError(errorMsg.split('\n').map(str => <p>{str}</p>));
        }
        else{
            // add new document for poll
            insertPoll();
        }
    }

    function greaterThanCurrentDate(d1, t1) {
        let newDate = new Date();
        let currDay = newDate.getDate();
        let currMonth = newDate.getMonth() + 1;
        let currYear = newDate.getFullYear();
        let currHours = newDate.getHours();
        let currMinutes = newDate.getMinutes();

        let d2 = currYear + '-' + currMonth + '-' + currDay;
        let t2 = currHours + ':' + currMinutes;

        if (currHours < 10)
        {
            t2 = '0' + currHours + ':' + currMinutes;  
        }

        if(d1 > d2)
        {
            return true;
        }
        
        if(d1 == d2 && t1 > t2)
        {
            return true;
        }
        
        return false;
    }

    async function insertPoll() {
        let [year, month, date] = deadlineDate.current.value.split('-');

        const newPoll = await addDoc(collection(db, 'polls'), {
            email: currentUser.email,
            end: new Date(year, month - 1, date, 0, 0, 0),
            location: location.current.value,
            notes: notes.current.value,
            start: new Date(),
            timezone: timezone.current.value,
            title: title.current.value,
            votes_per_slot: numSlot.current.value,
            votes_per_user: numPerson.current.value
        })

        const blocks = getBlocks(newPoll.id);

        blocks.then((response) => {
            router.push('/dashboard');
        })
    }

    async function getBlocks(pollId) {
        let blocks = document.querySelectorAll('[id^="block-"]');
        let type = document.getElementById('slots').checked ? 'slots' : 'blocks';
        let number = document.getElementById('number').value;

        let output = [];
        blocks.forEach(async (block, i) => {
            let date = block.querySelector('[id^="date"]').value;
            let start = block.querySelector('[id^="start"]').value;
            let end = block.querySelector('[id^="end"]').value;

            const currentBlock = splitTime(date, start, end, type, number);
            let votes = {};

            for(let i = 0; i < currentBlock.length; i++){
                votes[i] = "";
            }

            const newBlock = await addDoc(collection(db, 'blocks'), {
                blocks: currentBlock,
                poll: pollId,
                votes: votes
            })
        })
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
        return output;
    }

    function createDates(startTime, endTime, duration, slots, date){
        let [year, month, day] = date.split('-');

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
                <button onClick={addDate} className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2">Add a Date</button>
            </div>
        )
    }

    // function removeDate() {
    //     if(dateList.length > 0){
    //         let removedDate = dateList.pop();
    //         let element = document.getElementById(`block-${removedDate.key}`);
    //         element.remove();
    //     }
    //     setDateList(dateList);
    // }

    // function RemoveButton() {
    //     return (
    //         <div>
    //             <button onClick={removeDate} className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2">Remove last Date</button>
    //         </div>
    //     )
    // }

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
                    {/* <RemoveButton /> */}

                    <div>
                        <button onClick={handleSubmit} className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2">Publish</button>
                    </div>
                </div>
            </div>
        </div>
    )
}