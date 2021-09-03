import React from "react";
import Box from "./Box";
import delete_basket from '../../img/delete_basket.svg';
import {iLibrary} from "../../interfaces";

interface SampleProps {
    library: iLibrary;
    removeParticipant: (index: number) => void;
    addParticipant: (properties: any) => void
}


class Participants extends React.Component<SampleProps> {
    fields;

    constructor(props: SampleProps) {
        super(props);
        this.fields = [{type: 'text', name: 'name', placeholder: 'Enter participant name'}]
    }


    render() {

        return(
            <Box title={'Participants'} buttonShouldBe={true} fields={this.fields}>
                {this.props.library.data.participants.map((participant) => (
                    <div className='box_item-box' key={participant.id}>
                        <p>{participant.name}</p>
                        <img onClick={() => this.props.removeParticipant(participant.id)} src={delete_basket} alt="delete button" className='item-box_button item-box_button_delete'/>
                    </div>
                ))}

                <p>Total: {this.props.library.data.participants.length}</p>
            </Box>
        )
    }
}

export default Participants;