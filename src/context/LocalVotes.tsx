import React, { createContext, useState, FC, useEffect } from 'react';
import VotesLocal, { ChainEntry, SetLocalVote } from 'lib/VotesLocal';

interface LocalVotesInterface {
  localVotes: ChainEntry[];
  setLocalVote: ({
    procedureId,
    selection,
    constituency,
  }: SetLocalVote) => void;
  getLocalVoteSelection: (
    procedureId: string,
  ) => ChainEntry['selection'] | undefined;
  updateLocalVotesStore: () => Promise<void>;
}

const defaults: LocalVotesInterface = {
  localVotes: [],
  setLocalVote: () => {
    throw new Error('LocalVotesContext: setLocalVote function is not defined');
  },
  getLocalVoteSelection: () => {
    throw new Error(
      'LocalVotesContext: getLocalVoteSelection function is not defined',
    );
  },
  updateLocalVotesStore: () => {
    throw new Error(
      'LocalVotesContext: updateLocalVotesStore function is not defined',
    );
  },
};

export const LocalVotesContext = createContext<LocalVotesInterface>(defaults);

export const LocalVotesProvider: FC = ({ children }) => {
  const [localVotes, setLocalVotes] = useState<ChainEntry[]>([]);

  useEffect(() => {
    VotesLocal.getVotes().then((votes) => {
      setLocalVotes(votes);
    });
  }, []);

  const setLocalVote = ({
    procedureId,
    selection,
    constituency,
  }: Pick<ChainEntry, 'procedureId' | 'selection' | 'constituency'>) => {
    VotesLocal.setVote({ procedureId, selection, constituency }).then(
      (success) => {
        if (success) {
          VotesLocal.getVotes().then((votes) => {
            setLocalVotes(votes);
          });
        }
      },
    );
  };

  const getLocalVoteSelection = (procedureId: string) => {
    const localVote = localVotes.find((p) => p.procedureId === procedureId);
    if (localVote) {
      return localVote.selection;
    }
    return;
  };

  const updateLocalVotesStore = () => {
    return VotesLocal.getVotes().then((votes) => {
      setLocalVotes(votes);
    });
  };

  return (
    <LocalVotesContext.Provider
      value={{
        localVotes,
        setLocalVote,
        getLocalVoteSelection,
        updateLocalVotesStore,
      }}>
      {children}
    </LocalVotesContext.Provider>
  );
};
