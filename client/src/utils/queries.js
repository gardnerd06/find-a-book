import { gql } from '@apollo/client';

export const GET_ME = gql`
  get me {
    me {
      _id
      name
    }
  }
`;
