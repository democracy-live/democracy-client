import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg6 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 60 66" {...props}>
    <Path
      d="M53 11h1v2l3 2v1h2v4l1 1-1 7-1 1-1 2h-1v-3h-1l-1-1-2-1h-5l-1 1v4l-1 1h-3v2l1 1 1 3h2v3h-7v-1h-1l-1 1v2h1v1l-1 1v2h-3l-2-1v-4l-1 1h-3l-2 1-4 2-1 1-5 2h-1v1l2 2v1h6l1-1h1l2 1 1 3v1h-2l-1-1h-1l-1-1-1 2v1l-1 2-2 1h-2v-1h-1l-2 1-2 2-4 3v-3h1l1-1v-2H9l-1 1H7l-4-5v-2H1v-2l-1-4v-4l1-3 1-2 2-1v-1h1l1 2 2 1 1-1v1h5v-1l1-1-1-2V26l-1-2 1-1h4v1h1l1-2 1-2v-6l-1-2-2-1v1-3h1l2-4-1-1h1l1-1V2l5-2h4l2 1h2v1l2 1 1 1 2 1h1l1 1h1l2 1 5 1v1h1l2 1v1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg6;
