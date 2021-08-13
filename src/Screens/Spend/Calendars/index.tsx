import React, {Component, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import Styled from 'styled-components/native';
import SelectDropdown from 'react-native-select-dropdown';
import {Calendar} from 'react-native-calendars';
import {UserContext} from '~/Context/User';

import Input from '~/Components/Input';
import Button from '~/Components/Button';

const Container = Styled.View`
  flex: 1;
`;

const SelectContainer = Styled.View`
  flex-direction:row;
  justify-content:center;
`;

const CalendarContainer = Styled.View`
  padding-top: 20px;
`;

const TargetText = Styled.Text`
  font-size: 12px;
  margin-bottom: 5px;
  margin-left:20px;
  color: yellow;

`;

const Information = Styled.Text`
  font-size: 10px;
  margin-top: 10px;
  margin-left:20px;
  color: white;
`;

const Calendars = () => {
  const {monthlyTarget, result, userData} = useContext<IUserContext>(
    UserContext,
  );
  const [target, setTarget] = useState();
  //const [markedDate, setMarkedDate] = useState({});
  let markedDate = {};
  let todayDate = new Date().toISOString().slice(0, 10);
  let dateString = String(todayDate);
  let aim = Number(userData.monthlyTarget);
  let acount = Number(result);

  const isEmpty = param => {
    return Object.keys(param).length === 0;
  };

  if (aim < acount && isEmpty(markedDate)) {
    console.log('big');
    markedDate[dateString] = {
      selected: true,
      selectedColor: 'red',
    };
  }

  console.log(markedDate);

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <SelectContainer>
        <Input
          style={{marginBottom: 16, width: 200, height: 40}}
          placeholder="월 목표 사용량"
          onChangeText={text => setTarget(text)}
        />
        <Button
          label="등록"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginBottom: 24,
            width: 100,
            height: 40,
            backgroundColor: '#4fdfff',
          }}
          onPress={() => {
            monthlyTarget(target);
          }}
        />
      </SelectContainer>
      <TargetText>현재 월 설정 목표량: {aim} 원</TargetText>
      <Information>💚: 목표량의 30%    💙: 목표량의 50%</Information>
      <Information>🧡: 목표량의 70%    💜: 목표량의 90%</Information>
      <Information>🔴: 목표량 초과</Information>
      <CalendarContainer>
        <Calendar markedDates={markedDate} />
      </CalendarContainer>
    </Container>
  );
};

export default Calendars;
