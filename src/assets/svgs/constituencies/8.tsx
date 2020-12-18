import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg8 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 56 61" {...props}>
    <Path
      d="M42 5h3V3v1l2 1 1 1h3V5h5v5h-1v2l-2-1h-2l-1 1-1 1-1 2v1h5l2 5 1 1v1h-1v1l-1 1v-1l-6 5-1 1-3 2v1l1 3 2 2h1l2 3v4l-2 1-3 3 2 1h1v3h-2l-1 2v2h-2l-5-1v-3h-2l-1 1h-1l-6 2h-1v2l-2-1v-1l1-2 2-2v-1l1-1v-1h-3l-2 2h-4l-1 1v1h1v1h-1v2h-5l-1 1v4l-1-1h-2l-1-3v-4h1v-1l1-1 1-3 1-2-1-1h-1v1h-1v1H6l-2-3 1-3-1-2-1-1h1v-1l-3-6-1-1 4-2h1l1 1h3l1-2v-1l3-2 1-1 2 1 4-3 2-2 2-1h1v1h2l2-1 1-2v-1l1-2 1 1h1l1 1h2v-1l-1-3-2-1h-1l-1 1h-6v-1l-2-2V7h1l5-2 1-1 4-2 2-1h3l1-1v4l2 1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg8;
