import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg180 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 32 27" {...props}>
    <Path
      d="M10 0h2v1l2 1h1v2l4 1 1 1h1l1-2h2v2l1 3v1l1 2v1h1v-1h1l3 2 1 1-1 1h-3v1h-3v1l-1 2 1 1h-2l-3 1-1 2v3h-1v1-2h-1l-3-1h-3v1H9l-1-3h1v-3H8l-3-1H3l-3-1 1-2 1-2-1-1v-2l1-1h2L3 8V7l1-2h1l2-1-1-2V1l2-1 1 1h1V0"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg180;
