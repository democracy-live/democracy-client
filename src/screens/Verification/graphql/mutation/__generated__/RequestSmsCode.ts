/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RequestSmsCode
// ====================================================

export interface RequestSmsCode_requestCode {
  __typename: "CodeResult";
  reason: string | null;
  allowNewUser: boolean | null;
  succeeded: boolean;
  resendTime: any | null;
  expireTime: any | null;
}

export interface RequestSmsCode {
  requestCode: RequestSmsCode_requestCode;
}

export interface RequestSmsCodeVariables {
  newPhone: string;
  oldPhoneHash?: string | null;
}
