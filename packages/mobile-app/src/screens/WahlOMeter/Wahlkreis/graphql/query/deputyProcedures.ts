import { gql } from '@apollo/client';
import { procedureVoteResultPartyVoteDeviants } from '../../../Fraktionen/graphql/fragments/deviants';

export const DEPUTY_PROCEDURES = gql`
  query DeputyProcedures(
    $constituency: String!
    $directCandidate: Boolean
    $offset: Int
    $pageSize: Int
  ) {
    deputyProcedures: deputiesOfConstituency(
      constituency: $constituency
      directCandidate: $directCandidate
    ) {
      _id
      totalProcedures
      procedures(offset: $offset, pageSize: $pageSize) {
        decision
        procedure {
          _id
          procedureId
          sessionTOPHeading
          title
          subjectGroups
          voteDate
          votedGovernment
          submissionDate
          completed
          voted
          type
          voteResults {
            governmentDecision
            yes
            abstination
            no
            notVoted
            partyVotes {
              party
              main
              ...DeviantsPartyVote
            }
          }
          communityVotes {
            yes
            abstination
            no
            total
          }
        }
      }
    }
  }
  ${procedureVoteResultPartyVoteDeviants}
`;
