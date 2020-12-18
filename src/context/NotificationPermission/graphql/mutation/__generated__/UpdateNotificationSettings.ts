/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateNotificationSettings
// ====================================================

export interface UpdateNotificationSettings_updateNotificationSettings {
  __typename: "NotificationSettings";
  enabled: boolean | null;
  conferenceWeekPushs: boolean | null;
  voteConferenceWeekPushs: boolean | null;
  voteTOP100Pushs: boolean | null;
  outcomePushs: boolean | null;
}

export interface UpdateNotificationSettings {
  updateNotificationSettings: UpdateNotificationSettings_updateNotificationSettings | null;
}

export interface UpdateNotificationSettingsVariables {
  enabled?: boolean | null;
  conferenceWeekPushs?: boolean | null;
  voteConferenceWeekPushs?: boolean | null;
  voteTOP100Pushs?: boolean | null;
  outcomePushs?: boolean | null;
}
