import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg5 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 13 24" {...props}>
    <Path
      d="M11 3v3L8 9l2 3v-1l2 1 1 2v6l-1 2-1 2h-1v-1H5l-4-4-1-1v-4l1-1 1-1V8l1-1V5L2 4l1-1V2l1-1 1 1 2 1h1V1l1-1 2 3"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg5;
