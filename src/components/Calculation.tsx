import React, {useContext, useState} from "react";
import Items from "./Box/Items";
import Participants from "./Box/Participants";
import Results from "./Box/Results";
import Spending from "./Box/Spending";
import {LibraryContext} from "../context";
import {iLibrary} from "../interfaces";

const Calculation = () => {
    const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library') || ''))
    const context = useContext(LibraryContext);
    const updateLibrary = async (library: iLibrary) => {
        setLibrary(library);
        await localStorage.setItem('library', JSON.stringify(library));
    }

    return(
        <div>
            <LibraryContext.Provider value={{updateLibrary, library}}>
                <div>
                    <Participants />
                    <Spending />
                    <Items />
                    <Results />
                </div>
                <button>Calculate</button>
            </LibraryContext.Provider>
        </div>
    )

}

export default Calculation;