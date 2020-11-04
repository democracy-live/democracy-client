import { gql } from '@apollo/client';

// Fragments

export const DEPUTY_CHART_DATA = gql`
  query DeputyChartData(
    $constituency: String!
    $directCandidate: Boolean
    $procedureIds: [String!]!
  ) {
    chartData: deputiesOfConstituency(
      constituency: $constituency
      directCandidate: $directCandidate
    ) {
      _id
      totalProcedures
      party
      imgURL
      name
      procedures(procedureIds: $procedureIds) {
        decision
        procedure {
          procedureId
        }
      }
    }
  }
`;
