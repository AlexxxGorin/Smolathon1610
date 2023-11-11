import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Loading = ({navigation}: any) => {

    useEffect(() => {
          checkUser();
        }, []);

        const checkUser = async () => {
          try {
            const user = await AsyncStorage.getItem('user');
            if (user !== null) {
              // We have data!!
              console.log('User found:', user);
              navigation.navigate("Home");
    //           navigateToScreen('Home');
            } else {
              // No user found
    //           navigateToScreen('Reg1');
                navigation.navigate("Reg1");
            }
          } catch (error: any) {
            // Error retrieving data
            console.error('AsyncStorage error: ', error.message);
          }
        };

        const navigateToScreen = (screenName: any) => {
          // Logic to navigate to the given screen
          // This depends on what navigation library you're using
          // For react-navigation, you might do something like:
    //       navigation.navigate("Home");
        };

      return (
        <View style={styles.container}>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userData: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
});

export default Loading;