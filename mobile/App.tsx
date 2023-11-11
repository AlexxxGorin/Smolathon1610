/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack';

import { Provider } from 'react-redux'
import { Store } from './redux/store';


import Home from './screens/Home';
import Place from './screens/Place'
import Registration from './screens/Registration';
import Loading from './screens/Loading';
import Reg1 from './regScreens/Reg1';
import Stories from './screens/Stories';
import Profile from './screens/Profile';
import Filter from './screens/Filter';
import Playlist from './screens/Playlist';


const Stack = createStackNavigator();


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#333" : "999",
  };  


        return (
          // Your navigation container and screens setup goes here
          <Provider store={Store}>
            <NavigationContainer>
              <Stack.Navigator>
                {/* Other screens */}
                <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }}/>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name="PlaceProfile" component={Place} options={{ headerShown: false }}/>
                <Stack.Screen name="Story" component={Stories} options={{ headerShown: false }}/>
                <Stack.Screen name="Reg1" component={Reg1} options={{ headerShown: false }}/>
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
                <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }}/>
                <Stack.Screen name="Playlist" component={Playlist} options={{ headerShown: false }}/>
              </Stack.Navigator>
            </NavigationContainer>
          </Provider>
        );
}

export default App;
