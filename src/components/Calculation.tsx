import React from "react";
import Items from "./Box/Items";
import Participants from "./Box/Participants";
import Results from "./Box/Results";
import Spending from "./Box/Spending";
import {iLibrary} from "../interfaces";

interface SampleProps {

}

interface MyState {
    library: iLibrary
}

class Calculation extends React.Component<SampleProps, MyState> {
    constructor(props: SampleProps) {
        super(props);
        this.state = {
            library: JSON.parse(localStorage.getItem('library') as string)
        }
        this.removeParticipant = this.removeParticipant.bind(this)
        this.addParticipant = this.addParticipant.bind(this)
    }

    async removeParticipant(index: number) {
        let tempLibrary = this.state.library;
        tempLibrary.data.participants = this.state.library.data.participants.filter((participant) => participant.id !== index);
        await this.setState({
            library: tempLibrary
        });
        await localStorage.setItem('library', JSON.stringify(this.state.library))
    }

    async addParticipant(properties: any) {
        let maxId = this.state.library.data.participants.reduce((prev, current) => current.id > prev.id ? current : prev).id || 0;
        let tempLibrary = this.state.library;
        let newParticipant = {id: maxId + 1, name: properties.name};
        tempLibrary.data.participants.push(newParticipant);
        await this.setState({
            library: tempLibrary
        });
        await localStorage.setItem('library', JSON.stringify(this.state.library))
    }

    render() {
        return(
            <div>
                <div>
                    <Participants library={this.state.library} removeParticipant={this.removeParticipant}  addParticipant={this.addParticipant} />
                    <Spending />
                    <Items />
                    <Results />
                </div>
                <button>Calculate</button>
            </div>
        )
    }
}

export default Calculation;