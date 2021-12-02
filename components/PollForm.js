import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PollTime from './PollTime';
import { collection, doc, setDoc, addDoc, query, getDocs, where, getDoc, updateDoc, writeBatch } from 'firebase/firestore'
import { db } from '../utils/firebase'
import { splitTime } from '../utils/time';
import { useAuth } from '../AuthContext';
import { checkPoll } from '../utils/validation';
import Alert from './Alert';

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
  const { currentUser } = useAuth();
  const [error, setError] = useState('');

  const formType = props.type;
  const id = props.id;
  if(formType == 'edit'){
    const pollData = props.pollData;
    const blockData = props.blockData;
  
    const date = pollData.end.toDate();
    const pollDeadline = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
  }

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

  async function updatePoll(pollId){
    let [year, month, date] = deadline.current.value.split('-');
    let type = document.getElementById('slots').checked ? 'slots' : 'blocks';
    let number = document.getElementById('number').value;

    const pollRef = doc(db, 'polls', pollId);
    await updateDoc(pollRef, {
      end: new Date(year, month - 1, date, 0, 0, 0),
      location: location.current.value,
      notes: notes.current.value,
      timezone: timezone.current.value,
      title: title.current.value,
      votes_per_slot: numSlot.current.value,
      votes_per_user: numPerson.current.value,
      type: type,
      number: number
    })

    updateBlocks(id, type, number)
  }

  async function updateBlocks(pollId, type, number){
    let blocks = document.querySelectorAll('[id^="block-"]');

    blocks.forEach(async (block, i) => {
        let date = block.querySelector('[id^="date"]').value;
        let start = block.querySelector('[id^="start"]').value;
        let end = block.querySelector('[id^="end"]').value;

        const currentBlock = splitTime(date, start, end, type, number);
        let votes = {};

        for(let i = 0; i < currentBlock.length; i++){
            votes[i] = [];
        }

        const newBlock = await updateDoc(doc(db, 'blocks', `${pollId}-${i}`), {
            blocks: currentBlock,
            poll: pollId,
            votes: votes
        })
    })
  }

  async function insertPoll() {
    let [year, month, date] = deadline.current.value.split('-');
    let type = document.getElementById('slots').checked ? 'slots' : 'blocks';
    let number = document.getElementById('number').value;

    const newPoll = await addDoc(collection(db, 'polls'), {
        email: currentUser.email,
        end: new Date(year, month - 1, date, 0, 0, 0),
        location: location.current.value,
        notes: notes.current.value,
        start: new Date(),
        timezone: timezone.current.value,
        title: title.current.value,
        votes_per_slot: numSlot.current.value,
        votes_per_user: numPerson.current.value,
        type: type,
        number: number
    })

    const blocks = insertBlocks(newPoll.id, type, number);

    blocks.then((response) => {
        router.push('/dashboard');
    })
  }

  async function insertBlocks(pollId, type, number) {
    let blocks = document.querySelectorAll('[id^="block-"]');

    blocks.forEach(async (block, i) => {
        let date = block.querySelector('[id^="date"]').value;
        let start = block.querySelector('[id^="start"]').value;
        let end = block.querySelector('[id^="end"]').value;

        const currentBlock = splitTime(date, start, end, type, number);
        let votes = {};

        for(let i = 0; i < currentBlock.length; i++){
            votes[i] = [];
        }

        const newBlock = await setDoc(doc(db, 'blocks', `${pollId}-${i}`), {
            blocks: currentBlock,
            poll: pollId,
            votes: votes
        })
    })
  }
  
  function handleSubmit(){
    let msg = checkPoll(
      title.current.value, 
      deadline.current.value, 
      document.getElementById('slots'),
      document.getElementById('blocks'),
      numSB.current.value,
      dateList
    );

    if (msg != ""){
      return setError(msg.split('\n').map((str, i) => <p key={i}>{str}</p>));
    }
    else{
      if(formType == 'edit'){
        updatePoll(id).then((response) => {
          router.push('/dashboard');
        });
      }
      else{
        insertPoll();
      }
    }
  }

  useEffect(() => {
    if(formType == 'edit'){
      var array = [];
      blockData.forEach((block) => {
        array.push(<PollTime key={array.length} index={array.length} block={block}/>);
      })
      setDateList(array);
    }
  }, [])

  return (
    <div>
      {error && <Alert text={error} />}
      <div className="container py-2 flex items-center flex-col">
        <div className="md:mx-auto w-full rounded-md bg-white shadow-md border border-gray-200 p-4">
            <div className="flex md:flex-row md:space-x-2 justify-between flex-col">
                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="title">Title*</label>
                    <input type="text" id="title" name="title" ref={title} defaultValue={formType == 'edit' ? pollData.title : ""} className="border border-gray-300 rounded p-2" />
                </div>

                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" ref={location} defaultValue={formType == 'edit' ? pollData.location : ""} className="border border-gray-300 rounded p-2" />
                </div>

                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="notes">Notes/Comments</label>
                    <input type="text" id="notes" name="notes" ref={notes} defaultValue={formType == 'edit' ? pollData.notes : ""} className="border border-gray-300 rounded p-2" />
                </div>
            </div>

            <div className="flex md:flex-row md:space-x-2 justify-between flex-col">
                <div className="flex flex-col w-full space-y-1">
                    <p>Deadline for the poll</p>
                    <input type="date" id="deadlineDate" name="deadlineDate" ref={deadline} defaultValue={formType == 'edit' ? pollDeadline : ""} className="border border-gray-300 rounded p-2" />
                </div>

                <div className="flex flex-col w-full">
                </div>

                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="timezone">Time Zone (US)</label>
                    <select id="timezone" className="border border-gray-300 rounded p-2" ref={timezone} defaultValue={formType == 'edit' ? pollData.timezone : ""}>
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
                        <input type="radio" id="blocks" name="SB" defaultChecked={formType == 'edit' ? pollData.type == 'blocks' : ""} className="border border-gray-300 rounded p-2" value="block" />
                        <label htmlFor="blocks"> Number of Blocks</label>
                    </div>

                    <div>
                        <input type="radio" id="slots" name="SB" defaultChecked={formType == 'edit' ? pollData.type == 'slots' : ""} className="border border-gray-300 rounded p-2" value="slot" />
                        <label htmlFor="slots"> Minutes per Time Slot!</label>
                        <div>Note*: Minutes per time slot must be at least 5</div>
                    </div>
                </div>

                <div>
                    <label htmlFor="number"> Number* </label>
                    <input type="number" id="number" name="number" ref={numSB} defaultValue={formType == 'edit' ? pollData.number : ""} className="border border-gray-300 rounded p-2" min="1" />
                </div>
            </div>

            <div className="flex md:flex-row md:space-x-2 justify-between flex-col">
                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="numSlot">Votes per Slot</label>
                    <input type="number" id="numSlot" name="numSlot" ref={numSlot} defaultValue={formType == 'edit' ? pollData.votes_per_slot : ""} className="border border-gray-300 rounded p-2" min="1" />
                </div>

                <div className="flex flex-col w-full space-y-1">
                    <label htmlFor="numPerson">Votes per Person</label>
                    <input type="number" id="numPerson" name="numPerson" ref={numPerson} defaultValue={formType == 'edit' ? pollData.votes_per_user : ""} className="border border-gray-300 rounded p-2" min="1" />
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
