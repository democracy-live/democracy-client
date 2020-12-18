import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg96 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 16 18" {...props}>
    <Path
      d="M16 16l-1 1-1-1h-1l-1-1H7l-2 1v1H4l-1 1-2-3-1-1h1l1-2-1-3V5l1-3V1h1l1-1 2 1h2V0h1l6 3 1 1v1h-1l-1 1-2 3 1 1v1l3 5"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg96;
