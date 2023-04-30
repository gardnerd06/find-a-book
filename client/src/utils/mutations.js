import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(name: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $book: String!) {
    addBook(userId: $userId, book: $book) {
      _id
      username
      savedbooks
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($book: String!) {
    removeBook(book: $book) {
      _id
      username
      savedbooks
    }
  }
`;
