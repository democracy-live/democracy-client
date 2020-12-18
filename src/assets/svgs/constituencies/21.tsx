import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Svg21 = (props: any) => (
  <Svg width="1em" height="1em" viewBox="0 0 18 21" {...props}>
    <Path
      d="M14 8l-1 3h1l-2 2H9v1l-2 1-1 1v4l-3 1v-1H2l-2-4v-1h1v-1l1-1-1-2 1 1V8l1-1h5V5h1V4H8V3l1-1h4l2-2h3v1l-1 1v1l-2 2-1 2v1"
      fill="#000"
      fillRule="evenodd"
      {...props.childProps}
    />
  </Svg>
);

export default Svg21;
