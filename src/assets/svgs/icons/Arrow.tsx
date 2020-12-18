import * as React from 'react';
import { Svg, SvgProps, Defs, Path, Use } from 'react-native-svg';

const SvgArrow = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M507.453 233.121l.064-.072L1024 692.776l-87.9 98.752-427.816-380.804L88.876 791.577 0 693.703 507.342 233l.11.121z"
        id="arrow_svg__a"
      />
    </Defs>
    <Use fill={props.color} fillRule="nonzero" xlinkHref="#arrow_svg__a" />
  </Svg>
);

export default SvgArrow;
