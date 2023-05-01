const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    bookId: String!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }
  

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(_id: ID!, bookId: Book): User
    removeBook(_id: ID!, bookId: String!): User
  }
`;

module.exports = typeDefs;


// input Book {
//   bookId: String!
//   authors: [String]
//   description: String
//   image: String
//   link: String
//   title: String!
// }