import React, { useLayoutEffect, Component, useState, useRef, useEffect} from 'react';
import {SafeAreaView, StyleSheet, FlatList, Text, View} from 'react-native';
import IconButton from '~/Components/IconButton';
import database from '@react-native-firebase/database';
import Pie from 'react-native-pie'; 
//npm i —save react-native-pie
//npm install @react-native-community/art --save
import auth from '@react-native-firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SelectDropdown from 'react-native-select-dropdown'; 

var select_month = '';

/* Pie Chart */
const PieChartExample = () => {
  const user_data = [];
  const classified_amount = [0,0,0,0,0,0,0,0,0,0,0,0,0]; // category 별 금액/전체
  var classified_amount_sum = 0;
  const classified_list = ["공공,사회기관", "공과금", "교육,육아", "교통,운수", "레저,스포츠", "병원,약국", "뷰티", "쇼핑", "식료품", "애완동물", "여행,숙박", "음식점", "카페"];
  
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

      for (var i = 0; i < user_data.length; i++){
        for (var j = 0; j < classified_list.length; j++){
          if (user_data[i].category == classified_list[j]){
            classified_amount[j] += Number(user_data[i].money);
          }
        }
      }
      
      for (var i = 0; i<classified_amount.length; i++){
        classified_amount_sum += classified_amount[i];
      }
/*
      for (var i = 0; i<classified_amount.length; i++){
        classified_amount[i] = classified_amount[i] / classified_amount_sum * 100;
      }*/
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
    
    <View style={{height:300, padding:30, flexDirection: 'row'}}>
        <Text style= {{ color: Colors.white, fontSize: 17 }}>        지출 분류별 지출 내역 {classified_amount[0]} </Text>
        <SafeAreaView style={{ flex: 1}}>
          <View style={styles.container}>
            <View style={{ paddingVertical: 15, flexDirection: 'row', width: 350, justifyContent: 'space-between', paddingTop: 80}}>
              <Pie
                  radius={80}
                  sections={[
                    { percentage: classified_amount[0], color: '#C70039' },
                    { percentage: classified_amount[1], color: '#44CD40' },
                    { percentage: classified_amount[2], color: '#404FCD' },
                    { percentage: classified_amount[3], color: '#EBD22F' },
                    { percentage: classified_amount[4], color: '#C70039' },
                    { percentage: classified_amount[5], color: '#44CD40' },
                    { percentage: classified_amount[6], color: '#404FCD' },
                    { percentage: classified_amount[7], color: '#EBD22F' },
                    { percentage: classified_amount[8], color: '#C70039' },
                    { percentage: classified_amount[9], color: '#44CD40' },
                    { percentage: classified_amount[10], color: '#404FCD' },
                    { percentage: classified_amount[11], color: '#EBD22F' },
                    { percentage: classified_amount[12], color: '#44CD40' },
                  ]}
                  strokeCap={'butt'} />
            </View>
          </View>
      </SafeAreaView>
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
