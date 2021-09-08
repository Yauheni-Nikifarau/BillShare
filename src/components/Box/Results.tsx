import React from "react";
import Box from "./Box";

interface SampleProps {

}

const Results = () => {
    const approve = (event: any) => {
        event.target.parentNode.classList.toggle('box_item-box_approved')
    }
    return(
        <Box title={'Results'} buttonShouldBe={false}>
            <div className='box_item-box'>
                <p>From Alex to Bob - 11111</p>
                <button onClick={approve} className='item-box_button item-box_button_approve'></button>
            </div>
            <div className='box_item-box box_item-box_approved'>
                <p>From Alex to Bob - 11111</p>
                <button  onClick={approve} className='item-box_button item-box_button_approve'></button>
            </div>
        </Box>
    )
}

export default Results;