interface iParticipant {
    id: number,
    name: string
}

interface iSpending {
    id: number,
    participantId: number,
    amount: number
}

interface iItem {
    id: number
    name: string,
    sum: number,
    participantsId: Array<number>
}

interface iResult {
    id: number,
    fromId: number,
    toId: number,
    sum: number,
    approved: boolean
}

interface iLibraryData {
    participants: Array<iParticipant>
    spending: Array<iSpending>
    items: Array<iItem>
}

 export interface iLibrary {
    owner: string,
    date: Date,
    name: string,
    id: number,
    data: iLibraryData
    results: Array<iResult>
}