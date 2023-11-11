import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  StyleSheet, StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlaceHome from './PlaceHome';
import background from '../assets/background.png'
import axios from 'axios';

import HomeIconActive from '../assets/home.png'
import HomeIcon from '../assets/Home1.png'
import PlaylistsIcon from '../assets/Playlists.png'
import PlaylistsIconActive from '../assets/PlaylistsActive.png'
import ProfileIcon from '../assets/profile.png'
import ProfileActive from '../assets/profile.png'
import Salut from '../assets/Salut.png'

import PagerView from 'react-native-pager-view';

import {styles} from './home.styles'

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setFilters, setProfile, setPlaces } from '../redux/actions';
// const dispatch = useDispatch()


const Home = ({navigation}: any) => {

    const [userData, setUserData] = useState();
    const [places, setPlaces]:any = useState();
    const { filters }:any = useSelector(state => state.userReducer)
    const [oldFilters, setOldFilters] = useState(filters)
    const dispatch = useDispatch()


      useEffect(() => {
        const fetchUserData = async () => {

          try {
            const user = await AsyncStorage.getItem('user');
            if (user !== null) {
              const response = await axios.get(`http://195.80.50.92:8080/user/get?id=${user}`);
              setUserData(JSON.parse(response['request']['response']));
              // console.log('got user', JSON.parse(response['request']['response']))
              // dispatch(setProfile({
              //   'id': user,
              //   'login': JSON.parse(response['request']['response'])["login"],
              //   'password': JSON.parse(response['request']['response'])["password"],
              //   'avatar': JSON.parse(response['request']['response'])["avatar"]
              // }))
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
            // const response = await axios.get('http://92.53.105.117:8080/place/get_all', {
            //   headers: {
            //     'Accept': 'application/json'
            //   }});
            // // console.log(JSON.parse(response['request']['response']));
            // setPlaces(JSON.parse(response['request']['response']));
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
      let url = 'http://195.80.50.92:8080/place/get_all';
      console.log('bruh', filters)
      axios.get(url)
      .then(res => {
        // console.log(JSON.parse(res['request']['response']))
        let newPlaces = JSON.parse(res['request']['response'])
        newPlaces = newPlaces.slice(0, 15).concat(newPlaces.slice(52, 60)).concat(newPlaces.slice(80, 100))
        setPlaces(newPlaces.sort((a, b) => {
          var resA = 0;
          var resB = 0;
          const prices = {
            'средние': '2',
            'выше среднего': '3',
            'высокие': '4'
          }
          for (let i = 0; i < filters['tags'].length; i++) {
            if (a['tags'].filter(k => k["name"]).includes(filters['tags'][i])) {
              resA += 1;
            }
            if (b['tags'].filter(k => k["name"]).includes(filters['tags'][i])) {
              resB += 1;
            }
          }
          if (filters['prices'][prices[a['features']['Цены']]]) {
            resA += 1;
          }
          if (filters['prices'][prices[b['features']['Цены']]]) {
            resB += 1;
          }
          if (Object.keys(a['features']).includes('Кухня'))
          if (a['features']['Кухня'].includes(filters['cusine'])) {
            resA += 1;
          }
          if (Object.keys(b['features']).includes('Кухня'))
          if (b['features']['Кухня'].includes(filters['cusine'])) {
            resB += 1;
          }
          if (Object.keys(a['features']).includes('Тип заведения')) {
            for (let i = 0; i < a['features']['Тип заведения'].length; i++) {
              if (filters['activity'][0] == true) {
                if (['стейк-хаус', 'блинная', 'гастропаб', 'хинкальная', 'пироговая', 'шашлычная', 'детское кафе', 'чайхана', 'бургерная', 'кофейня с завтраками', 'закусочная', 'фаст-фуд', 'пельменная', 'чебуречная', 'раменичная', 'трактир', 'таверна', 'пончиковая'].includes(a['features']['Тип заведения'][i]) || a['features']['Тип заведения'][i].indexOf('ресторан') != 0) {
                  resA += 1
                  break;
                }
              }
              if (filters['activity'][2] == true) {
                if (['винотека', 'пивной ресторан', 'винный ресторан', 'рюмочная', 'трактир'].includes(a['features']['Тип заведения'][i]) || a['features']['Тип заведения'][i].indexOf('бар') != 0) {
                  resA += 1
                  break;
                }
              }
              if (filters['activity'][3] == true) {
                if (['коктейльный бар', 'танцевальный бар'].includes(a['features']['Тип заведения'][i]) || a['features']['Тип заведения'][i].indexOf('клуб') != 0) {
                  resA += 1
                  break;
                }
              }
            }
          }
          if (Object.keys(b['features']).includes('Тип заведения')) {
            for (let i = 0; i < b['features']['Тип заведения'].length; i++) {
              if (filters['activity'][0] == true) {
                if (['стейк-хаус', 'блинная', 'гастропаб', 'хинкальная', 'пироговая', 'шашлычная', 'детское кафе', 'чайхана', 'бургерная', 'кофейня с завтраками', 'закусочная', 'фаст-фуд', 'пельменная', 'чебуречная', 'раменичная', 'трактир', 'таверна', 'пончиковая'].includes(b['features']['Тип заведения'][i]) || b['features']['Тип заведения'][i].indexOf('ресторан') != 0) {
                  resB += 1
                  break;
                }
              }
              if (filters['activity'][2] == true) {
                if (['винотека', 'пивной ресторан', 'винный ресторан', 'рюмочная', 'трактир'].includes(b['features']['Тип заведения'][i]) || b['features']['Тип заведения'][i].indexOf('бар') != 0) {
                  resB += 1
                  break;
                }
              }
              if (filters['activity'][3] == true) {
                if (['коктейльный бар', 'танцевальный бар'].includes(b['features']['Тип заведения'][i]) || b['features']['Тип заведения'][i].indexOf('клуб') != 0) {
                  resB += 1
                  break;
                }
              }
            }
          }
          return resB - resA;
        }))
      })
      .then(() => {
        Object.keys(filters).forEach(el => {
          if (filters[el] != oldFilters[el]) {
            ref.current.setPage(0);
          }
        });
        setOldFilters(filters);
        
        return
      })
    }
    catch (error) {console.error({"error": error})}}
    fetchUserData();
    fetchData();
    console.log('welcome')
  }, [])
    
    
            // console.log('meo', response['request']['response'])
        //   } catch (error) {
        //     console.error({"error:": error})
        //   }
        // };


        // fetchData();
        // console.log(place)

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
                // if (place["name"] == 'Смолка') console.log(place['photos']['Внутри'][0])  
                try {
                return (
                  <View key={places.indexOf(place)}>
                    {/* {console.log(place['name'], place['photos']['Внутри'])} */}
                    {Math.abs(meow - places.indexOf(place)) < renderLimit && (<PlaceHome page={background} id={place['id']} navigation={navigation} name={place['name']} time={place['work_hours']} desc={place['description']} adress={place['address']} phone={place['phone_number']} menu={place['menu']} tags={place['tags']} features={place['features']} photos={place["photos"]}  />)}
                  </View>
                )
                // else if (Object.keys(place['photos']).includes('Все'))
                // return (
                //   <View key={places.indexOf(place)}>
                //     {/* {console.log(place['name'], place['photos']['Внутри'])} */}
                //     {Math.abs(meow - places.indexOf(place)) < renderLimit && (<PlaceHome page={background} id={place['id']} navigation={navigation} name={place['name']}  time={place['work_hours']} desc={place['description']} img={place['photos']['Все'][0]} adress={place['address']} phone={place['phone_number']} menu={place['menu']} tags={place['tags']} features={place['features']} photos={place["photos"]}  />)}
                //   </View>
                // )
                // else if (Object.keys(place['photos']).includes('Снаружи'))
                // return (
                //   <View key={places.indexOf(place)}>
                //     {/* {console.log(place['name'], place['photos']['Внутри'])} */}
                //     {Math.abs(meow - places.indexOf(place)) < renderLimit && (<PlaceHome page={background} id={place['id']} navigation={navigation} name={place['name']}  time={place['work_hours']} desc={place['description']} img={place['photos']['Снаружи'][0]} adress={place['address']} phone={place['phone_number']} menu={place['menu']} tags={place['tags']} features={place['features']} photos={place["photos"]}  />)}
                //   </View>
                // )
                }
                catch {
                  console.log('catched error at', place['name'])
                }
              })}
            </PagerView>
          {/* <PlaceHome page={background} id={place['id']} navigation={navigation} name={place['name']} img={place['photos']['Внутри'][0]} time={place['work_hours']} desc={place['description']} adress={place['address']} phone={place['phone_number']} menu={place['menu']} tags={place['tags']} features={place['features']} photos={place["photos"]} ></PlaceHome> */}
          <View style={{ position: 'absolute', width: '90%', left: '5%', height: 60, backgroundColor: 'rgba(22, 22, 22, 0.45)', bottom: 20, borderRadius: 30, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Playlists')} style={{ marginTop: 10 }}><View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {/* <PlaylistsIcon /> */}
              <Image style={{height: 28, objectFit: 'contain'}} source={PlaylistsIcon}/>
              <Text style={{ color: '#8E8E93', fontSize: 10, marginTop: 3 }}>Подборки</Text>
            </View></TouchableOpacity>
            <TouchableOpacity  style={{ marginTop: 8 }}><View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{height: 28, objectFit: 'contain'}} source={HomeIconActive}/>
              <Text style={{ color: '#F2F2F7', fontSize: 10, marginTop: 3 }}>Лента</Text>
            </View></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginTop: 10 }}><View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{height: 28, objectFit: 'contain'}} source={ProfileIcon} />
              <Text style={{ color: '#8E8E93', fontSize: 10, marginTop: 3 }}>Профиль</Text>
            </View></TouchableOpacity>
          </View>
        </View>
        
      );
}

export default Home;