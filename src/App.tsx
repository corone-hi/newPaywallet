import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Navigator from '~/Screens/Navigator';

import {UserContextProvider} from '~/Context/User';

import {SMSDataContextProvider} from '~/Context/SMSData';
import {UserDataContextProvider} from '~/Context/UserData';

const App = () => {
  return (
    <UserDataContextProvider>
      <SMSDataContextProvider>
        <UserContextProvider>
          <StatusBar barStyle="light-content" />
          <Navigator />
        </UserContextProvider>
      </SMSDataContextProvider>
    </UserDataContextProvider>
  );
};

export default App;
