import * as React from 'react';
import { Svg, SvgProps, Path } from 'react-native-svg';

const SvgPhone = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Path
      d="M750.933 614.4c-68.266 68.267-68.266 136.533-136.533 136.533-68.267 0-136.533-68.266-204.8-136.533-68.267-68.267-136.533-136.533-136.533-204.8 0-68.267 68.266-68.267 136.533-136.533C477.867 204.8 273.067 0 204.8 0 136.533 0 0 204.8 0 204.8c0 136.533 140.288 413.355 273.067 546.133C405.777 883.712 682.667 1024 819.2 1024c0 0 204.8-136.533 204.8-204.8 0-68.267-204.8-273.067-273.067-204.8"
      fill={props.color}
      fillRule="evenodd"
    />
  </Svg>
);

export default SvgPhone;
