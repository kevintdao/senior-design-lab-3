import React from 'react'
import PollBlock from './PollBlock';

export default function DisplayPoll(props) {
    //const blocks = props.blocks.data.blocks;
    //const blocks = props.blocks[0].data.blocks;
    const blocks = props.blocks;
    const vps = props.vps;
    const vpu = props.vpu;
    //const id = props.blocks[0].id;
    return (
        <div id='poll-block'>
            {blocks.map((block) => {
                const id = block.id;
                
                const output = [];

                return block.data.blocks.map((b, i) => {
                    const blockDateEnd = b.end.toDate().toString().split(" ");
                    const blockDateStart = b.start.toDate().toString().split(" ");
                    const times = {"end": blockDateEnd[4], "start": blockDateStart[4]};
                    //console.log(times);
                    // console.log(i);
                    // console.log(blockDateEnd);
                    output.push(<PollBlock key={i} id={id} date={blockDateEnd} times={times} vps={vps} vpu={vpu} />);
                    return <PollBlock key={i} id={id} date={blockDateEnd} times={times} vps={vps} vpu={vpu} />
                });

                // const index = 0;
                // output.forEach((block, i ) => {
                //     console.log(i);
                //     return (<p>{`index-${index} i${i}`}</p>)
                // })

                // console.log(block.data.blocks[0].start.toDate());

                // return <p>{block.data.blocks[0].start.toDate().toString()}</p>
                
            })}
        </div>
    )
}