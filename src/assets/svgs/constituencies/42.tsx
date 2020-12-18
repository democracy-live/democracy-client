import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg42 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 19 12" {...props}>
    <Path
      d="M18 7h1v2l-1 3h-3l-4-2-3-1V8H7l-1 2-2 1-1 1v-1L0 6V5l1-4h1l1-1h2v1h2v1h1v1l4 2 1-1h2V3v1h1v2l1 2 1-1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg42;
