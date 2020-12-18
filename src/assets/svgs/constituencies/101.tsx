import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg101 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 16 19" {...props}>
    <Path
      d="M14 1l-1 1v1l3 1v3l-1 2-2 1v4h1l1 1 1 1v1l-1 1h-2l-4 1H6l-1-1 2-1v-2l-1-1H5v-4h1V9H5V8L4 7 3 6 1 5 0 4V3h6l1-1V0l2 1h1V0h4v1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg101;
