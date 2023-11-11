import './App.css';
import './checkboxes.css';
import Preview from './Preview';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import photosJson from './photos.json' // заглушка

import { Accordion, AccordionItem } from '@szhsin/react-accordion';

import { DefaultExpansion, ToggleableExpansion } from './Expansions'

import {tagsList, additional, emojis, placeTypes, cusineTypes} from './objects'

const App = () => {
  const [data, setData] = useState(null);
  const [name, setName] = useState();
  const [adress, setAdress] = useState();
  const [bill, setBill] = useState();
  const [tags, setTags] = useState();
  const [features, setFeatures] = useState();
  const [cusine, setCusine] = useState();
  const [time, setTime] = useState();
  const [phone, setPhone] = useState();
  const [photos, setPhotos] = useState(photosJson); // заглушка
  const [menu, setMenu] = useState();
  const [descr, setDescr] = useState('Российский трехэтажный концертный клуб с тремя независимыми сценами.') // заглушка
  const [link, setLink] = useState()

  const [minAvgBill, setMinAvgBill] = useState();
  const [maxAvgBill, setMaxAvgBill] = useState();
  const [minBeerBill, setMinBeerBill] = useState();
  const [maxBeerBill, setMaxBeerBill] = useState();
  const [minWineBill, setMinWineBill] = useState();
  const [maxWineBill, setMaxWineBill] = useState();
  const [minCoffeeBill, setMinCoffeeBill] = useState();
  const [maxCoffeeBill, setMaxCoffeeBill] = useState();

  const [avgBillChecked, setAvgBillChecked] = useState(true);
  const [beerBillChecked, setBeerBillChecked] = useState(true);
  const [wineBillChecked, setWineBillChecked] = useState(true);
  const [coffeeBillChecked, setCoffeeBillChecked] = useState(true);
  const [CusineChecked, setCusineChecked] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://salut.test.na4u.ru/api/place/552', {
          headers: {
            'Accept': 'application/json'
          }});
        setData(JSON.parse(response['request']['response']));
        setName(JSON.parse(response['request']['response'])["name"])
        setAdress(JSON.parse(response['request']['response'])["adress"])
        setBill(JSON.parse(response['request']['response'])["bill"])
        setTags(JSON.parse(response['request']['response'])["tags"])
        setFeatures(JSON.parse(response['request']['response'])["features"])
        setCusine(JSON.parse(response['request']['response'])["cusine"])
        setTime(JSON.parse(response['request']['response'])["time"])
        setPhone(JSON.parse(response['request']['response'])["phone"])
        // setPhotos(JSON.parse(response['request']['response'])["photos"])
        setMenu(JSON.parse(response['request']['response'])["menu"])
        setLink('https://yandex.ru/maps/?text=' + JSON.parse(response['request']['response'])["name"] + ' ' + JSON.parse(response['request']['response'])["adress"])

        // console.log('meo', response['request']['response'])
      } catch (error) {
        console.error({"error:": error})
      } 
    };

    fetchData();
  }, []);

  /*
    Саш, тут идут хендлеры полей ввода. Я сам абсолютно без понятия, что это за 
    event.target.value. Но именно для этого и нужны стейты, они меняют
    переменные в рил тайме и без перезагрузок страницы. И даже 
    при передачи стейта в другую функцию он будет сохраняться. Хук разъеба
  */

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleDescr = (event) => {
    setDescr(event.target.value);
  };

  const handleAdress = (event) => {
    setAdress(event.target.value);
  };

  const handleLink = (event) => {
    setLink(event.target.value);
  };

  const handleMinAvgBill = (event) => {
    setMinAvgBill(event.target.value);
  }

  const handleMaxAvgBill = (event) => {
    setMaxAvgBill(event.target.value);
  }

  const handleMinBeerBill = (event) => {
    setMinBeerBill(event.target.value);
  }

  const handleMaxBeerBill = (event) => {
    setMaxBeerBill(event.target.value);
  }

  const handleMinWineBill = (event) => {
    setMinWineBill(event.target.value);
  }
  
  const handleMaxWineBill = (event) => {
    setMaxWineBill(event.target.value);
  }

  const handleMinCoffeeBill = (event) => {
    setMinCoffeeBill(event.target.value);
  }

  const handleMaxCoffeeBill = (event) => {
    setMaxCoffeeBill(event.target.value);
  }

  const handleAvgBillChecked = () => {
    if (avgBillChecked) {
      setMinAvgBill("");
      setMaxAvgBill("");
    }
    setAvgBillChecked(!avgBillChecked);
  }

  const handleBeerBillChecked = () => {
    if (beerBillChecked) {
      setMinBeerBill("");
      setMaxBeerBill("");
    }
    setBeerBillChecked(!beerBillChecked);
  }

  const handleWineBillChecked = () => {
    if (wineBillChecked) {
      setMinWineBill("");
      setMaxWineBill("");
    }
    setWineBillChecked(!wineBillChecked);
  }

  const handleCoffeeBillChecked = () => {
    if (coffeeBillChecked) {
      setMinCoffeeBill("");
      setMaxCoffeeBill("");
    }
    setCoffeeBillChecked(!coffeeBillChecked);
  }
  const handleCusineChecked = () => {
    if (CusineChecked) {
      
    }
    setCoffeeBillChecked(!CusineChecked);
  }
  console.log(data)

  const handleTag = (key) => {
    if (tags.includes(key)) {
      setTags(tags.filter(item => item !== key));
    }
    else setTags(prevArray => [...prevArray, key]);
  }

  const handleCusine = (key) => {
    if (features["Кухня"].includes(key)) {
        setFeatures(prevState => ({
          ...prevState, // spread all other key-value pairs
          "Кухня": prevState["Кухня"].filter(cuisine => cuisine !== key)
        }));
    }
    else setFeatures(prevState => ({
      ...prevState, // spread all other key-value pairs
      "Кухня": [...prevState["Кухня"], key] // add new cuisine to "Кухня" array
    }));
  }

  const handleFeature = (key, majorKey) => {

  }

const renderTag = (key, list) => {
  if (tags != undefined){
    var em = list[key];
    var text = key;
    // if (tags.includes(key))
    // return (
    //   <div onClick={() => handleTag(key)} className='tag-app-active'><h3>{em} {text.charAt(0).toUpperCase() + text.slice(1)}</h3></div>
    // )
    // else if (features['Кухня'].includes(key))
    // return (
    //   <div onClick={() => handleCusine(key)} className='tag-app-active'><h3>{em} {text.charAt(0).toUpperCase() + text.slice(1)}</h3></div>
    // )
    // else
    if (!tags.includes(key))
    return (
      <div onClick={() => Object.keys(cusineTypes).includes(key) ? handleCusine(key) : handleTag(key)} className='tag-app'><h3>{em} {text.charAt(0).toUpperCase() + text.slice(1)}</h3></div>
    )
  }
}

  const renderFeature = (key, majorKey) => {
    if (features != undefined) {
      var feat = features[majorKey];
      var text = key;
      if (tags.includes(key))
      return (
        <div onClick={() => handleFeature(key, majorKey)} className='tag-app-active'><h3>{text.charAt(0).toUpperCase() + text.slice(1)}</h3></div>
      )
      else
      return (
        <div onClick={() => handleFeature(key, majorKey)} className='tag-app'><h3>{text.charAt(0).toUpperCase() + text.slice(1)}</h3></div>
      )
    }    
  }

  return (
    <div className="App">
    {data != null ? <Preview place={data} name={name} adress={adress} bill={bill} tags={tags} features={features} cusinePlace={cusine} time={time} phone={phone} photos={photos} menu={menu} descr={descr} link={link}/> : <div/>}
      <div className='fields-container'>

        <h1>Тип заведения</h1>
        <div className='tag-app-container'>
          {placeTypes.map((key) => {
            return renderFeature(key);
          })}
        </div>

        <h1>Информация</h1>
        <input className='name-field' type="text" value={name} onChange={handleName} />
        <textarea cols={20} maxLength={93} className='descr-field' type="text" value={descr} onChange={handleDescr} />

        <h1>Адрес</h1>
        <input className='name-field' type="text" value={adress} onChange={handleAdress} />
        <input style={{"marginTop": "40px"}} className='name-field' type="text" value={link} onChange={handleLink} />

        <h1>Особенности</h1>
        <Accordion transition transitionTimeout={250}>

          <div className='toggle-pill-bw'>
              <DefaultExpansion customDisabled={!avgBillChecked} header="🍴 Кухня">
              <div className='cusine-app-container'>
                {Object.keys(cusineTypes).map((key) => {
                  return renderTag(key, cusineTypes);
                })}
              </div>
            </DefaultExpansion>
            <input onChange={handleAvgBillChecked} checked={CusineChecked} type="checkbox" id='pill0' name="cusine" />
            <label for="pill0"></label>  
          </div>

          <div className='toggle-pill-bw'>
            <DefaultExpansion customDisabled={!avgBillChecked} header="💸 Средний счет">
              <h2>От</h2>
              <input disabled={!avgBillChecked} placeholder={maxAvgBill === undefined || maxAvgBill === "" ? "0" : maxAvgBill} className='name-field' type="text" value={minAvgBill} onChange={handleMinAvgBill} />
              <h2 style={{"marginLeft": "10px"}}>До</h2>
              <input disabled={!avgBillChecked} placeholder={minAvgBill === undefined || minAvgBill === "" ? "∞" : minAvgBill} className='name-field' type="text" value={maxAvgBill} onChange={handleMaxAvgBill} />
            </DefaultExpansion>
            <input onChange={handleAvgBillChecked} checked={avgBillChecked} type="checkbox" id='pill1' name="avg_bill" />
            <label for="pill1"></label>
          </div>
          
          <div className='toggle-pill-bw'>
            <DefaultExpansion customDisabled={!beerBillChecked} header="🍺 Цена бокала пива">
              <h2>От</h2>
              <input disabled={!beerBillChecked} placeholder={maxBeerBill === undefined || maxBeerBill === "" ? "0" : maxBeerBill} className='name-field' type="text" value={minBeerBill} onChange={handleMinBeerBill} />
              <h2 style={{"marginLeft": "10px"}}>До</h2>
              <input disabled={!beerBillChecked} placeholder={minBeerBill === undefined || minBeerBill === "" ? "∞" : minBeerBill} className='name-field' type="text" value={maxBeerBill} onChange={handleMaxBeerBill} />
            </DefaultExpansion>
            <input onChange={handleBeerBillChecked} checked={beerBillChecked} type="checkbox" id='pill2' name="beer_bill" />
            <label for="pill2"></label>
          </div>

          <div className='toggle-pill-bw'>
            <DefaultExpansion customDisabled={!wineBillChecked} header="🍷 Цена бокала вина">
              <h2>От</h2>
              <input disabled={!wineBillChecked} placeholder={maxWineBill === undefined || maxWineBill === "" ? "0" : maxWineBill} className='name-field' type="text" value={minWineBill} onChange={handleMinWineBill} />
              <h2 style={{"marginLeft": "10px"}}>До</h2>
              <input disabled={!wineBillChecked} placeholder={minWineBill === undefined || minWineBill === "" ? "∞" : minWineBill} className='name-field' type="text" value={maxWineBill} onChange={handleMaxWineBill} />
            </DefaultExpansion>
            <input onChange={handleWineBillChecked} checked={wineBillChecked} type="checkbox" id='pill3' name="wine_bill" />
            <label for="pill3"></label>
          </div>

          <div className='toggle-pill-bw'>
            <DefaultExpansion customDisabled={!coffeeBillChecked} header="☕ Цена чашки капучино">
              <h2>От</h2>
              <input disabled={!coffeeBillChecked} placeholder={maxCoffeeBill === undefined || maxCoffeeBill === ''  ? "0" : maxCoffeeBill} className='name-field' type="text" value={minCoffeeBill} onChange={handleMinCoffeeBill} />
              <h2 style={{"marginLeft": "10px"}}>До</h2>
              <input disabled={!coffeeBillChecked} placeholder={minCoffeeBill === undefined || minCoffeeBill === '' ? "∞" : minCoffeeBill} className='name-field' type="text" value={maxCoffeeBill} onChange={handleMaxCoffeeBill} />
            </DefaultExpansion>
            <input onChange={handleCoffeeBillChecked} checked={coffeeBillChecked} type="checkbox" id='pill4' name="coffee_bill" />
            <label for="pill4"></label>
          </div>
        </Accordion>

        <h1>Теги</h1>
        {/* <div className='tag-app-container'> */}
        {tags != undefined ? 
          <Accordion transition transitionTimeout={250}>
          <ToggleableExpansion customDisabled={!CusineChecked} keys={tags} list={tagsList} header='Нет тегов' func={setTags}>
              <div className='cusine-app-container'>
                {Object.keys(tagsList).map((key) => {
                  return renderTag(key, emojis);
                })}
              </div>
            </ToggleableExpansion>
          </Accordion> : <div/>}
        {/* </div> */}
        <h1>Дополнительная информация</h1>
        {tags != undefined ? 
        <Accordion transition transitionTimeout={250}>
          <ToggleableExpansion customDisabled={!CusineChecked} keys={tags} list={additional} header='Нет дополнительной информации' func={setTags}>
              <div className='cusine-app-container'>
                {Object.keys(additional).map((key) => {
                  return renderTag(key, emojis);
                })}
              </div>
            </ToggleableExpansion>
          </Accordion> : <div/>}
      </div>
    </div>
  );
};

export default App;
