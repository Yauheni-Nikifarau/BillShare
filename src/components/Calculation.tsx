import React, {useContext, useState} from "react";
import Items from "./Box/Items";
import Participants from "./Box/Participants";
import Results from "./Box/Results";
import Spending from "./Box/Spending";
import {LibraryContext} from "../context";
import {iLibrary} from "../interfaces";

const Calculation = () => {
    const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library') || ''));
    const [shouldShowResults, setShouldShowResults] = useState(false);
    const context = useContext(LibraryContext);
    const updateLibrary = async (library: iLibrary) => {
        setLibrary(library);
        setShouldShowResults(false);
        await localStorage.setItem('library', JSON.stringify(library));
    }

    const calculate = async () => {
        for (let item of library.data.items) {
            if (!item.participantsId.length) {
                alert(`You don't have participants sharing "${item.name}" item`);
                return;
            }
        }

        const spendingAmount = library.data.spending.length ? library.data.spending.reduce((prev: any, cur: any) => {
            return {...cur, amount: +cur.amount + +prev.amount}
        }).amount : 0;

        const itemsAmount = library.data.items.length ? library.data.items.reduce((prev: any, cur: any) => {
            return {...cur, sum: +cur.sum + +prev.sum}
        }).sum : 0;

        console.log(spendingAmount);
        console.log(itemsAmount);
        if (spendingAmount !== itemsAmount) {
            alert('Spending and Items sums are not equal. Check it out.');
            return;
        }

        let debtors: Array<any> = [];
        let creditors: Array<any> = [];

        library.data.participants.forEach((participant: any) => {
            let spends = 0;
            for (let spending of library.data.spending) {
                if (spending.participantId === participant.id) spends += spending.amount;
            }
            let debts: number = 0;
            for (let item of library.data.items) {
                if (item.participantsId.length && item.participantsId.includes(participant.id)) {
                    debts += +(item.sum / item.participantsId.length).toFixed(2);
                }
            }
            const isDebtor = debts > spends;
            if (isDebtor) {
                debtors.push({
                    id: participant.id,
                    name: participant.name,
                    debtor: isDebtor,
                    balance: debts - spends,
                })
            } else {
                creditors.push({
                    id: participant.id,
                    name: participant.name,
                    debtor: isDebtor,
                    balance: spends - debts,
                })
            }
        })

        let tempLibrary = library;
        tempLibrary.results = [];

        for (let creditor of creditors) {
            for (let debtor of debtors) {
                if (creditor.balance <= 0) break;
                if (debtor.balance <= 0) continue;
                let sum = 0;
                if (creditor.balance >= debtor.balance) {
                    sum = debtor.balance;
                    creditor.balance -= sum;
                } else {
                    sum = creditor.balance;
                    debtor.balance -= sum;
                }
                if (sum > 0) {
                    const maxId = tempLibrary.results.length ? tempLibrary.results.reduce((prev: any, current: any) => current.id > prev.id ? current : prev).id : 0;
                    tempLibrary.results.push({
                        id: maxId+1,
                        fromId: debtor.id,
                        toId: creditor.id,
                        sum: sum.toFixed(2),
                        approved: false,
                    })
                }
            }
        }

        await updateLibrary({ ...tempLibrary });
        setShouldShowResults(true);
    }

    return (
        <div>
            <LibraryContext.Provider value={{updateLibrary, library}}>
                <div>
                    <Participants/>
                    <Spending/>
                    <Items/>
                    {shouldShowResults ? <Results showResults={() => setShouldShowResults(true)} /> : null}
                </div>
                <button onClick={calculate}>Calculate</button>
            </LibraryContext.Provider>
        </div>
    )

}

export default Calculation;