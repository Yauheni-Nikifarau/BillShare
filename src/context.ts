import React from "react";
import {iLibrary} from "./interfaces";

interface iLibraryContext {
    library: iLibrary
    updateLibrary: (library: iLibrary) => Promise<void>
}

export const LibraryContext = React.createContext({} as iLibraryContext);