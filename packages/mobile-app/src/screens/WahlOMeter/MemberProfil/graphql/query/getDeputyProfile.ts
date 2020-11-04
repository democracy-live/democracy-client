import { gql } from '@apollo/client';

export const GET_DEPUTY_PROFILE = gql`
  query GetDeputyProfile($constituency: String!, $directCandidate: Boolean) {
    deputiesOfConstituency(
      constituency: $constituency
      directCandidate: $directCandidate
    ) {
      _id
      name
      imgURL
      party
      job
      biography
      totalProcedures
      procedures {
        decision
        procedure {
          procedureId
        }
      }
      contact {
        address
        email
        links {
          name
          URL
          username
        }
      }
    }
  }
`;
