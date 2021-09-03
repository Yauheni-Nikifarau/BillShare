export default {
    owner: 'Alex',
    date: '12321312',
    name: 'Tusa u Kiri',
    id: 32423423,
    data: {
        participants: [{id: 1, name: 'Alex'}, {id: 2, name: 'Bob'}, {id: 3, name: 'Donald'}],
        spending: [{id: 1, participantId: 1, amount: 111111}],
        items: [{id: 1, name: 'Beer', sum: 1200, participantsId: [1,2,3]}, {id: 1, name: 'Beer', sum: 1200, participantsId: [1,3]}]
    },
    results: [{id: 1, fromId: 1, toId: 2, sum: 1200, approved: false}]
}