import React, {
  useLayoutEffect,
  Component,
  useState,
  useRef,
  useEffect,
} from 'react';
import {FlatList, Text, View} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';

import Styled from 'styled-components/native';
import IconButton from '~/Components/IconButton';
import LineChartExample from './LineChartExample';
import BarChartExample from './BarChartExample';
import PieChartExample from './PieChartExample';

const Container = Styled.View`
  flex: 1;
  background-color: #2c3e50;
`;

const OptionContainer = Styled.View`
  flex-direction:row;
  justify-content: flex-end;
  padding: 20px;
`;

type NavigationProp = StackNavigationProp<PayParamList, 'Statistic'>;

interface Props {
  navigation: NavigationProp;
}

const Statistic = ({navigation}: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          iconName="menu"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      ),
    });
  }, []);
  const [option, setOption] = useState<String>('line');

  return (
    <Container>
      <OptionContainer>
        <IconButton
          iconName="LineChartExample"
          onPress={() => setOption('line')}
        />
        <IconButton
          iconName="BarChartExample"
          onPress={() => setOption('bar')}
        />
        <IconButton
          iconName="PieChartExample"
          onPress={() => setOption('pie')}
        />
      </OptionContainer>
      {option == 'line' ? (
        <LineChartExample />
      ) : option == 'bar' ? (
        <BarChartExample />
      ) : (
        <PieChartExample />
      )}
    </Container>
  );
};

export default Statistic;
