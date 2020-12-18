import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  activityIndex?: Maybe<ActivityIndex>;
  currentConferenceWeek: ConferenceWeek;
  deputiesOfConstituency: Array<Deputy>;
  notificationSettings?: Maybe<NotificationSettings>;
  procedure: Procedure;
  procedures: Array<Procedure>;
  proceduresById: Array<Procedure>;
  proceduresByIdHavingVoteResults: ProceduresHavingVoteResults;
  notifiedProcedures: Array<Procedure>;
  /** @deprecated use searchProceduresAutocomplete */
  searchProcedures: Array<Procedure>;
  searchProceduresAutocomplete: SearchProcedures;
  votedProcedures: Array<Procedure>;
  proceduresWithVoteResults: Array<Procedure>;
  mostSearched: Array<SearchTerm>;
  me?: Maybe<User>;
  votes?: Maybe<Vote>;
  communityVotes?: Maybe<CommunityVotes>;
  voteStatistic?: Maybe<VoteStatistic>;
};


export type QueryActivityIndexArgs = {
  procedureId: Scalars['String'];
};


export type QueryDeputiesOfConstituencyArgs = {
  constituency: Scalars['String'];
  directCandidate?: Maybe<Scalars['Boolean']>;
};


export type QueryProcedureArgs = {
  id: Scalars['ID'];
};


export type QueryProceduresArgs = {
  listTypes?: Maybe<Array<ListType>>;
  type?: Maybe<ProcedureType>;
  pageSize?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  filter?: Maybe<ProcedureFilter>;
};


export type QueryProceduresByIdArgs = {
  ids: Array<Scalars['String']>;
  pageSize?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryProceduresByIdHavingVoteResultsArgs = {
  procedureIds?: Maybe<Array<Scalars['String']>>;
  timespan?: Maybe<VotedTimeSpan>;
  pageSize?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  filter?: Maybe<ProcedureWomFilter>;
};


export type QuerySearchProceduresArgs = {
  term: Scalars['String'];
};


export type QuerySearchProceduresAutocompleteArgs = {
  term: Scalars['String'];
};


export type QueryProceduresWithVoteResultsArgs = {
  procedureIds: Array<Scalars['String']>;
};


export type QueryVotesArgs = {
  procedure: Scalars['ID'];
  constituencies?: Maybe<Array<Scalars['String']>>;
};


export type QueryCommunityVotesArgs = {
  procedure: Scalars['ID'];
  constituencies?: Maybe<Array<Scalars['String']>>;
};

export type ActivityIndex = {
  __typename?: 'ActivityIndex';
  activityIndex: Scalars['Int'];
  active?: Maybe<Scalars['Boolean']>;
};

export type ConferenceWeek = {
  __typename?: 'ConferenceWeek';
  start: Scalars['Date'];
  end: Scalars['Date'];
  calendarWeek: Scalars['Int'];
};


export type Deputy = {
  __typename?: 'Deputy';
  _id: Scalars['ID'];
  webId: Scalars['String'];
  imgURL: Scalars['String'];
  name: Scalars['String'];
  party?: Maybe<Scalars['String']>;
  job?: Maybe<Scalars['String']>;
  biography?: Maybe<Scalars['String']>;
  constituency?: Maybe<Scalars['String']>;
  directCandidate?: Maybe<Scalars['Boolean']>;
  contact?: Maybe<DeputyContact>;
  totalProcedures?: Maybe<Scalars['Int']>;
  procedures: Array<DeputyProcedure>;
};


export type DeputyProceduresArgs = {
  procedureIds?: Maybe<Array<Scalars['String']>>;
  pageSize?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeputyContact = {
  __typename?: 'DeputyContact';
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  links: Array<DeputyLink>;
};

export type DeputyLink = {
  __typename?: 'DeputyLink';
  name: Scalars['String'];
  URL: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type DeputyProcedure = {
  __typename?: 'DeputyProcedure';
  decision: VoteSelection;
  procedure: Procedure;
};

export enum VoteSelection {
  Yes = 'YES',
  No = 'NO',
  Abstination = 'ABSTINATION',
  Notvoted = 'NOTVOTED'
}

export type Procedure = {
  __typename?: 'Procedure';
  _id: Scalars['ID'];
  title: Scalars['String'];
  procedureId: Scalars['String'];
  type: Scalars['String'];
  period?: Maybe<Scalars['Int']>;
  currentStatus?: Maybe<Scalars['String']>;
  currentStatusHistory: Array<Scalars['String']>;
  abstract?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  voteDate?: Maybe<Scalars['Date']>;
  voteEnd?: Maybe<Scalars['Date']>;
  voteWeek?: Maybe<Scalars['Int']>;
  voteYear?: Maybe<Scalars['Int']>;
  sessionTOPHeading?: Maybe<Scalars['String']>;
  subjectGroups: Array<Scalars['String']>;
  submissionDate?: Maybe<Scalars['Date']>;
  activityIndex: ActivityIndex;
  votes: Scalars['Int'];
  importantDocuments: Array<Document>;
  voteResults?: Maybe<VoteResult>;
  communityVotes?: Maybe<CommunityVotes>;
  voted: Scalars['Boolean'];
  votedGovernment?: Maybe<Scalars['Boolean']>;
  completed?: Maybe<Scalars['Boolean']>;
  notify?: Maybe<Scalars['Boolean']>;
  /** @deprecated Use listTypes instead of type */
  listType?: Maybe<ProcedureType>;
  list?: Maybe<ListType>;
  verified?: Maybe<Scalars['Boolean']>;
};


export type ProcedureCommunityVotesArgs = {
  constituencies?: Maybe<Array<Scalars['String']>>;
};

export type Document = {
  __typename?: 'Document';
  editor: Scalars['String'];
  number: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type VoteResult = {
  __typename?: 'VoteResult';
  procedureId: Scalars['String'];
  yes: Scalars['Int'];
  no: Scalars['Int'];
  abstination: Scalars['Int'];
  notVoted?: Maybe<Scalars['Int']>;
  /** @deprecated Field no longer supported */
  notVote?: Maybe<Scalars['Int']>;
  governmentDecision: VoteSelection;
  decisionText?: Maybe<Scalars['String']>;
  namedVote: Scalars['Boolean'];
  partyVotes: Array<PartyVote>;
  deputyVotes: Array<DeputyVote>;
};


export type VoteResultDeputyVotesArgs = {
  constituencies?: Maybe<Array<Scalars['String']>>;
  directCandidate?: Maybe<Scalars['Boolean']>;
};

export type PartyVote = {
  __typename?: 'PartyVote';
  party: Scalars['String'];
  main: VoteSelection;
  deviants: Deviants;
};

export type Deviants = {
  __typename?: 'Deviants';
  yes: Scalars['Int'];
  abstination: Scalars['Int'];
  no: Scalars['Int'];
  notVoted?: Maybe<Scalars['Int']>;
};

export type DeputyVote = {
  __typename?: 'DeputyVote';
  deputy: Deputy;
  decision: VoteSelection;
};

export type CommunityVotes = {
  __typename?: 'CommunityVotes';
  yes: Scalars['Int'];
  no: Scalars['Int'];
  abstination: Scalars['Int'];
  total: Scalars['Int'];
  constituencies: Array<CommunityConstituencyVotes>;
};

export type CommunityConstituencyVotes = {
  __typename?: 'CommunityConstituencyVotes';
  constituency: Scalars['String'];
  yes: Scalars['Int'];
  no: Scalars['Int'];
  abstination: Scalars['Int'];
  total: Scalars['Int'];
};

export enum ProcedureType {
  InVote = 'IN_VOTE',
  Preparation = 'PREPARATION',
  Voting = 'VOTING',
  Past = 'PAST',
  Hot = 'HOT'
}

export enum ListType {
  Preparation = 'PREPARATION',
  InVote = 'IN_VOTE',
  Past = 'PAST',
  Hot = 'HOT',
  Top100 = 'TOP100',
  ConferenceweeksPlanned = 'CONFERENCEWEEKS_PLANNED'
}

export type NotificationSettings = {
  __typename?: 'NotificationSettings';
  enabled?: Maybe<Scalars['Boolean']>;
  /** @deprecated <= 1.22 Notification Settings */
  newVote?: Maybe<Scalars['Boolean']>;
  /** @deprecated <= 1.22 Notification Settings */
  newPreperation?: Maybe<Scalars['Boolean']>;
  conferenceWeekPushs?: Maybe<Scalars['Boolean']>;
  voteConferenceWeekPushs?: Maybe<Scalars['Boolean']>;
  voteTOP100Pushs?: Maybe<Scalars['Boolean']>;
  outcomePushs?: Maybe<Scalars['Boolean']>;
  disableUntil?: Maybe<Scalars['Date']>;
  procedures?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ProcedureFilter = {
  subjectGroups?: Maybe<Array<Scalars['String']>>;
  status?: Maybe<Array<Scalars['String']>>;
  type?: Maybe<Array<Scalars['String']>>;
  activity?: Maybe<Array<Scalars['String']>>;
};

export enum VotedTimeSpan {
  CurrentSittingWeek = 'CurrentSittingWeek',
  LastSittingWeek = 'LastSittingWeek',
  CurrentQuarter = 'CurrentQuarter',
  LastQuarter = 'LastQuarter',
  CurrentYear = 'CurrentYear',
  LastYear = 'LastYear',
  Period = 'Period'
}

export type ProcedureWomFilter = {
  subjectGroups: Array<Scalars['String']>;
};

export type ProceduresHavingVoteResults = {
  __typename?: 'ProceduresHavingVoteResults';
  total: Scalars['Int'];
  procedures: Array<Procedure>;
};

export type SearchProcedures = {
  __typename?: 'SearchProcedures';
  procedures: Array<Procedure>;
  autocomplete: Array<Scalars['String']>;
};

export type SearchTerm = {
  __typename?: 'SearchTerm';
  term: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  verified: Scalars['Boolean'];
  /** @deprecated Field no longer supported */
  deviceHash?: Maybe<Scalars['String']>;
};

export type Vote = {
  __typename?: 'Vote';
  _id: Scalars['ID'];
  voted: Scalars['Boolean'];
  voteResults?: Maybe<CommunityVotes>;
};

export type VoteStatistic = {
  __typename?: 'VoteStatistic';
  proceduresCount: Scalars['Int'];
  votedProcedures: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  increaseActivity?: Maybe<ActivityIndex>;
  requestCode: CodeResult;
  requestVerification: VerificationResult;
  addToken: TokenResult;
  updateNotificationSettings?: Maybe<NotificationSettings>;
  toggleNotification?: Maybe<Procedure>;
  finishSearch: SearchTerm;
  signUp?: Maybe<Auth>;
  vote: Vote;
};


export type MutationIncreaseActivityArgs = {
  procedureId: Scalars['String'];
};


export type MutationRequestCodeArgs = {
  newPhone: Scalars['String'];
  oldPhoneHash?: Maybe<Scalars['String']>;
};


export type MutationRequestVerificationArgs = {
  code: Scalars['String'];
  newPhoneHash: Scalars['String'];
  newUser?: Maybe<Scalars['Boolean']>;
};


export type MutationAddTokenArgs = {
  token: Scalars['String'];
  os: Scalars['String'];
};


export type MutationUpdateNotificationSettingsArgs = {
  enabled?: Maybe<Scalars['Boolean']>;
  newVote?: Maybe<Scalars['Boolean']>;
  newPreperation?: Maybe<Scalars['Boolean']>;
  conferenceWeekPushs?: Maybe<Scalars['Boolean']>;
  voteConferenceWeekPushs?: Maybe<Scalars['Boolean']>;
  voteTOP100Pushs?: Maybe<Scalars['Boolean']>;
  outcomePushs?: Maybe<Scalars['Boolean']>;
  outcomePushsEnableOld?: Maybe<Scalars['Boolean']>;
  disableUntil?: Maybe<Scalars['Date']>;
  procedures?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationToggleNotificationArgs = {
  procedureId: Scalars['String'];
};


export type MutationFinishSearchArgs = {
  term: Scalars['String'];
};


export type MutationSignUpArgs = {
  deviceHashEncrypted: Scalars['String'];
};


export type MutationVoteArgs = {
  procedure: Scalars['ID'];
  selection: VoteSelection;
  constituency?: Maybe<Scalars['String']>;
};

export type CodeResult = {
  __typename?: 'CodeResult';
  reason?: Maybe<Scalars['String']>;
  allowNewUser?: Maybe<Scalars['Boolean']>;
  succeeded: Scalars['Boolean'];
  resendTime?: Maybe<Scalars['Date']>;
  expireTime?: Maybe<Scalars['Date']>;
};

export type VerificationResult = {
  __typename?: 'VerificationResult';
  reason?: Maybe<Scalars['String']>;
  succeeded: Scalars['Boolean'];
};

export type TokenResult = {
  __typename?: 'TokenResult';
  succeeded?: Maybe<Scalars['Boolean']>;
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['String'];
};

export type Device = {
  __typename?: 'Device';
  notificationSettings?: Maybe<NotificationSettings>;
};

export type Schema = {
  __typename?: 'Schema';
  query?: Maybe<Query>;
};

export type ListItemFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId' | 'title' | 'sessionTOPHeading'>
  & VoteIndexFragment
  & VoteDateFragment
);

export type VoteDateFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'voteDate' | 'voteEnd'>
);

export type VoteIndexFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'votes' | 'voted'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'verified'>
  )> }
);

export type DetailActionBarFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId' | 'title' | 'type' | 'voted' | 'notify'>
);

export type ToggleNotificationMutationVariables = Exact<{
  procedureId: Scalars['String'];
}>;


export type ToggleNotificationMutation = (
  { __typename?: 'Mutation' }
  & { toggleNotification?: Maybe<(
    { __typename?: 'Procedure' }
    & Pick<Procedure, 'procedureId' | 'notify'>
  )> }
);

export type CountryMapConstituenciesQueryVariables = Exact<{
  procedureId: Scalars['ID'];
}>;


export type CountryMapConstituenciesQuery = (
  { __typename?: 'Query' }
  & { procedure: (
    { __typename?: 'Procedure' }
    & Pick<Procedure, 'procedureId' | 'voted'>
    & { communityVotes?: Maybe<(
      { __typename?: 'CommunityVotes' }
      & { constituencies: Array<(
        { __typename?: 'CommunityConstituencyVotes' }
        & Pick<CommunityConstituencyVotes, 'yes' | 'no' | 'abstination' | 'total' | 'constituency'>
      )> }
    )> }
  ) }
);

export type CommunityVoteResultsFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId' | 'voted'>
  & { communityVotes?: Maybe<(
    { __typename?: 'CommunityVotes' }
    & Pick<CommunityVotes, 'yes' | 'no' | 'abstination' | 'total'>
    & { constituencies: Array<(
      { __typename?: 'CommunityConstituencyVotes' }
      & Pick<CommunityConstituencyVotes, 'yes' | 'no' | 'abstination' | 'total' | 'constituency'>
    )> }
  )> }
);

export type ImportantDocumentFragment = (
  { __typename?: 'Document' }
  & Pick<Document, 'editor' | 'type' | 'url' | 'number'>
);

export type ImportantDocumentsFragment = (
  { __typename?: 'Procedure' }
  & { importantDocuments: Array<(
    { __typename?: 'Document' }
    & ImportantDocumentFragment
  )> }
);

export type DetailGovernmentPieChartFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId'>
  & { voteResults?: Maybe<(
    { __typename?: 'VoteResult' }
    & Pick<VoteResult, 'yes' | 'abstination' | 'no' | 'notVoted' | 'namedVote'>
    & { partyVotes: Array<(
      { __typename?: 'PartyVote' }
      & Pick<PartyVote, 'party'>
    )> }
  )> }
);

export type DetailVoteResultConstituencyFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, '_id' | 'procedureId'>
  & { voteResults?: Maybe<(
    { __typename?: 'VoteResult' }
    & { deputyVotes: Array<(
      { __typename?: 'DeputyVote' }
      & Pick<DeputyVote, 'decision'>
      & { deputy: (
        { __typename?: 'Deputy' }
        & Pick<Deputy, '_id' | 'imgURL' | 'name' | 'party' | 'constituency'>
      ) }
    )> }
  )> }
);

export type DetailDecisionBarChartFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId'>
  & { voteResults?: Maybe<(
    { __typename?: 'VoteResult' }
    & Pick<VoteResult, 'namedVote'>
    & { partyVotes: Array<(
      { __typename?: 'PartyVote' }
      & Pick<PartyVote, 'party'>
      & { deviants: (
        { __typename?: 'Deviants' }
        & Pick<Deviants, 'yes' | 'abstination' | 'no' | 'notVoted'>
      ) }
    )> }
  )> }
);

export type DetailDecisionTextFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId'>
  & { voteResults?: Maybe<(
    { __typename?: 'VoteResult' }
    & Pick<VoteResult, 'decisionText'>
  )> }
);

export type DetailFractionChartFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId'>
  & { voteResults?: Maybe<(
    { __typename?: 'VoteResult' }
    & Pick<VoteResult, 'namedVote'>
    & { partyVotes: Array<(
      { __typename?: 'PartyVote' }
      & Pick<PartyVote, 'party'>
      & { deviants: (
        { __typename?: 'Deviants' }
        & Pick<Deviants, 'yes' | 'abstination' | 'no' | 'notVoted'>
      ) }
    )> }
  )> }
);

export type GovernmentVoteResultsQueryVariables = Exact<{
  procedureId: Scalars['ID'];
  constituencies: Array<Scalars['String']>;
}>;


export type GovernmentVoteResultsQuery = (
  { __typename?: 'Query' }
  & { procedure: (
    { __typename?: 'Procedure' }
    & Pick<Procedure, 'voted'>
    & DetailGovernmentPieChartFragment
    & DetailFractionChartFragment
    & DetailDecisionBarChartFragment
    & DetailDecisionTextFragment
    & DetailVoteResultConstituencyFragment
  ) }
);

export type ProcedureHistoryFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'currentStatus' | 'currentStatusHistory'>
);

export type ProcedureDetailsFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId' | 'subjectGroups' | 'currentStatus' | 'type' | 'submissionDate' | 'voteDate' | 'abstract'>
  & ImportantDocumentsFragment
  & DetailActionBarFragment
  & CommunityVoteResultsFragment
);

export type ProcedureDetailQueryVariables = Exact<{
  id: Scalars['ID'];
  constituencies?: Maybe<Array<Scalars['String']>>;
}>;


export type ProcedureDetailQuery = (
  { __typename?: 'Query' }
  & { procedure: (
    { __typename?: 'Procedure' }
    & Pick<Procedure, 'procedureId'>
    & ListItemFragment
    & GovernmentVotesPieChartFragment
    & ProcedureDetailsFragment
    & ProcedureHistoryFragment
  ), communityVotesProcedure: (
    { __typename?: 'Procedure' }
    & CommunityVotesPieChartFragment
  ) }
);

export type CommunityVotesPieChartFragment = (
  { __typename?: 'Procedure' }
  & Pick<Procedure, 'procedureId' | 'voted'>
  & { communityVotes?: Maybe<(
    { __typename?: 'CommunityVotes' }
    & Pick<CommunityVotes, 'yes' | 'abstination' | 'no'>
  )> }
);

export type GovernmentVotesPieChartFragment = (
  { __typename?: 'Procedure' }
  & { voteResults?: Maybe<(
    { __typename?: 'VoteResult' }
    & Pick<VoteResult, 'yes' | 'abstination' | 'no' | 'notVoted'>
  )> }
);

export type ProceduresListQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  listTypes?: Maybe<Array<ListType>>;
  filter?: Maybe<ProcedureFilter>;
}>;


export type ProceduresListQuery = (
  { __typename?: 'Query' }
  & { procedures: Array<(
    { __typename?: 'Procedure' }
    & Pick<Procedure, 'procedureId' | 'title'>
    & ListItemFragment
    & CommunityVotesPieChartFragment
    & GovernmentVotesPieChartFragment
  )> }
);

export type FinishSearchMutationVariables = Exact<{
  term: Scalars['String'];
}>;


export type FinishSearchMutation = (
  { __typename?: 'Mutation' }
  & { finishSearch: (
    { __typename?: 'SearchTerm' }
    & Pick<SearchTerm, 'term'>
  ) }
);

export type MostSearchedQueryVariables = Exact<{ [key: string]: never; }>;


export type MostSearchedQuery = (
  { __typename?: 'Query' }
  & { mostSearched: Array<(
    { __typename?: 'SearchTerm' }
    & Pick<SearchTerm, 'term'>
  )> }
);

export type SearchProceduresQueryVariables = Exact<{
  term: Scalars['String'];
}>;


export type SearchProceduresQuery = (
  { __typename?: 'Query' }
  & { searchProceduresAutocomplete: (
    { __typename?: 'SearchProcedures' }
    & Pick<SearchProcedures, 'autocomplete'>
    & { procedures: Array<(
      { __typename?: 'Procedure' }
      & Pick<Procedure, '_id' | 'procedureId'>
      & ListItemFragment
      & CommunityVotesPieChartFragment
      & GovernmentVotesPieChartFragment
    )> }
  ) }
);

export type VoteMutationVariables = Exact<{
  procedure: Scalars['ID'];
  selection: VoteSelection;
  constituency?: Maybe<Scalars['String']>;
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & { vote: (
    { __typename?: 'Vote' }
    & Pick<Vote, 'voted'>
  ) }
);

export type WomBundestagPieChartQueryVariables = Exact<{
  procedureIds?: Maybe<Array<Scalars['String']>>;
  pageSize?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type WomBundestagPieChartQuery = (
  { __typename?: 'Query' }
  & { womBundestagPieChart: (
    { __typename?: 'ProceduresHavingVoteResults' }
    & Pick<ProceduresHavingVoteResults, 'total'>
    & { procedures: Array<(
      { __typename?: 'Procedure' }
      & Pick<Procedure, 'procedureId'>
      & { voteResults?: Maybe<(
        { __typename?: 'VoteResult' }
        & Pick<VoteResult, 'governmentDecision'>
      )> }
    )> }
  ) }
);

export type WomBundestagListQueryVariables = Exact<{
  pageSize?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type WomBundestagListQuery = (
  { __typename?: 'Query' }
  & { womBundestagList: (
    { __typename?: 'ProceduresHavingVoteResults' }
    & { procedures: Array<(
      { __typename?: 'Procedure' }
      & ListItemFragment
      & CommunityVotesPieChartFragment
      & GovernmentVotesPieChartFragment
    )> }
  ) }
);

export type WomFractionChartQueryVariables = Exact<{
  procedureIds?: Maybe<Array<Scalars['String']>>;
  pageSize?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type WomFractionChartQuery = (
  { __typename?: 'Query' }
  & { womFractionChart: (
    { __typename?: 'ProceduresHavingVoteResults' }
    & Pick<ProceduresHavingVoteResults, 'total'>
    & { procedures: Array<(
      { __typename?: 'Procedure' }
      & Pick<Procedure, 'procedureId'>
      & { voteResults?: Maybe<(
        { __typename?: 'VoteResult' }
        & Pick<VoteResult, 'namedVote'>
        & { partyVotes: Array<(
          { __typename?: 'PartyVote' }
          & Pick<PartyVote, 'party' | 'main'>
        )> }
      )> }
    )> }
  ) }
);

export type WomPartyListQueryVariables = Exact<{
  pageSize?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type WomPartyListQuery = (
  { __typename?: 'Query' }
  & { womPartyList: (
    { __typename?: 'ProceduresHavingVoteResults' }
    & { procedures: Array<(
      { __typename?: 'Procedure' }
      & ListItemFragment
      & CommunityVotesPieChartFragment
      & GovernmentVotesPieChartFragment
    )> }
  ) }
);

export type GetDeputyProfileQueryVariables = Exact<{
  constituency: Scalars['String'];
  directCandidate?: Maybe<Scalars['Boolean']>;
}>;


export type GetDeputyProfileQuery = (
  { __typename?: 'Query' }
  & { deputiesOfConstituency: Array<(
    { __typename?: 'Deputy' }
    & Pick<Deputy, '_id' | 'name' | 'imgURL' | 'party' | 'job' | 'biography' | 'totalProcedures'>
    & { procedures: Array<(
      { __typename?: 'DeputyProcedure' }
      & Pick<DeputyProcedure, 'decision'>
      & { procedure: (
        { __typename?: 'Procedure' }
        & Pick<Procedure, 'procedureId'>
      ) }
    )>, contact?: Maybe<(
      { __typename?: 'DeputyContact' }
      & Pick<DeputyContact, 'address' | 'email'>
      & { links: Array<(
        { __typename?: 'DeputyLink' }
        & Pick<DeputyLink, 'name' | 'URL' | 'username'>
      )> }
    )> }
  )> }
);

export type WomDeputyChartFragment = (
  { __typename?: 'Deputy' }
  & Pick<Deputy, '_id' | 'totalProcedures'>
  & { procedures: Array<(
    { __typename?: 'DeputyProcedure' }
    & Pick<DeputyProcedure, 'decision'>
    & { procedure: (
      { __typename?: 'Procedure' }
      & Pick<Procedure, 'procedureId'>
    ) }
  )> }
);

export type ProfilFragment = (
  { __typename?: 'Deputy' }
  & Pick<Deputy, '_id' | 'party' | 'imgURL' | 'name' | 'constituency'>
);

export type WomDeputyQueryVariables = Exact<{
  constituency: Scalars['String'];
  directCandidate?: Maybe<Scalars['Boolean']>;
  procedureIds: Array<Scalars['String']>;
}>;


export type WomDeputyQuery = (
  { __typename?: 'Query' }
  & { womDeputy: Array<(
    { __typename?: 'Deputy' }
    & WomDeputyChartFragment
    & ProfilFragment
  )> }
);

export type WomConstituencyListQueryVariables = Exact<{
  constituency: Scalars['String'];
  directCandidate?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
}>;


export type WomConstituencyListQuery = (
  { __typename?: 'Query' }
  & { womConstituencyList: Array<(
    { __typename?: 'Deputy' }
    & Pick<Deputy, '_id' | 'totalProcedures'>
    & { procedures: Array<(
      { __typename?: 'DeputyProcedure' }
      & Pick<DeputyProcedure, 'decision'>
      & { procedure: (
        { __typename?: 'Procedure' }
        & ListItemFragment
        & CommunityVotesPieChartFragment
        & GovernmentVotesPieChartFragment
      ) }
    )> }
  )> }
);

export const VoteIndexFragmentDoc = gql`
    fragment VoteIndex on Procedure {
  votes
  voted
}
    `;
export const VoteDateFragmentDoc = gql`
    fragment VoteDate on Procedure {
  voteDate
  voteEnd
}
    `;
export const ListItemFragmentDoc = gql`
    fragment ListItem on Procedure {
  procedureId
  title
  sessionTOPHeading
  ...VoteIndex
  ...VoteDate
}
    ${VoteIndexFragmentDoc}
${VoteDateFragmentDoc}`;
export const DetailGovernmentPieChartFragmentDoc = gql`
    fragment DetailGovernmentPieChart on Procedure {
  procedureId
  voteResults {
    yes
    abstination
    no
    notVoted
    namedVote
    partyVotes {
      party
    }
  }
}
    `;
export const DetailVoteResultConstituencyFragmentDoc = gql`
    fragment DetailVoteResultConstituency on Procedure {
  _id
  procedureId
  voteResults {
    deputyVotes(constituencies: $constituencies, directCandidate: true) {
      deputy {
        _id
        imgURL
        name
        party
        constituency
      }
      decision
    }
  }
}
    `;
export const DetailDecisionBarChartFragmentDoc = gql`
    fragment DetailDecisionBarChart on Procedure {
  procedureId
  voteResults {
    namedVote
    partyVotes {
      party
      deviants {
        yes
        abstination
        no
        notVoted
      }
    }
  }
}
    `;
export const DetailDecisionTextFragmentDoc = gql`
    fragment DetailDecisionText on Procedure {
  procedureId
  voteResults {
    decisionText
  }
}
    `;
export const DetailFractionChartFragmentDoc = gql`
    fragment DetailFractionChart on Procedure {
  procedureId
  voteResults {
    namedVote
    partyVotes {
      party
      deviants {
        yes
        abstination
        no
        notVoted
      }
    }
  }
}
    `;
export const ProcedureHistoryFragmentDoc = gql`
    fragment ProcedureHistory on Procedure {
  currentStatus
  currentStatusHistory
}
    `;
export const ImportantDocumentFragmentDoc = gql`
    fragment ImportantDocument on Document {
  editor
  type
  url
  number
}
    `;
export const ImportantDocumentsFragmentDoc = gql`
    fragment ImportantDocuments on Procedure {
  importantDocuments {
    ...ImportantDocument
  }
}
    ${ImportantDocumentFragmentDoc}`;
export const DetailActionBarFragmentDoc = gql`
    fragment DetailActionBar on Procedure {
  procedureId
  title
  type
  voted
  notify
}
    `;
export const CommunityVoteResultsFragmentDoc = gql`
    fragment CommunityVoteResults on Procedure {
  procedureId
  voted
  communityVotes(constituencies: $constituencies) {
    yes
    no
    abstination
    total
    constituencies {
      yes
      no
      abstination
      total
      constituency
    }
  }
}
    `;
export const ProcedureDetailsFragmentDoc = gql`
    fragment ProcedureDetails on Procedure {
  procedureId
  subjectGroups
  currentStatus
  type
  submissionDate
  voteDate
  abstract
  ...ImportantDocuments
  ...DetailActionBar
  ...CommunityVoteResults
}
    ${ImportantDocumentsFragmentDoc}
${DetailActionBarFragmentDoc}
${CommunityVoteResultsFragmentDoc}`;
export const CommunityVotesPieChartFragmentDoc = gql`
    fragment CommunityVotesPieChart on Procedure {
  procedureId
  communityVotes {
    yes
    abstination
    no
  }
  voted
}
    `;
export const GovernmentVotesPieChartFragmentDoc = gql`
    fragment GovernmentVotesPieChart on Procedure {
  voteResults {
    yes
    abstination
    no
    notVoted
  }
}
    `;
export const WomDeputyChartFragmentDoc = gql`
    fragment WomDeputyChart on Deputy {
  _id
  totalProcedures
  procedures(procedureIds: $procedureIds) {
    decision
    procedure {
      procedureId
    }
  }
}
    `;
export const ProfilFragmentDoc = gql`
    fragment Profil on Deputy {
  _id
  party
  imgURL
  name
  constituency
}
    `;
export const MeDocument = gql`
    query Me {
  me {
    _id
    verified
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ToggleNotificationDocument = gql`
    mutation ToggleNotification($procedureId: String!) {
  toggleNotification(procedureId: $procedureId) {
    procedureId
    notify
  }
}
    `;
export type ToggleNotificationMutationFn = Apollo.MutationFunction<ToggleNotificationMutation, ToggleNotificationMutationVariables>;

/**
 * __useToggleNotificationMutation__
 *
 * To run a mutation, you first call `useToggleNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleNotificationMutation, { data, loading, error }] = useToggleNotificationMutation({
 *   variables: {
 *      procedureId: // value for 'procedureId'
 *   },
 * });
 */
export function useToggleNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ToggleNotificationMutation, ToggleNotificationMutationVariables>) {
        return Apollo.useMutation<ToggleNotificationMutation, ToggleNotificationMutationVariables>(ToggleNotificationDocument, baseOptions);
      }
export type ToggleNotificationMutationHookResult = ReturnType<typeof useToggleNotificationMutation>;
export type ToggleNotificationMutationResult = Apollo.MutationResult<ToggleNotificationMutation>;
export type ToggleNotificationMutationOptions = Apollo.BaseMutationOptions<ToggleNotificationMutation, ToggleNotificationMutationVariables>;
export const CountryMapConstituenciesDocument = gql`
    query CountryMapConstituencies($procedureId: ID!) {
  procedure(id: $procedureId) {
    procedureId
    voted
    communityVotes {
      constituencies {
        yes
        no
        abstination
        total
        constituency
      }
    }
  }
}
    `;

/**
 * __useCountryMapConstituenciesQuery__
 *
 * To run a query within a React component, call `useCountryMapConstituenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountryMapConstituenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountryMapConstituenciesQuery({
 *   variables: {
 *      procedureId: // value for 'procedureId'
 *   },
 * });
 */
export function useCountryMapConstituenciesQuery(baseOptions: Apollo.QueryHookOptions<CountryMapConstituenciesQuery, CountryMapConstituenciesQueryVariables>) {
        return Apollo.useQuery<CountryMapConstituenciesQuery, CountryMapConstituenciesQueryVariables>(CountryMapConstituenciesDocument, baseOptions);
      }
export function useCountryMapConstituenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountryMapConstituenciesQuery, CountryMapConstituenciesQueryVariables>) {
          return Apollo.useLazyQuery<CountryMapConstituenciesQuery, CountryMapConstituenciesQueryVariables>(CountryMapConstituenciesDocument, baseOptions);
        }
export type CountryMapConstituenciesQueryHookResult = ReturnType<typeof useCountryMapConstituenciesQuery>;
export type CountryMapConstituenciesLazyQueryHookResult = ReturnType<typeof useCountryMapConstituenciesLazyQuery>;
export type CountryMapConstituenciesQueryResult = Apollo.QueryResult<CountryMapConstituenciesQuery, CountryMapConstituenciesQueryVariables>;
export const GovernmentVoteResultsDocument = gql`
    query GovernmentVoteResults($procedureId: ID!, $constituencies: [String!]!) {
  procedure(id: $procedureId) {
    voted
    ...DetailGovernmentPieChart
    ...DetailFractionChart
    ...DetailDecisionBarChart
    ...DetailDecisionText
    ...DetailVoteResultConstituency
  }
}
    ${DetailGovernmentPieChartFragmentDoc}
${DetailFractionChartFragmentDoc}
${DetailDecisionBarChartFragmentDoc}
${DetailDecisionTextFragmentDoc}
${DetailVoteResultConstituencyFragmentDoc}`;

/**
 * __useGovernmentVoteResultsQuery__
 *
 * To run a query within a React component, call `useGovernmentVoteResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGovernmentVoteResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGovernmentVoteResultsQuery({
 *   variables: {
 *      procedureId: // value for 'procedureId'
 *      constituencies: // value for 'constituencies'
 *   },
 * });
 */
export function useGovernmentVoteResultsQuery(baseOptions: Apollo.QueryHookOptions<GovernmentVoteResultsQuery, GovernmentVoteResultsQueryVariables>) {
        return Apollo.useQuery<GovernmentVoteResultsQuery, GovernmentVoteResultsQueryVariables>(GovernmentVoteResultsDocument, baseOptions);
      }
export function useGovernmentVoteResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GovernmentVoteResultsQuery, GovernmentVoteResultsQueryVariables>) {
          return Apollo.useLazyQuery<GovernmentVoteResultsQuery, GovernmentVoteResultsQueryVariables>(GovernmentVoteResultsDocument, baseOptions);
        }
export type GovernmentVoteResultsQueryHookResult = ReturnType<typeof useGovernmentVoteResultsQuery>;
export type GovernmentVoteResultsLazyQueryHookResult = ReturnType<typeof useGovernmentVoteResultsLazyQuery>;
export type GovernmentVoteResultsQueryResult = Apollo.QueryResult<GovernmentVoteResultsQuery, GovernmentVoteResultsQueryVariables>;
export const ProcedureDetailDocument = gql`
    query ProcedureDetail($id: ID!, $constituencies: [String!]) {
  procedure(id: $id) {
    procedureId
    ...ListItem
    ...GovernmentVotesPieChart
    ...ProcedureDetails
    ...ProcedureHistory
  }
  communityVotesProcedure: procedure(id: $id) {
    ...CommunityVotesPieChart
  }
}
    ${ListItemFragmentDoc}
${GovernmentVotesPieChartFragmentDoc}
${ProcedureDetailsFragmentDoc}
${ProcedureHistoryFragmentDoc}
${CommunityVotesPieChartFragmentDoc}`;

/**
 * __useProcedureDetailQuery__
 *
 * To run a query within a React component, call `useProcedureDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useProcedureDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProcedureDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *      constituencies: // value for 'constituencies'
 *   },
 * });
 */
export function useProcedureDetailQuery(baseOptions: Apollo.QueryHookOptions<ProcedureDetailQuery, ProcedureDetailQueryVariables>) {
        return Apollo.useQuery<ProcedureDetailQuery, ProcedureDetailQueryVariables>(ProcedureDetailDocument, baseOptions);
      }
export function useProcedureDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProcedureDetailQuery, ProcedureDetailQueryVariables>) {
          return Apollo.useLazyQuery<ProcedureDetailQuery, ProcedureDetailQueryVariables>(ProcedureDetailDocument, baseOptions);
        }
export type ProcedureDetailQueryHookResult = ReturnType<typeof useProcedureDetailQuery>;
export type ProcedureDetailLazyQueryHookResult = ReturnType<typeof useProcedureDetailLazyQuery>;
export type ProcedureDetailQueryResult = Apollo.QueryResult<ProcedureDetailQuery, ProcedureDetailQueryVariables>;
export const ProceduresListDocument = gql`
    query ProceduresList($offset: Int, $pageSize: Int, $listTypes: [ListType!], $filter: ProcedureFilter) {
  procedures(
    offset: $offset
    pageSize: $pageSize
    listTypes: $listTypes
    filter: $filter
  ) {
    procedureId
    title
    ...ListItem
    ...CommunityVotesPieChart
    ...GovernmentVotesPieChart
  }
}
    ${ListItemFragmentDoc}
${CommunityVotesPieChartFragmentDoc}
${GovernmentVotesPieChartFragmentDoc}`;

/**
 * __useProceduresListQuery__
 *
 * To run a query within a React component, call `useProceduresListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProceduresListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProceduresListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      pageSize: // value for 'pageSize'
 *      listTypes: // value for 'listTypes'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useProceduresListQuery(baseOptions?: Apollo.QueryHookOptions<ProceduresListQuery, ProceduresListQueryVariables>) {
        return Apollo.useQuery<ProceduresListQuery, ProceduresListQueryVariables>(ProceduresListDocument, baseOptions);
      }
export function useProceduresListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProceduresListQuery, ProceduresListQueryVariables>) {
          return Apollo.useLazyQuery<ProceduresListQuery, ProceduresListQueryVariables>(ProceduresListDocument, baseOptions);
        }
export type ProceduresListQueryHookResult = ReturnType<typeof useProceduresListQuery>;
export type ProceduresListLazyQueryHookResult = ReturnType<typeof useProceduresListLazyQuery>;
export type ProceduresListQueryResult = Apollo.QueryResult<ProceduresListQuery, ProceduresListQueryVariables>;
export const FinishSearchDocument = gql`
    mutation FinishSearch($term: String!) {
  finishSearch(term: $term) {
    term
  }
}
    `;
export type FinishSearchMutationFn = Apollo.MutationFunction<FinishSearchMutation, FinishSearchMutationVariables>;

/**
 * __useFinishSearchMutation__
 *
 * To run a mutation, you first call `useFinishSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishSearchMutation, { data, loading, error }] = useFinishSearchMutation({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useFinishSearchMutation(baseOptions?: Apollo.MutationHookOptions<FinishSearchMutation, FinishSearchMutationVariables>) {
        return Apollo.useMutation<FinishSearchMutation, FinishSearchMutationVariables>(FinishSearchDocument, baseOptions);
      }
export type FinishSearchMutationHookResult = ReturnType<typeof useFinishSearchMutation>;
export type FinishSearchMutationResult = Apollo.MutationResult<FinishSearchMutation>;
export type FinishSearchMutationOptions = Apollo.BaseMutationOptions<FinishSearchMutation, FinishSearchMutationVariables>;
export const MostSearchedDocument = gql`
    query MostSearched {
  mostSearched {
    term
  }
}
    `;

/**
 * __useMostSearchedQuery__
 *
 * To run a query within a React component, call `useMostSearchedQuery` and pass it any options that fit your needs.
 * When your component renders, `useMostSearchedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMostSearchedQuery({
 *   variables: {
 *   },
 * });
 */
export function useMostSearchedQuery(baseOptions?: Apollo.QueryHookOptions<MostSearchedQuery, MostSearchedQueryVariables>) {
        return Apollo.useQuery<MostSearchedQuery, MostSearchedQueryVariables>(MostSearchedDocument, baseOptions);
      }
export function useMostSearchedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MostSearchedQuery, MostSearchedQueryVariables>) {
          return Apollo.useLazyQuery<MostSearchedQuery, MostSearchedQueryVariables>(MostSearchedDocument, baseOptions);
        }
export type MostSearchedQueryHookResult = ReturnType<typeof useMostSearchedQuery>;
export type MostSearchedLazyQueryHookResult = ReturnType<typeof useMostSearchedLazyQuery>;
export type MostSearchedQueryResult = Apollo.QueryResult<MostSearchedQuery, MostSearchedQueryVariables>;
export const SearchProceduresDocument = gql`
    query SearchProcedures($term: String!) {
  searchProceduresAutocomplete(term: $term) {
    procedures {
      _id
      procedureId
      ...ListItem
      ...CommunityVotesPieChart
      ...GovernmentVotesPieChart
    }
    autocomplete
  }
}
    ${ListItemFragmentDoc}
${CommunityVotesPieChartFragmentDoc}
${GovernmentVotesPieChartFragmentDoc}`;

/**
 * __useSearchProceduresQuery__
 *
 * To run a query within a React component, call `useSearchProceduresQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProceduresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProceduresQuery({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useSearchProceduresQuery(baseOptions: Apollo.QueryHookOptions<SearchProceduresQuery, SearchProceduresQueryVariables>) {
        return Apollo.useQuery<SearchProceduresQuery, SearchProceduresQueryVariables>(SearchProceduresDocument, baseOptions);
      }
export function useSearchProceduresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProceduresQuery, SearchProceduresQueryVariables>) {
          return Apollo.useLazyQuery<SearchProceduresQuery, SearchProceduresQueryVariables>(SearchProceduresDocument, baseOptions);
        }
export type SearchProceduresQueryHookResult = ReturnType<typeof useSearchProceduresQuery>;
export type SearchProceduresLazyQueryHookResult = ReturnType<typeof useSearchProceduresLazyQuery>;
export type SearchProceduresQueryResult = Apollo.QueryResult<SearchProceduresQuery, SearchProceduresQueryVariables>;
export const VoteDocument = gql`
    mutation Vote($procedure: ID!, $selection: VoteSelection!, $constituency: String) {
  vote(procedure: $procedure, selection: $selection, constituency: $constituency) {
    voted
  }
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      procedure: // value for 'procedure'
 *      selection: // value for 'selection'
 *      constituency: // value for 'constituency'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, baseOptions);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const WomBundestagPieChartDocument = gql`
    query WomBundestagPieChart($procedureIds: [String!], $pageSize: Int, $offset: Int) {
  womBundestagPieChart: proceduresByIdHavingVoteResults(
    procedureIds: $procedureIds
    pageSize: $pageSize
    offset: $offset
  ) {
    total
    procedures {
      procedureId
      voteResults {
        governmentDecision
      }
    }
  }
}
    `;

/**
 * __useWomBundestagPieChartQuery__
 *
 * To run a query within a React component, call `useWomBundestagPieChartQuery` and pass it any options that fit your needs.
 * When your component renders, `useWomBundestagPieChartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWomBundestagPieChartQuery({
 *   variables: {
 *      procedureIds: // value for 'procedureIds'
 *      pageSize: // value for 'pageSize'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useWomBundestagPieChartQuery(baseOptions?: Apollo.QueryHookOptions<WomBundestagPieChartQuery, WomBundestagPieChartQueryVariables>) {
        return Apollo.useQuery<WomBundestagPieChartQuery, WomBundestagPieChartQueryVariables>(WomBundestagPieChartDocument, baseOptions);
      }
export function useWomBundestagPieChartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WomBundestagPieChartQuery, WomBundestagPieChartQueryVariables>) {
          return Apollo.useLazyQuery<WomBundestagPieChartQuery, WomBundestagPieChartQueryVariables>(WomBundestagPieChartDocument, baseOptions);
        }
export type WomBundestagPieChartQueryHookResult = ReturnType<typeof useWomBundestagPieChartQuery>;
export type WomBundestagPieChartLazyQueryHookResult = ReturnType<typeof useWomBundestagPieChartLazyQuery>;
export type WomBundestagPieChartQueryResult = Apollo.QueryResult<WomBundestagPieChartQuery, WomBundestagPieChartQueryVariables>;
export const WomBundestagListDocument = gql`
    query WomBundestagList($pageSize: Int, $offset: Int) {
  womBundestagList: proceduresByIdHavingVoteResults(
    pageSize: $pageSize
    offset: $offset
  ) {
    procedures {
      ...ListItem
      ...CommunityVotesPieChart
      ...GovernmentVotesPieChart
    }
  }
}
    ${ListItemFragmentDoc}
${CommunityVotesPieChartFragmentDoc}
${GovernmentVotesPieChartFragmentDoc}`;

/**
 * __useWomBundestagListQuery__
 *
 * To run a query within a React component, call `useWomBundestagListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWomBundestagListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWomBundestagListQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useWomBundestagListQuery(baseOptions?: Apollo.QueryHookOptions<WomBundestagListQuery, WomBundestagListQueryVariables>) {
        return Apollo.useQuery<WomBundestagListQuery, WomBundestagListQueryVariables>(WomBundestagListDocument, baseOptions);
      }
export function useWomBundestagListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WomBundestagListQuery, WomBundestagListQueryVariables>) {
          return Apollo.useLazyQuery<WomBundestagListQuery, WomBundestagListQueryVariables>(WomBundestagListDocument, baseOptions);
        }
export type WomBundestagListQueryHookResult = ReturnType<typeof useWomBundestagListQuery>;
export type WomBundestagListLazyQueryHookResult = ReturnType<typeof useWomBundestagListLazyQuery>;
export type WomBundestagListQueryResult = Apollo.QueryResult<WomBundestagListQuery, WomBundestagListQueryVariables>;
export const WomFractionChartDocument = gql`
    query WomFractionChart($procedureIds: [String!], $pageSize: Int, $offset: Int) {
  womFractionChart: proceduresByIdHavingVoteResults(
    procedureIds: $procedureIds
    pageSize: $pageSize
    offset: $offset
  ) {
    total
    procedures {
      procedureId
      voteResults {
        namedVote
        partyVotes {
          party
          main
        }
      }
    }
  }
}
    `;

/**
 * __useWomFractionChartQuery__
 *
 * To run a query within a React component, call `useWomFractionChartQuery` and pass it any options that fit your needs.
 * When your component renders, `useWomFractionChartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWomFractionChartQuery({
 *   variables: {
 *      procedureIds: // value for 'procedureIds'
 *      pageSize: // value for 'pageSize'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useWomFractionChartQuery(baseOptions?: Apollo.QueryHookOptions<WomFractionChartQuery, WomFractionChartQueryVariables>) {
        return Apollo.useQuery<WomFractionChartQuery, WomFractionChartQueryVariables>(WomFractionChartDocument, baseOptions);
      }
export function useWomFractionChartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WomFractionChartQuery, WomFractionChartQueryVariables>) {
          return Apollo.useLazyQuery<WomFractionChartQuery, WomFractionChartQueryVariables>(WomFractionChartDocument, baseOptions);
        }
export type WomFractionChartQueryHookResult = ReturnType<typeof useWomFractionChartQuery>;
export type WomFractionChartLazyQueryHookResult = ReturnType<typeof useWomFractionChartLazyQuery>;
export type WomFractionChartQueryResult = Apollo.QueryResult<WomFractionChartQuery, WomFractionChartQueryVariables>;
export const WomPartyListDocument = gql`
    query WomPartyList($pageSize: Int, $offset: Int) {
  womPartyList: proceduresByIdHavingVoteResults(
    pageSize: $pageSize
    offset: $offset
  ) {
    procedures {
      ...ListItem
      ...CommunityVotesPieChart
      ...GovernmentVotesPieChart
    }
  }
}
    ${ListItemFragmentDoc}
${CommunityVotesPieChartFragmentDoc}
${GovernmentVotesPieChartFragmentDoc}`;

/**
 * __useWomPartyListQuery__
 *
 * To run a query within a React component, call `useWomPartyListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWomPartyListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWomPartyListQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useWomPartyListQuery(baseOptions?: Apollo.QueryHookOptions<WomPartyListQuery, WomPartyListQueryVariables>) {
        return Apollo.useQuery<WomPartyListQuery, WomPartyListQueryVariables>(WomPartyListDocument, baseOptions);
      }
export function useWomPartyListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WomPartyListQuery, WomPartyListQueryVariables>) {
          return Apollo.useLazyQuery<WomPartyListQuery, WomPartyListQueryVariables>(WomPartyListDocument, baseOptions);
        }
export type WomPartyListQueryHookResult = ReturnType<typeof useWomPartyListQuery>;
export type WomPartyListLazyQueryHookResult = ReturnType<typeof useWomPartyListLazyQuery>;
export type WomPartyListQueryResult = Apollo.QueryResult<WomPartyListQuery, WomPartyListQueryVariables>;
export const GetDeputyProfileDocument = gql`
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

/**
 * __useGetDeputyProfileQuery__
 *
 * To run a query within a React component, call `useGetDeputyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeputyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeputyProfileQuery({
 *   variables: {
 *      constituency: // value for 'constituency'
 *      directCandidate: // value for 'directCandidate'
 *   },
 * });
 */
export function useGetDeputyProfileQuery(baseOptions: Apollo.QueryHookOptions<GetDeputyProfileQuery, GetDeputyProfileQueryVariables>) {
        return Apollo.useQuery<GetDeputyProfileQuery, GetDeputyProfileQueryVariables>(GetDeputyProfileDocument, baseOptions);
      }
export function useGetDeputyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeputyProfileQuery, GetDeputyProfileQueryVariables>) {
          return Apollo.useLazyQuery<GetDeputyProfileQuery, GetDeputyProfileQueryVariables>(GetDeputyProfileDocument, baseOptions);
        }
export type GetDeputyProfileQueryHookResult = ReturnType<typeof useGetDeputyProfileQuery>;
export type GetDeputyProfileLazyQueryHookResult = ReturnType<typeof useGetDeputyProfileLazyQuery>;
export type GetDeputyProfileQueryResult = Apollo.QueryResult<GetDeputyProfileQuery, GetDeputyProfileQueryVariables>;
export const WomDeputyDocument = gql`
    query WomDeputy($constituency: String!, $directCandidate: Boolean, $procedureIds: [String!]!) {
  womDeputy: deputiesOfConstituency(
    constituency: $constituency
    directCandidate: $directCandidate
  ) {
    ...WomDeputyChart
    ...Profil
  }
}
    ${WomDeputyChartFragmentDoc}
${ProfilFragmentDoc}`;

/**
 * __useWomDeputyQuery__
 *
 * To run a query within a React component, call `useWomDeputyQuery` and pass it any options that fit your needs.
 * When your component renders, `useWomDeputyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWomDeputyQuery({
 *   variables: {
 *      constituency: // value for 'constituency'
 *      directCandidate: // value for 'directCandidate'
 *      procedureIds: // value for 'procedureIds'
 *   },
 * });
 */
export function useWomDeputyQuery(baseOptions: Apollo.QueryHookOptions<WomDeputyQuery, WomDeputyQueryVariables>) {
        return Apollo.useQuery<WomDeputyQuery, WomDeputyQueryVariables>(WomDeputyDocument, baseOptions);
      }
export function useWomDeputyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WomDeputyQuery, WomDeputyQueryVariables>) {
          return Apollo.useLazyQuery<WomDeputyQuery, WomDeputyQueryVariables>(WomDeputyDocument, baseOptions);
        }
export type WomDeputyQueryHookResult = ReturnType<typeof useWomDeputyQuery>;
export type WomDeputyLazyQueryHookResult = ReturnType<typeof useWomDeputyLazyQuery>;
export type WomDeputyQueryResult = Apollo.QueryResult<WomDeputyQuery, WomDeputyQueryVariables>;
export const WomConstituencyListDocument = gql`
    query WomConstituencyList($constituency: String!, $directCandidate: Boolean, $offset: Int, $pageSize: Int) {
  womConstituencyList: deputiesOfConstituency(
    constituency: $constituency
    directCandidate: $directCandidate
  ) {
    _id
    totalProcedures
    procedures(offset: $offset, pageSize: $pageSize) {
      decision
      procedure {
        ...ListItem
        ...CommunityVotesPieChart
        ...GovernmentVotesPieChart
      }
    }
  }
}
    ${ListItemFragmentDoc}
${CommunityVotesPieChartFragmentDoc}
${GovernmentVotesPieChartFragmentDoc}`;

/**
 * __useWomConstituencyListQuery__
 *
 * To run a query within a React component, call `useWomConstituencyListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWomConstituencyListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWomConstituencyListQuery({
 *   variables: {
 *      constituency: // value for 'constituency'
 *      directCandidate: // value for 'directCandidate'
 *      offset: // value for 'offset'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useWomConstituencyListQuery(baseOptions: Apollo.QueryHookOptions<WomConstituencyListQuery, WomConstituencyListQueryVariables>) {
        return Apollo.useQuery<WomConstituencyListQuery, WomConstituencyListQueryVariables>(WomConstituencyListDocument, baseOptions);
      }
export function useWomConstituencyListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WomConstituencyListQuery, WomConstituencyListQueryVariables>) {
          return Apollo.useLazyQuery<WomConstituencyListQuery, WomConstituencyListQueryVariables>(WomConstituencyListDocument, baseOptions);
        }
export type WomConstituencyListQueryHookResult = ReturnType<typeof useWomConstituencyListQuery>;
export type WomConstituencyListLazyQueryHookResult = ReturnType<typeof useWomConstituencyListLazyQuery>;
export type WomConstituencyListQueryResult = Apollo.QueryResult<WomConstituencyListQuery, WomConstituencyListQueryVariables>;