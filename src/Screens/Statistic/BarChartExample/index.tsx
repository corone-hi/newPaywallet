import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Grid, BarChart, YAxis, XAxis } from 'react-native-svg-charts'; 
// npm install --save react-native-svg-charts
// npm i --save-dev @types/react-native-svg-charts
import database from '@react-native-firebase/database';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SelectDropdown from 'react-native-select-dropdown';

var select_month = '';

const BarChartExample = () => {
    const classified_amount = [0,0,0,0,0,0,0,0,0,0,0,0,0]; ///지출분류
    const classified_list = ["공공,사회기관", "공과금", "교육,육아", "교통,운수", "레저,스포츠", "병원,약국", "뷰티", "쇼핑", "식료품", "애완동물", "여행,숙박", "음식점", "카페"];
    const user_data = [];
    const [username, setUsername] = useState('사용자');
    const [data, setData] = useState('');

    const fill = 'rgb(134, 65, 244)';
    const contentInset = {top:20, bottom:20}

    var Date = '';

  useEffect(()=>{
    let user = auth().currentUser;
    var DataRef = database().ref(`user_wallet/${user.uid}`);   
  
    DataRef.on("value", (snapshot)=>{
      snapshot.forEach((child)=>{
        var modified_money = ((child.val().money).slice(0,-1)).replace(",", "");

        user_data.unshift({
          key: child.key,
          category: child.val().category,
          money : modified_money,
          shop: child.val().shop,
        });
      });

      for (var i=0; i < user_data.length; i++){
        for (var j=0; j < classified_list.length; j++){
          Date = (user_data[i].key).slice(1, )
          var newDate = moment(Date* 1000).format("MM/DD/YYYY hh:MM")
          var month = newDate.slice(0, 2)
          if (select_month == month){
            if (user_data[i].category == classified_list[j]){
              classified_amount[j] += Number(user_data[i].money);
            }
          }
        }
      }
    }); 
    },[])
    
    const categories = ['2021년 04월', '2021년 05월', '2021년 06월', '2021년 07월', '2021년 08월', '2021년 09월']
    const [category, setCategory] = useState('');

  return (
    <View>
      <SelectDropdown  
        data={categories}
        onSelect={(selectedItem, index) =>{
          if (selectedItem == categories[0]) select_month = '04';
          if (selectedItem == categories[1]) select_month = '05';
          if (selectedItem == categories[2]) select_month = '06';
          if (selectedItem == categories[3]) select_month = '07';
          if (selectedItem == categories[4]) select_month = '08';
          if (selectedItem == categories[5]) select_month = '09';
          setCategory(selectedItem);
        }}
        defaultButtonText="날짜 선택"
        buttonStyle={{marginBottom: 10, width: 300, height:35, paddingRight:10, margin: 65, marginTop:0}}
        />
     
      <Text style = {{color: Colors.white, paddingTop: 20, fontSize: 17}}>        {select_month}월 지출 분류별 지출 추이</Text>
      
      <View style={{height:300, padding:30, flexDirection: 'row'}}>
          <YAxis
            data = {classified_amount}
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
              data={classified_amount} svg={{ fill: 'white' }} 
              contentInset={{ top: 30, bottom: 30 }}>
            <Grid /> 
          </BarChart>
      </View>
      <View>
        <XAxis
          style={{ marginHorizontal: 5, height:100}}
          data = {classified_amount}
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