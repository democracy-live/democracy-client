import { gql } from '@apollo/client';

export const UPDATE_NOTIFICATION_SETTINGS = gql`
  mutation UpdateNotificationSettings(
    $enabled: Boolean
    $conferenceWeekPushs: Boolean
    $voteConferenceWeekPushs: Boolean
    $voteTOP100Pushs: Boolean
    $outcomePushs: Boolean
  ) {
    updateNotificationSettings(
      enabled: $enabled
      conferenceWeekPushs: $conferenceWeekPushs
      voteConferenceWeekPushs: $voteConferenceWeekPushs
      voteTOP100Pushs: $voteTOP100Pushs
      outcomePushs: $outcomePushs
    ) {
      enabled
      conferenceWeekPushs
      voteConferenceWeekPushs
      voteTOP100Pushs
      outcomePushs
    }
  }
`;
