import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg110 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 25 45" {...props}>
    <Path
      d="M24 8h1v3l-1 1v1h-1v1h-1v2h1l1 1v1h-1v1h-1v1h-5v3l-1 2-1 2 1 1v1h-1v2l-1 1v-1h-1l-1 2v2h-1l-1 2-3 2v3H6l-2 2-1 1-1-1 1-1v-1l-2-4H0v-2l3-4v-1h1l1-1h1v2h1v-1h1v-3l-1-1v-1H6v1l-1 1-1-1 1-7 2 1h1l7-3h1v-1l-1-1h-2v-3l-4-1H7l-1-2h1V6l1-1h2v1l1 1v1l2-1 2-1 1-2 1-3v-2 1l2 4v1h1l3 2h1v1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg110;
