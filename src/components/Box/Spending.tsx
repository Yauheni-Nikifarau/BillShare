import React, {useContext} from "react";
import delete_basket from "../../img/delete_basket.svg";
import Box from "./Box";
import {LibraryContext} from "../../context";

const Spending = () => {
    const context = useContext(LibraryContext);
    const fields = [{type: 'select', name: 'participant', options: context.library.data.participants.map((participant) => { return {value: participant.id, text: participant.name}})},{type: 'number', name: 'sum', placeholder: 'Enter Sum'}];

    const addSpending = async (properties: any) => {
        const maxId = context.library.data.spending.length ? context.library.data.spending.reduce((prev: any, current: any) => current.id > prev.id ? current : prev).id : 0;
        const tempLibrary = context.library;
        tempLibrary.data.spending.push({id: maxId + 1, participantId: +properties.participant, amount: +(+properties.sum).toFixed(2) });
        await context.updateLibrary({ ...tempLibrary });
    }

    const removeSpending = async (index: number) => {
        let tempLibrary = context.library;
        tempLibrary.data.spending = context.library.data.spending.filter((spending: any) => spending.id !== index);
        await context.updateLibrary({ ...tempLibrary });
    }

    const items = context.library.data.spending.map((spending) => {
        let participant = context.library.data.participants.find((participant) => participant.id === spending.participantId);
        let participantName = participant && participant.name ? participant.name : 'Unknown';
        return {
            id: spending.id,
            participantName: participantName,
            amount: spending.amount
        }
    })

    // let total = 0;
    // for (let spending of context.library.data.spending) {
    //     total += spending.amount;
    // }

    const total = context.library.data.spending.length ? context.library.data.spending.reduce((prev, cur) => {
        // let result = { ...cur };
        // result.amount = +cur.amount + +prev.amount;
        // return result;
        return { ...cur, amount: +cur.amount + +prev.amount }
    }).amount : 0;

    return(
        <Box title={'Spending'} buttonShouldBe={true} fields={fields} okClickHandler={addSpending}>
            {items.map((spending) => (
                <div className='box_item-box' key={spending.id}>
                    <p>{spending.participantName}: {spending.amount}</p>
                    <img onClick={() => removeSpending(spending.id)} src={delete_basket} alt="delete button" className='item-box_button item-box_button_delete'/>
                </div>
            ))}
            <p>Total: {total}</p>
        </Box>
    )
}

export default Spending;