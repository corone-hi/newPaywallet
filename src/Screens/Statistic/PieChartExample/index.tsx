import React, { useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import IconButton from '~/Components/IconButton';
import database from '@react-native-firebase/database';
import Pie from 'react-native-pie'; 
//npm i —save react-native-pie
//npm install @react-native-community/art --save
import auth from '@react-native-firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SelectDropdown from 'react-native-select-dropdown';
import {UserDataContext} from '~/Context/UserData';

import Styled from 'styled-components/native';
import { color } from 'react-native-reanimated';
var select_month = '09';

const Percentage_Info = Styled.Text`
  font-size: 10px;
  margin-top: 10px;
  margin-left:25px;
  color: white;
`;

const circle = Styled.Text`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: 'red';
`;

/* Pie Chart */
const PieChartExample = () => {
  const { percentage, getPercentage} = useContext<IUserDataContext>(UserDataContext);
    
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
        onSelect={(selectedItem, index) =>{
          if (selectedItem == categories[0]) { select_month = '1'; }
          if (selectedItem == categories[1]) { select_month = '2'; }
          if (selectedItem == categories[2]) { select_month = '3'; }
          if (selectedItem == categories[3]) { select_month = '4'; }
          if (selectedItem == categories[4]) { select_month = '5'; }
          if (selectedItem == categories[5]) { select_month = '6'; }
          if (selectedItem == categories[6]) { select_month = '7'; }
          if (selectedItem == categories[7]) { select_month = '8'; }
          if (selectedItem == categories[8]) { select_month = '9'; }
          if (selectedItem == categories[9]) { select_month = '10'; }
          if (selectedItem == categories[10]) { select_month = '11'; }
          if (selectedItem == categories[11]) { select_month = '12'; }

          getPercentage(select_month);
          setCategory(selectedItem);
        }}
        defaultButtonText="날짜 선택"
        buttonStyle={{marginBottom: 5, width: 300, height:35, paddingRight:10, margin: 65, marginTop:0}}
        />
    
    <View style={{height:260, padding:30, flexDirection: 'row'}}>
        <Text style= {{ color: Colors.white, fontSize: 17 }}>        [ {select_month} 월 ] 지출 분류별 지출 내역 </Text>
        <SafeAreaView style={{ flex: 1}}>
          <View style={styles.container}>
            <View style={{ paddingVertical: 15, flexDirection: 'row', width: 400, justifyContent: 'space-between', paddingTop: 40}}>
              <Pie
                  radius={80}
                  sections={[
                    { percentage: percentage[0], color: '#C70039' }, //빨강
                    { percentage: percentage[1], color: '#FFA500' }, //주황
                    { percentage: percentage[2], color: '#FFFF00' }, //노랑
                    { percentage: percentage[3], color: '#228B22' }, //초록
                    { percentage: percentage[4], color: '#0000FF' }, //파랑
                    { percentage: percentage[5], color: '#800080' }, //보라
                    { percentage: percentage[6], color: '#000000' }, //검정
                    { percentage: percentage[7], color: '#FFFFFF' }, //흰색
                    { percentage: percentage[8], color: '#A52A2A' }, //갈색
                    { percentage: percentage[9], color: '#BDB76B' }, 
                    { percentage: percentage[10], color: '#FF8C00' },
                    { percentage: percentage[11], color: '#FFDAB9' },
                    { percentage: percentage[12], color: '#00FFFF' },
                  ]}
                  strokeCap={'butt'}
                  autopct={'%1.2f%%'}
                   />
            </View>
          </View>
      </SafeAreaView>
    </View>
    <View style={{borderTopColor: '#aaa', borderTopWidth: 0.5, flexDirection: 'row'}}>
      <View>
        <Text style={{color: '#C70039', fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>_
          <Percentage_Info style= {{ color: Colors.white, fontSize: 12 }}>  : 공공,사회기관 ({percentage[0]}%)   </Percentage_Info>
          <Text style={{color: '#FFA500', fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>_
            <Percentage_Info style= {{ color: Colors.white, fontSize: 12 }}>  : 공과금 ({percentage[1]}%)    </Percentage_Info>
          </Text> 
          <Text style={{color: '#FFFF00', fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>_
            <Percentage_Info style= {{ color: Colors.white, fontSize: 12 }}>  : 교육,육아 ({percentage[2]}%)</Percentage_Info>
          </Text> 
        </Text>

        <Text style={{color: '#228B22', fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>_
          <Percentage_Info style= {{ color: Colors.white, fontSize: 12 }}>  : 교통,운수 ({percentage[3]}%)    </Percentage_Info>
          <Text style={{color: '#0000FF', fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>_
            <Percentage_Info style= {{ color: Colors.white, fontSize: 12 }}>  : 레저,스포츠 ({percentage[4]}%)     </Percentage_Info>
          </Text> 
          <Text style={{color: '#800080', fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>_
            <Percentage_Info style= {{ color: Colors.white, fontSize: 12 }}>  : 병원,약국 ({percentage[5]}%)</Percentage_Info>
          </Text> 
        </Text>

        <Text style={{color: '#000000', fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>_
          <Percentage_Info style= {{ color: Colors.white, fontSize: 12 }}>  : 뷰티 ({percentage[6]}%)    </Percentage_Info>
          <Text style={{color: '#FFFFFF', fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>_
            <Percentage_Info style= {{ color: Colors.white, fontSize: 12 }}>  : 쇼핑 ({percentage[7]}%)     </Percentage_Info>
          </Text> 
          <Text style={{color: '#A52A2A', fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>_
            <Percentage_Info style= {{ color: Colors.white, fontSize: 12 }}>  : 식료품 ({percentage[8]}%)    </Percentage_Info>
          </Text> 
          <Text style={{color: '#BDB76B', fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>_
            <Percentage_Info style= {{ color: Colors.white, fontSize: 12 }}>  : 애완동물 ({percentage[9]}%)</Percentage_Info>
          </Text>
        </Text>

        <Text style={{color: '#FF8C00', fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>_
          <Percentage_Info style= {{ color: Colors.white, fontSize: 12 }}>  : 여행,숙박 ({percentage[10]}%)     </Percentage_Info>
          <Text style={{color: '#FFDAB9', fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>_
            <Percentage_Info style= {{ color: Colors.white, fontSize: 12 }}>  : 음식점 ({percentage[11]}%)      </Percentage_Info>
          </Text> 
          <Text style={{color: '#00FFFF', fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>_
            <Percentage_Info style= {{ color: Colors.white, fontSize: 12 }}>  : 카페 ({percentage[12]}%)</Percentage_Info>
          </Text> 
        </Text>

      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
    }
  });

export default PieChartExample;
