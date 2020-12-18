import {
  DeputyProcedure,
  Procedure,
  ProceduresHavingVoteResults,
} from 'generated/graphql';
import { uniqBy } from 'lodash';
import VotesLocal from 'lib/VotesLocal';
import { makeVar, TypePolicies } from '@apollo/client';

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      procedures: {
        keyArgs: ['listTypes', 'filter'],
        merge(existing: Procedure[] = [], incoming: Procedure[]) {
          return uniqBy([...existing, ...incoming], (procedure) => {
            return procedure.procedureId || (procedure as any).__ref;
          });
        },
      },
      proceduresByIdHavingVoteResults: {
        keyArgs: ['procedureIds'],
        merge(
          existing: ProceduresHavingVoteResults,
          incoming: ProceduresHavingVoteResults,
        ): ProceduresHavingVoteResults {
          return {
            ...existing,
            ...incoming,
            procedures: uniqBy(
              [...(existing?.procedures || []), ...incoming.procedures],
              (procedure) => {
                return procedure.procedureId || (procedure as any).__ref;
              },
            ),
          };
        },
      },
    },
  },
  Procedure: {
    keyFields: ['procedureId'],
    fields: {
      communityVotes: {
        merge(existing, incoming: any) {
          if (!existing && !incoming) {
            return null;
          }
          return { ...existing, ...incoming };
        },
      },
      voteResults: {
        merge(existing, incoming: any) {
          if (!existing && !incoming) {
            return null;
          }
          return { ...existing, ...incoming };
        },
      },
      voted: {
        read(existing, { storage, readField }) {
          if (existing) {
            return existing;
          }
          if (!storage.var) {
            storage.var = makeVar<boolean>(existing);
            const procedureId = readField('procedureId') as string;
            VotesLocal.getVote(procedureId).then((voted) =>
              storage.var(!!voted || existing),
            );
          }
          return storage.var();
        },
      },
    },
  },
  CommunityConstituencyVotes: {
    keyFields: ['constituency'],
  },
  Deputy: {
    keyFields: ['_id'],
    fields: {
      procedures: {
        keyArgs: ['procedureIds'],
        merge(existing: DeputyProcedure[] = [], incoming: DeputyProcedure[]) {
          return uniqBy([...existing, ...incoming], (deputyProcedure) => {
            return (
              deputyProcedure.procedure.procedureId ||
              (deputyProcedure.procedure as any).__ref
            );
          });
        },
      },
    },
  },
};
