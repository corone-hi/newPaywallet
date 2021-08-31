import React, {useState, useContext} from 'react';
import {Text, View} from 'react-native';
import {Grid, BarChart, YAxis, XAxis} from 'react-native-svg-charts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SelectDropdown from 'react-native-select-dropdown';
import {UserDataContext} from '~/Context/UserData';

var select_month = '09';

const BarChartExample = () => {
  const classified_list = [
    '공공,사회기관',
    '공과금',
    '교육,육아',
    '교통,운수',
    '레저,스포츠',
    '병원,약국',
    '뷰티',
    '쇼핑',
    '식료품',
    '애완동물',
    '여행,숙박',
    '음식점',
    '카페',
  ];
  const [username, setUsername] = useState('사용자');
  const [data, setData] = useState('');
  const contentInset = {top: 20, bottom: 20};

  const {month, getCategorySum} = useContext<IUserDataContext>(UserDataContext);

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
          if (selectedItem == categories[0]) select_month = '1';
          if (selectedItem == categories[1]) select_month = '2';
          if (selectedItem == categories[2]) select_month = '3';
          if (selectedItem == categories[3]) select_month = '4';
          if (selectedItem == categories[4]) select_month = '5';
          if (selectedItem == categories[5]) select_month = '6';
          if (selectedItem == categories[6]) select_month = '7';
          if (selectedItem == categories[7]) select_month = '8';
          if (selectedItem == categories[8]) select_month = '9';
          if (selectedItem == categories[9]) select_month = '10';
          if (selectedItem == categories[10]) select_month = '11';
          if (selectedItem == categories[11]) select_month = '12';

          getCategorySum(select_month);
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

      <Text style={{color: Colors.white, paddingTop: 20, fontSize: 17}}>
        {' '}
        {select_month}월 지출 분류별 지출 추이
      </Text>

      <View style={{height: 300, padding: 30, flexDirection: 'row'}}>
        <YAxis
          data={month}
          contentInset={contentInset}
          svg={{
            fill: 'white',
            fontSize: 13,
          }}
          numberOfTicks={5}
          formatLabel={value => `${value}`}
        />
        <BarChart
          style={{
            height: 250,
            width: 300,
            backgroundColor: '#2c3e50',
            paddingLeft: 15,
          }}
          data={month}
          svg={{fill: 'red'}}
          contentInset={{top: 30, bottom: 30}}>
          <Grid />
        </BarChart>
      </View>
      <View>
        <XAxis
          style={{marginHorizontal: 5, height: 100}}
          data={month}
          formatLabel={(value, index) => classified_list[index]}
          contentInset={{left: 90, right: 50}}
          svg={{fontSize: 8, fill: 'white', rotation: -45}}
        />
      </View>
    </View>
  );
};

export default BarChartExample;
