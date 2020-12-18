import { gql } from '@apollo/client';

export const NOTIFICATION_SETTINGS = gql`
  query NotificationSettings {
    notificationSettings {
      enabled
      conferenceWeekPushs
      voteConferenceWeekPushs
      voteTOP100Pushs
      outcomePushs
    }
  }
`;
