import React, { useRef, useState, useEffect } from 'react'
import PrivateRoute from '../../components/PrivateRoute'
import PollForm from '../../components/PollForm'

export default function create() {
    const [error, setError] = useState('');

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
            // insertPoll();
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

            <div className="container max-w-6xl lg:mx-auto">
                <PollForm type={"create"}/>
            </div>            
        </div>
    )
}