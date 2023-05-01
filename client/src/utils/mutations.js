import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
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
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook( $_id: ID!, $authors: [String], $description: String!, $bookId: String, $image: String, $link: String, $title: String!) {
    saveBook(_id: $ID, authors: $String, description: $String, bookId: $String, image: $String, link: $String, title: $String) {
     token
     user { _id
      username
      savedbooks
     }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($_id: ID!, $bookId: String!) {
    removeBook(_id: $ID, bookId: $String) {
      token
     user { _id
      username
      savedbooks
     }
    }
  }
`;
