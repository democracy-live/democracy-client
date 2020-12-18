import * as React from 'react';
import { Svg, SvgProps, G, Text, TSpan, Rect } from 'react-native-svg';

const SvgNewmarker = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 58 35" {...props}>
    <G fill="none" fillRule="evenodd">
      <Text
        fontFamily="HelveticaNeue-CondensedBlack, Helvetica Neue"
        fontSize={20}
        fontWeight={700}
        fill={props.color}>
        <TSpan x={12.52} y={25}>
          {'NEU'}
        </TSpan>
      </Text>
      <Rect
        stroke={props.color}
        strokeWidth={2}
        x={1}
        y={1}
        width={56}
        height={33}
        rx={8}
      />
    </G>
  </Svg>
);

export default SvgNewmarker;
