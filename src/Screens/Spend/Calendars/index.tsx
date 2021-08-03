import React, {Component, useState,useContext} from 'react';
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
  padding-top: 50px;
`;

const Information = Styled.Text`
  font-size: 20px;
  margin-top: 20px;
  margin-left:20px;
  color: white;
`;

const Calendars = () => {
  const {monthlyTarget, result, userData} = useContext<IUserContext>(UserContext);
  const [target, setTarget] = useState();
  //const [markedDate, setMarkedDate] = useState({});
  let markedDate = {

  }
  let todayDate = new Date().toISOString().slice(0, 10);
  let dateString = String(todayDate);
  let aim = Number(userData.monthlyTarget)
  let acount = Number(result)

  const isEmpty = (param) => {
    return Object.keys(param).length === 0;
  }

  if (aim < acount && isEmpty(markedDate)){
    console.log("big");
    markedDate[dateString] = {
        selected: true,
        selectedColor: 'red',
    }
  }

  console.log(markedDate);
  
/*
  const customize = [
    '10만원',
    '20만원',
    '30만원',
    '40만원',
    '50만원',
    '60만원',
    '70만원',
    '80만원',
    '90만원',
    '100만원'
  ];

  <SelectDropdown  
            data={customize}
            onSelect={(selectedItem, index) =>{
              console.log(selectedItem, index);
              setCategory(selectedItem);
            }}
            defaultButtonText="이번 달 목표 사용량"
            buttonStyle={{marginBottom: 10, width: 330, height:42}}
          />

*/  

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <SelectContainer>
        <Input
            style={{marginBottom: 16, width: 200}}
            placeholder="목표 사용량"
            onChangeText={text => setTarget(text)}

        />
        <Button
          label="등록"
          style={{marginBottom: 24,  width: 100, height: 50, backgroundColor:'#4fdfff'}}
          onPress={() => {
            monthlyTarget(target);
          }}
        />
      </SelectContainer>
      <Information>
        🔴: 설정 목표량 초과
      </Information>
      <CalendarContainer>
        <Calendar markedDates={markedDate} />
      </CalendarContainer>
    </Container>
  );
};

export default Calendars;
