import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg90 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 42 58" {...props}>
    <Path
      d="M23 0l1 1-1 1v1l-1 2 2 6v1l2 3 1 2v3h2v3l1 1v1l4 3 2 1 1-1h1l1-1 1 1h2v6l-1 1h-1l-1 1 1 1 1 1v3l-1 1v1h-1l-3-1h-1l-3 2-1 1 1 2 1 1v1l-2 1-1 1v2l-1 4-1 1h-5l-1-1-1-1h-1l-2-1h-1v2h-2v-3h2v-2l-3-2h-4l-2-2H7l-1-1v-1h1l2-4 4-6v-3l-1 1-1 1H9l-1-3h1l1-1 1-2-1-6v-1l-1-2H8l-1 1-1 1-1 1H3l-1-1-1-4v-1h1l1-2v-2l-1-1H1l-1-1 1-2 2-2 5-3h4l2-1 1-1 3-1h2l3-1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg90;
