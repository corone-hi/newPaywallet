import React, { useContext, useLayoutEffect, useState} from 'react';
import {FlatList, Text, Image,View, ImageStore} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';

import Swiper from 'react-native-swiper';
import { RNCamera, FaceDetector } from 'react-native-camera';
import {UserContext} from '~/Context/User';

import Styled from 'styled-components/native';
import IconButton from '~/Components/IconButton';
import Button from '~/Components/Button';



const Container = Styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #2c3e50;
`;

const PayContainer = Styled.View`
  width: 80%;
  height: 400px;
  background-color: #2c3e50;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const PayName = Styled.Text`
  color: #FFFFFF;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  `;

const PayImage = Styled.View`
  width: 90%;
  height: 90%;
  justify-content: center;
  
`;

const Title = Styled.Text`
  color: #FFFFFF;
  font-size: 20px;
  font-weight: bold;
`;

const Month = Styled.Text`
  color: #FFFFFF;
  font-size: 40px;
  font-weight: bold;
  text-align: right;
  margin-top: 40px;
`;


const SwipeContainer = Styled.View`
  align-items: center;
  justify-content: center;

`;

const ButtonContainer = Styled.View`
  flex-direction: row;
  
`;

const StyleButton = Styled.TouchableOpacity`
  width: 35%;
  height: 60px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background-color: #4fdfff;
  margin: 20px;
`;
const Label = Styled.Text`
  font-size: 18px;
  color: #FFFFFF;
`;


type NavigationProp = StackNavigationProp<PayParamList, 'Pay'>;

interface Props {
  navigation: NavigationProp;
}

const Pay = ({navigation}: Props) => {
  const {userData, result} = useContext<IUserContext>(UserContext);
  let acount = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //10,000
  
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
  
  //<PayName> ෆ {userData?.name} 님 ෆ</PayName>
  return (
    <Container>
      
      <PayContainer>
        <Swiper showsButtons={true}>
          <SwipeContainer>
            <Title>{userData?.name} 님의 통장</Title>
            <PayImage>
              <Title>이번 달 사용 금액</Title>
              <Month
                style={{borderBottomWidth: 3, borderBottomColor: '#FFFFFF'}}>
                {acount} 원
              </Month>
            </PayImage>
          </SwipeContainer>
          <SwipeContainer>
            <PayName>바코드 결제</PayName>
            <PayImage>
            <RNCamera
                style={{width: 400, height: 300}}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
              />
                
            </PayImage>
          </SwipeContainer>


        </Swiper>
      </PayContainer>
      <ButtonContainer>
        <StyleButton onPress={() => navigation.navigate('Outer')}>
          <Label >사용자 직접 입력</Label>
        </StyleButton>
        <StyleButton onPress={() => navigation.navigate('Spend')}>
          <Label >사용 내역</Label>
        </StyleButton>
      </ButtonContainer>
      
      
      
    </Container>
  );
};

export default Pay;
