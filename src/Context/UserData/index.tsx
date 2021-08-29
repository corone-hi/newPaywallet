import React, {createContext, useState, useEffect, useContext} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
//import {UserContext} from '~/Context/User';

const defaultContext: IUserDataContext = {
  category: undefined,
  month: undefined,
  ListData: () => {},
  getMonthSum: (select_category: string) => {},
  getCategorySum: (select_month: string) => {},
};

const UserDataContext = createContext(defaultContext);

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const UserDataContextProvider = ({children}: Props) => {
  //const {userInfo} = useContext<IUserContext>(UserContext);
  const [category, setCategory] = useState([]);
  const [month, setMonth] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  /*
  //List
  const ListData = () => {
    var user_data = [];
    let user = auth().currentUser;
    var DataRef = database().ref(`user_wallet/${user.uid}`);

    try {
      DataRef.on('value', snapshot => {
        snapshot.forEach(child => {
          var modified_money = child.val().money.slice(0, -1).replace(',', '');

          user_data.unshift({
            key: child.key,
            category: child.val().category,
            money: modified_money,
          });
        });
        //setCategory(user_data);
      });
      //setIsLoading(true);
    } catch (e) {
      console.log(e);
      Alert.alert(e);
      //setIsLoading(true);
    }
  };

  */

  // LineChart
  const getMonthSum = async (select_category: string) => {
    var user_data = [];
    let user = auth().currentUser;

    if (user) {
      var DataRef = database().ref(`user_wallet/${user.uid}`);
      var month_sum = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var count = 0;

      try {
        DataRef.on('value', snapshot => {
          snapshot.forEach(child => {
            var modified_money = child
              .val()
              .money.slice(0, -1)
              .replace(',', '');

            user_data.unshift({
              key: child.key,
              category: child.val().category,
              money: modified_money,
            });
          });

          for (var i = 0; i < user_data.length; i++) {
            // 선택한 카테고리에 맞게
            if (select_category == user_data[i].category) {
              Date = user_data[i].key.slice(1);
              var newDate = moment(Date * 1000).format('MM/DD/YYYY hh:MM');
              var month = newDate.slice(0, 2);

              if (month == '01') {
                month_sum[0] += Number(user_data[i].money);
                //let s = 0;
                //s += Number(user_data[i].money);
                //console.log(s);
              }
              if (month == '02') {
                month_sum[1] += Number(user_data[i].money);
              }
              if (month == '03') {
                month_sum[2] += Number(user_data[i].money);
              }
              if (month == '04') {
                month_sum[3] += Number(user_data[i].money);
              }
              if (month == '05') {
                month_sum[4] += Number(user_data[i].money);
              }
              if (month == '06') {
                month_sum[5] += Number(user_data[i].money);
              }
              if (month == '07') {
                month_sum[6] += Number(user_data[i].money);
              }
              if (month == '08') {
                month_sum[7] += Number(user_data[i].money);
                let s = 0;
                s += Number(user_data[i].money);
                console.log(s);
              }
              if (month == '09') {
                month_sum[8] += Number(user_data[i].money);
              }
              if (month == '10') {
                month_sum[9] += Number(user_data[i].money);
              }
              if (month == '11') {
                month_sum[10] += Number(user_data[i].money);
              }
              if (month == '12') {
                month_sum[11] += Number(user_data[i].money);
              }
            }
            //if (select_category == user_data[i].category) count++;
          }
          setCategory(...month_sum);
          console.log('확인!!!');
          console.log(category);
          //console.log(user_data.length);
          //console.log(count);
        });
        //setIsLoading(true);
      } catch (e) {
        console.log(e);
        Alert.alert(e);
        //setIsLoading(true);
      }
    }
  };

  /*
  // BarChart
  const getCategorySum = async (select_month: string) => {
    var user_data = [];
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

    let user = auth().currentUser;
    var DataRef = database().ref(`user_wallet/${user.uid}`);

    try {
      DataRef.on('value', snapshot => {
        snapshot.forEach(child => {
          var modified_money = child.val().money.slice(0, -1).replace(',', '');

          user_data.unshift({
            key: child.key,
            category: child.val().category,
            money: modified_money,
          });
        });

        var category_sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (var i = 0; i < user_data.length; i++) {
          for (var j = 0; j < classified_list.length; j++) {
            Date = user_data[i].key.slice(1);
            var newDate = moment(Date * 1000).format('MM/DD/YYYY hh:MM');
            var month = newDate.slice(0, 2);
            if (select_month == month) {
              if (user_data[i].category == classified_list[j]) {
                category_sum[j] += Number(user_data[i].money);
              }
            }
          }
        }
        setMonth(category_sum);
        //console.log(month_sum);
        //console.log(user_data.length);
        //console.log(count);
      });
      //setIsLoading(true);
    } catch (e) {
      console.log(e);
      Alert.alert(e);
      //setIsLoading(true);
    }
  };

  */
  useEffect(() => {
    //ListData();
    getMonthSum('공공,사회기관');
    //getCategorySum('09월');
  }, []);

  return (
    <UserDataContext.Provider
      value={
        {
          //category,
          //month,
          //ListData,
          //getMonthSum,
          //getCategorySum,
        }
      }>
      {children}
    </UserDataContext.Provider>
  );
};
export {UserDataContextProvider, UserDataContext};
