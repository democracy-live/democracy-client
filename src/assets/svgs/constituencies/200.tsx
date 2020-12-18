import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg200 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 75 79" {...props}>
    <Path
      d="M21 1h7l3 1 1 1 2 1 2 1 1 3v1h-1v1l2 1h3l1-2h1l1 1-1 2 1 4h2v-1l1-1v-2l1-2h2-1l1 1h1l1-1 3-5V4l1-1h1l1 1h4l1-1 2 2h-5v2h3l2 4h1v2l-1 1h1l1 1h3v1l3 4v1l-1 1v1h1l2 3v1h-1l-4 2-1 1-1 2-1 1 3 3 3 2h-4l-2 3v1l-1 1v1l-3 2-1 1-2 1-3 3-3 2-4 1-2 2-2 1v-1l-1-1-1 1v-5l-1-1h-5l-1 1h1l-1 1h-3v-1h1l-1-1-3 1h-2l1 2 1 1 1 1h1v1l-3 1-3 3-6 5v4l-2 2-4 4-1 1v1l-1 1-3 1-1-1-2-2v-2h1v-1l-1-1-3-2v-1l-1-1-2-3v-1l1-2 1-1h3v-2l-1-1v1H4l-1-1H2l-1-2-1-3v-2l2-2h4l2-1 1-1-1-1H7l-1-1v-1l2-3-1-2 2-4h1l3 2 2 2v2h3v-1l3-3v-3l1-1-2-5h-1l-6-1-3-2v-3l-1-7v-3L8 9V7l2-1 2-1v2h2l2-2 1-1V3l1-2V0l3 1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg200;
