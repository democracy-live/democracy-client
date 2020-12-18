/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToken
// ====================================================

export interface AddToken_addToken {
  __typename: "TokenResult";
  succeeded: boolean | null;
}

export interface AddToken {
  addToken: AddToken_addToken;
}

export interface AddTokenVariables {
  token: string;
  os: string;
}
