import './Preview.css';
import background from './assets/background1.png'
import { useState, useEffect } from 'react';
import { cusineTypes } from './objects';

import { interactiveBill } from './objects';
import Stories from './Stories';
import { styled, Box } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


    

function Preview({ place, name, adress, bill, tags, features, cusinePlace, time, photos, phone, menu, descr, link, events }) {
    
    const [open, setOpen] = useState(false);
    const handleOpen = (typ) => {setOpen(true); setModalType(typ)}
    const handleClose = () => setOpen(false);
    const [modalType, setModalType] = useState('')
    // place = JSON.parse(place);

    const cusine = features["Кухня"];
    const [billNum, setBillNum] = useState(0);
    const [cusineNum, setCusineNum] = useState(cusine !== undefined && cusine.length > 0 ? cusine[0] === 'европейская' && ['домашняя', 'смешанная', 'вегетерианская', 'веганская', 'шашлык', 'славянских народов', 'континентальная', 'халяльная'].includes(cusine[1]) != true && cusine.length > 1 ? 1 : 0:0);
    // let billPages = ['Цена', 'Средний счёт', 'Цена бокала пива', 'Цена бокала вина', 'Цена чашки капучино'].map(b => {
    //     return Object.keys(features).map(feat => )
    // })

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

        let weights = { 'Доставка еды': '0', 'Еда навынос': '1', 'Оплата картой': '0', 'Летняя веранда': '4', 'Wi-Fi': '0', 'Кофе с собой': '2', 'Крафтовое пиво': '2', 'Предзаказ онлайн': '0', 'Бизнес-ланч': '1', 'Подарочный сертификат': '0', 'Завтрак': '2', 'Проектор': '3', 'Настольные игры': '3', 'Детское меню': '1', 'Спортивные трансляции': '4', 'Парковка для людей с инвалидностью': '0', 'Детская комната': '1', 'Самовывоз': '0', 'Доставка': '0', 'Лифт': '0', 'Танцпол': '4', 'Автоматическая дверь': '0', 'Туалет для людей с инвалидностью': '0', 'Караоке': '4', 'Пандус': '0', 'Зарядка для телефона': '0', 'WC': '0', 'Питьевая вода': '0', 'Бесплатная доставка': '0', 'Оплата счета по QR-коду': '0', 'Чай': '1', 'Фудкорт': '0', 'Бильярд': '3', 'Скидка на еду': '0', 'Икорный магазин': '0', 'Кнопка вызова персонала': '0', 'Доставка продуктов': '0', 'Парковка': '0', 'Шоу-программа': '4', 'Фейс-контроль': '0', 'Ресторан': '1', 'Место для отдыха': '3', 'Предварительная запись': '0', 'Льготные билеты': '0', 'Хлеб из тандыра': '0', 'Чайная': '1', 'Печать на тортах': '0', 'Барная стойка': '2', 'Винная карта': '1', 'Закрытие под банкет': '0', 'Кулинария': '0', 'Меню на английском': '1', 'DJ': '4', 'Бесплатная парковка': '0', 'Своя пекарня': '2', 'Настольные игры': '3', 'Можно с животными': '1', 'Живая музыка': '4', 'Устричный бар': '1', 'Бранчи': '2', 'Детская анимация': '0', 'Танцпол': '4', 'Гриль': '1', 'Домашняя еда': '1', 'Выпечка': '1', 'Шашлыки': '1', 'Круглосуточная кухня': '0', 'Местоположение у воды': '3', 'Бильярд': '3', 'Суши и роллы': '1', 'Узбекская еда': '1', 'Комплексные обеды': '1', 'Грузинская еда': '1', 'Пицца': '1', 'Можно с ноутбуком': '0', 'Сладости': '1', 'Здоровое питание': '1', 'Осетинские пироги': '1', 'Китайская еда': '1' }

        newTags = newTags.sort((a, b) => parseInt(weights[b['name']]) - parseInt(weights[a['name']]))
        // }

        const emojis = { 'Доставка еды': '🚚', 'Еда навынос': '🥡', 'Оплата картой': '💳', 'Летняя веранда': '🌅', 'Wi-Fi': '🌐', 'Кофе с собой': '☕', 'Крафтовое пиво': '🍺', 'Предзаказ онлайн': '🌐', 'Бизнес-ланч': '🕴🏿🕴🏻', 'Подарочный сертификат': '📃', 'Завтрак': '🍳', 'Проектор': '📽', 'Настольные игры': '🎲', 'Детское меню': '👶🏻', 'Спортивные трансляции': '⚽', 'Парковка для людей с инвалидностью': '♿', 'Детская комната': '👶🏻', 'Самовывоз': '🚶‍♂', 'Доставка': '🚚', 'Лифт': '♿', 'Танцпол': '🕺🏾', 'Автоматическая дверь': '♿', 'Туалет для людей с инвалидностью': '♿', 'Караоке': '🎤', 'Пандус': '♿', 'Зарядка для телефона': '📳', 'WC': '🚾', 'Питьевая вода': '🥛', 'Бесплатная доставка': '🆓', 'Оплата счета по QR-коду': '📲', 'Чай': '☕', 'Фудкорт': '🪔', 'Бильярд': '🎱', 'Скидка на еду': '💸', 'Икорный магазин': '🟠', 'Кнопка вызова персонала': '♿', 'Доставка продуктов': '🚚', 'Парковка': '🅿', 'Шоу-программа': '💃🏼', 'Фейс-контроль': '💂‍♂', 'Ресторан': '🍴', 'Место для отдыха': '🏖', 'Предварительная запись': '📝', 'Льготные билеты': '👵', 'Хлеб из тандыра': '🍞', 'Чайная': '☕', 'Печать на тортах': '🎂', 'Барная стойка': '🍸', 'Винная карта': '🍷', 'Закрытие под банкет': '🥂', 'Кулинария': '🍽', 'Меню на английском': '🇬🇧', 'DJ': '🎧', 'Бесплатная парковка': '🅿', 'Своя пекарня': '🥐', 'Настольные игры': '🧩', 'Можно с животными': '🐈', 'Живая музыка': '🎷', 'Устричный бар': '🦪', 'Бранчи': '🧇', 'Детская анимация': '👶', 'танцпол': '🕺🏾', 'Гриль': '🥓', 'Домашняя еда': '🥗', 'Выпечка': '🥐', 'Шашлыки': '🍖', 'Круглосуточная кухня': '🏪', 'Местоположение у воды': '🌊', 'Бильярд': '🎱', 'Суши и роллы': '🍣', 'Узбекская еда': '🇺🇿', 'Комплексные обеды': '🍴', 'Грузинская еда': '🇬🇪', 'Пицца': '🍕', 'Можно с ноутбуком': '💻', 'Сладости': '🍭', 'Здоровое питание': '🥗', 'Осетинские пироги': '🥧', 'Китайская еда': '🇨🇳🥡' }

        const renderTags = ({ item }) => {
            if (item < newTags.length)
            if (emojis[newTags[item]] != '') {
                return (
                    <div className='tag'><h3>{emojis[newTags[item]["name"]]} {newTags[item]["name"].charAt(0).toUpperCase() + newTags[item]["name"].slice(1)}</h3></div>
                )
            }
        }

        const renderTags2 = ({ item }) => {
            if (item === 1 && cusine !== undefined) {

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
                    <div disabled={cusine.length == 1} onClick={() => handleCusine()}><div className='tag'><h3>{cusineTypes[cusine[cusineNum]]}  {kuhnya.charAt(0).toUpperCase() + kuhnya.slice(1)} кухня</h3></div></div>
                )
            }
            else {
                function handleBillNum() {
                    if (billNum == 4) setBillNum(0)
                    else {
                        let newBill = billNum;
                        let flag = false;
                        while (newBill< 4) {
                            newBill += 1
                            if (Object.keys(features).includes(Object.keys(interactiveBill)[newBill])){
                                flag = true;
                                break;
                            }
                        }
                        if (flag) setBillNum(newBill);
                        else setBillNum(0);
                    }
                }
                if (Object.keys(features).filter(element => Object.keys(interactiveBill).includes(element)).length > 0){
                    if (Object.keys(features).includes(Object.keys(interactiveBill)[billNum]))
                    return(<div onClick={() => handleBillNum()}><div className='tag'><h3>{Object.values(interactiveBill)[billNum]} {features[Object.keys(interactiveBill)[billNum]][0]}</h3></div></div>)
                    else handleBillNum();
                } 
            }
        }

        const imageLinks = [photos["Внутри"][0], photos["Внутри"][1], photos["Внутри"][2]]
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            arrows: false
        };

        return (
            <div className="preview">
                <div>
                    <Modal
                        aria-labelledby="unstyled-modal-title"
                        aria-describedby="unstyled-modal-description"
                        open={open}
                        onClose={handleClose}
                        //slots={{ backdrop: StyledBackdrop }}
                    >
                        <ModalContent sx={style}>
                            {modalType !== '' ?
                            <Stories typ={modalType} pho={photos} func={handleClose}/>
                            : <div/>}
                        {/* <h3 id="unstyled-modal-title" className="modal-title">
                            {modalType}
                        </h3>
                        <p id="unstyled-modal-description" className="modal-description">
                            Aliquid amet deserunt earum!
                        </p> */}
                        </ModalContent>
                    </Modal>
                </div>

                {photos !== undefined ?
                <Slider {...settings}>
                    {photos['covers'].map((link, index) => (
                        <div key={index}>
                        <img src={link} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </Slider> : <div/> }

                <h1>{name}</h1>
                <h2>{descr}</h2>
                <div className='tag-container'>
                    {renderTags({ item: 0 })}
                    {renderTags({ item: 1 })}
                    {renderTags({ item: 2 })}
                {/* </div>
                <div className='tag-container'> */}
                    {renderTags2({item: 0})}
                    {renderTags2({item: 1})}
                    <a target='_blank' href={link}><div className='tag'><h3>📍 {adress}</h3></div></a>
                </div>

                <div className='stories-container'>
                    {Object.keys(photos).map(key => {
                        if (key !== 'Все' && key !== 'Видео')
                        return(
                            <div className='story'>
                                <img onClick={() => handleOpen(key)} src={photos[key][0]}/>
                                <h3>{key}</h3>
                            </div>
                        )
                    })}
                </div>

                <div className='event-conteiner'>
                    {events !== undefined ? events.map(key => {
                        return(
                            <div className='event'>
                                <img src={ key["photos"][0] }/>
                                <h3 className='event-name' >{key["name"]}</h3>
                                <h3 className='event-description'>{key["description"]}</h3>
                                <div className='buttons'>
<                                   div className='event-price'>{key["entry_price"]} ₽</div>
                                    <div className='event-time'>{key["date_time_start"]} - {key["date_time_end"]}</div>
                                </div>
                                
                            </div>
                        )
                    }) : <div/>}
                    
                </div>
                <div className='empty-div'></div>
            </div>
        );
    }
}

const style = {
    width: '450px',
    padding: '0px',
    outline: '0px',
    border: '0px'
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};


const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(Box)(
    ({ theme }) => `
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    height: 100vh;
    width: 450px;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 4px 12px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.20)'
    };
    padding: 1rem;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
  
  
    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-right: 0.5rem;
    }
  
    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
    }
    `,
);
  

const TriggerButton = styled('button')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  `,
);

export default Preview;
