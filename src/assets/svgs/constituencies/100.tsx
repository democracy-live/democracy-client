import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg100 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 33 38" {...props}>
    <Path
      d="M23 2v1l1 3v4l1 2h1v-1h1v-1l2 1-1 3v1h-1v1l-1 1-2 3-2 1v1h-1v1h1l1 1h4l1 1 1 1 1 1 1-1h1l1 1v2h-1l-3 3h-1l-3 1h-1l-1-1-1-1-1-1h-1v1l-1 1v2l-2 3h-1l-3 1-1-2-1-1 1-1v-3l-1-3-2-1-1-1 1-1v-1l-1-1-1-1H6v-4l2-1 1-2v-3l-3-1v-1l1-1V8H3v1H2L0 8l1-3V4l2-1h1l4-1h1l1 1h1v1l1 1h1l2-1-1-1V1h1V0v1l3-1h4l1 2"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg100;
