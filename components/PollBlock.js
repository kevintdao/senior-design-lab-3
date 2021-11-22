import React from 'react'

export default function PollBlock(props) {
    const [day, month, date, year] = props.date;
    const times = props.times;
    const id = props.id;

    return (
        <div id={id}>
            <h6>{day} {month} {date} {year}</h6>
            {times.map((time, i) => {
                return <div className="flex items-center" key={i}>
                    <input type="checkbox" className="mr-2" />
                    <p>{time}</p>
                    <p></p>
                </div>
            })}
            <hr className="mb-1 mt-1"/>
        </div>
    )
}
