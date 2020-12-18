import * as React from 'react';
import { Svg, SvgProps, Path } from 'react-native-svg';

const SvgFunnel = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Path
      d="M394.426 738.055v-330.69L38 60h948L646.238 407.364V965z"
      fill={props.color}
      fillRule="nonzero"
      stroke={props.color}
      strokeWidth={30}
    />
  </Svg>
);

export default SvgFunnel;
