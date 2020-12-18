import * as React from 'react';
import { Svg, SvgProps, Path } from 'react-native-svg';

const SvgFunnelEmpty = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Path
      d="M402.86 722.104V414.8L72 92h880L636.61 414.8V933z"
      fillRule="nonzero"
      stroke={props.color}
      strokeWidth={63}
      fill="none"
    />
  </Svg>
);

export default SvgFunnelEmpty;
