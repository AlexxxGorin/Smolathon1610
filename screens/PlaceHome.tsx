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

import {styles} from './placeHome.styles'

const PlaceHome = (props:any) => {

    // const { profile } = useSelector(state => state.userReducer)

      useEffect(() => {
        LogBox.ignoreAllLogs();
      }, [])


      /// DATA ///
      const navigation = props.navigation
      const name = props.name
      const img = props.img
      const time = props.time
      const desc = props.desc
      const adress = props.adress
      const phone = props.phone
      const menu = props.menu
      const tags = props.tags
      const features = props.features
      const photos = props.photos
      const bkg = background
      const id = props.id
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

      function handleProfile() {
        navigation.navigate('PlaceProfile', { otherParam: { 'id': props.id, 'name': name, 'img': img, 'time': time, 'desc': desc, 'cusine': cusine, 'adress': adress, 'phone': phone, 'menu': menu, 'tags': tags, 'features': features, 'photos': photos } })
      }

      function handleFilter() {
        // navigation.navigate('Filter')
      }

      /// MANAGING FUCKING TAGS ///

      if (features !== null && tags !== null) {

        var newTags = tags

        let weights: any = { 'Доставка еды': '0', 'Еда навынос': '1', 'Оплата картой': '0', 'Летняя веранда': '4', 'Wi-Fi': '0', 'Кофе с собой': '2', 'Крафтовое пиво': '2', 'Предзаказ онлайн': '0', 'Бизнес-ланч': '1', 'Подарочный сертификат': '0', 'Завтрак': '2', 'Проектор': '3', 'Настольные игры': '3', 'Детское меню': '1', 'Спортивные трансляции': '4', 'Парковка для людей с инвалидностью': '0', 'Детская комната': '1', 'Самовывоз': '0', 'Доставка': '0', 'Лифт': '0', 'Танцпол': '4', 'Автоматическая дверь': '0', 'Туалет для людей с инвалидностью': '0', 'Караоке': '4', 'Пандус': '0', 'Зарядка для телефона': '0', 'WC': '0', 'Питьевая вода': '0', 'Бесплатная доставка': '0', 'Оплата счета по QR-коду': '0', 'Чай': '1', 'Фудкорт': '0', 'Бильярд': '3', 'Скидка на еду': '0', 'Икорный магазин': '0', 'Кнопка вызова персонала': '0', 'Доставка продуктов': '0', 'Парковка': '0', 'Шоу-программа': '4', 'Фейс-контроль': '0', 'Ресторан': '1', 'Место для отдыха': '3', 'Предварительная запись': '0', 'Льготные билеты': '0', 'Хлеб из тандыра': '0', 'Чайная': '1', 'Печать на тортах': '0', 'барная стойка': '2', 'винная карта': '1', 'закрытие под банкет': '0', 'кулинария': '0', 'меню на английском': '1', 'DJ': '4', 'бесплатная парковка': '0', 'своя пекарня': '2', 'настольные игры': '3', 'можно с животными': '1', 'живая музыка': '4', 'устричный бар': '1', 'бранчи': '2', 'детская анимация': '0', 'танцпол': '4', 'гриль': '1', 'домашняя еда': '1', 'выпечка': '1', 'шашлыки': '1', 'круглосуточная кухня': '0', 'местоположение у воды': '3', 'бильярд': '3', 'суши и роллы': '1', 'узбекская еда': '1', 'комплексные обеды': '1', 'грузинская еда': '1', 'пицца': '1', 'можно с ноутбуком': '0', 'сладости': '1', 'здоровое питание': '1', 'осетинские пироги': '1', 'китайская еда': '1' }

        newTags = newTags.sort((a: any, b: any) => parseInt(weights[b]) - parseInt(weights[a]))
        // console.log('privet', newTags)
        // }

        }
        const emojis: any = { 'Доставка еды': '🚚', 'Еда навынос': '🥡', 'Оплата картой': '💳', 'Летняя веранда': '🌅', 'Wi-Fi': '🌐', 'Кофе с собой': '☕', 'Крафтовое пиво': '🍺', 'Предзаказ онлайн': '🌐', 'Бизнес-ланч': '🕴🏿🕴🏻', 'Подарочный сертификат': '📃', 'Завтрак': '🍳', 'Проектор': '📽', 'Настольные игры': '🎲', 'Детское меню': '👶🏻', 'Спортивные трансляции': '⚽', 'Парковка для людей с инвалидностью': '♿', 'Детская комната': '👶🏻', 'Самовывоз': '🚶‍♂', 'Доставка': '🚚', 'Лифт': '♿', 'Танцпол': '🕺🏾', 'Автоматическая дверь': '♿', 'Туалет для людей с инвалидностью': '♿', 'Караоке': '🎤', 'Пандус': '♿', 'Зарядка для телефона': '📳', 'WC': '🚾', 'Питьевая вода': '🥛', 'Бесплатная доставка': '🆓', 'Оплата счета по QR-коду': '📲', 'Чай': '☕', 'Фудкорт': '🪔', 'Бильярд': '🎱', 'Скидка на еду': '💸', 'Икорный магазин': '🟠', 'Кнопка вызова персонала': '♿', 'Доставка продуктов': '🚚', 'Парковка': '🅿', 'Шоу-программа': '💃🏼', 'Фейс-контроль': '💂‍♂', 'Ресторан': '🍴', 'Место для отдыха': '🏖', 'Предварительная запись': '📝', 'Льготные билеты': '👵', 'Хлеб из тандыра': '🍞', 'Чайная': '☕', 'Печать на тортах': '🎂', 'барная стойка': '🍸', 'винная карта': '🍷', 'закрытие под банкет': '🥂', 'кулинария': '🍽', 'меню на английском': '🇬🇧', 'DJ': '🎧', 'бесплатная парковка': '🅿', 'своя пекарня': '🥐', 'настольные игры': '🧩', 'можно с животными': '🐈', 'живая музыка': '🎷', 'устричный бар': '🦪', 'бранчи': '🧇', 'детская анимация': '👶', 'танцпол': '🕺🏾', 'гриль': '🥓', 'домашняя еда': '🥗', 'выпечка': '🥐', 'шашлыки': '🍖', 'круглосуточная кухня': '🏪', 'местоположение у воды': '🌊', 'бильярд': '🎱', 'суши и роллы': '🍣', 'узбекская еда': '🇺🇿', 'комплексные обеды': '🍴', 'грузинская еда': '🇬🇪', 'пицца': '🍕', 'можно с ноутбуком': '💻', 'сладости': '🍭', 'здоровое питание': '🥗', 'осетинские пироги': '🥧', 'китайская еда': '🇨🇳🥡' }

        const renderTags = ({ item }: any) => {
            if (item.id < newTags.length)
            if (emojis[newTags[item.id]] != '') {
                return (
                    <View style={styles.tag}><Text style={styles.tagText}>{emojis[newTags[item.id]["name"]]} {newTags[item.id]["name"].charAt(0).toUpperCase() + newTags[item.id]["name"].slice(1)}</Text></View>
                )
            }
        }

        const [clickedBill, setClickedBill] = useState(false);
        const [cusineNum, setCusineNum] = useState(cusine[0] === 'европейская' && ['домашняя', 'смешанная', 'вегетерианская', 'веганская', 'шашлык', 'славянских народов', 'континентальная', 'халяльная'].includes(cusine[1]) != true && cusine.length > 1 ? 1 : 0);
        const renderTags2 = ({ item }: any) => {
        if (item.id === 1 && cusine !== undefined) {

            function handleCusine() {
                if (cusine.length != 1){
                    if (cusineNum == cusine.length - 1) setCusineNum(0)
                    else setCusineNum(cusineNum + 1)
                }
                else setCusineNum(0)
            }
            if (cusine[cusineNum] == undefined && cusine.length != 0) setCusineNum(0);
            // console.log('bruhhh',  cusine, cusineNum)
            const kuhnya = cusine[0] == 'нет специализации' ? 'разнообразная' : cusine[cusineNum]
            if (cusine[cusineNum] != undefined)
            return (
                <TouchableOpacity disabled={cusine.length == 1} onPress={() => handleCusine()} activeOpacity={0.6}><View style={styles.tag}><Text style={styles.tagText}>{cusineTypes[cusine[cusineNum]]}  {kuhnya.charAt(0).toUpperCase() + kuhnya.slice(1)} кухня</Text></View></TouchableOpacity>
            )
        }
        else {
            if (features['Цены'] !== undefined && features["Средний счёт"] !== undefined)
            return (
              // <View/>
                <TouchableOpacity onPress={() => setClickedBill(!clickedBill)} activeOpacity={0.6}><View style={styles.tag}><Text style={styles.tagText}>{clickedBill == true ? '💸  ' + features['Средний счёт'][0] : '💸  ' + features['Цены'][0].charAt(0).toUpperCase() + features['Цены'][0].slice(1)}</Text></View></TouchableOpacity>
            )
        }
    }

      const getItemLayout = (data: string | any[], index: any) => {
        return {
          length: 20,
          offset: 20 * data.length,
          index,
        };
      }

      const link = 'https://yandex.ru/maps/?text=' + name + ' ' + adress
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
        <View style={styles.container}>
          <View style={{ width: 'auto', height: '100%' }}>
            <Image style={styles.background} source={background} />
            <TouchableOpacity onPress={() => handleFilter()} style={{ zIndex: 6 }}><View style={styles.filter}><Text style={styles.filterText}>фильтр</Text></View></TouchableOpacity>
            {/* <Salut style={{position: 'absolute', top: 50, alignSelf: 'center'}}></Salut> */}
            <TouchableOpacity onPress={() => handleFilter()} style={{ zIndex: 2 }}><View style={styles.more}><Text style={styles.moreText}>...</Text></View></TouchableOpacity>

            <TouchableOpacity activeOpacity={1}  onPress={() => handleProfile()}  style={{ zIndex: 2 }}>
              <View style={styles.infoContainer}>
                <View style={styles.coverContainer}>
                    <Image style={styles.cover} source={{ uri: img }} />
                    {/* <LinearGradient colors={['rgba(217, 217, 217, 0)', 'rgba(0, 0, 0, 1)']} start={{ x: 0.0, y: 0.5 }} end={{ x: 0, y: 1 }} style={{ position: 'absolute', width: '94%', height: 370, left: '3%', borderRadius: 20, opacity: 0.57 }}>
                      <View />
                    </LinearGradient> */}
                </View>

                <Text style={{ position: 'relative', color: '#FFF', fontSize: name.length > 10 ? name.length > 15 ? 20 : 32 : 38, fontWeight: '700', marginTop: 10, maxHeight: 50, left: "5%", zIndex: 0, maxWidth: '75%', marginBottom: name.length > 10 ? 15 : 0 }}>{name}</Text>
                <Text style={styles.descr}>Ребята без паники, совсем скоро тут появится описание и будет красиво</Text>
                <Text style={styles.time}>{time['Понедельник']}</Text>
                </View>
            </TouchableOpacity>

            {/* CUSINE AND ADRESS */}

            <FlatList
              // numColumns={3}
              contentContainerStyle={styles.tagContainer}
              horizontal={true}
              style={{ flexGrow: 0 }}
              data={[{ id: 0 }, { id: 1 }]}
              renderItem={renderTags}
              getItemLayout={getItemLayout}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => (<View style={{ width: 5 }} />)}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
            />
            <FlatList
              // numColumns={3}
              contentContainerStyle={styles.tagContainer}
              horizontal={true}
              style={{ flexGrow: 0 }}
              data={[{ id: 0 }, { id: 1 }]}
              renderItem={renderTags2}
              getItemLayout={getItemLayout}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => (<View style={{ width: 5 }} />)}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.address}>
              <TouchableOpacity onPress={() => Linking.openURL(link)} >
                <Text style={styles.addressText}>📍  {adress}</Text>
              </TouchableOpacity>
            </View>

          </View>


          {/* TAGS */}
          {/* <View style={{color: "#FFF", top: '-72.5%', fontSize: 14, left: '6%', backgroundColor: '#1A1A1A', maxHeight: '5%', maxWidth: '45%', borderRadius: 15}}><Image style={{top: '10%', left: '5%', scaleX: 0.75, scaleY: 0.75}} source={music}/><Text style={{fontWeight: '300', color: "#FFF", top: '-55%', left: (39 - tags[0].length).toString() +'%'}}>{tags[0]}</Text></View> */}
          {/* <View style={{color: "#FFF", top: '-71.5%', fontSize: 14, left: '6%', backgroundColor: '#1A1A1A', maxHeight: '5%', maxWidth: '45%', borderRadius: 15}}><Image style={{top: '10%', left: '5%', scaleX: 0.75, scaleY: 0.75}} source={veranda}/><Text style={{fontWeight: '300', color: "#FFF", top: '-55%', left: (39 - tags[1].length).toString() +'%'}}>{tags[0]}</Text></View> */}
        </View>

      )
}


export default PlaceHome;