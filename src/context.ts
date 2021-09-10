import React from "react";
import {iLibrary} from "./interfaces";

interface iLibraryContext {
    library: iLibrary
    updateLibrary: (library: iLibrary) => Promise<void>,
    allowModal: () => void,
    denyModal: () => void,
    allowModalState: boolean
}

export const LibraryContext = React.createContext({} as iLibraryContext);