import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg80 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 12 9" {...props}>
    <Path
      d="M10 1h1l1 1v1l-1 5h-1L6 9H1L0 8V7l2-6 6-1 2 1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg80;
