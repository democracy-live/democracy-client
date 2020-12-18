import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

interface Props {
  visible: boolean;
  duration?: number;
}

class Fade extends PureComponent<Props> {
  state = {
    fadeAnim: new Animated.Value(1),
  };

  // TODO refactor this
  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { visible } = nextProps;
    const { duration = 500 } = this.props;
    if (this.props.visible !== visible) {
      Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: visible ? 1 : 0, // Animate to opacity: 1 (opaque)
          duration, // Make it take a while
          useNativeDriver: true,
        },
      ).start();
    }
  }

  render() {
    const { fadeAnim } = this.state;
    const { children } = this.props;
    return (
      <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>
    );
  }
}

export default Fade;
