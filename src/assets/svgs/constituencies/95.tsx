import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg95 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 18 19" {...props}>
    <Path
      d="M7 0l4 2v1l1 1 2 1 1 1 1 1v1h1v1h-1v4h1l1 1v2l-2 1v-1h-1l-2 1v1h-1v1l-2-1H8l-1-3-2-1v-1l1-1V7L5 6H2L0 3V2h2v1h1v2l1-1V3h1V2L4 1l2-1h1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg95;
