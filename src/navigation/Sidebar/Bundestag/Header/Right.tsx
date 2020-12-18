import { useNavigation } from '@react-navigation/native';
import { ListFilterContext } from 'context/ListFilter';
import React, { useContext } from 'react';
import { HaderRightWrapper } from 'components/navigation/HeaderRightWrapper';
import Svg, { Circle } from 'react-native-svg';
import SvgFunnelEmpty from 'assets/svgs/icons/FunnelEmpty';
import SvgFunnel from 'assets/svgs/icons/Funnel';
import { MenuButton } from 'components/navigation/MenuButton';
import SvgLens from 'assets/svgs/icons/Lens';

export const BundestagRightHeader: React.FC = () => {
  const navigation = useNavigation();
  const { active: hasFilters } = useContext(ListFilterContext);

  return (
    <HaderRightWrapper>
      <MenuButton onPress={() => navigation.navigate('Filter')}>
        {!hasFilters && <SvgFunnelEmpty width={18} height={18} color="#fff" />}
        {!!hasFilters && (
          <>
            <SvgFunnel width={18} height={18} color="#fff" />
            <Svg
              width="8"
              height="8"
              viewBox="0 0 10 10"
              style={{ position: 'absolute', top: 8, right: 7 }}>
              <Circle cx="5" cy="5" r="5" fill="#d0021b" />
            </Svg>
          </>
        )}
      </MenuButton>
      <MenuButton onPress={() => navigation.navigate('Search')}>
        <SvgLens width={18} height={18} color="#fff" />
      </MenuButton>
    </HaderRightWrapper>
  );
};
