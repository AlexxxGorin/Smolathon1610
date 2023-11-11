import { StyleSheet, Text, View, Image, TextInput, Linking, TouchableOpacity, StatusBar, Animated, Easing, LogBox, FlatList, TouchableWithoutFeedback, TouchableHighlight, Modal } from 'react-native';
import CacheStore from 'react-native-cache-store';
import background from '../assets/background3.png'
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile } from './redux/actions';
import { useSelector } from 'react-redux';



export default function Registration({navigation}) {

    const [fadeAnim] = useState(new Animated.Value(0));

    const [button, setButton] = useState(0)

    useEffect(() => {
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000,
        }).start();
        const url = 'http://salut.test.na4u.ru/api/users';

        axios.get(url)
        .then(res => {
        setUsers(res['data'])})
        }, [])


    return(
        <View style={{width: '100%', height: '100%', backgroundColor: '#3751AE'}}>
            <Image style={{opacity: 1, position: 'absolute', height: '100%', width: '100%', zIndex: 0}} source={background} />
            <Animated.Text style={{color: '#FFF', marginLeft: '5%', fontSize: 40, width: '50%', fontWeight: '600', marginTop: 130, opacity: fadeAnim.interpolate({inputRange: [0, 0.1, 0.3, 1], outputRange: [0, 0, 1, 1],})}}>Привет, это Salut!</Animated.Text>
            <Animated.Text style={{color: '#FFF', marginLeft: '5%', fontSize: 17, width: '85%', fontWeight: '600', marginTop: 20, opacity: fadeAnim.interpolate({inputRange: [0, 0.1, 0.3, 1], outputRange: [0, 0, 0.7, 0.7],})}}>и здесь собраны самые крутые места твоего города</Animated.Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Reg1', {otherParam: {'mode': 'login'}})} activeOpacity={0.7}><Animated.View style={{alignSelf: 'center', backgroundColor: button == 0 ? '#1E1E1E' : '#404040', padding: 12, opacity: fadeAnim.interpolate({inputRange: [0, 0.3, 0.5, 1], outputRange: [0, 0, 1, 1]}), width: '80%', marginTop: '70%', borderRadius: 20}}><Text style={{color: '#FFF', alignSelf: 'center', fontSize: 20, fontWeight: '400'}}>Войти с почтой</Text></Animated.View></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Reg1', {otherParam: {'mode': 'register'}})} activeOpacity={0.7}><Animated.View style={{alignSelf: 'center', backgroundColor: button == 1 ? '#1E1E1E' : '#404040', padding: 12, opacity: fadeAnim.interpolate({inputRange: [0, 0.3, 0.5, 1], outputRange: [0, 0, 1, 1]}), marginTop: 10, width: '80%', borderRadius: 20}}><Text style={{color: '#FFF', alignSelf: 'center', fontSize: 20, fontWeight: '400'}}>Регистрация</Text></Animated.View></TouchableOpacity>
        </View>
    )
}