import React, { useState, useContext} from 'react';
import { Text, View } from 'react-native';
import { Grid, BarChart, YAxis, XAxis } from 'react-native-svg-charts'; 
// npm install --save react-native-svg-charts
// npm i --save-dev @types/react-native-svg-charts
import database from '@react-native-firebase/database';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SelectDropdown from 'react-native-select-dropdown';

import {UserDataContext} from '~/Context/UserData';
import {State} from 'react-native-gesture-handler';

var select_month = '';

const BarChartExample = () => {
    const classified_list = ["공공,사회기관", "공과금", "교육,육아", "교통,운수", "레저,스포츠", "병원,약국", "뷰티", "쇼핑", "식료품", "애완동물", "여행,숙박", "음식점", "카페"];
    const user_data = [];
    const [username, setUsername] = useState('사용자');
    const [data, setData] = useState('');

    const fill = 'rgb(134, 65, 244)';
    const contentInset = {top:20, bottom:20}

    const { getCategorySum, month } = useContext<IUserDataContext>(UserDataContext);
    //let category_sum = month;
    const category_sum = [100,0,0,0,0,0,0,0,0,0,0,0,0]; ///지출분류
  
    var Date = '';

    const categories = ['2021년 01월', '2021년 02월', '2021년 03월', '2021년 04월', '2021년 05월', '2021년 06월', '2021년 07월', '2021년 08월', '2021년 09월', '2021년 10월', '2021년 11월', '2021년 12월']
    const [category, setCategory] = useState('');

  return (
    <View>
      <SelectDropdown  
        data={categories}
        onSelect={(selectedItem, index) =>{
          if (selectedItem == categories[0]) select_month = '01';
          if (selectedItem == categories[1]) select_month = '02';
          if (selectedItem == categories[2]) select_month = '03';
          if (selectedItem == categories[3]) select_month = '04';
          if (selectedItem == categories[4]) select_month = '05';
          if (selectedItem == categories[5]) select_month = '06';
          if (selectedItem == categories[6]) select_month = '07';
          if (selectedItem == categories[7]) select_month = '08';
          if (selectedItem == categories[8]) select_month = '09';
          if (selectedItem == categories[9]) select_month = '10';
          if (selectedItem == categories[10]) select_month = '11';
          if (selectedItem == categories[11]) select_month = '12';
          setCategory(selectedItem);
        }}
        defaultButtonText="날짜 선택"
        buttonStyle={{marginBottom: 10, width: 300, height:35, paddingRight:10, margin: 65, marginTop:0}}
        />
     
      <Text style = {{color: Colors.white, paddingTop: 20, fontSize: 17}}>        {select_month}월 지출 분류별 지출 추이</Text>
      
      <View style={{height:300, padding:30, flexDirection: 'row'}}>
          <YAxis
            data = {category_sum}
            contentInset = { contentInset }
            svg = {{
              fill: 'white',
              fontSize: 13,
            }}
            numberOfTicks = { 5 }
            formatLabel={value => `${value}`}
          />
          <BarChart 
              style={{ height: 250, width: 300, backgroundColor:'#2c3e50', paddingLeft: 30 }} 
              data={category_sum} svg={{ fill: 'white' }} 
              contentInset={{ top: 30, bottom: 30 }}>
            <Grid /> 
          </BarChart>
      </View>
      <View>
        <XAxis
          style={{ marginHorizontal: 5, height:100}}
          data = {category_sum}
          formatLabel = {(value, index) => classified_list[index]}
          contentInset = {{ left:90, right:40 }}
          svg = {{fontSize: 8, fill: 'white', rotation: -45}}
        />
      </View>
      
    </View>
  )
}

export default BarChartExample;
//YAxis, XAxis : https://www.python2.net/questions-716657.htm