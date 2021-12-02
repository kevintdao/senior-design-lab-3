import React from 'react'
import PrivateRoute from '../../components/PrivateRoute'
import PollForm from '../../components/PollForm'

export default function create() {
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