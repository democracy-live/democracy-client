import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg150 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 30 43" {...props}>
    <Path
      d="M23 3l1 1 1 1v2l1 2-1 1 1 2 1 2v4h1l1 1v2h-1l-1 2v8h1l1 1h1v2l-1 6h-1l-2 1-4 1h-3l-1 1v-2l-1-1v-1l1 1 1-2-2-2-1-2-2-1h-1v1l-6-3H6l-1-2-1-1v-2l-1-1H1l-1-1v-5l1-6v-2l2 1v-1l1-1V7L3 4l2-1 2-1 3-1h2l1 1 5-1h2l1-1 2 3"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg150;
