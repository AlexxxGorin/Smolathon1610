import { StyleSheet, Text, View, Image, TextInput, Linking, TouchableOpacity, StatusBar, Animated, Easing, LogBox, FlatList, TouchableWithoutFeedback, TouchableHighlight, Modal } from 'react-native';

import background from '../assets/background3.png'
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/actions';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Reg1({navigation, route}) {
//     const { otherParam } = route.params;
//
//     const dispatch = useDispatch()
//
//     const [fadeAnim] = useState(new Animated.Value(0));
//
//     const [users, setUsers] = useState([])
//
//     const [login, setLogin] = useState(null);
//     const [password, setPassword] = useState(null);
//     const [loginError, setLoginError] = useState(false)
//     const [registerErrorText, setRegisterErrorText] = useState(null)
//
//     useEffect(() => {
//         Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 5000,
//         }).start();
//         const url = 'http://salut.test.na4u.ru/api/users';
//
//         axios.get(url)
//         .then(res => {
//         setUsers(res['data'])})
//         }, [])
//
//     function submitLogIn() {
//         for (let i = 0; i < users.length; i++){
//             if ((users[i]['login'] == login || users[i]['tag'] == login) && users[i]['password'] == password) {
//                 console.log("BRUHHHHHHHHHHH", JSON.stringify(users[i]))
// //                 AsyncStorage.setItem('user', JSON.stringify(users[i])); // Expires in 10 minutes
//                 dispatch(setProfile({
//                     'id': users[i]['id'],
//                     'login': users[i]['login'],
//                     'password': password,
//                     'tag': users[i]['tag'],
//                     'avatar': users[i]['avatar'],
//                     'liked': users[i]['liked'],
//                     'likedplaylists': users[i]['likedplaylists'],
//                     'likedroutes': users[i]['likedroutes'],
//                     'date': users[i]['date'],
//                     'city': users[i]['city'],
//                     'algorithms': users[i]['algorithms']
//                 }))
//                 navigation.push('Home')
//             }
//             else {
//                 setLoginError(true)
//             }
//         }
//     }
//     function submitSignIn() {
//         var flag = true
//         for (let i = 0; i < users.length; i++){
//             if ((users[i]['login'] == login)) {
//                 setRegisterErrorText('Эта почта уже привязана к аккаунту!')
//                 flag = false
//             }
//             else if (password.length < 5){
//                 setRegisterErrorText('Пароль должен быть не короче пяти символов!')
//                 flag = false
//             }
//             console.log(flag)
//         }
//         if (flag) {
//             dispatch(setProfile({
//                 'id': null,
//                 'login': login,
//                 'password': password,
//                 'tag': null,
//                 'avatar': null,
//                 'liked': [],
//                 'likedplaylists': [],
//                 'likedroutes': [],
//                 'date': null,
//                 'city': null,
//                 'algoritms': null
//             }))
//             navigation.navigate('Reg2')
//             setRegisterErrorText(null)
//         }
//     }
//     return(
//         <View style={{width: '100%', height: '100%', backgroundColor: '#3751AE'}}>
//             <Image style={{opacity: 1, position: 'absolute', height: '100%', width: '100%', zIndex: 0}} source={background} />
//
//             <View style={{flexDirection: 'row', top: 40, width: '100%'}}>
//                 <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: '#FFF'}} />
//                 <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: 'rgba(140, 167, 164, 1)'}} />
//                 <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: 'rgba(140, 167, 164, 1)'}} />
//                 <View style={{height: 6, width: '20%', borderRadius: 3, marginLeft: '4%', backgroundColor: 'rgba(140, 167, 164, 1)'}} />
//             </View>
//
//             <Text style={{color: '#FFF', fontSize: 40, fontWeight: '600', left: '5%', marginTop: 180}}>{otherParam['mode'] == 'login' ? 'Почта / никнейм' : 'Эл. почта'}</Text>
//             <TextInput
//                 style={{fontSize: 18, color: '#FFF', backgroundColor: 'rgba(217, 217, 217, 0.45)', width: '90%', borderRadius: 20, padding: 15, paddingLeft: 15, marginTop: 25, alignSelf: 'center'}}
//                 onChangeText={setLogin}
//                 value={login}
//                 // placeholder="Эл. почта / тэг"
//                 keyboardType="default"
//                 // placeholderTextColor='#606060'
//                 autoCorrect={false}
//                 autoFocus={false}
//                 />
//                 <Text style={{color: '#FFF', fontSize: 40, fontWeight: '600', left: '5%', marginTop: 50}}>Пароль</Text>
//                 <TextInput
//                 style={{fontSize: 18, color: '#FFF', backgroundColor: 'rgba(217, 217, 217, 0.45)', width: '90%', borderRadius: 20, padding: 15, paddingLeft: 15, marginTop: 15, alignSelf: 'center'}}
//                 onChangeText={setPassword}
//                 value={password}
//                 // placeholder="Пароль"
//                 keyboardType="default"
//                 // placeholderTextColor='#606060'
//                 autoCorrect={false}
//                 autoFocus={false}
//                 />
//                 {loginError ? <Text style={{color: '#D00', fontSize: 18, left: '5%', fontWeight: '500', marginTop: 5}}>Неправильный логин или пароль!</Text> : <View></View>}
//                 {registerErrorText != null ? <Text style={{color: '#D00', fontSize: 18, left: '5%', fontWeight: '500', marginTop: 5}}>{registerErrorText}</Text> : <View></View>}
//
//
//                 <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}><View style={{ backgroundColor: '#333', alignSelf: 'flex-start', padding: 10, width: 130, borderRadius: 20, marginTop: 20}}><Text style={{fontSize: 22, color: 'white', alignSelf: 'center'}}>Назад</Text></View></TouchableOpacity>
//                     <TouchableOpacity disabled={(password == null || login == null) ? true : false} onPress={() => otherParam['mode'] == 'login' ? submitLogIn() : submitSignIn()}><View style={{ backgroundColor: '#0014C9', alignSelf: 'flex-start', padding: 10, width: 130, borderRadius: 20, marginTop: 20}}><Text style={{fontSize: 22, color: 'white', alignSelf: 'center'}}>{otherParam['mode'] == 'login' ? 'Поехали!' : 'Дальше'}</Text></View></TouchableOpacity>
//                 </View>
//
//         </View>
//     )

    const storeUserData = async (userData) => {
      try {
        // Assuming userData is an object that you want to store
        // Convert object to string to store in AsyncStorage
        const jsonString = JSON.stringify(userData);

        await AsyncStorage.setItem('user', jsonString);
        console.log('User data saved successfully');
      } catch (error) {
        // Error saving data
        console.error('AsyncStorage error: ', error.message);
      }
      navigation.push("Loading")
    };

    return(
    <View style={{marginTop: 100}}>
    <Text> Сменить аккаунт </Text>
    <TouchableOpacity onPress={() => storeUserData('3')}><Text> vdmk </Text></TouchableOpacity>
    <TouchableOpacity onPress={() => storeUserData('2')}><Text> thechoosenone </Text></TouchableOpacity>

    </View>)
}