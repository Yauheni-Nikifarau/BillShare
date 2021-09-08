import React from "react";
import delete_basket from "../../img/delete_basket.svg";
import edit from "../../img/edit.svg";
import people from "../../img/people.svg";
import Box from "./Box";

interface SampleProps {

}

const Items = () => {

    return(
        <Box title={'Items'} buttonShouldBe={true}>
            <div className='box_item-box full'>
                <p>Beer ---- 111111</p>
                <img src={edit} alt="edit button" className='item-box_button item-box_button_edit'/>
                <img src={people} alt="people button" className='item-box_button item-box_button_people'/>
                <img src={delete_basket} alt="delete button" className='item-box_button item-box_button_delete'/>
            </div>
            <div className='box_item-box full'>
                <p>Beer ---- 111111</p>
                <img src={edit} alt="edit button" className='item-box_button item-box_button_edit'/>
                <img src={people} alt="people button" className='item-box_button item-box_button_people'/>
                <img src={delete_basket} alt="delete button" className='item-box_button item-box_button_delete'/>
            </div>
            <p>Total: 111111</p>
        </Box>
    )
}

export default Items;