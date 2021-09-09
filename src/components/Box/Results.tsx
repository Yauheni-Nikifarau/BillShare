import React, {useContext} from "react";
import Box from "./Box";
import {LibraryContext} from "../../context";

interface ResultsProps {
    showResults: () => void
}

const Results = (props: ResultsProps) => {
    const context = useContext(LibraryContext);

    const approve = async (id: number) => {
        let tempLibrary = context.library;
        const result = tempLibrary.results.find((result) => result.id === id);
        if (result) {
            const resultIndex = tempLibrary.results.indexOf(result);
            tempLibrary.results[resultIndex].approved = !tempLibrary.results[resultIndex].approved
        }
        await context.updateLibrary({ ...tempLibrary });
        props.showResults();
    }

    const preparedData = [];
    for (let result of context.library.results) {
        let temp = context.library.data.participants.find((participant) => participant.id === result.fromId);
        const from = temp ? temp.name : 'Unknown';
        temp = context.library.data.participants.find((participant) => participant.id === result.toId);
        const to = temp ? temp.name : 'Unknown';
        preparedData.push({
            id: result.id,
            from: from,
            to: to,
            sum: result.sum,
            approved: result.approved
        })
    }

    return(
        <Box title={'Results'} buttonShouldBe={false}>
            {preparedData.map((result, index) => (
                <div className={result.approved ? 'box_item-box box_item-box_approved' : 'box_item-box'} key={index}>
                    <p>From {result.from} to {result.to} - {result.sum}</p>
                    <button onClick={() => approve(result.id)} className='item-box_button item-box_button_approve'></button>
                </div>
            ))}
        </Box>
    )
}

export default Results;