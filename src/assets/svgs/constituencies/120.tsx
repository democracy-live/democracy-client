import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg120 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 19 16" {...props}>
    <Path
      d="M7 0v2l1 1 2 1h4l1 1h1l1 1 1-1 1 1v2l-1 2v2h-1l-1 1-5 1H7l-1 1-1 1-3-1-1-1-1-1h1l2-3 2-6V3H4l3-3"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg120;
