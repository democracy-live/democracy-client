import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg10 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 63 60" {...props}>
    <Path
      d="M55 15h5v1l2 1 1 4v1h-1l-1 2v2l-1 3v1h1-1v2h-1l-3 1-2-1h-1v4l-1 3-3 3-1 1v1l-5 2-3 1-2 1v1l-1 3-1 6v2h-2l-5-1h-1v-1h-1l-1-1-2-1-2-1-2-1-1-2h-4l-2-1 1-1-1-1h-1l-4-4-1-1v-1h1-1l-5-3-1-6H0l1-1v-1h3v-3l1-3v1l1-1v-1l-2-3-1-1H2v-2h1l6-2h1l1-1h2v3l5 1h2l3 3 1 1v1h3v-1h1v-1l2-5 1-3 3-1 1-1 1 1v1h-1v1l2 1 4 1h1v-2l-1-2 1-6 1-2-1-1h1l1-1 2-2-1-1V0l1 1h1l1 1v2l-1 3 1 2 3 4 1 1 2 1h1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg10;
