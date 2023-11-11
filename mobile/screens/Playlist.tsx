import React, { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import {
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
    StyleSheet,
    Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeIconActive from "../assets/home.png";
import HomeIcon from "../assets/Home1.png";
import PlaylistsIcon from "../assets/Playlists.png";
import PlaylistsIconActive from "../assets/PlaylistsActive.png";
import ProfileIcon from "../assets/profile.png";
import ProfileActive from "../assets/profile.png";
import background from "../assets/background1.png";

import { styles } from "./profile.styles";
import axios from "axios";

import Back from '../assets/Backsvg.png'

import { setFilters, setProfile, setPlaces } from "../redux/actions";
import { useSelector } from "react-redux";

const Playlist = ({ navigation, route }: any) => {
    const { otherParam } = route.params;
    const places = otherParam["places"];
    console.log(places);
    // const {user} = useSelector(state => state.userReducer);
    // const [userData, setUserData] = useState();

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const user = await AsyncStorage.getItem("user");
    //             console.log("hello", user);
    //             if (user !== null) {
    //                 const response = await axios.get(
    //                     `http://195.80.50.92:8080/user/get?id=${user[1]}`
    //                 );
    //                 setUserData(JSON.parse(response["request"]["response"]));
    //                 //   console.log(JSON.parse(response['request']['response']))
    //                 //   console.log(`http://195.80.50.92:8080/user/get?id=${user}`)
    //             } else {
    //                 setUserData("No user data found");
    //             }
    //         } catch (error: any) {
    //             // Error retrieving data
    //             console.error("AsyncStorage error: ", error.message);
    //             setUserData("Failed to load user data");
    //         }
    //     };
    //     fetchUserData();
    // }, []);


    if (places !== undefined)
        return (
            <View style={styles.container}>
                <Image style={styles.background} source={background} />
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 2, width: 80 }}><Image style={{ width: 21, height: 50, marginLeft: '25%', top: 10, position: 'absolute', zIndex: 2 }} source={Back}></Image></TouchableOpacity>
                <View style={styles.placesContainer}>
                    {places.map(place => {
                        return(
                            <View style={styles.place}>
                                <Image style={styles.placeImage} source={{uri: place["photos"]["Внутри"][0]}}></Image>
                                <View>
                                    <Text style={styles.placeName}>{place["name"]}</Text>
                                    <Text style={styles.placeDescr}>{place["description"]}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('PlaceProfile', { otherParam: { 'id': place["id"], 'name': place["name"], 'img': place["photos"]["Внутри"][0], 'time': place["time"], 'desc': place["description"], 'cusine': null, 'adress': place["address"], 'phone': place["phone"], 'menu': place["menu"], 'tags': place["tags"], 'features': place["features"], 'photos': place["photos"] } })}><View style={styles.placeBtn}><Text style={styles.placeBtnText}>Подробнее</Text></View></TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </View>
                {}
            </View>
        );
};

export default Playlist;
