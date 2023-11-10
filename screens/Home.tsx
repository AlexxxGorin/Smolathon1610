import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  StyleSheet, StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlaceHome from './PlaceHome';
import background from '../assets/background.png'
import axios from 'axios';

import {HomeIconActive} from '../assets/home.svg'
import {HomeIcon} from '../assets/Home1.svg'
import PlaylistsIcon from '../assets/Playlists.svg'
import {PlaylistsIconActive} from '../assets/PlaylistsActive.svg'
import {Profile} from '../assets/Profile.svg'
import {ProfileActive} from '../assets/Profile.svg'
import {Salut} from '../assets/Salut.svg'

import PagerView from 'react-native-pager-view';

import {styles} from './home.styles'



const Home = ({navigation}: any) => {

    const [userData, setUserData] = useState('');
    const [places, setPlaces]:any = useState();

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const user = await AsyncStorage.getItem('user');
            if (user !== null) {
              setUserData(user);
            } else {

              setUserData('No user data found');
            }
          } catch (error: any) {
            // Error retrieving data
            console.error('AsyncStorage error: ', error.message);
            setUserData('Failed to load user data');
          }
        };
        const fetchData = async () => {
          try {
            const response = await axios.get('http://92.53.105.117:8080/place/get_all', {
              headers: {
                'Accept': 'application/json'
              }});
            // console.log(JSON.parse(response['request']['response']));
            setPlaces(JSON.parse(response['request']['response']));
            // setName(JSON.parse(response['request']['response'])["name"])
            // setAdress(JSON.parse(response['request']['response'])["adress"])
            // setBill(JSON.parse(response['request']['response'])["bill"])
            // setTags(JSON.parse(response['request']['response'])["tags"])
            // setFeatures(JSON.parse(response['request']['response'])["features"])
            // setCusine(JSON.parse(response['request']['response'])["cusine"])
            // setTime(JSON.parse(response['request']['response'])["time"])
            // setPhone(JSON.parse(response['request']['response'])["phone"])
            // // setPhotos(JSON.parse(response['request']['response'])["photos"])
            // setMenu(JSON.parse(response['request']['response'])["menu"])
    
    
            // console.log('meo', response['request']['response'])
          } catch (error) {
            console.error({"error:": error})
          }
        };


        fetchUserData();
        fetchData();
        // console.log(place)
        
      }, []);

      const ref:any = React.useRef(PagerView);

      const renderLimit = 2

      const [meow, setMeow] = useState(0)

      if (places !== undefined)
      return (
        // <View></View> onPress={() => ref.current.setPage(0)} in HomeIconActive
          <View style={{ height: '100%', width: '100%', backgroundColor: "#000" }}>
            <StatusBar backgroundColor='black' barStyle='light-content' hidden />
            {/* <More style={{position: 'absolute', top: '1%', zIndex: 2, scaleX: 0.85, scaleY: 0.85, left: '84%'}}></More> */}
            {/* <Filter style={{display: 'none', position: 'absolute', top: '1%', zIndex: 2, scaleX: 0.9, scaleY: 0.9, left: '20%'}}></Filter> */}
            {/* <Map style={{display: 'none', position: 'absolute', top: '1%', zIndex: 2, scaleX: 0.9, scaleY: 0.9, left: '5%'}}></Map> */}
            <PagerView ref={ref} onPageSelected={(event) => { setMeow(event.nativeEvent.position); }} orientation='vertical' style={styles.pagerView} initialPage={0}>
              {places.map((place: any) => {
                if (place["name"] == 'Смолка') console.log(place['photos']['Внутри'][0])  
                return (
                  <View key={places.indexOf(place)}>
                    {Math.abs(meow - places.indexOf(place)) < renderLimit && (<PlaceHome page={background} id={place['id']} navigation={navigation} name={place['name']} img={place['photos']['Внутри'][0]} time={place['work_hours']} desc={place['description']} adress={place['address']} phone={place['phone_number']} menu={place['menu']} tags={place['tags']} features={place['features']} photos={place["photos"]}  />)}
                  </View>
                )
              })}
            </PagerView>
          {/* <PlaceHome page={background} id={place['id']} navigation={navigation} name={place['name']} img={place['photos']['Внутри'][0]} time={place['work_hours']} desc={place['description']} adress={place['address']} phone={place['phone_number']} menu={place['menu']} tags={place['tags']} features={place['features']} photos={place["photos"]} ></PlaceHome> */}
          <View style={{ position: 'absolute', width: '90%', left: '5%', height: 60, backgroundColor: 'rgba(22, 22, 22, 0.45)', bottom: 20, borderRadius: 30, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Playlists')} style={{ marginTop: 10 }}><View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {/* <PlaylistsIcon /> */}
              <Text style={{ color: '#8E8E93', fontSize: 10, marginTop: 3 }}>Подборки</Text>
            </View></TouchableOpacity>
            <TouchableOpacity  style={{ marginTop: 8 }}><View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {/* <HomeIconActive /> */}
              <Text style={{ color: '#F2F2F7', fontSize: 10, marginTop: 3 }}>Лента</Text>
            </View></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginTop: 10 }}><View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {/* <Profile /> */}
              <Text style={{ color: '#8E8E93', fontSize: 10, marginTop: 3 }}>Профиль</Text>
            </View></TouchableOpacity>
          </View>
        </View>
        
      );
}

export default Home;