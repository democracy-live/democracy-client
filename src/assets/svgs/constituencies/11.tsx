import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg11 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 42 48" {...props}>
    <Path
      d="M37 5h1v4l3 1h1v1l-1 1h-1l-1 1h-1v-1l-3-1-3 2-4 3-2 3v2l1 1v2h-1l-1-1v1l1 1-2 2-1 1h-1l1 1-1 2-1 6 1 2v2h-1l-4-1-2-1v-1h1v-1l-1-1-1 1-3 1-1 3-2 5v1H7v1H4v-1l-1-1-3-3v-2l1-2h2v-3H2l-2-1 3-3 2-1v-1l2 2h1l2-1v-2l1-1h-1v-1h1l2-1v-1 1l-1-3h-1v-1l1-1h1l1-2-2-4v-1l1-1 2 1h4v-1h1v-1h1l1-1h1l3-1 2-1h2l1-1 2-6V0h2v1h1v4h1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg11;
