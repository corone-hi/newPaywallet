import React, {Component, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import Styled from 'styled-components/native';
import SelectDropdown from 'react-native-select-dropdown';
import database from '@react-native-firebase/database';
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
  const {
    monthlyTarget,
    userInfo,
    result,
    userData,
    target,
  } = useContext<IUserContext>(UserContext);
  const [money, setMoney] = useState();

  //const [markedDate, setMarkedDate] = useState({});
  let markedDate = {};
  let todayDate = new Date().toISOString().slice(0, 10);
  let dateString = String(todayDate);
  let aim = Number(target);
  let acount = Number(result);
  let date = new Date();
  let month = date.getMonth() + 1;
  const boolean = userData.hasOwnProperty(`${month}`);
  console.log(boolean);

  setTimeout(() => {
    //database().ref(`/users/${userInfo}/${month}`).set({over: date});
    //console.log(aim, acount);
    let thirty = aim * 0.3;
    let fifty = aim * 0.5;
    let seventy = aim * 0.7;
    let ninty = aim * 0.9;
    if (aim < acount) {
      if (!userData[month].hasOwnProperty('over')) {
        database()
          .ref(`/users/${userInfo}/${month}`)
          .update({over: dateString});
      }
    }

    if (thirty < acount) {
      if (!userData[month].hasOwnProperty('thirty')) {
        database()
          .ref(`/users/${userInfo}/${month}`)
          .update({thirty: dateString});
      }
    }

    if (fifty < acount) {
      if (!userData[month].hasOwnProperty('fifty')) {
        database()
          .ref(`/users/${userInfo}/${month}`)
          .update({fifty: dateString});
      }
    }

    if (seventy < acount) {
      if (!userData[month].hasOwnProperty('seventy')) {
        database()
          .ref(`/users/${userInfo}/${month}`)
          .update({seventy: dateString});
      }
    }

    if (ninty < acount) {
      if (!userData[month].hasOwnProperty('ninety')) {
        database()
          .ref(`/users/${userInfo}/${month}`)
          .update({ninety: dateString});
      }
    }
  }, 3000);

  /*
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
*/

  if (userData[month].hasOwnProperty('thirty')) {
    markedDate[userData[month].thirty] = {
      marked: true,
      dotColor: 'lime',
    };
  }

  if (userData[month].hasOwnProperty('fifty')) {
    markedDate[userData[month].fifty] = {
      marked: true,
      dotColor: 'blue',
    };
  }

  if (userData[month].hasOwnProperty('seventy')) {
    markedDate[userData[month].seventy] = {
      marked: true,
      dotColor: 'orange',
    };
  }

  if (userData[month].hasOwnProperty('ninety')) {
    markedDate[userData[month].ninety] = {
      marked: true,
      dotColor: 'red',
    };
  }

  if (userData[month].hasOwnProperty('over')) {
    markedDate[userData[month].over] = {
      selected: true,
      selectedColor: 'red',
    };
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <SelectContainer>
        <Input
          style={{marginBottom: 16, width: 200, height: 40}}
          placeholder="월 목표 사용량"
          onChangeText={text => setMoney(text)}
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
            if (boolean) {
              Alert.alert('이번 달은 목표량 설정이 완료되었습니다.');
            } else {
              monthlyTarget(money);
            }
          }}
        />
      </SelectContainer>
      <TargetText>현재 월 설정 목표량: {aim} 원</TargetText>
      <Information>💚: 목표량의 30% 💙: 목표량의 50%</Information>
      <Information>🧡: 목표량의 70% 💜: 목표량의 90%</Information>
      <Information>🔴: 목표량 초과</Information>
      <CalendarContainer>
        <Calendar markedDates={markedDate} />
      </CalendarContainer>
    </Container>
  );
};

export default Calendars;
