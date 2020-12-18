/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NotificationSettings
// ====================================================

export interface NotificationSettings_notificationSettings {
  __typename: "NotificationSettings";
  enabled: boolean | null;
  conferenceWeekPushs: boolean | null;
  voteConferenceWeekPushs: boolean | null;
  voteTOP100Pushs: boolean | null;
  outcomePushs: boolean | null;
}

export interface NotificationSettings {
  notificationSettings: NotificationSettings_notificationSettings | null;
}
