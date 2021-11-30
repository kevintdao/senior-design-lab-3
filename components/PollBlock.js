import React from 'react'

export default function PollBlock(props) {
    const [day, month, date, year] = props.date;
    const times = props.times;
    const votes = props.votes;
    const vps = props.vps;
    const id = props.id;
    var pollTimes = [];

    for (let i in votes){
        pollTimes.push(votes[i].length);
    }

    return (
        <div id={id}>
            <h6>{day} {month} {date} {year}</h6>
            {times.map((time, i) => {
                return <div className="flex items-center" key={i}>
                    <input type="checkbox" className="mr-2" disabled={pollTimes[i] == vps} />
                    <p>{time}</p>
                    <p>({pollTimes[i]} / {vps})</p>
                </div>
            })}
            <hr className="mb-1 mt-1"/>
        </div>
    )
}
