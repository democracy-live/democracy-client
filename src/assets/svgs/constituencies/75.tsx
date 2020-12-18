import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg75 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 10 9" {...props}>
    <Path
      d="M9 5l1 1v2H6L5 9 3 8V7L2 6H1L0 4h2-1V3H0V1h5l1-1 1 3 1 2h1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg75;
