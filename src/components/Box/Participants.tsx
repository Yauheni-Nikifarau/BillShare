import React, {useContext, useEffect, useState} from "react";
import Box from "./Box";
import delete_basket from '../../img/delete_basket.svg';
import {LibraryContext} from "../../context";
import {iLibrary} from "../../interfaces";


const Participants = () => {
    const context = useContext(LibraryContext);
    const fields = [{type: 'text', name: 'name', placeholder: 'Enter participant name'}];

    const removeParticipant = async (index: number) => {
        let tempLibrary = context.library;
        tempLibrary.data.participants = context.library.data.participants.filter((participant: any) => participant.id !== index);
        tempLibrary.data.spending = context.library.data.spending.filter((spending: any) => spending.participantId !== index);
        await context.updateLibrary({ ...tempLibrary });
    }

    const addParticipant = async (properties: any) => {
        let maxId = context.library.data.participants.length ? context.library.data.participants.reduce((prev: any, current: any) => current.id > prev.id ? current : prev).id : 0;
        let tempLibrary = context.library;
        let newParticipant = {id: maxId + 1, name: properties.name};
        tempLibrary.data.participants.push(newParticipant);
        await context.updateLibrary({...tempLibrary});
    }

    return (
        <Box title={'Participants'} buttonShouldBe={true} fields={fields} okClickHandler={addParticipant}>
            {context.library.data.participants.map((participant) => (
                <div className='box_item-box' key={participant.id}>
                    <p>{participant.name}</p>
                    <img onClick={() => removeParticipant(participant.id)} src={delete_basket} alt="delete button" className='item-box_button item-box_button_delete'/>
                </div>
            ))}

            <p>Total: {context.library.data.participants.length}</p>
        </Box>
    )
}

export default Participants;