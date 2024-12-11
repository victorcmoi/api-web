const { gql } = require('apollo-server');

const typeDefs = gql`
    type Slot {
        time: String
        isAvailable: Boolean
    }

    type Query {
        availableSlots(date: String!, terrain: String!): [Slot]
    }
`;

module.exports = typeDefs;
