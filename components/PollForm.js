import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PollTime from './PollTime';

export default function PollForm(props) {
  const title = useRef();
  const location = useRef();
  const notes = useRef();
  const numSB = useRef();
  const numSlot = useRef();
  const numPerson = useRef();
  const deadline = useRef();
  const timezone = useRef();
  const [dateList, setDateList] = useState([]);
  const router = useRouter();

  const pollData = props.pollData;
  const blockData = props.blockData;

  const date = pollData.end.toDate();
  const pollDeadline = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;

  function addDate(block = undefined) {
    setDateList(dateList.concat(
        <PollTime key={dateList.length} index={dateList.length} block={block}/>
    ));
  }

  function AddButton() {
      return (
          <div>
              <button onClick={() => { addDate(); }} className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2">Add a Date</button>
          </div>
      )
  }
  
  function handleSubmit(){
    console.log(pollDeadline);
  }

  useEffect(() => {
    blockData.forEach((block) => {
      addDate(block);
    })
  }, [])

  return (
    <div>
      <div className="container py-2 flex items-center flex-col">
        <div className="md:mx-auto w-full rounded-md bg-white shadow-md border border-gray-200 p-4">
            <div className="flex md:flex-row md:space-x-2 justify-between flex-col">
                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="title">Title*</label>
                    <input type="text" id="title" name="title" ref={title} defaultValue={pollData.title} className="border border-gray-300 rounded p-2" />
                </div>

                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" ref={location} defaultValue={pollData.location} className="border border-gray-300 rounded p-2" />
                </div>

                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="notes">Notes/Comments</label>
                    <input type="text" id="notes" name="notes" ref={notes} defaultValue={pollData.notes} className="border border-gray-300 rounded p-2" />
                </div>
            </div>

            <div className="flex md:flex-row md:space-x-2 justify-between flex-col">
                <div className="flex flex-col w-full space-y-1">
                    <p>Deadline for the poll</p>
                    <input type="date" id="deadlineDate" name="deadlineDate" ref={deadline} defaultValue={pollDeadline} className="border border-gray-300 rounded p-2" />
                </div>

                <div className="flex flex-col w-full">
                </div>

                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="timezone">Time Zone (US)</label>
                    <select id="timezone" className="border border-gray-300 rounded p-2" ref={timezone} defaultValue={pollData.timezone}>
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
                        <input type="radio" id="blocks" name="SB" defaultChecked={pollData.type == 'blocks'} className="border border-gray-300 rounded p-2" value="block" />
                        <label htmlFor="blocks"> Number of Blocks</label>
                    </div>

                    <div>
                        <input type="radio" id="slots" name="SB" defaultChecked={pollData.type == 'slots'} className="border border-gray-300 rounded p-2" value="slot" />
                        <label htmlFor="slots"> Minutes per Time Slot!</label>
                        <div>Note*: Minutes per time slot must be at least 5</div>
                    </div>
                </div>

                <div>
                    <label htmlFor="number"> Number* </label>
                    <input type="number" id="number" name="number" ref={numSB} defaultValue={pollData.number} className="border border-gray-300 rounded p-2" min="1" />
                </div>
            </div>

            <div className="flex md:flex-row md:space-x-2 justify-between flex-col">
                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="numSlot">Votes per Slot</label>
                    <input type="number" id="numSlot" name="numSlot" ref={numSlot} defaultValue={pollData.votes_per_slot} className="border border-gray-300 rounded p-2" min="1" />
                </div>

                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="numPerson">Votes per Person</label>
                    <input type="number" id="numPerson" name="numPerson" ref={numPerson} defaultValue={pollData.votes_per_user} className="border border-gray-300 rounded p-2" min="1" />
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
