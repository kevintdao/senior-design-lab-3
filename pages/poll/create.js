import React, { useRef, useState } from 'react'
import PrivateRoute from '../../components/PrivateRoute'

export default function create() {
    const title = useRef();
    const location = useRef();
    const notes = useRef();
    const dates = useRef();
    const start = useRef();
    const end = useRef();
    const [loading, setLoading] = useState(false);

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
        setLoading(false)
    }

    return PrivateRoute(
        <div>
        Create Poll Page
            <form action="#" method="POST" onSubmit={handleSubmit} className="flex items-center justify-center py-2">
                <div className="w-1/2 max-w-md space-y-2 p-4 rounded-md bg-white shadow-md border border-gray-200 mt-10">
                    
                    <div className="flex flex-col">
                        <label htmlFor="create">Title:</label>
                        <input type="text" id="title" name="title" ref={title} className="border border-gray-300 rounded p-2"/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="create">Location:</label>
                        <input type="text" id="location" name="location" ref={location} className="border border-gray-300 rounded p-2"/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="create">Notes/Comments:</label>
                        <input type="text" id="notes" name="notes" ref={notes} className="border border-gray-300 rounded p-2"/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="create">Dates:</label>
                        <input type="date" id="date" name="date" ref={dates} className="border border-gray-300 rounded p-2"/>
                        <input type="time" id="start" name="start" ref={start} className="border border-gray-300 rounded p-2"/>
                        <input type="time" id="end" name="end" ref={end} className="border border-gray-300 rounded p-2"/>                   
                        <button disabled={loading} className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2">+</button>
                    </div>

                    <div className="flex flex-col">
                        <p>Choose one:</p>
                        <input type="radio" id="slots" name="slots" value="Slots"/>
                        <label htmlFor="create">Slots</label><br>
                        <input type="radio" id="slots" name="slots" value="Slots"/>
                        <label htmlFor="create">Slots</label></br>
                    </div>

                </div>
            </form>
        </div>
    )
}