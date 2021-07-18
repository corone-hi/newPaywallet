import React, {useLayoutEffect} from 'react';
import {FlatList, Text} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';

import Styled from 'styled-components/native';
import IconButton from '~/Components/IconButton';

const Container = Styled.View`
  flex: 1;
  background-color: #2c3e50;
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

  

  return (
    <Container>
      <Text>Statistic</Text>
    </Container>
  );
};

export default Statistic;
