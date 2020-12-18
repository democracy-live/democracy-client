import React, { useEffect, useState, useContext, useCallback } from 'react';
import { SectionList, View, Alert } from 'react-native';
import Checkbox from './components/Checkbox';
import { StackNavigationProp } from '@react-navigation/stack';
import styled, { useTheme } from 'styled-components/native';
import { BundestagStackNavigatorParamList } from 'navigation/Sidebar/Bundestag';
import { AuthContext } from 'context/Auth';
import { ListFilterContext } from 'context/ListFilter';
import { FilterData, FilterEntry } from 'context/ListFilter/initData';
import { Segment } from 'components/Segment';

const Save = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.paddings.outer};
`;

const SaveText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

const Container = styled.View`
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const ListRowMain = styled.View`
  padding-top: 4px;
  justify-content: center;
`;

const ListRowSub = styled.View`
  padding-left: ${({ theme }) => theme.paddings.outer};
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* background-color: #ffff0055; */
`;

const TitleMain = styled.Text`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 17px;
`;

const TitleSub = styled.Text`
  color: ${({ theme }) => theme.colors.primaryText};
  flex: 0.98;
  font-size: 15px;
`;

type FilterScreenNavigationProp = StackNavigationProp<
  BundestagStackNavigatorParamList,
  'Filter'
>;

type Props = {
  navigation: FilterScreenNavigationProp;
};

export const FilterScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { isVerified } = useContext(AuthContext);
  const { filter, setFilter } = useContext(ListFilterContext);
  const [data, setData] = useState<FilterData[]>(filter);

  useEffect(() => {
    if (
      !isVerified &&
      data.findIndex(({ name }) => name === 'activity') !== -1
    ) {
      setData(data.filter(({ name }) => name !== 'activity'));
    }
  }, [data, setData, isVerified]);

  const getValue = useCallback(
    ({ type, subType }: { type: string; subType?: string }) => {
      const filterCategory = data.find(({ name }) => {
        return name === type;
      });
      if (filterCategory) {
        if (subType) {
          const filterEntry = filterCategory.data.find(
            ({ name, title }) => subType === name || subType === title,
          );
          if (filterEntry) {
            return filterEntry.value;
          }
          return false;
        }
        const someFalse = filterCategory.data.some(({ value }) => !value);
        if (!someFalse) {
          return true;
        }
        const someTrue = filterCategory.data.some(({ value }) => value);
        if (!someTrue) {
          return false;
        }
        return 'mixed';
      }
      return false;
    },
    [data],
  );

  const onSave = useCallback(async () => {
    const saveError = data.find(({ name }) => !getValue({ type: name }));
    if (saveError) {
      let indefiniteArticle;
      switch (saveError.name) {
        case 'activity':
          indefiniteArticle = 'eine';
          break;
        case 'type':
        case 'voteType':
        case 'currentStatus':
          indefiniteArticle = 'einen';
          break;
        default:
          indefiniteArticle = 'ein';
          break;
      }
      Alert.alert(
        `Speichern war nicht möglich – wähle mindestens ${indefiniteArticle} ${saveError.title} aus`,
      );
      return false;
    }
    setFilter(data);
    navigation.goBack();
  }, [data, getValue, navigation, setFilter]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Save onPress={onSave}>
          <SaveText>Speichern</SaveText>
        </Save>
      ),
    });
  }, [navigation, onSave]);

  const onChange = ({
    type,
    subType,
    value,
  }: {
    type: string;
    subType?: string;
    value: boolean;
  }) => {
    const newData = data.map((category) => {
      if (category.name === type) {
        const newEntryData = category.data.map((entry) => {
          if (subType && (entry.name === subType || entry.title === subType)) {
            return { ...entry, value: value };
          } else if (!subType) {
            return { ...entry, value };
          }
          return entry;
        });
        return { ...category, data: newEntryData };
      }
      return category;
    });
    setData(newData);
  };

  const lightgrey = 'lightgrey';
  return (
    <Container>
      <SectionList<FilterEntry>
        scrollIndicatorInsets={{ right: 1 }}
        stickySectionHeadersEnabled={false}
        sections={data}
        renderSectionHeader={({ section: { title, name } }) => {
          const sectionValue = getValue({ type: name });
          const mainCheckboxColor = sectionValue
            ? '#1c659f'
            : theme.colors.header;
          return (
            <View>
              <Segment text={title} />
              <Row
                style={{
                  paddingVertical: 11,
                  paddingHorizontal: 18,
                  borderBottomWidth: 1,
                  borderColor: lightgrey,
                }}
                onPress={() => {
                  const curValue = getValue({ type: name });
                  onChange({
                    type: name,
                    value: !!(curValue === 'mixed' || !curValue),
                  });
                }}>
                <TitleMain>{title}</TitleMain>
                <Checkbox
                  value={sectionValue === true}
                  color={mainCheckboxColor}
                  disabledColor={mainCheckboxColor}
                  disabledCheckmarkColor={mainCheckboxColor}
                />
              </Row>
            </View>
          );
        }}
        renderItem={({ item: { title: subtitle, name: subName }, section }) => {
          const sectionValue = getValue({ type: subName! });
          const mainCheckboxColor = sectionValue
            ? '#1c659f'
            : theme.colors.header;
          return (
            <ListRowMain>
              <ListRowSub key={subtitle}>
                <Row
                  style={{
                    borderBottomWidth: 1,
                    borderColor: 'rgba(0,0,0,0.1)',
                    paddingLeft: 8,
                    paddingVertical: 8,
                    paddingRight: 18,
                  }}
                  onPress={() => {
                    const curValue = getValue({
                      type: section.name,
                      subType: subName || subtitle,
                    });
                    onChange({
                      type: section.name,
                      subType: subName || subtitle,
                      value: !curValue,
                    });
                  }}>
                  <TitleSub>{subtitle}</TitleSub>
                  <Checkbox
                    color={mainCheckboxColor}
                    disabledColor={mainCheckboxColor}
                    disabledCheckmarkColor={mainCheckboxColor}
                    value={getValue({
                      type: section.name,
                      subType: subName || subtitle,
                    })}
                  />
                </Row>
              </ListRowSub>
            </ListRowMain>
          );
        }}
        keyExtractor={({ title }) => title}
      />
    </Container>
  );
};
