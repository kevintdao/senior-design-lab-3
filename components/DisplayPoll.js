import React from 'react'
import PollBlock from './PollBlock';

export default function DisplayPoll(props) {
    const blocks = props.blocks;
    const vps = props.vps;
    const vpu = props.vpu;

    return (
        <div>
            {blocks.map((block, i) => {
                const id = block.id;
                const data = block.data;

                const blockDate = data.date.toDate().toString().split(" ");
                const times = data.time;
                const votes = data.vote;

                return <PollBlock key={i} id={id} date={blockDate} times={times} votes={votes} vps={vps} vpu={vpu}/>
            })}
        </div>
    )
}
