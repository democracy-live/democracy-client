import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg50 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 19 22" {...props}>
    <Path
      d="M16 1v4l1 1 2 1h-1v1l-2 5-1 2v2l-2 1-2 3h-1l-2 1-1-1-2-1H3l-1-2v-5L1 9 0 5V4h1V3l1 1h3V0h9l2 1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg50;
