import React from 'react'
import PollBlock from './PollBlock';

export default function DisplayPoll(props) {
    const blocks = props.blocks;

    return (
        <div>
            {blocks.map((block, i) => {
                const id = block.id;
                const data = block.data;

                const blockDate = data.date.toDate().toString().split(" ");
                const times = data.time;

                return <PollBlock key={i} date={blockDate} times={times} />
            })}
        </div>
    )
}
