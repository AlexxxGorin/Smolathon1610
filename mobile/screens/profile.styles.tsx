import { Platform, StyleSheet, Text, View, Image, Linking, TouchableOpacity, StatusBar, Animated, Easing, LogBox, FlatList, TouchableWithoutFeedback, TouchableHighlight, Modal } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    background: { position: 'absolute', height: '100%', width: '100%', zIndex: 0 },
    infoContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 30,
        // justifyContent: ''
    },
    avatar: {
        // position: 'absolute',
        width: 110,
        height: 110,
        borderRadius: 100,
        marginLeft: 10
    },
    name: {
        color: '#FFF',
        fontSize: 20,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 40
    },
    placesContainer: {
        position: 'relative',
        marginTop: 80,
        display: 'flex',
        flexDirection: 'column',
        gap: 30
    },
    place: {
        backgroundColor: "#1E1E1E",
        width: "90%",
        marginLeft: "5%",
        borderRadius: 30,
        height: 150,
        display: 'flex',
        flexDirection: 'row'
    },
    placeImage: {
        width: 120,
        height: 120,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 30
    },
    placeName: {
        color: "#FFF",
        fontSize: 16,
        maxWidth: 200,
        marginLeft: 10,
        marginTop: 15
    },
    placeDescr: {
        color: "#FFF",
        maxWidth: 200,
        fontSize: 12,
        marginLeft: 10,
        maxHeight: 57
    },
    placeBtn: {
        backgroundColor: "#3C3C33",
        padding: 10,
        borderRadius: 30,
        maxWidth: 100,
        marginTop: 5,
        marginLeft: 90
    },
    placeBtnText: {
        color: "#FFF",
        
    }
});
