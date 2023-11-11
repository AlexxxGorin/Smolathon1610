import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Dimensions, StatusBar, Animated, Easing, LogBox, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Close from '../assets/Close.svg'
import GestureRecognizer from 'react-native-swipe-gestures';



export default function Stories({route, navigation}) {

    const { otherParam } = route.params;
    const photos = otherParam['photos'].slice(0, 20)
    const title = otherParam['title']

    const [curr, setCurr] = useState(photos.length - 1)

    function nextPage(){
        if (curr < photos.length - 1){
            setCurr(curr + 1)
        }
        else {
            setCurr(0)
        }
        setTimeLeft(3.999)
    }

    function prevPage(){
        if (curr > 0){
            setCurr(curr - 1)
        }
        else {
            setCurr(photos.length - 1)
        }
        setTimeLeft(3.999)
    }

    const [timeLeft, setTimeLeft] = useState(4)
    const [isRunning, setIsRunning] = useState(true)
    const [doClick, setDoClick] = useState(true)
    const [prefetched, setPrefetched] = useState(false)

    function prefetch() {
        for (var i = 0; i < photos.length; i++){
            Image.prefetch(photos[i])
        }
        setPrefetched(true)
    }

    useEffect(() => {
        if (prefetched == false) prefetch()
        const interval = setInterval(() =>  {
            isRunning && setTimeLeft((timeLeft) => (timeLeft >= 0.1 ? timeLeft - 0.1 : 4))
        }, 50)

        if (timeLeft === 4) {
            nextPage();
        }
        return () => {
            clearInterval(interval);
        }
    }, [timeLeft, isRunning])


    function Bar() {
        const width = Dimensions.get('window')['width']
        const blank = width * 0.01
        const barWidth = Math.floor((width - (blank * (photos.length + 1))) / photos.length)
        return(
            <View style={{marginLeft: blank, top: Platform.OS == 'ios' ? '10%': '3%', flexDirection: 'row', flexWrap: 'wrap'}}>
                {photos.map((key) => {
                    return(
                        <ProgressBar id={key} barWidth={barWidth} blank={blank} style={{width: barWidth, height: 3, backgroundColor: '#444', marginRight: blank}}></ProgressBar>
                    )
                })}
            </View>
        )
    }

    function ProgressBar({barWidth, blank, id}){

        return(
            <View>
                <View style={{width: photos.indexOf(id) === curr ? barWidth - (timeLeft * barWidth / 4) : 0, height: 3, backgroundColor: "#FFF", zIndex: 1}}/>
                <View style={{width: barWidth, height: 3, backgroundColor: '#444', marginRight: blank, bottom: 3}} />
            </View>
        )
    }

    function handleBack() {
        navigation.goBack()
    }

    return(
        <GestureRecognizer onSwipeDown={() => handleBack()} style={{width: '100%', height: '100%', backgroundColor: '#999', flex: 1, alignSelf: 'flex-start',}}>
            <Bar style={{}}></Bar>
            <Image style={{height: '100%', zIndex: -1}} blurRadius={10} source={{uri: photos[curr]}}></Image>
            {/* <TouchableOpacity onPress={() => handleBack()} style={{zIndex: 2, top: Platform.OS == 'ios' ? '-94%': '-98%', left: '90%'}}><Close style={{zIndex: 2, }}/></TouchableOpacity> */}
            <TouchableWithoutFeedback onLongPress={() => {setIsRunning(false); setDoClick(false)}} onPressOut={() => {if (doClick) { prevPage() } else { setIsRunning(true); setDoClick(true) }}}><View style={{backgroundColor: '#F00', height: '100%', width: '25%', left: '0%', zIndex: 1, opacity: 0, top: '-100%'}} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onLongPress={() => {setIsRunning(false)}} onPressOut={() => {setIsRunning(true)}}><View style={{backgroundColor: '#00F', height: '100%', width: '50%', left: '25%', zIndex: 1, opacity: 0, top: '-200%'}} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onLongPress={() => {setIsRunning(false); setDoClick(false)}} onPressOut={() => {if (doClick) { nextPage() } else { setIsRunning(true); setDoClick(true) }}}><View style={{backgroundColor: '#0F0', height: '100%', width: '25%', left: '75%', top: '-300%', zIndex: 1, opacity: 0}} /></TouchableWithoutFeedback>
            <Animated.Text style={{color: 'white', marginLeft: 'auto', marginRight: 'auto', zIndex: 0, top: '-353%', fontSize: 40, opacity: curr == 0 ? timeLeft > 4 ? 1 : 3 * (timeLeft - 2) : 0}}>{title}</Animated.Text>
            <Image style={{width: '100%', minHeight: '100%', resizeMode: 'contain', top: '-407%', zIndex: -1}} source={{uri: photos[curr]}} />
        </GestureRecognizer>
    )
}