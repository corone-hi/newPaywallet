import React, {useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Styled from 'styled-components/native';
import Pie from 'react-native-pie';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SelectDropdown from 'react-native-select-dropdown';
import {UserDataContext} from '~/Context/UserData';

var select_month = '9';

const Percentage_Info = Styled.Text`
  font-size: 10px;
  margin-top: 10px;
  margin-left:25px;
  color: white;
`;

/* Pie Chart */
const PieChartExample = () => {
  const {percentage, getPercentage} = useContext<IUserDataContext>(
    UserDataContext,
  );

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

          getPercentage(select_month);
          setCategory(selectedItem);
        }}
        defaultButtonText="날짜 선택"
        buttonStyle={{
          marginBottom: 5,
          width: 300,
          height: 35,
          paddingRight: 10,
          margin: 65,
          marginTop: 0,
        }}
      />

      <View style={{height: 260, padding: 30, flexDirection: 'row'}}>
        <Text style={{color: Colors.white, fontSize: 17}}>
          {' '}
          [ {select_month} 월 ] 지출 분류별 지출 내역{' '}
        </Text>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <View
              style={{
                paddingVertical: 15,
                flexDirection: 'row',
                width: 400,
                justifyContent: 'space-between',
                paddingTop: 40,
              }}>
              <Pie
                radius={80}
                sections={[
                  {percentage: percentage[0], color: '#e55039'},
                  {percentage: percentage[1], color: '#fa983a'},
                  {percentage: percentage[2], color: '#f5cd79'},
                  {percentage: percentage[3], color: '#05c46b'},
                  {percentage: percentage[4], color: '#3dc1d3'},
                  {percentage: percentage[5], color: '#546de5'},
                  {percentage: percentage[6], color: '#8854d0'},
                  {percentage: percentage[7], color: '#1e272e'},
                  {percentage: percentage[9], color: '#dcdde1'},
                  {percentage: percentage[10], color: '#e056fd'},
                  {percentage: percentage[11], color: '#ffdab9'},
                  {percentage: percentage[12], color: '#b2bec3'},
                ]}
                strokeCap={'butt'}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>

      <View
        style={{
          borderTopColor: '#aaa',
          borderTopWidth: 0.5,
          flexDirection: 'row',
        }}>
        <View>
          <Text
            style={{
              color: '#e55039',
              fontSize: 30,
              fontWeight: 'bold',
              paddingLeft: 15,
            }}>
            _
            <Percentage_Info style={{color: Colors.white, fontSize: 12}}>
              {' '}
              : 공공,사회기관 ({percentage[0]}%){' '}
            </Percentage_Info>
            <Text
              style={{
                color: '#fa983a',
                fontSize: 30,
                fontWeight: 'bold',
                paddingLeft: 15,
              }}>
              _
              <Percentage_Info style={{color: Colors.white, fontSize: 12}}>
                {' '}
                : 공과금 ({percentage[1]}%){' '}
              </Percentage_Info>
            </Text>
            <Text
              style={{
                color: '#f5cd79',
                fontSize: 30,
                fontWeight: 'bold',
                paddingLeft: 15,
              }}>
              _
              <Percentage_Info style={{color: Colors.white, fontSize: 12}}>
                {' '}
                : 교육,육아 ({percentage[2]}%)
              </Percentage_Info>
            </Text>
          </Text>

          <Text
            style={{
              color: '#05c46b',
              fontSize: 30,
              fontWeight: 'bold',
              paddingLeft: 15,
            }}>
            _
            <Percentage_Info style={{color: Colors.white, fontSize: 12}}>
              {' '}
              : 교통,운수 ({percentage[3]}%){' '}
            </Percentage_Info>
            <Text
              style={{
                color: '#3dc1d3',
                fontSize: 30,
                fontWeight: 'bold',
                paddingLeft: 15,
              }}>
              _
              <Percentage_Info style={{color: Colors.white, fontSize: 12}}>
                {' '}
                : 레저,스포츠 ({percentage[4]}%){' '}
              </Percentage_Info>
            </Text>
            <Text
              style={{
                color: '#546de5',
                fontSize: 30,
                fontWeight: 'bold',
                paddingLeft: 15,
              }}>
              _
              <Percentage_Info style={{color: Colors.white, fontSize: 12}}>
                {' '}
                : 병원,약국 ({percentage[5]}%)
              </Percentage_Info>
            </Text>
          </Text>

          <Text
            style={{
              color: '#8854d0',
              fontSize: 30,
              fontWeight: 'bold',
              paddingLeft: 15,
            }}>
            _
            <Percentage_Info style={{color: Colors.white, fontSize: 12}}>
              {' '}
              : 뷰티 ({percentage[6]}%){' '}
            </Percentage_Info>
            <Text
              style={{
                color: '#1e272e',
                fontSize: 30,
                fontWeight: 'bold',
                paddingLeft: 15,
              }}>
              _
              <Percentage_Info style={{color: Colors.white, fontSize: 12}}>
                {' '}
                : 쇼핑 ({percentage[7]}%){' '}
              </Percentage_Info>
            </Text>
            <Text
              style={{
                color: '#ea8685',
                fontSize: 30,
                fontWeight: 'bold',
                paddingLeft: 15,
              }}>
              _
              <Percentage_Info style={{color: Colors.white, fontSize: 12}}>
                {' '}
                : 식료품 ({percentage[8]}%){' '}
              </Percentage_Info>
            </Text>
          </Text>

          <Text
            style={{
              color: '#dcdde1',
              fontSize: 30,
              fontWeight: 'bold',
              paddingLeft: 15,
            }}>
            _
            <Percentage_Info style={{color: Colors.white, fontSize: 12}}>
              {' '}
              : 애완동물 ({percentage[9]}%){' '}
            </Percentage_Info>
            <Text
              style={{
                color: '#e056fd',
                fontSize: 30,
                fontWeight: 'bold',
                paddingLeft: 15,
              }}>
              _
              <Percentage_Info style={{color: Colors.white, fontSize: 12}}>
                {' '}
                : 여행,숙박 ({percentage[10]}%){' '}
              </Percentage_Info>
            </Text>
            <Text
              style={{
                color: '#ffdab9',
                fontSize: 30,
                fontWeight: 'bold',
                paddingLeft: 15,
              }}>
              _
              <Percentage_Info style={{color: Colors.white, fontSize: 12}}>
                {' '}
                : 음식점 ({percentage[11]}%){' '}
              </Percentage_Info>
            </Text>
          </Text>

          <Text
            style={{
              color: '#b2bec3',
              fontSize: 30,
              fontWeight: 'bold',
              paddingLeft: 15,
            }}>
            _
            <Percentage_Info style={{color: Colors.white, fontSize: 12}}>
              {' '}
              : 카페 ({percentage[12]}%)
            </Percentage_Info>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
  },
});

export default PieChartExample;
