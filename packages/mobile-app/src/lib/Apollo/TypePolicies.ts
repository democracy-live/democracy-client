import { TypedTypePolicies } from '../../__generated/apollo-helpers';
import { Procedure_procedure_voteResults_partyVotes } from '../../screens/Bundestag/Procedure/graphql/query/__generated__/Procedure';
import { uniqBy } from 'lodash';

export const typePolicies: TypedTypePolicies = {
  Procedure: {
    fields: {
      voteResults: {
        merge(existing, incoming, { mergeObjects }) {
          return mergeObjects(existing, incoming);
        },
      },
    },
  },
  Deputy: {
    fields: {
      procedures: {
        keyArgs: ['procedureIds'],
        merge(existing = [], incoming: any[]) {
          return uniqBy([...existing, ...incoming], deputyProcedure => {
            return (
              deputyProcedure.procedure.procedureId ||
              deputyProcedure.procedure.__ref
            );
          });
        },
      },
    },
  },
  VoteResult: {
    fields: {
      partyVotes: {
        merge(
          existing: Procedure_procedure_voteResults_partyVotes[] = [],
          incoming: Procedure_procedure_voteResults_partyVotes[],
          { mergeObjects },
        ) {
          if (existing.length === 0) {
            return incoming;
          }
          return incoming.map(partyVote => {
            const existingPartyVote = existing.find(
              ({ party }) => partyVote.party === party,
            );
            if (!existingPartyVote) {
              return partyVote;
            }
            return mergeObjects(existingPartyVote as any, partyVote);
          });
        },
      },
    },
  },
};
