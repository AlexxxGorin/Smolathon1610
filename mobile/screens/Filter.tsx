import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, StatusBar, Animated, Easing, LogBox, FlatList, TouchableWithoutFeedback, TouchableHighlight, Modal, Platform } from 'react-native';
import Back from '../assets/Backsvg.png'
import background from '../assets/background.png'
import { useState, useContext, useEffect } from 'react' ;
import Slider from '@react-native-community/slider';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/actions';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
// import MapView, {PROVIDER_OSM, Polygon, Circle} from 'react-native-maps';
import Reload from '../assets/Reload.png'



export default function Filter({route, navigation}) {

    const {filters} = useSelector(state => state.userReducer) 
    console.log('loaded filters', filters)
    const dispatch = useDispatch()

    function saveFilters(d, p, a, t, l, c) {

        const newFilters = {
            'distance': d,
            'prices': p,
            'activity': a,
            'tags': t,
            'location': l,
            'cusine': c
        }
        console.log('new filters', newFilters)
        dispatch(setFilters(newFilters))
    }

    useEffect(() => {
        LogBox.ignoreAllLogs()
    }, )

    /// DISTANCE ///

    const DISTANCECOLOR = '#FFF'

    const [distance, setDistance] = useState(filters['distance'])

    function handleBack() {
        saveFilters(d=distance, p=prices, a=activities, t=tags, l=filters['location'], c=value)
        navigation.push('Home')
    }


    function handleDistance(newDistance) {

        if (newDistance === distance) {
            setDistance(0)
            saveFilters(d=0, p=prices, a=activities, t=tags, l=filters['location'], c=value)
        }
        else {
            setDistance(newDistance)
        }
    }

    /// PRICES ///

    const PRICESCOLOR = '#FFF'

    const [prices, setPrices] = useState(filters['prices'])

    function handlePrices(id) {
        let newPrices = prices
        newPrices[id] = ! newPrices[id]
        setPrices({...newPrices})
    }


    const renderPrices = ({item}) => {
        var text = ''
        if (item.id == 0) text = 'цены'
        else text = ' '.repeat(4 - item.id) + '₽'.repeat(item.id) + ' '.repeat(4 - item.id)

        return(
            <TouchableWithoutFeedback onPress={() => handlePrices(item.id)}>
                <View style={{alignSelf: 'flex-start', borderRadius: 30, padding: 12, paddingLeft: 17, paddingRight: 17, backgroundColor: item.on ? PRICESCOLOR : '#1E1E1E'}}>
                    <Text style={{fontSize: 12, color: item.on ? '#000' : '#FFF', fontWeight: '600'}}>{text}</Text>
                </View>
            </TouchableWithoutFeedback>
            
        )
    }

    /// ACTIVITIES ///

    const [activities, setActivities] = useState(filters['activity'])

    function handleActivities(id) {
        let emptyDict = {
            0: false,
            1: false,
            2: false,
            3: false,
        }
        emptyDict[id] = ! activities[id]
        setActivities(emptyDict)
    }

    const renderActivities = ({item}) => {

        const texts = {
            0: 'История',
            1: 'Культура',
            2: 'Ужин',
            3: 'Отдых'
        }
        const em = {
            0: "❤",
            1: "📯",
            2: "🍽",
            3: "🥂"
        }

        return(
            <TouchableWithoutFeedback onPress={() => handleActivities(item.id)}>
                <View style={{alignItems: 'center'}}>
                {/* <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}> */}
                    <View style={{borderRadius: 20, padding: 12, width: 70, height: 70, backgroundColor: item.on ? PRICESCOLOR : '#1E1E1E'}}><Text style={{textAlign: 'center', marginTop: 10, fontSize: 20}}>{em[item.id]}</Text></View>
                    <Text style={{fontSize: 12, fontWeight: '600', color: '#FFF', marginTop: 10}}>{texts[item.id]}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    /// TAGS ///

    const allTags = {'Доставка еды': '0', 'Еда навынос': '1', 'Оплата картой': '0', 'Летняя веранда': '4', 'Wi-Fi': '0', 'Кофе с собой': '2', 'Крафтовое пиво': '2', 'Предзаказ онлайн': '0', 'Бизнес-ланч': '1', 'Подарочный сертификат': '0', 'Завтрак': '2', 'Проектор': '3', 'Настольные игры': '3', 'Детское меню': '1', 'Спортивные трансляции': '4', 'Парковка для людей с инвалидностью': '0', 'Детская комната': '1', 'Самовывоз': '0', 'Доставка': '0', 'Лифт': '0', 'Танцпол': '4', 'Автоматическая дверь': '0', 'Туалет для людей с инвалидностью': '0', 'Караоке': '4', 'Пандус': '0', 'Зарядка для телефона': '0', 'WC': '0', 'Питьевая вода': '0', 'Бесплатная доставка': '0', 'Оплата счета по QR-коду': '0', 'Чай': '1', 'Фудкорт': '0', 'Бильярд': '3', 'Скидка на еду': '0', 'Икорный магазин': '0', 'Кнопка вызова персонала': '0', 'Доставка продуктов': '0', 'Парковка': '0', 'Шоу-программа': '4', 'Фейс-контроль': '0', 'Ресторан': '1', 'Место для отдыха': '3', 'Предварительная запись': '0', 'Льготные билеты': '0', 'Хлеб из тандыра': '0', 'Чайная': '1', 'Печать на тортах': '0', 'барная стойка': '2', 'винная карта': '1', 'закрытие под банкет': '0', 'кулинария': '0', 'меню на английском': '1', 'DJ': '4', 'бесплатная парковка': '0', 'своя пекарня': '2', 'настольные игры': '3', 'можно с животными': '1', 'живая музыка': '4', 'устричный бар': '1', 'бранчи': '2', 'детская анимация': '0', 'танцпол': '4', 'гриль': '1', 'домашняя еда': '1', 'выпечка': '1', 'шашлыки': '0', 'круглосуточная кухня': '0', 'местоположение у воды': '3', 'бильярд': '3', 'суши и роллы': '1', 'узбекская еда': '0', 'комплексные обеды': '1', 'грузинская еда': '0', 'пицца': '0', 'можно с ноутбуком': '0', 'сладости': '0', 'здоровое питание': '1', 'осетинские пироги': '1', 'китайская еда': '0'}
    const emojis = {'Доставка еды': '🚚', 'Еда навынос': '🥡', 'Оплата картой': '💳', 'Летняя веранда': '⛱', 'Wi-Fi': '🌐', 'Кофе с собой': '☕', 'Крафтовое пиво': '🍺', 'Предзаказ онлайн': '🌐', 'Бизнес-ланч': '🕴🏿🕴🏻', 'Подарочный сертификат': '📃', 'Завтрак': '🍳', 'Проектор': '📽', 'Настольные игры': '🎲', 'Детское меню': '👶🏻', 'Спортивные трансляции': '⚽', 'Парковка для людей с инвалидностью': '♿', 'Детская комната': '👶🏻', 'Самовывоз': '🚶‍♂', 'Доставка': '🚚', 'Лифт': '♿', 'Танцпол': '🕺🏾', 'Автоматическая дверь': '♿', 'Туалет для людей с инвалидностью': '♿', 'Караоке': '🎤', 'Пандус': '♿', 'Зарядка для телефона': '📳', 'WC': '🚾', 'Питьевая вода': '🥛', 'Бесплатная доставка': '🆓', 'Оплата счета по QR-коду': '📲', 'Чай': '☕', 'Фудкорт': '🪔', 'Бильярд': '🎱', 'Скидка на еду': '💸', 'Икорный магазин': '🟠', 'Кнопка вызова персонала': '♿', 'Доставка продуктов': '🚚', 'Парковка': '🅿', 'Шоу-программа': '💃🏼', 'Фейс-контроль': '💂‍♂', 'Ресторан': '🍴', 'Место для отдыха': '🏖', 'Предварительная запись': '📝', 'Льготные билеты': '👵', 'Хлеб из тандыра': '🍞', 'Чайная': '☕', 'Печать на тортах': '🎂', 'барная стойка': '🍸', 'винная карта': '🍷', 'закрытие под банкет': '🥂', 'кулинария': '🍽', 'меню на английском': '🇬🇧', 'DJ': '🎧', 'бесплатная парковка': '🅿', 'своя пекарня': '🥐', 'настольные игры': '🧩', 'можно с животными': '🐈', 'живая музыка': '🎷', 'устричный бар': '🦪', 'бранчи': '🧇', 'детская анимация': '👶', 'танцпол': '🕺🏾', 'гриль': '🥓', 'домашняя еда': '🥗', 'выпечка': '🥐', 'шашлыки': '🍖', 'круглосуточная кухня': '🏪', 'местоположение у воды': '🌊', 'бильярд': '🎱', 'суши и роллы': '🍣', 'узбекская еда': '🇺🇿', 'комплексные обеды': '🍴', 'грузинская еда': '🇬🇪', 'пицца': '🍕', 'можно с ноутбуком': '💻', 'сладости': '🍭', 'здоровое питание': '🥗', 'осетинские пироги': '🥧', 'китайская еда': '🇨🇳🥡'}

    var tagsData = []

    for (let i = 0; i < Object.keys(allTags).length; i++){
        if (allTags[Object.keys(allTags)[i]] != '0') tagsData.push({'name': Object.keys(allTags)[i]})
    }

    tagsData = tagsData.sort((a, b) => parseInt(allTags[b]) - parseInt(allTags[a])).reverse()

    const [tags, setTags] = useState(filters['tags'])

    function handleTags(name) {
        var newTags = tags
        if (tags.includes(name)) newTags.splice(tags.indexOf(name), 1)
        else newTags.push(name)
        setTags([...newTags])
        saveFilters(t=[...newTags], p=prices, a=activities, d=distance, l=filters['location'], c=value)
    }

    const renderFullTags = ({ item }) => {
        return(
            <TouchableWithoutFeedback onPress={() => handleTags(item.name)}><View style={{backgroundColor: tags.includes(item.name) ? '#FFF' : '#1E1E1E', position: 'relative', left: '3%', alignSelf: 'flex-start', borderRadius: 15, padding: 7, paddingRight: 14, marginTop: 6, zIndex: 2}}><Text style={{color: tags.includes(item.name) ? '#000' : '#FFF', fontSize: 12}}>{emojis[item.name]}   {item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text></View></TouchableWithoutFeedback>
        )
    }

    /// FIXING FLATLISTS ///

    const getItemLayout = (data, index) => {
        return {
            length: 20,
            offset: 20 * data.length,
            index,
        };
    }

    /// DROPDOWN ///

    const cusines = [
        {label: '🇪🇺 европейская', value: 'европейская'},
        {label: '󠁧󠁢󠁥󠁮󠁧🇬🇧 английская', value: 'английская'},
        {label: '🇮🇹 итальянская', value: 'итальянская'},
        {label: '🇫🇷 французская', value: 'французская'},
        {label: '🇩🇪 немецкая', value: 'немецкая'},
        {label: '🇩🇰🇸🇪 скандинавская', value: 'скандинавская'},

        {label: '🇪🇸 испанская', value: 'испанская'},
        {label: '🇲🇽 мексиканская', value: 'мексиканская'},
        {label: '🌎 латиноамериканская', value: 'латиноамериканская'},
        {label: '🇺🇸 американская', value: 'американская'},

        {label: '🇹🇷 турецкая', value: 'турецкая'},
        {label: '🇸🇦 арабская', value: 'арабская'},
        {label: '🇮🇱 еврейская', value: 'еврейская'},
        {label: '🌯 средиземноморская', value: 'средиземноморская'},

        {label: '🇷🇺 русская', value: 'русская'},
        {label: '🇷🇺 национальная', value: 'национальная'},
        {label: '🇺🇦 украинская', value: 'украинская'},
        {label: '🇧🇾 белорусская', value: 'белорусская'},
        {label: '🥞 домашняя', value: 'домашняя'},
        {label: '🍯 татарская', value: 'татарская'},
        {label: '🥘 сибирская', value: 'сибирская'},
        {label: '🍖 кавказская', value: 'кавказская'},
        {label: '👫 славянских народов', value: 'славянских народов'},

        {label: '🥡 восточная', value: 'восточная'},
        {label: '🥡 азиатская', value: 'азиатская'},
        {label: '🥡 паназиатская', value: 'паназиатская'},
        {label: '🍜 среднеазиатская', value: 'среднеазиатская'},
        {label: '🇯🇵 японская', value: 'японская'},
        {label: '🇮🇩 индонезийская', value: 'индонезийская'},
        {label: '🇰🇷 корейская', value: 'корейская'},
        {label: '🇨🇳 китайская', value: 'китайская'},
        {label: '🇻🇳 вьетнамская', value: 'вьетнамская'},
        {label: '🇹🇭 тайская', value: 'тайская'},
        {label: '🇮🇳 индийская', value: 'индийская'},

        {label: '👨‍🍳 авторская', value: 'авторская'},
        {label: '🏁 фьюжн', value: 'фьюжн'},
        {label: '🌊 морская', value: 'морская'},
        {label: '🌱 вегетерианская', value: 'вегетерианская'},
        {label: '🌱 веганская', value: 'веганская'},
        {label: '🥩 мясная', value: 'мясная'},
        {label: '🍖 шашлык', value: 'шашлык'},
        {label: '🦐 рыбная', value: 'рыбная'},

        {label: '🇪🇺 восточно-европейская', value: 'восточно-европейская'},
        {label: '🍖 осетинская', value: 'осетинская'},
        {label: '🇬🇪 грузинская', value: 'грузинская'},
        {label: '🇺🇿 узбекская', value: 'узбекская'},
        {label: '🇦🇿 азербайджанская', value: 'азербайджанская'},
        {label: '🇦🇲 армянская', value: 'армянская'},
        {label: '🇷🇸 сербская', value: 'сербская'},
        {label: '🇨🇿 чешская', value: 'чешская'},
        {label: '🇧🇬 болгарская', value: 'болгарская'},
        {label: '🇬🇷 греческая', value: 'греческая'},

        {label: '⛪ постная', value: 'постная'},
        {label: '🕌 халяльная', value: 'халяльная'},
        {label: '🌏 международная', value: 'международная'},
        {label: '🌏 континентальная', value: 'континентальная'},
        {label: '🌍 африканская', value: 'африканская'},
        {label: '🏳 смешанная', value: 'смешанная'},
    ]

    const [value, setValue] = useState(filters['cusine']);
    const [isFocus, setIsFocus] = useState(false);

    function handleLocation(id) {
      setLocation(id)
      if (id == 1){
        navigation.navigate('FilterMap')
      }
    }

    // const renderLabel = () => {
    // if (value || isFocus) {
    //     return (
    //     <Text style={[styles.label, isFocus && { color: 'blue' }]}>
    //         Dropdown label
    //     </Text>
    //     );
    // }
    // return null;
    // };
    const [location, setLocation] = useState(0)
    
    return(
        <View style={{backgroundColor: '#116', height: '100%', width: '100%', flex: 1}}>
            <ScrollView nestedScrollEnabled={true} style={{width: '100%', backgroundColor: '#033'}} contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}>
            <Image style={{position: 'absolute', height: '100%', width: '100%', zIndex: 0}} source={background} />
            <View style={{paddingTop: Platform.OS == 'ios' ? 30: 0, }}></View>
            <TouchableOpacity onPress={handleBack} style={{zIndex: 2, width: 80, top: -80}}><Image style={{width: 50, objectFit: "contain", left: '3%', top: 20, position: 'relative'}} source={Back}></Image></TouchableOpacity>
            <Image style={{width: 50, objectFit: "contain", right: '0%', position: 'absolute', top: -80}} source={Reload} onPress={() => {setDistance(0); setPrices([]); setTags([]); setValue(null); setActivities({0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false})}}></Image>
            
            <Text style={{fontSize: 22, fontWeight: '800', color: '#FFF', marginTop: -120, left: '8%'}}>Настройки ленты</Text>
            {/* LOCATION  */}
            
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 25}}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => handleLocation(0)}><View style={{alignSelf: 'flex-start', backgroundColor: location == 0 ? '#FFF' : '#1E1E1E', padding: 14, borderRadius: 30, marginLeft: 30}}><Text style={{color: location == 0 ? '#1E1E1E' : '#FFF', fontSize: 12, fontWeight: '600'}}>рядом</Text></View></TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={() => handleLocation(1)}><View style={{alignSelf: 'flex-start', backgroundColor: location == 1 ? '#FFF' : '#1E1E1E', padding: 14, borderRadius: 30, marginRight: 15}}><Text style={{color: location == 0 ? '#FFF' : '#1E1E1E', fontSize: 12, fontWeight: '600'}}>выбрать на карте</Text></View></TouchableOpacity>
            </View> */}
            {/* DISTANCE */}
            {/* <View style={{marginTop: 15, backgroundColor: distance > 0 ? DISTANCECOLOR : '#1E1E1E', width: '86%', left: '7%', borderRadius: 30}}>
                <Text style={{fontSize: 12, fontWeight: '600', padding: 12, paddingLeft: 13, color: distance > 0 ? '#000' : '#FFF'}}>расстояние</Text>

                <View style={{position: 'absolute', backgroundColor: distance > 0 ? DISTANCECOLOR : '#1E1E1E', height: '100%', width: 1, left: '28%'}}><View style={{backgroundColor: '#4E4E4E', height: 22, width: 1, top: 11}}></View></View>
                <View style={{position: 'absolute', backgroundColor: distance > 1 ? DISTANCECOLOR : '#1E1E1E', height: '100%', width: 1, left: '46%'}}><View style={{backgroundColor: '#4E4E4E', height: 22, width: 1, top: 11}}></View></View>
                <View style={{position: 'absolute', backgroundColor: distance > 2 ? DISTANCECOLOR : '#1E1E1E', height: '100%', width: 1, left: '64%'}}><View style={{backgroundColor: '#4E4E4E', height: 22, width: 1, top: 11}}></View></View>
                <View style={{position: 'absolute', backgroundColor: distance > 3 ? DISTANCECOLOR : '#1E1E1E', height: '100%', width: 1, left: '82%'}}><View style={{backgroundColor: '#4E4E4E', height: 22, width: 1, top: 11}}></View></View>
                
                <TouchableWithoutFeedback onPress={() => handleDistance(1)}><View style={{position: 'absolute', height: 40.5, width: '17.8%', left: '28.2%', backgroundColor: distance > 0 ? DISTANCECOLOR : '#1E1E1E', zIndex: 1}}><Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', fontSize: 12, marginBottom: 'auto', color: '#000', opacity: distance == 1 ? 1 : 0}}>&lt; 1км</Text></View></TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => handleDistance(2)}><View style={{position: 'absolute', height: 40.5, width: '17.8%', left: '46.2%', backgroundColor: distance > 1 ? DISTANCECOLOR : '#1E1E1E', zIndex: 1}}><Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', fontSize: 12, marginBottom: 'auto', color: '#000', opacity: distance == 2 ? 1 : 0}}>&lt; 3км</Text></View></TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => handleDistance(3)}><View style={{position: 'absolute', height: 40.5, width: '17.9%', left: '64.2%', backgroundColor: distance > 2 ? DISTANCECOLOR : '#1E1E1E', zIndex: 1}}><Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', fontSize: 12, marginBottom: 'auto', color: '#000', opacity: distance == 3 ? 1 : 0}}>&lt; 5км</Text></View></TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => handleDistance(4)}><View style={{position: 'absolute', height: 40.5, width: '17.8%', left: '82.3%', borderBottomRightRadius: 30, borderTopRightRadius: 30, backgroundColor: distance > 3 ? DISTANCECOLOR : '#1E1E1E', zIndex: 1}}><Text style={{marginLeft: 'auto', fontSize: 12, marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', color: '#000', opacity: distance == 4 ? 1 : 0}}>&gt; 5км</Text></View></TouchableWithoutFeedback>
            </View> */}

            {/* PRICES */}
            <FlatList
                contentContainerStyle={{flex: 1, marginTop: 35, left: '7%', position: 'relative'}}
                horizontal={true}
                data={[{id: 0, on: Object.values(prices).includes(true)}, {id: 1, on: prices[1]}, {id: 2, on: prices[2]}, {id: 3, on: prices[3]}, {id: 4, on: prices[4]}]}
                renderItem={renderPrices}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => (<View style={{width: 5}}/>)}
                scrollEnabled={false}
                getItemLayout={getItemLayout}
                extraData={prices}
                showsHorizontalScrollIndicator={false}
            />

            {/* DROPDOWN CUSINE */}

            <View style={{flexDirection: 'row', left: '2.2%', marginTop: 15}}>
            
            <View style={{backgroundColor: value != null ? '#FFF' : '#1E1E1E', position: 'relative', alignSelf: 'flex-start', borderRadius: 30, padding: 12, zIndex: 2, paddingLeft: 17, paddingRight: 17}}><Text style={{color: value != null ? '#000' : '#FFF', fontSize: 12, fontWeight: '600'}}>кухня</Text></View>
            
            <Dropdown
            style={[styles.dropdown, isFocus && { borderBottomRightRadius: 0, borderBottomLeftRadius: 0}, {backgroundColor: value != null ? '#FFF' : '#1E1E1E'}]}
            containerStyle={{backgroundColor: '#1E1E1E', borderBottomRightRadius: 15, borderBottomLeftRadius: 15, borderWidth: 0, top: -1, marginLeft: 1}}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={[styles.selectedTextStyle, {color: value != null ? '#000' : '#FFF'}]}
            activeColor='#2E2E2E'
            itemTextStyle={{color: '#FFF', fontSize: 12, textAlign: 'center', right: 8}}
            data={cusines}
            maxHeight={300}
            showsVerticalScrollIndicator={false}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'любая' : '...'}
            value={value}
            // statusBarIsTranslucent={true}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                if (item.value == value) setValue(null)
                else setValue(item.value);
                setIsFocus(false);
            }}
            />
            </View>
            {/* ACTIVITIES */}

            <Text style={{fontSize: 18, fontWeight: '600', color: '#FFF', marginTop: 25, left: '8%'}}>Чем займемся?</Text>

            <FlatList
                contentContainerStyle={{paddingRight: '9%', marginTop: 15, left: '10%', position: 'relative'}}
                horizontal={true}
                data={[{id: 0, on: activities[0]}, {id: 1, on: activities[1]}, {id: 2, on: activities[2]}, {id: 3, on: activities[3]}]}
                renderItem={renderActivities}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => (<View style={{width: 10}}/>)}
                scrollEnabled={true}
                getItemLayout={getItemLayout}
                showsHorizontalScrollIndicator={false}
            />

            {/* TAGS */}

            <Text style={{fontSize: 18, fontWeight: '600', color: '#FFF', marginTop: 30, left: '8%'}}>Теги</Text>

            <FlatList
                style={{width: '90%'}}
                contentContainerStyle={{flex: 0.95, marginTop: 15, marginBottom: 20, flexDirection: 'row', flexWrap: 'wrap', left: '5%', position: 'relative'}}
                horizontal={true}
                data={tagsData}
                renderItem={renderFullTags}
                keyExtractor={item => item.id}
                getItemLayout={getItemLayout}
                ItemSeparatorComponent={() => (<View style={{width: 5}}/>)}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={false}
            />
        </ScrollView>
        </View>
    )
}   

const styles = StyleSheet.create({
    dropdown: {
    height: 40,
    borderRadius: 30,
    paddingHorizontal: 8,
    marginTop: 0,
    width: "60%",
    left: 5,
    position: 'relative',
    },
    icon: {
    marginRight: 5,
    },
    selectedTextStyle: {
    fontSize: 12,
    paddingLeft: 'auto',
    paddingRight: 'auto',
    textAlign: 'center',
    },
    placeholderStyle: {
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
    },
    iconStyle: {
    width: 20,
    height: 20,
    },
    inputSearchStyle: {
    height: 40,
    fontSize: 16,
    },
});