import './App.css';
import './checkboxes.css';
//import Preview from './Preview';

import React, { useState, useEffect} from 'react';
import axios from 'axios';
import photosJson from './photos.json' // заглушка

import { Accordion, AccordionItem } from '@szhsin/react-accordion';

import { DefaultExpansion, ToggleableExpansion, FeaturesExpansion } from './Expansions'

import {tagsList, additional, emojis, placeTypes, cusineTypes} from './objects'

import { HashRouter, Routes, Route, Switch, useParams } from 'react-router-dom';

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function App() {
  return (
    // <HashRouter basename="/app">
      <Routes>
        <Route path="/constructor/:id" exact element={<Constructor/>} />
      </Routes>
      // </HashRouter>
  );
}


const Constructor = () => {

  let { id } = useParams();
  
  const [data, setData] = useState(null);
  const [name, setName] = useState();
  const [adress, setAdress] = useState();
  const [bill, setBill] = useState();
  const [tags, setTags] = useState();
  const [features, setFeatures] = useState();
  const [cusine, setCusine] = useState();
  const [time, setTime] = useState();
  const [phone, setPhone] = useState();
  const [photos, setPhotos] = useState();
  const [menu, setMenu] = useState();
  const [descr, setDescr] = useState() // заглушка
  const [link, setLink] = useState()
  const [events, setEvents] = useState()

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
        const response = await axios.get(`http://92.53.105.117:8080/place/get?id=${id}`, {
          headers: {
            'Accept': 'application/json',
            // 'Access-Control-Allow-Origin': '*'
          }});
        setData(JSON.parse(response['request']['response']));
        setName(JSON.parse(response['request']['response'])["name"])
        setAdress(JSON.parse(response['request']['response'])["address"])
        setDescr(JSON.parse(response['request']['response'])['description'])
        // setBill(JSON.parse(response['request']['response'])["bill"])
        setTags(JSON.parse(response['request']['response'])["tags"])
        // setCusine(JSON.parse(response['request']['response'])["cusine"])
        setTime(JSON.parse(response['request']['response'])["time"])
        setPhone(JSON.parse(response['request']['response'])["phone"])
        let photos_raw = JSON.parse(response['request']['response'])["photos"];
        // setPhotos(JSON.parse(response['request']['response'])["photos"])
        setMenu(JSON.parse(response['request']['response'])["menu"])
        setLink('https://yandex.ru/maps/?text=' + JSON.parse(response['request']['response'])["name"] + ' ' + JSON.parse(response['request']['response'])["adress"])
        setEvents(JSON.parse(response['request']['response'])['events'])
        

        let feat = JSON.parse(response['request']['response'])["features"]
        setFeatures(feat)
        if (feat !== undefined){
          if (Object.keys(feat).includes('Средний счёт')) {
            if (feat['Средний счёт'][0].includes('–')){        
              setMinAvgBill(parseInt(feat['Средний счёт'][0].split('–')[0]));
              setMaxAvgBill(parseInt(feat['Средний счёт'][0].split('–')[1].slice(0, -1)));
            }
          }
          if (Object.keys(feat).includes('Цена бокала пива')) {
            if (feat['Цена бокала пива'][0].includes('–')){        
              setMinBeerBill(parseInt(feat['Цена бокала пива'][0].split('–')[0]));
              setMaxBeerBill(parseInt(feat['Цена бокала пива'][0].split('–')[1].slice(0, -1)));
            }
          }
          if (Object.keys(feat).includes('Цена бокала вина')) {
            if (feat['Цена бокала вина'][0].includes('–')){        
              setMinWineBill(parseInt(feat['Цена бокала вина'][0].split('–')[0]));
              setMaxWineBill(parseInt(feat['Цена бокала вина'][0].split('–')[1].slice(0, -1)));
            }
          }
          if (Object.keys(feat).includes('Цена чашки капучино')) {
            if (feat['Цена чашки капучино'][0].includes('–')){        
              setMinCoffeeBill(parseInt(feat['Цена чашки капучино'][0].split('–')[0]));
              setMaxCoffeeBill(parseInt(feat['Цена чашки капучино'][0].split('–')[1].slice(0, -1)));
            }
          }
        }
        if (!Object.keys(photos_raw).includes('covers')) {
          photos_raw['covers'] = [photos_raw['Внутри'][0], photos_raw['Внутри'][1], photos_raw['Внутри'][2]]
        }
        setPhotos(photos_raw);

        // console.log('meo', response['request']['response'])
      } catch (error) {
        console.error({"error:": error})
      } 
    };

    fetchData();
    
    
  }, [id]);

  /*
    Саш, тут идут хендлеры полей ввода. Я сам абсолютно без понятия, что это за 
    event.target.value. Но именно для этого и нужны стейты, они меняют
    переменные в рил тайме и без перезагрузок страницы. И даже 
    при передачи стейта в другую функцию он будет сохраняться. Хук
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
    let fin = ''
    if (maxAvgBill == undefined || maxAvgBill == '' || parseInt(event.target.value) == parseInt(maxAvgBill)) fin = event.target.value.toString() + '₽'
    else if (event.target.value == '') fin = maxAvgBill.toString() + '₽'
    else fin = `${event.target.value}–${maxAvgBill}₽`
    if (fin !== '₽')
    setFeatures(prevMyData => ({
      ...prevMyData,
      ['Средний счёт']: [fin],
    }));
    else setFeatures(prevState => {
      const {['Средний счёт']: _, ...newState} = prevState;
      return newState;
    });
  }

  const handleMaxAvgBill = (event) => {
    setMaxAvgBill(event.target.value);
    let fin = ''
    if (minAvgBill == undefined || minAvgBill == '' || parseInt(minAvgBill) == parseInt(event.target.value)) fin = event.target.value.toString() + '₽'
    else if (event.target.value == '') fin = minAvgBill.toString() + '₽'
    else fin = `${minAvgBill}–${event.target.value}₽`
    if (fin !== '₽')
    setFeatures(prevMyData => ({
      ...prevMyData,
      ['Средний счёт']: [fin],
    }));
    else setFeatures(prevState => {
      const {['Средний счёт']: _, ...newState} = prevState;
      return newState;
    });
  }

  const handleMinBeerBill = (event) => {
    setMinBeerBill(event.target.value);
    let fin = ''
    if (maxBeerBill == undefined || maxBeerBill == '' || parseInt(event.target.value) == parseInt(maxBeerBill)) fin = event.target.value.toString() + '₽'
    else if (event.target.value == '') fin = maxBeerBill.toString() + '₽'
    else fin = `${event.target.value}–${maxBeerBill}₽`
    if (fin !== '₽')
    setFeatures(prevMyData => ({
      ...prevMyData,
      ['Цена бокала пива']: [fin],
    }));
    else setFeatures(prevState => {
      const {['Цена бокала пива']: _, ...newState} = prevState;
      return newState;
    });
  }

  const handleMaxBeerBill = (event) => {
    setMaxBeerBill(event.target.value);
    let fin = ''
    if (minBeerBill == undefined || minBeerBill == '' || parseInt(minBeerBill) == parseInt(event.target.value)) fin = event.target.value.toString() + '₽'
    else if (event.target.value == '') fin = minBeerBill.toString() + '₽'
    else fin = `${minBeerBill}–${event.target.value}₽`
    if (fin !== '₽')
    setFeatures(prevMyData => ({
      ...prevMyData,
      ['Цена бокала пива']: [fin],
    }));
    else setFeatures(prevState => {
      const {['Цена бокала пива']: _, ...newState} = prevState;
      return newState;
    });
  }

  const handleMinWineBill = (event) => {
    setMinWineBill(event.target.value);
    let fin = ''
    if (maxWineBill == undefined || maxWineBill == '' || parseInt(event.target.value) == parseInt(maxWineBill)) fin = event.target.value.toString() + '₽'
    else if (event.target.value == '') fin = maxWineBill.toString() + '₽'
    else fin = `${event.target.value}–${maxWineBill}₽`
    if (fin !== '₽')
    setFeatures(prevMyData => ({
      ...prevMyData,
      ['Цена бокала вина']: [fin],
    }));
    else setFeatures(prevState => {
      const {['Цена бокала вина']: _, ...newState} = prevState;
      return newState;
    });
  }
  
  const handleMaxWineBill = (event) => {
    setMaxWineBill(event.target.value);
    let fin = ''
    if (minWineBill == undefined || minWineBill == '' || parseInt(minWineBill) == parseInt(event.target.value)) fin = event.target.value.toString() + '₽'
    else if (event.target.value == '') fin = minWineBill.toString() + '₽'
    else fin = `${minWineBill}–${event.target.value}₽`
    if (fin !== '₽')
    setFeatures(prevMyData => ({
      ...prevMyData,
      ['Цена бокала вина']: [fin],
    }));
    else setFeatures(prevState => {
      const {['Цена бокала вина']: _, ...newState} = prevState;
      return newState;
    });
  }

  const handleMinCoffeeBill = (event) => {
    setMinCoffeeBill(event.target.value);
    let fin = ''
    if (maxCoffeeBill == undefined || maxCoffeeBill == '' || parseInt(event.target.value) == parseInt(maxCoffeeBill)) fin = event.target.value.toString() + '₽'
    else if (event.target.value == '') fin = maxCoffeeBill.toString() + '₽'
    else fin = `${event.target.value}–${maxCoffeeBill}₽`
    if (fin !== '₽')
    setFeatures(prevMyData => ({
      ...prevMyData,
      ['Цена чашки капучино']: [fin],
    }));
    else setFeatures(prevState => {
      const {['Цена чашки капучино']: _, ...newState} = prevState;
      return newState;
    });
  }

  const handleMaxCoffeeBill = (event) => {
    setMaxCoffeeBill(event.target.value);
    let fin = ''
    if (minCoffeeBill == undefined || minCoffeeBill == '' || parseInt(minCoffeeBill) == parseInt(event.target.value)) fin = event.target.value.toString() + '₽'
    else if (event.target.value == '') fin = minCoffeeBill.toString() + '₽'
    else fin = `${minCoffeeBill}–${event.target.value}₽`
    if (fin !== '₽')
    setFeatures(prevMyData => ({
      ...prevMyData,
      ['Цена чашки капучино']: [fin],
    }));
    else setFeatures(prevState => {
      const {['Цена чашки капучино']: _, ...newState} = prevState;
      return newState;
    });
  }

  const handleAvgBillChecked = () => {
    if (avgBillChecked) {
      setMinAvgBill("");
      setMaxAvgBill("");
      setFeatures(prevState => {
        const {['Средний счёт']: _, ...newState} = prevState;
        return newState;
      });
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
    setCusineChecked(!CusineChecked);
  }
  // console.log(data)

  const handleTag = (key) => {
    if (tags.includes(key)) {
      setTags(tags.filter(item => item !== key));
    }
    else setTags(prevArray => [...prevArray, {"name": key, "weight": null, "id": 0}]);
    // console.log(tags)
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
    if (Object.keys(features).includes(majorKey))
    setFeatures(prevMyData => ({
      ...prevMyData,
      [majorKey]: [...prevMyData[majorKey], key],
    }));
    else setFeatures(prevMyData => ({
      ...prevMyData,
      [majorKey]: [key],
    }));
  }

const renderTag = (key, list) => {
  if (tags != undefined){
    var em = list[key];
    var text = key;
    if (!tags.some(item => item["name"] === key))
    return (
      <div onClick={() => handleTag(key)} className='tag-app'><h3>{em} {text.charAt(0).toUpperCase() + text.slice(1)}</h3></div>
    )
  }
}

  const renderFeature = (key, majorKey) => {
    // console.log('ha', majorKey, key)
    if (features != undefined) {
      if (Object.keys(features).includes(majorKey)){
        var feat = features[majorKey];
        var text = key;
        if (!feat.includes(key))
        return (
          <div onClick={() => handleFeature(key, majorKey)} className='tag-app'><h3>{text.charAt(0).toUpperCase() + text.slice(1)}</h3></div>
        )
      }
      else return (
        <div onClick={() => handleFeature(key, majorKey)} className='tag-app'><h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3></div>
      )
      
    }    
  }


  /// HERE I HANDLE IMAGES ///
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        console.log(e.target.result)
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
    {data != null ? <Preview place={data} name={name} adress={adress} bill={bill} tags={tags} features={features} cusinePlace={cusine} time={time} phone={phone} photos={photos} menu={menu} descr={descr} link={link}/> : <div/>}
      <div className='fields-container'>

        <h1>Тип заведения</h1>
          {features != undefined ? 
            <Accordion transition transitionTimeout={250}>
              <FeaturesExpansion customDisabled={!CusineChecked} keys={features} list={placeTypes} typ={"Тип заведения"} header='Не указан тип' func={setFeatures}>
                <div className='cusine-app-container'>
                  {placeTypes.map((key) => {
                    return renderFeature(key, "Тип заведения");
                  })}
                </div>
              </FeaturesExpansion>
            </Accordion> : <div/>}
        

        <h1>Обложка</h1>
          {photos !== undefined ? 
            <div className='covers'>
              {photos['covers'].map(img => {
                return <img src={img}/>
              })}
              <div className='covers-add'>
                <h2>+</h2>
              </div>
            </div>
          : <div/>}
          {/* <input type="file" onChange={handleFileChange} accept="image/*" />
          {imageSrc && <img src={imageSrc} alt="Uploaded" />} */}
        
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
                {features != undefined ? 
                  <Accordion transition transitionTimeout={250}>
                  <FeaturesExpansion customDisabled={!CusineChecked} keys={features} list={cusineTypes} typ={"Кухня"} header='Нет специали' func={setFeatures}>
                      <div className='cusine-app-container'>
                        {Object.keys(cusineTypes).map((key) => {
                          return renderFeature(key, "Кухня");
                        })}
                      </div>
                    </FeaturesExpansion>
                  </Accordion> : <div/>}
              </div>
            </DefaultExpansion>
            <input onChange={handleCusineChecked} checked={CusineChecked} type="checkbox" id='pill0' name="cusine" />
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

        <h1>События</h1>
        {/* <input className='name-field' type="text" value="Введите название события" onChange={handleName} />
        <textarea cols={20} maxLength={300} className='descr-field' type="text" value="Введите описание события" onChange={handleDescr} /> */}

      </div>
    </div>
  );
};

export default App;
