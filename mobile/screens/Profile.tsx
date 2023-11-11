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
import background from "../assets/background3.png";

import { styles } from "./profile.styles";
import axios from "axios";

import { setFilters, setProfile, setPlaces } from "../redux/actions";
import { useSelector } from "react-redux";

const Profile = ({ navigation }: any) => {
    // const {user} = useSelector(state => state.userReducer);
    const [userData, setUserData] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await AsyncStorage.getItem("user");
                console.log("hello", user);
                if (user !== null) {
                    const response = await axios.get(
                        `http://195.80.50.92:8080/user/get?id=${user[1]}`
                    );
                    setUserData(JSON.parse(response["request"]["response"]));
                    //   console.log(JSON.parse(response['request']['response']))
                    //   console.log(`http://195.80.50.92:8080/user/get?id=${user}`)
                } else {
                    setUserData("No user data found");
                }
            } catch (error: any) {
                // Error retrieving data
                console.error("AsyncStorage error: ", error.message);
                setUserData("Failed to load user data");
            }
        };
        fetchUserData();
    }, []);

    function handleExit() {
        AsyncStorage.removeItem("user");
        navigation.push("Loading");
    }

    if (userData !== undefined)
        return (
            <View style={styles.container}>
                <Image style={styles.background} source={background} />
                <View style={styles.infoContainer}>
                    <Image style={styles.avatar} source={{ uri: userData["avatar"] }} />
                    <Text style={styles.name}>{userData["login"]}</Text>
                </View>
                <TouchableOpacity onPress={() => handleExit()}>
                    <Text>Выйти</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Playlist", {otherParam: {"places": userData["places"]}})}>
                    <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 100, backgroundColor: "#1E1E1E", padding: 10, paddingLeft: 15, paddingRight: 15, borderRadius: 20, width: 190}}>
                        <Text style={{color: "#FFF", fontSize: 20}}>Любимые места</Text>
                    </View>
                </TouchableOpacity>
                <View
                    style={{
                        position: "absolute",
                        width: "90%",
                        left: "5%",
                        height: 60,
                        backgroundColor: "rgba(22, 22, 22, 0.45)",
                        bottom: 20,
                        borderRadius: 30,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Playlists")}
                        style={{ marginTop: 10 }}
                    >
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            {/* <PlaylistsIcon /> */}
                            <Image
                                style={{ height: 28, objectFit: "contain" }}
                                source={PlaylistsIcon}
                            />
                            <Text style={{ color: "#8E8E93", fontSize: 10, marginTop: 3 }}>
                                Подборки
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                        style={{ marginTop: 8 }}
                    >
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image
                                style={{ height: 28, objectFit: "contain" }}
                                source={HomeIcon}
                            />
                            <Text style={{ color: "#8E8E93", fontSize: 10, marginTop: 3 }}>
                                Лента
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image
                                style={{ height: 28, objectFit: "contain" }}
                                source={ProfileActive}
                            />
                            <Text style={{ color: "#F2F2F7", fontSize: 10, marginTop: 3 }}>
                                Профиль
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
};

export default Profile;
