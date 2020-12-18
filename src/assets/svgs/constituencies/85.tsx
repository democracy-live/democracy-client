import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg85 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 11 13" {...props}>
    <Path
      d="M7 4h1l3 2-1 1H9v2l-1 3v1l-2-1H5v1H3v-1L1 8H0V3l2-2 1-1h1v1h1v1l2 2"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg85;
