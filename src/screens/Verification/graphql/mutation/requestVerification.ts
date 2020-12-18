import { gql } from '@apollo/client';

export default gql`
  mutation RequestVerification(
    $code: String!
    $newPhoneHash: String!
    $newUser: Boolean
  ) {
    requestVerification(
      code: $code
      newPhoneHash: $newPhoneHash
      newUser: $newUser
    ) {
      reason
      succeeded
    }
  }
`;
