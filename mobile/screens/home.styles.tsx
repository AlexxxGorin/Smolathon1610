import { Platform, StyleSheet, Text, View, Image, Linking, TouchableOpacity, StatusBar, Animated, Easing, LogBox, FlatList, TouchableWithoutFeedback, TouchableHighlight, Modal } from 'react-native';


export const styles = StyleSheet.create({
    pagerView: {
      flex: 1,
      backgroundColor: '#000',
    },
    image: {
      width: '96%',
      borderRadius: 15,
      left: '2%',
      height: '65%',
      top: '-54%',
      objectPosition: 'center',
      scaleX: -1,
    },
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });