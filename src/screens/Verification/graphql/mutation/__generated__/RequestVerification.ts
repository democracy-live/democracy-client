/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RequestVerification
// ====================================================

export interface RequestVerification_requestVerification {
  __typename: "VerificationResult";
  reason: string | null;
  succeeded: boolean;
}

export interface RequestVerification {
  requestVerification: RequestVerification_requestVerification;
}

export interface RequestVerificationVariables {
  code: string;
  newPhoneHash: string;
  newUser?: boolean | null;
}
