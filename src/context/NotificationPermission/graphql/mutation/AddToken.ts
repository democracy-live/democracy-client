import { gql } from '@apollo/client';

export const ADD_TOKEN = gql`
  mutation AddToken($token: String!, $os: String!) {
    addToken(token: $token, os: $os) {
      succeeded
    }
  }
`;
