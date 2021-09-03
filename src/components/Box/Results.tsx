import React from "react";
import delete_basket from "../../img/delete_basket.svg";
import Box from "./Box";

interface SampleProps {

}

class Results extends React.Component<SampleProps> {
    constructor(props: SampleProps) {
        super(props);
    }

    approve (event: any) {
        console.log(event.target.parentNode.classList.toggle('box_item-box_approved'))
    }

    render() {
        return(
            <Box title={'Results'} buttonShouldBe={true}>
                <div className='box_item-box'>
                    <p>From Alex to Bob - 11111</p>
                    <button onClick={this.approve} className='item-box_button item-box_button_approve'></button>
                </div>
                <div className='box_item-box box_item-box_approved'>
                    <p>From Alex to Bob - 11111</p>
                    <button  onClick={this.approve} className='item-box_button item-box_button_approve'></button>
                </div>
            </Box>
        )
    }
}

export default Results;