import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Grid, LineChart, YAxis, XAxis } from 'react-native-svg-charts';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import database from '@react-native-firebase/database';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SelectDropdown from 'react-native-select-dropdown';

var select_category = '';
var month_sum = [0,0,0,0,0,0,0,0,0,0,0,0];

/* Line Chart */
const LineChartExample = () => {
  const user_data = []
  const [data, setData] = useState('');
  const contentInset = { top:20, bottom:20 }
  const month_name = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

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
      setData(user_data);

      for (var i=0; i<user_data.length; i++){
        // 선택한 카테고리에 맞게
        if(select_category == user_data[i].category){
          Date = (user_data[i].key).slice(1, )
          var newDate = moment(Date* 1000).format("MM/DD/YYYY hh:MM")
          var month = newDate.slice(0, 2)
  
          if (month == '01') {
            month_sum[0] = Number(user_data[i].money);
          }
          if (month == '02') { 
            month_sum[1] = Number(user_data[i].money);
          }
          if (month == '03') { 
            month_sum[2] = Number(user_data[i].money);
          }
          if (month == '04') { 
            month_sum[3] = Number(user_data[i].money);
          }
          if (month == '05') { 
            month_sum[4] = Number(user_data[i].money);
          }
          if (month == '06') { 
            month_sum[5] = Number(user_data[i].money);
          }
          if (month == '07') { 
            month_sum[6] = Number(user_data[i].money);
          }
          if (month == '08') { 
            month_sum[7] = Number(user_data[i].money);
          }
          if (month == '09') { 
            month_sum[8] = Number(user_data[i].money);
          }
          if (month == '10') { 
            month_sum[9] = Number(user_data[i].money);
          }
          if (month == '11') { 
            month_sum[10] = Number(user_data[i].money);
          }
          if (month == '12') { 
            month_sum[11] = Number(user_data[i].money);
          }
        }
      }
    });
    },[])
    
    const categories = [
      '공공,사회기관',
      '공과금',
      '교육, 육아',
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
    const [category, setCategory] = useState('');

  return (
    <View>
      <SelectDropdown  
        data={categories}
        onSelect={(selectedItem, index) =>{
          if (selectedItem == categories[0]) { select_category = '공공,사회기관'}
          if (selectedItem == categories[1]) { select_category = '공과금'}
          if (selectedItem == categories[2]) { select_category = '교육, 육아'}
          if (selectedItem == categories[3]) { select_category = '교통,운수'}
          if (selectedItem == categories[4]) { select_category = '레저,스포츠'}
          if (selectedItem == categories[5]) { select_category = '병원,약국'}
          if (selectedItem == categories[6]) { select_category = '뷰티'}
          if (selectedItem == categories[7]) { select_category = '쇼핑'}
          if (selectedItem == categories[8]) { select_category = '식료품'}
          if (selectedItem == categories[9]) { select_category = '애완동물'}
          if (selectedItem == categories[10]) { select_category = '여행,숙박'}
          if (selectedItem == categories[11]) { select_category = '음식점'}
          if (selectedItem == categories[0]) { select_category = '카페'}
          setCategory(selectedItem);
        }}
        defaultButtonText="Category"
        buttonStyle={{marginBottom: 10, width: 300, height:35, paddingRight:10, margin: 65, marginTop:0}}
        />

      <Text style={{color: Colors.white, paddingTop: 20, fontSize: 17}}>        [ { select_category } ] 사용 내역별 지출 추이</Text>
      <View style={{height:300, padding:30, flexDirection: 'row'}}>
        <YAxis
          data = {month_sum}
          contentInset = { contentInset }
          svg = {{
            fill: 'grey',
            fontSize: 13,
          }}
          numberOfTicks = { 5 }
          formatLabel={value => `${value}`}
        />
        <LineChart
          style={{ height: 250, width: 300, backgroundColor:'#2c3e50', paddingLeft: 30}}
          data={month_sum}
          svg={{ stroke: 'rgb(255, 255, 255)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid />
        </LineChart>
      </View>
      <View>
        <XAxis
          style={{ marginHorizontal: 5}}
          data = { month_sum }
          formatLabel = {(value, index) => month_name[index]}
          contentInset = {{ left:90, right:50 }}
          svg = {{fontSize: 10, fill: 'white'}}
        />
      </View>
    </View>
  )
}

export default LineChartExample;