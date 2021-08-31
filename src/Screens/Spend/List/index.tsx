import React, {useState, useContext} from 'react';
import {Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {UserDataContext} from '~/Context/UserData';

var select_month = '09';

const List = () => {
  const columns = ['사용내역', '지출분류', '금액'];
  const [data, setData] = useState('');
  const user_data = [];
  var count = 0;

  const rendering = () => {
    const result = [];
    for (let i = 0; i < info.length; i++) {
      if (info[i][0] != 0) {
        count++;
      }
    }

    for (let j = 0; j < count; j++) {
      result.push(
        <View
          style={{
            padding: 15,
            borderBottomColor: '#aaa',
            borderBottomWidth: 1,
            flexDirection: 'row',
            paddingBottom: 20,
          }}>
          <Text
            style={{flex: 1, padding: 5, paddingLeft: 10, color: Colors.white}}>
            {info[j][0]}
          </Text>
          <Text
            style={{flex: 1, padding: 5, paddingLeft: 60, color: Colors.white}}>
            {info[j][1]}
          </Text>
          <Text
            style={{flex: 1, padding: 5, paddingLeft: 30, color: Colors.white}}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{info[j][2]}
          </Text>
        </View>,
      );
    }
    return result;
  };

  const {info, ListData} = useContext<IUserDataContext>(UserDataContext);
  //console.log(info);

  const categories = [
    '2021년 01월',
    '2021년 02월',
    '2021년 03월',
    '2021년 04월',
    '2021년 05월',
    '2021년 06월',
    '2021년 07월',
    '2021년 08월',
    '2021년 09월',
    '2021년 10월',
    '2021년 11월',
    '2021년 12월',
  ];
  const [category, setCategory] = useState('');

  for (var j = 0; j < info.length; j++) {
    return (
      <View>
        <SelectDropdown
          data={categories}
          onSelect={(selectedItem, index) => {
            if (selectedItem == categories[0]) {
              select_month = '1';
            }
            if (selectedItem == categories[1]) {
              select_month = '2';
            }
            if (selectedItem == categories[2]) {
              select_month = '3';
            }
            if (selectedItem == categories[3]) {
              select_month = '4';
            }
            if (selectedItem == categories[4]) {
              select_month = '5';
            }
            if (selectedItem == categories[5]) {
              select_month = '6';
            }
            if (selectedItem == categories[6]) {
              select_month = '7';
            }
            if (selectedItem == categories[7]) {
              select_month = '8';
            }
            if (selectedItem == categories[8]) {
              select_month = '9';
            }
            if (selectedItem == categories[9]) {
              select_month = '10';
            }
            if (selectedItem == categories[10]) {
              select_month = '11';
            }
            if (selectedItem == categories[11]) {
              select_month = '12';
            }

            ListData(select_month);
            setCategory(selectedItem);
          }}
          defaultButtonText="날짜 선택"
          buttonStyle={{
            marginBottom: 10,
            width: 300,
            height: 35,
            paddingRight: 10,
            margin: 65,
            marginTop: 0,
          }}
        />

        <Text
          style={{
            color: '#FFFFFF',
            paddingLeft: 20,
            fontSize: 16,
            paddingTop: 15,
            paddingBottom: 15,
          }}>
          {' '}
          [ {select_month} 월 ]
        </Text>
        <Text
          style={{
            paddingBottom: 15,
            paddingLeft: 30,
            paddingTop: 10,
            borderBottomColor: '#aaa',
            borderBottomWidth: 2,
            fontWeight: 'bold',
            letterSpacing: 10,
            color: Colors.white,
          }}>
          &nbsp;{columns[0]}&nbsp;&nbsp; {columns[1]}&nbsp;&nbsp;&nbsp;{' '}
          {columns[2]}&nbsp;
        </Text>

        <View
          style={{
            paddingTop: 10,
            borderBottomColor: '#2c3e50',
            borderBottomWidth: 1,
          }}>
          {rendering()}
        </View>
      </View>
    );
  }
};

export default List;
