import * as React from 'react';
import { Svg, SvgProps, Path } from 'react-native-svg';

const SvgShareIos = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Path
      d="M127 1019V288.396h279.657v33.982h-244.7v662.64H861.1v-662.64H616.4v-33.982h279.658V1019H127zm240.33-874.802l28.84 28.84 96.117-96.117c2.58-2.58 0 543.317 0 543.317h39.15s-2.902-545.552 0-542.65l95.45 95.45 28.84-28.84L511.527 0 367.33 144.198z"
      fill={props.color}
      fillRule="evenodd"
    />
  </Svg>
);

export default SvgShareIos;
