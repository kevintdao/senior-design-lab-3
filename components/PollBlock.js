import React from 'react'

export default function PollBlock(props) {
    const [day, month, date, year] = props.date;
    const times = props.times;

    return (
        <div>
            <h3>{day} {month} {date} {year}</h3>
            {times.map((time, i) => {
                return <p key={month + date + time}>{time}</p>
            })}
        </div>
    )
}
