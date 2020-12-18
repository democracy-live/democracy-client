import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg1 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 73 80" {...props}>
    <Path
      d="M45 6l5 2h1l3 3v1h1v2h1l1 2h1v1h3l1-2v-3l1-1 2 1 2 2 1 2v3h1v2l1 1v1l2 2h1v4l-1 2v1-1h-3l-4 2-3 2-4 3-2 1-4 3-3 4-2 1-1 1-1 3-2 5-1 1-3 2h-2v1l-1 4h1v2l1 1-1 2-5 2h-3l-1-1h-2v1l-2 2h1v5l-2-1-1 1-1 1-3 1-1-1h-1l-2-3v-1h2v-2l-1-1-1-1-2-1h-1v1h1v2l-4-1v-2l2-3 2-1h2l1-1v-3l1-1 1-2 1-1h1v-2l-2-4-1-1v-3h1v-1l1-1v-4l-2-1h-2v-4l-1-2-2-2v-2l-2-1v-1l-1-1v-2l-1-1H0v-1h-1 1l1-1v-2l-1-2 1-2 1-1 1-1 1-2-2-4 1-3V2h3l4 2 3 1v1l-1 1 1 1v2h8l2-1V7l1-1h2v1l1 1 1-1 3-1h1l6-6h1l3 1-1 1-1 2 2 1h1l2 1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg1;
