import * as React from 'react';
import { Svg, SvgProps, Defs, Path, Use } from 'react-native-svg';

const SvgInfo = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M471.04 757.76V409.6h81.92v348.16h40.96v20.48H430.08v-20.48h40.96zM512 1024c282.77 0 512-229.23 512-512S794.77 0 512 0 0 229.23 0 512s229.23 512 512 512zm0-40.96c260.148 0 471.04-210.892 471.04-471.04S772.148 40.96 512 40.96 40.96 251.852 40.96 512 251.852 983.04 512 983.04zM430.08 409.6v20.48h40.96V409.6h-40.96zM512 368.64c33.932 0 61.44-27.508 61.44-61.44s-27.508-61.44-61.44-61.44-61.44 27.508-61.44 61.44 27.508 61.44 61.44 61.44z"
        id="info_svg__a"
      />
    </Defs>
    <Use fill={props.color} xlinkHref="#info_svg__a" fillRule="evenodd" />
  </Svg>
);

export default SvgInfo;
