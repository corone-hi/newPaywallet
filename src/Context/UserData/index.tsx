import React, {createContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

const defaultContext: IUserDataContext = {
  category: undefined,
  getMonthSum: (select_category: string) => void; 
};

const UserDataContext = createContext(defaultContext);

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const UserDataContextProvider = ({children}: Props) => {
  const [category, setCategory] = useState([]);

  const getMonthSum = async (select_category: string) => {
    var user_data = [];
    let user = auth().currentUser;
    var DataRef = database().ref(`user_wallet/${user.uid}`);
    var count = 0;

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

        var month_sum = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (var i = 0; i < user_data.length; i++) {
          // 선택한 카테고리에 맞게
          if (select_category == user_data[i].category) {
            Date = user_data[i].key.slice(1);
            var newDate = moment(Date * 1000).format('MM/DD/YYYY hh:MM');
            var month = newDate.slice(0, 2);

            month_sum[0] += Number(user_data[i].money);
            if (month == '01') {
              month_sum[0] += Number(user_data[i].money);
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
          if (select_category == user_data[i].category) count++;
        }
        setCategory(month_sum);
        console.log(select_category);
        //console.log(month_sum);
        console.log(user_data.length);
        console.log(count);
      });
      setIsLoading(true);
    } catch (e) {
      console.log(e);
      Alert.alert(e);
      setIsLoading(true);
    }
  };

  */
  useEffect(() => {
    monthlyAcount();
    // getMonthSum('음식점');
  }, [userInfo]);

  return (
    <UserDataContext.Provider
      value={{
        category,
        getMonthSum,
      }}>
      {children}
    </UserDataContext.Provider>
  );
};
export {UserDataContextProvider, UserDataContext};

