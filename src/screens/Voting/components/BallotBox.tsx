import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import {
  PanResponder,
  Dimensions,
  LayoutChangeEvent,
  PanResponderGestureState,
  Alert,
  Animated,
} from 'react-native';
import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  GovernmentVoteResultsDocument,
  ProcedureDetailDocument,
  useVoteMutation,
  VoteSelection,
} from 'generated/graphql';
import { LocalVotesContext } from 'context/LocalVotes';
import { ConstituencyContext } from 'context/constituency';
import { BundestagStackNavigatorParamList } from 'navigation/Sidebar/Bundestag';
import VoteButton from 'screens/Procedure/components/ActionBar/components/VoteButtons/VoteButton';
import { NotificationsContext } from 'context/NotificationPermission';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 18px;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const DropZone = styled.TouchableOpacity`
  position: absolute;
  right: 18px;
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled.Image.attrs(() => ({
  source: require('./assets/voteDropZone.png'),
}))``;

// const CheckIcon = styled(SimpleLineIcons).attrs(() => ({
//   size: 80,
//   color: "#000000",
//   name: "check"
// }))`
//   padding-top: 5;
// `;

const LineWrapper = styled.View`
  position: absolute;
  left: 120px;
  right: 120px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const Line = styled.Image.attrs(() => ({
  source: require('./assets/vote-line.png'),
  resizeMode: 'stretch',
}))``;

interface Props {
  selection: VoteSelection.Yes | VoteSelection.Abstination | VoteSelection.No;
  procedureId: string;
  title: string;
}

export const BalloutBox: React.FC<Props> = ({
  selection,
  procedureId,
  title,
}) => {
  const { setLocalVote } = useContext(LocalVotesContext);
  const { constituency } = useContext(ConstituencyContext);
  const {
    notificationSettings,
    hasPermissions,
    outcomePushsDenied,
  } = useContext(NotificationsContext);
  const navigation = useNavigation<
    StackNavigationProp<BundestagStackNavigatorParamList, 'Voting'>
  >();
  const [vote] = useVoteMutation();
  const [isDraggable, setIsDraggable] = useState(true);

  const pan = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const isDropArea = (gesture: PanResponderGestureState) =>
    gesture.moveX > Dimensions.get('window').width - 100;

  const showNotification = () => {
    Alert.alert('Stimme abgeben', 'Ziehe deine Auswahl auf den Haken.');
  };

  const previewAnimation = useCallback(() => {
    Animated.timing(pan, {
      toValue: { x: 50, y: 0 },
      duration: 1500,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(pan, {
          toValue: { x: 0, y: 0 },
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });
  }, [pan]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).stop();
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).stop();
          if (isDraggable) {
            Animated.event([null, { dx: pan.x }], { useNativeDriver: false })(
              e,
              gestureState,
            );
          }
        },
        onPanResponderRelease: (e, gesture) => {
          if (isDraggable) {
            if (isDropArea(gesture)) {
              Animated.spring(pan, {
                toValue: {
                  x: Dimensions.get('window').width - 94 - 2 * 18,
                  y: 0,
                },
                friction: 5,
                useNativeDriver: true,
              }).start();
              setIsDraggable(false);

              vote({
                variables: {
                  constituency,
                  procedure: procedureId,
                  selection,
                },
                refetchQueries: [
                  {
                    query: ProcedureDetailDocument,
                    variables: {
                      id: procedureId,
                      constituencies: [constituency],
                    },
                  },
                  {
                    query: GovernmentVoteResultsDocument,
                    variables: {
                      procedureId,
                    },
                  },
                ],
              })
                .then(() => {
                  setLocalVote({
                    procedureId,
                    constituency,
                    selection,
                  });
                  if (
                    (!notificationSettings.outcomePushs ||
                      !notificationSettings.enabled ||
                      !hasPermissions) &&
                    !outcomePushsDenied
                  ) {
                    navigation.replace('OutcomePush', {
                      finishAction: () => navigation.goBack(),
                      procedureId: procedureId,
                      title,
                    });
                  } else {
                    navigation.goBack();
                  }
                })
                .catch((err) => {
                  navigation.goBack();
                  throw err;
                });
            } else {
              Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                friction: 5,
                useNativeDriver: true,
              }).start(({ finished }) => {
                if (finished) {
                  previewAnimation();
                }
              });
              showNotification();
            }
          }
        },
      }),
    [
      pan,
      isDraggable,
      vote,
      constituency,
      procedureId,
      selection,
      setLocalVote,
      navigation,
      notificationSettings.outcomePushs,
      notificationSettings.enabled,
      hasPermissions,
      outcomePushsDenied,
      title,
      previewAnimation,
    ],
  );

  useEffect(() => {
    previewAnimation();
  }, [previewAnimation]);

  const onLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }: LayoutChangeEvent) => {
    if (!isDraggable) {
      Animated.spring(pan, {
        toValue: {
          x: width - 94 - 2 * 18,
          y: 0,
        },
        useNativeDriver: true,
      }).start();
    }
  };

  const panStyle: any = {
    transform: pan.getTranslateTransform(),
  };
  return (
    <Wrapper onLayout={onLayout}>
      <DropZone onPress={showNotification}>
        <CheckIcon />
      </DropZone>
      <LineWrapper>
        <Line />
      </LineWrapper>
      <Animated.View {...panResponder.panHandlers} style={panStyle}>
        <VoteButton selection={selection} />
      </Animated.View>
    </Wrapper>
  );
};
