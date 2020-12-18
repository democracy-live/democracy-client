import { gql } from '@apollo/client';

export default gql`
  mutation RequestSmsCode($newPhone: String!, $oldPhoneHash: String) {
    requestCode(newPhone: $newPhone, oldPhoneHash: $oldPhoneHash) {
      reason
      allowNewUser
      succeeded
      resendTime
      expireTime
    }
  }
`;
