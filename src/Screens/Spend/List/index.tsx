import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from 'moment'; //npm i moment
import SelectDropdown from 'react-native-select-dropdown';
import { Colors } from 'react-native/Libraries/NewAppScreen';

var select_month = '';

const List = () => {
  const columns = ["사용내역", "지출분류", "금액"];
  const [data, setData] = useState('');
  const user_data = [];
  var Date = '';

  const renderItem = ({item}) => {
    Date = (item.날짜).slice(1, )
    var newDate = moment(Date* 1000).format("MM/DD/YYYY hh:MM")
    var month = newDate.slice(0,2)

    if (month == select_month) {
      return(
        <View style={{padding:15, borderBottomColor:'#aaa', borderBottomWidth:1,  flexDirection:'row', paddingBottom:20,}}>
          <Text style={{flex:1, padding:5, paddingLeft:10, color: Colors.white}}>{item.사용내역}</Text>
          <Text style={{flex:1, padding:5, paddingLeft:60, color: Colors.white}}>{item.지출분류}</Text>
          <Text style={{flex:1, padding:5, paddingLeft:30, color: Colors.white}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.금액}</Text>
        </View>
      )
    }
  }

  useEffect(()=>{
    let user = auth().currentUser;
    var DataRef = database().ref(`user_wallet/${user.uid}`); 

    DataRef.on("value", (snapshot)=>{
      snapshot.forEach((child)=>{
        user_data.unshift({
          날짜: child.key,
          사용내역: child.val().shop,
          지출분류: child.val().category,
          금액: child.val().money,
        });
      });
      setData(user_data);
    });
  },[])

  const categories = ['2021년 04월', '2021년 05월', '2021년 06월', '2021년 07월', '2021년 08월', '2021년 09월'];
  const [category, setCategory] = useState('');
    
  return(
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
        <Text style={{paddingBottom:15, paddingLeft: 30, paddingTop:10, borderBottomColor:'#aaa', borderBottomWidth:2, fontWeight:'bold', letterSpacing:10, color: Colors.white}}>
          &nbsp;{columns[0]}&nbsp;&nbsp; {columns[1]}&nbsp;&nbsp;&nbsp; {columns[2]}&nbsp;
        </Text>
        <ScrollView>
            <View style={{paddingTop: 10, borderBottomColor: '#2c3e50', borderBottomWidth:1,}}>
                <FlatList data={data} renderItem={renderItem} style={{ padding:15,}}/>
            </View>
        </ScrollView>
      </View> 
    );
};

export default List;