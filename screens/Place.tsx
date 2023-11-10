import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, TouchableOpacity, StatusBar, Animated, Easing, LogBox, FlatList, TouchableWithoutFeedback, TouchableHighlight, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { cusineTypes } from '../objects';


import { Provider } from 'react-redux'
import { Store } from '../redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setFilters, setProfile, setPlaces } from '../redux/actions';
import background from '../assets/background.png'
import Back from '../assets/Backsvg.png'

import { ScrollView } from 'react-native-gesture-handler';


import {styles} from './placeHome.styles'

const StoriesItem = ({ title, preview, images, navigation }) => {

    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Story', { otherParam: { photos: images, title: title } })}>
        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: 85, height: 110, borderRadius: 30, objectFit: 'center' }} source={{ uri: preview }} />
          <Text style={{ color: 'white', marginTop: 6, fontSize: 12, fontWeight: '400' }}>{title}</Text>
        </View>
  
      </TouchableOpacity>
  
    )
  }

const Place = ({ route, navigation }) => {

    // const { profile } = useSelector(state => state.userReducer)
    const { otherParam } = route.params;

      useEffect(() => {
        LogBox.ignoreAllLogs();
      }, [])


      /// DATA ///
    //   const navigation = props.navigation
      const name = otherParam["name"]
      const img = otherParam["img"]
      const time = otherParam["time"]
      const desc = otherParam["desc"]
      const adress = otherParam["adress"]
      const phone = otherParam["phone"]
      const menu = otherParam["menu"]
      const tags = otherParam["tags"]
      const features = otherParam["features"]
      const photos = otherParam["photos"]
      const bkg = background
      const id = otherParam["id"]
      const cusine = features["Кухня"];

      // console.log('hello world', cusine)

      /// LIKE ///

      // const [liked, setLiked] = useState(Object.values(profile['liked']).includes(props.id.toString()))
      // const dispatch = useDispatch()

      // function handleLike() {
      //   if (liked){
      //     setLiked(false)
      //     console.log(profile['liked'].indexOf(props.id))
      //     var newLiked = profile['liked']
      //     newLiked.splice(profile['liked'].indexOf(props.id.toString()), 1)
      //   }
      //   else {
      //     setLiked(true)
      //     var newLiked = profile['liked']
      //     newLiked.push(props.id.toString())
      //   }
      //   dispatch(setProfile({
      //     'id': profile['id'],
      //     'login': profile['login'],
      //     'password': profile['password'],
      //     'tag': profile['tag'],
      //     'avatar': profile['avatar'],
      //     'liked': newLiked,
      //     'date': profile['date'],
      //     'city': profile['city'],
      //     'algorithms': profile['algorithms']
      //     }
      //     ))
      //   axios.put('http://salut.test.na4u.ru/api/users/' + profile['id'].toString(), {
      //     login: profile['login'],
      //     password: profile['password'],
      //     tag: profile['tag'],
      //     liked: newLiked,
      //     avatar: profile['avatar'],
      //     date: profile['date'],
      //     city: profile['city'],
      //     algorithms: profile['algorithms']
      //     })
      // }


      /// PROFILE ///

      function handleBack() {
        navigation.goBack()
      }

      /// MANAGING FUCKING TAGS ///

      if (features !== null && tags !== null) {

        // if (features.hasOwnProperty('Особенности заведения')) {
        //     if (features.hasOwnProperty('Специальное меню')) {
        //         let menu_features = features['Специальное меню']
        //         var newTags = features['Особенности заведения']
        //         newTags.push(menu_features)
        //         newTags.push.apply(newTags, tags)

        //         let weights = { 'Доставка еды': '0', 'Еда навынос': '1', 'Оплата картой': '0', 'Летняя веранда': '4', 'Wi-Fi': '0', 'Кофе с собой': '2', 'Крафтовое пиво': '2', 'Предзаказ онлайн': '0', 'Бизнес-ланч': '1', 'Подарочный сертификат': '0', 'Завтрак': '2', 'Проектор': '3', 'Настольные игры': '3', 'Детское меню': '1', 'Спортивные трансляции': '4', 'Парковка для людей с инвалидностью': '0', 'Детская комната': '1', 'Самовывоз': '0', 'Доставка': '0', 'Лифт': '0', 'Танцпол': '4', 'Автоматическая дверь': '0', 'Туалет для людей с инвалидностью': '0', 'Караоке': '4', 'Пандус': '0', 'Зарядка для телефона': '0', 'WC': '0', 'Питьевая вода': '0', 'Бесплатная доставка': '0', 'Оплата счета по QR-коду': '0', 'Чай': '1', 'Фудкорт': '0', 'Бильярд': '3', 'Скидка на еду': '0', 'Икорный магазин': '0', 'Кнопка вызова персонала': '0', 'Доставка продуктов': '0', 'Парковка': '0', 'Шоу-программа': '4', 'Фейс-контроль': '0', 'Ресторан': '1', 'Место для отдыха': '3', 'Предварительная запись': '0', 'Льготные билеты': '0', 'Хлеб из тандыра': '0', 'Чайная': '1', 'Печать на тортах': '0', 'барная стойка': '2', 'винная карта': '1', 'закрытие под банкет': '0', 'кулинария': '0', 'меню на английском': '1', 'DJ': '4', 'бесплатная парковка': '0', 'своя пекарня': '2', 'настольные игры': '3', 'можно с животными': '1', 'живая музыка': '4', 'устричный бар': '1', 'бранчи': '2', 'детская анимация': '0', 'танцпол': '4', 'гриль': '1', 'домашняя еда': '1', 'выпечка': '1', 'шашлыки': '1', 'круглосуточная кухня': '0', 'местоположение у воды': '3', 'бильярд': '3', 'суши и роллы': '1', 'узбекская еда': '1', 'комплексные обеды': '1', 'грузинская еда': '1', 'пицца': '1', 'можно с ноутбуком': '0', 'сладости': '1', 'здоровое питание': '1', 'осетинские пироги': '1', 'китайская еда': '1' }
        //         newTags = newTags.sort((a, b) => parseInt(weights[b]) - parseInt(weights[a]))
        //     }
        //     else {
        //         var newTags = features['Особенности заведения']
        //         newTags.push.apply(newTags, tags)

        //         let weights = { 'Доставка еды': '0', 'Еда навынос': '1', 'Оплата картой': '0', 'Летняя веранда': '4', 'Wi-Fi': '0', 'Кофе с собой': '2', 'Крафтовое пиво': '2', 'Предзаказ онлайн': '0', 'Бизнес-ланч': '1', 'Подарочный сертификат': '0', 'Завтрак': '2', 'Проектор': '3', 'Настольные игры': '3', 'Детское меню': '1', 'Спортивные трансляции': '4', 'Парковка для людей с инвалидностью': '0', 'Детская комната': '1', 'Самовывоз': '0', 'Доставка': '0', 'Лифт': '0', 'Танцпол': '4', 'Автоматическая дверь': '0', 'Туалет для людей с инвалидностью': '0', 'Караоке': '4', 'Пандус': '0', 'Зарядка для телефона': '0', 'WC': '0', 'Питьевая вода': '0', 'Бесплатная доставка': '0', 'Оплата счета по QR-коду': '0', 'Чай': '1', 'Фудкорт': '0', 'Бильярд': '3', 'Скидка на еду': '0', 'Икорный магазин': '0', 'Кнопка вызова персонала': '0', 'Доставка продуктов': '0', 'Парковка': '0', 'Шоу-программа': '4', 'Фейс-контроль': '0', 'Ресторан': '1', 'Место для отдыха': '3', 'Предварительная запись': '0', 'Льготные билеты': '0', 'Хлеб из тандыра': '0', 'Чайная': '1', 'Печать на тортах': '0', 'барная стойка': '2', 'винная карта': '1', 'закрытие под банкет': '0', 'кулинария': '0', 'меню на английском': '1', 'DJ': '4', 'бесплатная парковка': '0', 'своя пекарня': '2', 'настольные игры': '3', 'можно с животными': '1', 'живая музыка': '4', 'устричный бар': '1', 'бранчи': '2', 'детская анимация': '0', 'танцпол': '4', 'гриль': '1', 'домашняя еда': '1', 'выпечка': '1', 'шашлыки': '1', 'круглосуточная кухня': '0', 'местоположение у воды': '3', 'бильярд': '3', 'суши и роллы': '1', 'узбекская еда': '1', 'комплексные обеды': '1', 'грузинская еда': '1', 'пицца': '1', 'можно с ноутбуком': '0', 'сладости': '1', 'здоровое питание': '1', 'осетинские пироги': '1', 'китайская еда': '1' }

        //         newTags = newTags.sort((a, b) => parseInt(weights[b]) - parseInt(weights[a]))
        //     }
        // }
        // else {
        var newTags = tags

        let weights: any = { 'Доставка еды': '0', 'Еда навынос': '1', 'Оплата картой': '0', 'Летняя веранда': '4', 'Wi-Fi': '0', 'Кофе с собой': '2', 'Крафтовое пиво': '2', 'Предзаказ онлайн': '0', 'Бизнес-ланч': '1', 'Подарочный сертификат': '0', 'Завтрак': '2', 'Проектор': '3', 'Настольные игры': '3', 'Детское меню': '1', 'Спортивные трансляции': '4', 'Парковка для людей с инвалидностью': '0', 'Детская комната': '1', 'Самовывоз': '0', 'Доставка': '0', 'Лифт': '0', 'Танцпол': '4', 'Автоматическая дверь': '0', 'Туалет для людей с инвалидностью': '0', 'Караоке': '4', 'Пандус': '0', 'Зарядка для телефона': '0', 'WC': '0', 'Питьевая вода': '0', 'Бесплатная доставка': '0', 'Оплата счета по QR-коду': '0', 'Чай': '1', 'Фудкорт': '0', 'Бильярд': '3', 'Скидка на еду': '0', 'Икорный магазин': '0', 'Кнопка вызова персонала': '0', 'Доставка продуктов': '0', 'Парковка': '0', 'Шоу-программа': '4', 'Фейс-контроль': '0', 'Ресторан': '1', 'Место для отдыха': '3', 'Предварительная запись': '0', 'Льготные билеты': '0', 'Хлеб из тандыра': '0', 'Чайная': '1', 'Печать на тортах': '0', 'барная стойка': '2', 'винная карта': '1', 'закрытие под банкет': '0', 'кулинария': '0', 'меню на английском': '1', 'DJ': '4', 'бесплатная парковка': '0', 'своя пекарня': '2', 'настольные игры': '3', 'можно с животными': '1', 'живая музыка': '4', 'устричный бар': '1', 'бранчи': '2', 'детская анимация': '0', 'танцпол': '4', 'гриль': '1', 'домашняя еда': '1', 'выпечка': '1', 'шашлыки': '1', 'круглосуточная кухня': '0', 'местоположение у воды': '3', 'бильярд': '3', 'суши и роллы': '1', 'узбекская еда': '1', 'комплексные обеды': '1', 'грузинская еда': '1', 'пицца': '1', 'можно с ноутбуком': '0', 'сладости': '1', 'здоровое питание': '1', 'осетинские пироги': '1', 'китайская еда': '1' }

        newTags = newTags.sort((a: any, b: any) => parseInt(weights[b]) - parseInt(weights[a]))
        // console.log('privet', newTags)
        // }

        }
        const emojis: any = { 'Доставка еды': '🚚', 'Еда навынос': '🥡', 'Оплата картой': '💳', 'Летняя веранда': '🌅', 'Wi-Fi': '🌐', 'Кофе с собой': '☕', 'Крафтовое пиво': '🍺', 'Предзаказ онлайн': '🌐', 'Бизнес-ланч': '🕴🏿🕴🏻', 'Подарочный сертификат': '📃', 'Завтрак': '🍳', 'Проектор': '📽', 'Настольные игры': '🎲', 'Детское меню': '👶🏻', 'Спортивные трансляции': '⚽', 'Парковка для людей с инвалидностью': '♿', 'Детская комната': '👶🏻', 'Самовывоз': '🚶‍♂', 'Доставка': '🚚', 'Лифт': '♿', 'Танцпол': '🕺🏾', 'Автоматическая дверь': '♿', 'Туалет для людей с инвалидностью': '♿', 'Караоке': '🎤', 'Пандус': '♿', 'Зарядка для телефона': '📳', 'WC': '🚾', 'Питьевая вода': '🥛', 'Бесплатная доставка': '🆓', 'Оплата счета по QR-коду': '📲', 'Чай': '☕', 'Фудкорт': '🪔', 'Бильярд': '🎱', 'Скидка на еду': '💸', 'Икорный магазин': '🟠', 'Кнопка вызова персонала': '♿', 'Доставка продуктов': '🚚', 'Парковка': '🅿', 'Шоу-программа': '💃🏼', 'Фейс-контроль': '💂‍♂', 'Ресторан': '🍴', 'Место для отдыха': '🏖', 'Предварительная запись': '📝', 'Льготные билеты': '👵', 'Хлеб из тандыра': '🍞', 'Чайная': '☕', 'Печать на тортах': '🎂', 'барная стойка': '🍸', 'винная карта': '🍷', 'закрытие под банкет': '🥂', 'кулинария': '🍽', 'меню на английском': '🇬🇧', 'DJ': '🎧', 'бесплатная парковка': '🅿', 'своя пекарня': '🥐', 'настольные игры': '🧩', 'можно с животными': '🐈', 'живая музыка': '🎷', 'устричный бар': '🦪', 'бранчи': '🧇', 'детская анимация': '👶', 'танцпол': '🕺🏾', 'гриль': '🥓', 'домашняя еда': '🥗', 'выпечка': '🥐', 'шашлыки': '🍖', 'круглосуточная кухня': '🏪', 'местоположение у воды': '🌊', 'бильярд': '🎱', 'суши и роллы': '🍣', 'узбекская еда': '🇺🇿', 'комплексные обеды': '🍴', 'грузинская еда': '🇬🇪', 'пицца': '🍕', 'можно с ноутбуком': '💻', 'сладости': '🍭', 'здоровое питание': '🥗', 'осетинские пироги': '🥧', 'китайская еда': '🇨🇳🥡' }

    //     const renderTags = ({ item }: any) => {
    //         if (item.id < newTags.length)
    //         if (emojis[newTags[item.id]] != '') {
    //             return (
    //                 <View style={styles.tag}><Text style={styles.tagText}>{emojis[newTags[item.id]["name"]]} {newTags[item.id]["name"].charAt(0).toUpperCase() + newTags[item.id]["name"].slice(1)}</Text></View>
    //             )
    //         }
    //     }

    //     const [clickedBill, setClickedBill] = useState(false);
    //     const [cusineNum, setCusineNum] = useState(cusine[0] === 'европейская' && ['домашняя', 'смешанная', 'вегетерианская', 'веганская', 'шашлык', 'славянских народов', 'континентальная', 'халяльная'].includes(cusine[1]) != true && cusine.length > 1 ? 1 : 0);
    //     const renderTags2 = ({ item }: any) => {
    //     if (item.id === 1 && cusine !== undefined) {

    //         function handleCusine() {
    //             if (cusine.length != 1){
    //                 if (cusineNum == cusine.length - 1) setCusineNum(0)
    //                 else setCusineNum(cusineNum + 1)
    //             }
    //             else setCusineNum(0)
    //         }
    //         if (cusine[cusineNum] == undefined && cusine.length != 0) setCusineNum(0);
    //         // console.log('bruhhh',  cusine, cusineNum)
    //         const kuhnya = cusine[0] == 'нет специализации' ? 'разнообразная' : cusine[cusineNum]
    //         if (cusine[cusineNum] != undefined)
    //         return (
    //             <TouchableOpacity disabled={cusine.length == 1} onPress={() => handleCusine()} activeOpacity={0.6}><View style={styles.tag}><Text style={styles.tagText}>{cusineTypes[cusine[cusineNum]]}  {kuhnya.charAt(0).toUpperCase() + kuhnya.slice(1)} кухня</Text></View></TouchableOpacity>
    //         )
    //     }
    //     else {
    //         if (features['Цены'] !== undefined && features["Средний счёт"] !== undefined)
    //         return (
    //           // <View/>
    //             <TouchableOpacity onPress={() => setClickedBill(!clickedBill)} activeOpacity={0.6}><View style={styles.tag}><Text style={styles.tagText}>{clickedBill == true ? '💸  ' + features['Средний счёт'][0] : '💸  ' + features['Цены'][0].charAt(0).toUpperCase() + features['Цены'][0].slice(1)}</Text></View></TouchableOpacity>
    //         )
    //     }
    // }

    const STORIESDATA = [
        {
          id: '1',
          title: 'Внутри',
          preview: photos['Внутри'][0],
          images: photos['Внутри']
        },
        {
          id: '2',
          title: 'Еда',
          preview: photos['Еда'][0],
          images: photos['Еда']
        },
        {
          id: '3',
          title: 'Снаружи',
          preview: photos['Снаружи'][0],
          images: photos['Снаружи']
        },
      ];
    
      const renderStories = ({ item }) => (
        <StoriesItem title={item.title} preview={item.preview} images={item.images} navigation={navigation} />
      )
    
      /// AVAILABILITY ///
    
      const availability = []
      for (const tag of newTags) {
        if (tag["name"] === 'Детское меню' || tag["name"] === 'Детская комната' || tag["name"] === 'детская анимация') {
          availability.push('👶🏻')
        }
        if (tag["name"] === 'можно с жиивотными') {
          availability.push('🐈')
        }
        if (tag["name"] === 'Парковка для людей с инвалидностью' || tag["name"] === 'Автоматическая дверь' || tag["name"] === 'Туалет для людей с инвалидностью' || tag["name"] === 'Пандус' || tag["name"] === 'Кнопка вызова персонала') {
          availability.push('♿')
        }
      }
      if (availability.length === 0) {
        availability.push('❌')
      }
    
      const renderListEvent = ({ item }) => {
        return (
          <View style={{ backgroundColor: '#1E1E1E', position: 'relative', left: '3%', alignSelf: 'flex-start', borderRadius: 15, padding: 9, zIndex: 2 }}><Text style={{ color: '#FFF', fontSize: 12, fontWeight: '400' }}>{item.id === 0 ? '31 октября' : item.id === 1 ? 'суббота' : '21:00 — 02:00'}</Text></View>
        )
      }
        const [clickedBill, setClickedBill] = useState(false);
        const [cusineNum, setCusineNum] = useState(cusine[0] === 'европейская' && ['домашняя', 'смешанная', 'вегетерианская', 'веганская', 'шашлык', 'славянских народов', 'континентальная', 'халяльная'].includes(cusine[1]) != true && cusine.length > 1 ? 1 : 0);
        
      const renderTags = ({ item }) => {
        if (item.id == 0) {
          return (
            <TouchableOpacity onPress={() => setClickedBill(!clickedBill)} activeOpacity={0.6}><View style={styles.tag}><Text style={styles.tagText}>{clickedBill == true ? '💸  ' + features['Средний счёт'][0] : '💸  ' + features['Цены'][0].charAt(0).toUpperCase() + features['Цены'][0].slice(1)}</Text></View></TouchableOpacity>
            )
        }
        const flags = {
          'европейская': '🇪🇺',
          'японская': '🇯🇵',
          'грузинская': '🇬🇪',
          'итальянская': '🇮🇹',
          'русская': '🇷🇺',
          'еврейская': '🇮🇱',
          'нет специализации': '🏳',
          'американская': '🇺🇸',
          'китайская': '🇨🇳',
          'французская': '🇫🇷',
          'вьетнамская': '🇻🇳',
          'кавказская': '🍖',
          'паназиатская': '🥡',
          'азиатская': '🥡',
          'авторская': '👨‍🍳',
          'сербская': '🇷🇸',
          'испанская': '🇪🇸',
          'турецкая': '🇹🇷',
          'восточная': '🥡',
          'корейская': '🇰🇷',
          'фьюжн': '🏁',
          'украинская': '🇺🇦',
          'морская': '🌊',
          'мясная': '🥩',
          'рыбная': '🦐',
          'домашняя': '🥞',
          'смешанная': '🏳',
          'средиземноморская': '🌯',
          'вегетерианская': '🌱',
          'шашлык': '🍖',
          'национальная': '🇷🇺',
          'международная': '🌏',
          'французская': '🇫🇷',
          'немецкая': '🇩🇪',
          'чешская': '🇨🇿',
          'узбекская': '🇺🇿',
          'азербайджанская': '🇦🇿',
          'арабская': '🇸🇦',
          'сибирская': '🥘',
          'славянских народов': '👫',
          'постная': '⛪',
          'армянская': '🇦🇲',
          'английская': '󠁧󠁢󠁥󠁮󠁧🇬🇧',
          'веганская': '🌱',
          'континентальная': '🌏',
          'татарская': '🍯',
          'индийская': '🇮🇳',
          'тайская': '🇹🇭',
          'африканская': '🌍',
          'осетинская': '🍖',
          'болгарская': '🇧🇬',
          'восточно-европейская': '🇪🇺',
          'мексиканская': '🇲🇽',
          'скандинавская': '🇩🇰🇸🇪',
          'индонезийская': '🇮🇩',
          'белорусская': '🇧🇾',
          'среднеазиатская': '🍜',
          'латиноамериканская': '🌎',
          'греческая': '🇬🇷',
          'халяльная': '🕌'
        }
    
        if (item.id === 1) {
    
            function handleCusine() {
                if (cusine.length != 1){
                    if (cusineNum == cusine.length - 1) setCusineNum(0)
                    else setCusineNum(cusineNum + 1)
                }
                else setCusineNum(0)
            }
    
            const kuhnya = cusine[0] == 'нет специализации' ? 'разнообразная' : cusine[cusineNum]
          return (
            <TouchableOpacity disabled={cusine.length == 1} onPress={() => handleCusine()} activeOpacity={0.6}><View style={styles.tag}><Text style={styles.tagText}>{cusineTypes[cusine[cusineNum]]}  {kuhnya.charAt(0).toUpperCase() + kuhnya.slice(1)} кухня</Text></View></TouchableOpacity>
            )
        }
        if (item.id == maxx + 1 && moreTags) {
          return (
            <TouchableOpacity onPress={() => setTagsListVisible(true)}><View style={{ backgroundColor: '#1E1E1E', paddingBottom: 8, position: 'relative', left: '3%', alignSelf: 'flex-start', borderRadius: 15, padding: 7, paddingRight: 10, paddingLeft: 10, marginTop: 6, zIndex: 2 }}><Text style={{ color: '#FFF' }}>ещё</Text></View></TouchableOpacity>
          )
        }
    
        if (item.id > 1) {
          return (
            <View style={{ backgroundColor: '#1E1E1E', position: 'relative', left: '3%', alignSelf: 'flex-start', borderRadius: 15, padding: 7, paddingBottom: 8, paddingRight: 14, marginTop: 6, zIndex: 2 }}><Text style={{ color: '#FFF' }}>{emojis[newTags[item.id - 2]["name"]]}   {newTags[item.id - 2]["name"].charAt(0).toUpperCase() + newTags[item.id - 2]["name"].slice(1)}</Text></View>
          )
        }
      }
    
      const renderFullTags = ({ item }) => {
        console.log(newTags)
        if (item.id > 1) {
          return (
            <View style={{ backgroundColor: '#1E1E1E', position: 'relative', left: '3%', alignSelf: 'flex-start', borderRadius: 15, padding: 7, paddingRight: 14, marginTop: 6, zIndex: 2 }}><Text style={{ color: '#FFF', fontSize: 11 }}>{emojis[newTags[item.id - 2]["name"]]}   {newTags[item.id - 2]["name"].charAt(0).toUpperCase() + newTags[item.id - 2]["name"].slice(1)}</Text></View>
          )
        }
      }
    
      /// GENERATE COOL TAGS DICT ///
    
      const tagsData = []
      var maxx = 0
      var moreTags = false
      if (newTags.length > 3) {
        maxx = 4
        moreTags = true
      }
      else {
        maxx = newTags.length
      }
      for (let i = 0; i < maxx + 2; i++) {
        tagsData.push({ id: i })
      }
      const [tagsListVisible, setTagsListVisible] = useState(false)
    
      const fullTagsData = []
      for (let i = 0; i < newTags.length + 2; i++) {
        fullTagsData.push({ id: i })
      }
    
      const link = 'https://yandex.ru/maps/?text=' + name + ' ' + adress
    
      const getItemLayout = (data, index) => {
        return {
          length: 20,
          offset: 20 * data.length,
          index,
        };
      }

    //   const link = 'https://yandex.ru/maps/?text=' + name + ' ' + adress
      const filtersInit = {
        'distance': 0,
        'prices': [],
        'tags': [],
        'activity': {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false
        },
        'cusine': null
      }

      return (
        <View style={{ flex: 1 }}>
          <ScrollView nestedScrollEnabled={true} style={{ width: '100%', backgroundColor: '#033', }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}>
            <TouchableOpacity onPress={handleBack} style={{ zIndex: 2, top: Platform.OS == 'ios' ? 36 : 6, width: 80 }}><Image style={{ scaleX: 0.25, scaleY: 0.25, left: '3%', position: 'relative', zIndex: 2 }} source={Back}></Image></TouchableOpacity>
            <Image style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 0 }} source={background} />
            {/* IMAGE */}
            <View style={{ paddingTop: Platform.OS == 'ios' ? 30 : 0, }}></View>
            <Image style={{ width: '96%', borderRadius: 20, left: '2%', marginTop: 10, objectFit: 'center', scaleX: -1, height: 400 }} source={{ uri: img }} />
            {/* <LinearGradient colors={['rgba(217, 217, 217, 0)', 'rgba(0, 0, 0, 1)']} start={{ x: 0.0, y: 0.5 }} end={{ x: 0, y: 1 }} style={{ width: '96%', height: 400, top: Platform.OS == 'ios' ? 100 : 70, left: '2%', borderRadius: 20, opacity: 0.57, position: 'absolute' }}>
              <View />
            </LinearGradient> */}
    
            {/* LIKE AND SHARE */}
            {/* <TouchableOpacity onPress={() => handleLike()} style={{ zIndex: 2 }}><View><Image style={{ zIndex: 1, left: '73%', top: 12, position: 'absolute' }} source={liked ? likeActive : like} /></View></TouchableOpacity> */}
    
    
            {/* <Share style={{ position: 'absolute', right: '10%', top: Platform.OS == 'ios' ? 510 : 480 }}></Share> */}
    
    
            {/* INFO */}
            <Text style={{ position: 'relative', color: '#FFF', fontSize: name.length > 10 ? name.length > 15 ? 18 : 20 : 22, fontWeight: '700', marginTop: 10, left: "8%", zIndex: 0, maxWidth: '75%', maxHeight: 50, marginBottom: name.length > 10 ? 15 : 0 }}>{name}</Text>
            <Text style={{ position: 'relative', color: "#FFF", marginTop: 15, fontSize: 12, width: '70%', left: "8%" }}>Ребята без паники, совсем скоро тут появится описание и будет красиво</Text>
    
            {/* TAGS */}
            <TouchableOpacity onPress={() => Linking.openURL(link)} style={{ zIndex: 2 }} >
              <View style={{ zIndex: 1, marginTop: 15, position: 'relative', backgroundColor: '#1E1E1E', left: '5%', alignSelf: 'flex-start', padding: 7, paddingRight: 14, borderRadius: 15 }}>
                <Text style={{ color: "#FFF", fontSize: 13, fontWeight: '400' }}>📍  {adress}</Text>
              </View>
            </TouchableOpacity>
            <FlatList
              // numColumns={2}
              style={{ width: '95%' }}
              contentContainerStyle={{ flex: 0.97, marginTop: 2, flexDirection: 'row', flexWrap: 'wrap', left: '5%', position: 'relative' }}
              horizontal={true}
              data={tagsData}
              renderItem={renderTags}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => (<View style={{ width: 5 }} />)}
              scrollEnabled={false}
              getItemLayout={getItemLayout}
              showsHorizontalScrollIndicator={false}
            />
    
            {/* TAGS MODAL I GUESS  */}
            <Modal
              animationType='fade'
              visible={tagsListVisible}
              transparent={true}
              onRequestClose={() => {
                setTagsListVisible(!tagsListVisible)
              }}
            >
              <TouchableOpacity onPress={() => setTagsListVisible(false)}><View style={{ width: '100%', height: '100%', zIndex: 0, opacity: 0 }} /></TouchableOpacity>
              <View style={{ position: 'absolute', width: '90%', left: '5%', marginTop: 100, borderRadius: 20, zIndex: 1, backgroundColor: '#000' }}>
                <FlatList
                  // numColumns={2}
                  style={{ width: '95%' }}
                  contentContainerStyle={{ flex: 0.95, marginTop: 10, marginBottom: 16, flexDirection: 'row', flexWrap: 'wrap', left: '5%', position: 'relative' }}
                  horizontal={true}
                  data={fullTagsData}
                  renderItem={renderFullTags}
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={() => (<View style={{ width: 5 }} />)}
                  scrollEnabled={false}
                  getItemLayout={getItemLayout}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
    
            </Modal>
    
            {/* STORIES / ACTUAL'NOE */}
            <View style={{ width: '90%', left: '6%', marginTop: 20 }}>
              <FlatList
                // numColumns={3}
                contentContainerStyle={{ alignItems: 'space-around', flex: 0.95 }}
                horizontal={true}
                data={STORIESDATA}
                renderItem={renderStories}
                getItemLayout={getItemLayout}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => (<View style={{ width: 25 }} />)}
              />
            </View>
    
    
            {/* EVENT */}
    
            <Text style={{ fontSize: 28, fontWeight: '700', color: '#FFF', left: '7%', marginTop: 20, position: 'relative' }}>События</Text>
    
            <View style={{ backgroundColor: 'rgba(30, 30, 30, 0.75)', width: '90%', left: '5%', height: 395, marginTop: 10, borderRadius: 30, border: 0, position: 'relative' }}>
              <Image style={{ width: '86%', height: 200, objectFit: 'center', borderRadius: 30, top: 20, left: '7%', position: 'relative' }} source={{ uri: photos["Еда"][0] }} />
              <Text style={{ color: 'white', left: '8%', fontSize: 22, fontWeight: '700', top: 40, position: 'relative' }}>Hellolean party</Text>
              <Text style={{ color: 'white', left: '8%', fontSize: 12, fontWeight: '400', top: 46, position: 'relative', width: '84%' }}>Вечеринка в честь хэллуина, специальные коктейли. Вход в костюмах бесплатный, а без костюма ты че э</Text>
              <FlatList
                // numColumns={3}
                contentContainerStyle={{ flex: 0.95, top: 70, left: '6%', position: 'relative' }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={[{ id: 0 }, { id: 1 }, { id: 2 }]}
                renderItem={renderListEvent}
                getItemLayout={getItemLayout}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => (<View style={{ width: 5 }} />)}
              />
            </View>
    
    
            {/* SOME SPACE */}
            <View style={{ position: 'relative', height: 30 }} />
    
          </ScrollView>
        </View>
      )
}


export default Place;