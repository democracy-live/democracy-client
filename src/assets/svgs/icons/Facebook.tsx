import * as React from 'react';
import { Svg, SvgProps, Path } from 'react-native-svg';

const SvgFacebook = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Path
      d="M592.663 1024H375.51V511.935H267v-176.44h108.51V229.566C375.51 85.635 436.748 0 610.842 0h144.902v176.505H665.18c-67.774 0-72.252 24.656-72.252 70.673l-.299 88.317h164.11l-19.208 176.44H592.63V1024h.033z"
      fill={props.color}
      fillRule="evenodd"
    />
  </Svg>
);

export default SvgFacebook;
