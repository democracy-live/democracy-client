import * as React from 'react';
import { Svg, SvgProps, Path } from 'react-native-svg';

const SvgDownload = (props: SvgProps) => (
  <Svg viewBox="0 0 50 50" width="1em" height="1em" {...props}>
    <Path d="M25 3a2 2 0 100 4 2 2 0 000-4zm0 6a2 2 0 100 4 2 2 0 000-4zm-.219 5.969A2 2 0 0023 17v17.188l-3.594-3.594a2 2 0 00-1.437-.625 2 2 0 00-1.375 3.437l6.75 6.719a2 2 0 00.093.156l.157.125a2 2 0 003.093-.312l6.72-6.688a2 2 0 10-2.813-2.812L27 34.187V17a2 2 0 00-2.031-2.031 2 2 0 00-.188 0zM2 33v11.906C2 46.59 3.41 48 5.094 48h39.812C46.59 48 48 46.59 48 44.906V33h-4v11H6V33H2z" />
  </Svg>
);

export default SvgDownload;
