import { Platform, StyleSheet, Text, View, Image, Linking, TouchableOpacity, StatusBar, Animated, Easing, LogBox, FlatList, TouchableWithoutFeedback, TouchableHighlight, Modal } from 'react-native';


export const styles = StyleSheet.create({
    container: { paddingTop: Platform.OS == 'ios' ? 30 : 0, width: '100%', height: '106%', top: '-6%' },
    background: { position: 'absolute', height: '100%', width: '100%', zIndex: 0 },
    filter: {right: '4%', borderRadius: 30, top: 57, alignItems: 'flex-start', position: 'absolute', zIndex: 2, backgroundColor: '#1E1E1E'},
    filterText: {zIndex: 1, color: '#FFF', fontSize: 12, margin: 8, marginLeft: 24, marginRight: 24},
    more: {left: '4%', borderRadius: 30, top: 57, alignItems: 'flex-start', position: 'absolute', zIndex: 1, backgroundColor: '#1E1E1E'},
    moreText: {zIndex: 1, color: '#FFF', fontSize: 16, margin: 2, marginBottom: 10, marginLeft: 38, marginRight: 38, fontWeight: '700'},
    infoContainer: { position: 'relative', marginTop: 110, left: '3%', width: '94%', backgroundColor: '#1E1E1E', borderRadius: 30, zIndex: 2 },
    coverContainer: {position: 'relative', height: 370, marginTop: 15},
    cover: { position: 'absolute', width: '94%', borderRadius: 20, left: '3%', height: 370, objectPosition: 'center', scaleX: -1 },
    descr: { position: 'relative', color: "#FFF", marginTop: 0, fontSize: 15, width: '88%', left: "5%" },
    time: { position: 'relative', color: '#FFF', fontSize: 15, fontWeight: '700', marginTop: 10, left: '67%', zIndex: 0, paddingBottom: 15 },
    tagContainer: { flex: 0.96, marginTop: 10, left: '4%', position: 'relative', zIndex: 2 },
    tag: {
        "backgroundColor": '#1e1e1e',
        "position": "relative",
        /* left: 3%, */
        "alignSelf": "flex-start",
        "borderRadius": 15,
        "padding": 9,
        "paddingRight": 16,
        "zIndex": 2,
    },
    tagText: {
        "color": "#fff"
    },
    address: { zIndex: 1, marginTop: 10, position: 'relative', backgroundColor: '#1E1E1E', left: '4%', alignSelf: 'flex-start', padding: 7, paddingRight: 14, borderRadius: 15 },
    addressText: { color: "#FFF", fontSize: 13, fontWeight: '400' }
});
