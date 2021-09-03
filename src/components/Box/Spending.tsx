import React from "react";
import delete_basket from "../../img/delete_basket.svg";
import Box from "./Box";

interface SampleProps {

}

class Spending extends React.Component<SampleProps> {
    constructor(props: SampleProps) {
        super(props);
    }

    render() {
        return(
            <Box title={'Spending'} buttonShouldBe={true}>
                <div className='box_item-box'>
                    <p>Alex: 11111</p>
                    <img src={delete_basket} alt="delete button" className='item-box_button item-box_button_delete'/>
                </div>
                <p>Total: 11111</p>
            </Box>
        )
    }
}

export default Spending;