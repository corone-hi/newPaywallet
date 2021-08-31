import React, {useState, useContext} from 'react';
import {Text, View} from 'react-native';
import {Grid, LineChart, YAxis, XAxis} from 'react-native-svg-charts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SelectDropdown from 'react-native-select-dropdown';
import {UserDataContext} from '~/Context/UserData';

var select_category = '카페';

/* Line Chart */
const LineChartExample = () => {
  const [data, setData] = useState('');
  const [category2, setCategory2] = useState('');

  const contentInset = {top: 20, bottom: 20};
  const month_name = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  const {category, getMonthSum} = useContext<IUserDataContext>(UserDataContext);

  const categories = [
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

  return (
    <View>
      <SelectDropdown
        data={categories}
        onSelect={(selectedItem, index) => {
          if (selectedItem == categories[0]) {
            select_category = '공공,사회기관';
          }
          if (selectedItem == categories[1]) {
            select_category = '공과금';
          }
          if (selectedItem == categories[2]) {
            select_category = '교육, 육아';
          }
          if (selectedItem == categories[3]) {
            select_category = '교통,운수';
          }
          if (selectedItem == categories[4]) {
            select_category = '레저,스포츠';
          }
          if (selectedItem == categories[5]) {
            select_category = '병원,약국';
          }
          if (selectedItem == categories[6]) {
            select_category = '뷰티';
          }
          if (selectedItem == categories[7]) {
            select_category = '쇼핑';
          }
          if (selectedItem == categories[8]) {
            select_category = '식료품';
          }
          if (selectedItem == categories[9]) {
            select_category = '애완동물';
          }
          if (selectedItem == categories[10]) {
            select_category = '여행,숙박';
          }
          if (selectedItem == categories[11]) {
            select_category = '음식점';
          }
          if (selectedItem == categories[12]) {
            select_category = '카페';
          }

          getMonthSum(select_category);
          setCategory2(selectedItem);
        }}
        defaultButtonText="Category"
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
        {'        '}[ {select_category} ] 사용 내역별 지출 추이
      </Text>
      <View style={{height: 300, padding: 30, flexDirection: 'row'}}>
        <YAxis
          data={category}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 13,
          }}
          numberOfTicks={5}
          formatLabel={value => `${value}`}
        />
        <LineChart
          style={{
            height: 250,
            width: 330,
            backgroundColor: '#2c3e50',
            paddingLeft: 30,
          }}
          data={category}
          svg={{stroke: 'red'}}
          contentInset={{top: 20, bottom: 20}}>
          <Grid />
        </LineChart>
      </View>
      <View>
        <XAxis
          style={{marginHorizontal: 5}}
          data={category}
          formatLabel={(value, index) => month_name[index]}
          contentInset={{left: 80, right: 10}}
          svg={{fontSize: 10, fill: 'white'}}
        />
      </View>
    </View>
  );
};

export default LineChartExample;
