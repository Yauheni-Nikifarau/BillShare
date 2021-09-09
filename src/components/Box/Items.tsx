import React, {useContext} from "react";
import delete_basket from "../../img/delete_basket.svg";
import edit from "../../img/edit.svg";
import people from "../../img/people.svg";
import Box from "./Box";
import {LibraryContext} from "../../context";

const Items = () => {
    const context = useContext(LibraryContext);
    const fields = [{type: 'text', name: 'title', placeholder: 'Item Title'} ,{type: 'number', name: 'sum', placeholder: 'Enter Sum'}];

    const addItem = async (properties: any) => {
        const maxId = context.library.data.items.length ? context.library.data.items.reduce((prev: any, current: any) => current.id > prev.id ? current : prev).id : 0;
        const tempLibrary = context.library;
        const initialParticipantsID = context.library.data.participants.map((participant) => participant.id);
        tempLibrary.data.items.push({id: maxId + 1, name: properties.title, sum: +(+properties.sum).toFixed(2), participantsId: initialParticipantsID });
        await context.updateLibrary({ ...tempLibrary });
    }

    const removeItem = async (index: number) => {
        let tempLibrary = context.library;
        tempLibrary.data.items = context.library.data.items.filter((item: any) => item.id !== index);
        await context.updateLibrary({ ...tempLibrary });
    }

    const changeParticipantList = async (itemId: number, participantId: number) => {
        let tempLibrary = context.library;
        const item = tempLibrary.data.items.find((item) => item.id === itemId);
        if (item) {
            const itemIndex = tempLibrary.data.items.indexOf(item);
            if (item.participantsId.includes(participantId)) {
                const index = item.participantsId.indexOf(participantId);
                tempLibrary.data.items[itemIndex].participantsId.splice(index, 1);
            } else {
                tempLibrary.data.items[itemIndex].participantsId.push(participantId)
            }
        }
        await context.updateLibrary({ ...tempLibrary });
    }

    let participants: any = [];
    for (let participant of context.library.data.participants) {
        participants[participant.id] = participant.name;
    }

    const total = context.library.data.items.length ? context.library.data.items.reduce((prev, cur) => {
        return { ...cur, sum: +cur.sum + +prev.sum }
    }).sum : 0;

    return(
        <Box title={'Items'} buttonShouldBe={true} fields={fields} okClickHandler={addItem}>
            {context.library.data.items.map((item) => (
                    <div className='box_item-box' key={item.id}>
                        <p>{item.name} ---- {item.sum}</p>
                        <img src={people} alt="people button" className='item-box_button item-box_button_people'/>
                        <ul className='item-box_participants-list'>
                            {participants.map((value: string, index: number) => (
                                <li>
                                    <label>
                                        <input type="checkbox"
                                               checked={item.participantsId.includes(index)}
                                               onChange={() => changeParticipantList(item.id, index)}/>
                                        <span>{value}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <img src={delete_basket}  onClick={() => removeItem(item.id)} alt="delete button" className='item-box_button item-box_button_delete'/>
                    </div>
            ))}
            <p>Total: {total}</p>
        </Box>
    )
}

export default Items;