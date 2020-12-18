import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg123 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 12 20" {...props}>
    <Path
      d="M3 0l1 1 3 3 2 1 2 1v1l1 1v3h-1v3h1v5H9v1l-2-1-1-1-1-2H4l-1-1H2v-2H1l1-3V8L1 5 0 4V1l3-1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg123;
