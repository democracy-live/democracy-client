import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg20 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 11 12" {...props}>
    <Path
      d="M6 0h2l1 2-1 1v1H7v1l2 4h1v1l1 1-1 1-2-1-1 1-2-2-3-2-1-2H0V5l1-1V3h1V2l1-2h3"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg20;
