import { useEffect, useState } from 'react';
import './CreateEvents.css';
import { useParams } from 'react-router-dom';
import { bruh } from './objects'
import axios from 'axios';
import EventsPreview from './EventsPreview';

import photosJson from './photos.json' //заглушка

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function CreateEvents() {
  let { id } = useParams();

  const [data, setData] = useState(null);
  
  const [name, setName] = useState()
  const [descr, setDescr] = useState()
  const [timeStart, setTimeStart] = useState()
  const [timeEnd, setTimeEnd] = useState()
  const [price, setPrice] = useState()
  const [photos, setPhotos] = useState();
  const [events, setEvents] = useState({
    "name": name,
    "description": descr,
    "price": price,
    "date_time_start": timeStart,
    "date_time_end": timeEnd,
    "photos": photos
  })

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://92.53.105.117:8080/place/get?id=${id}`, {
        //   headers: {
        //     'Accept': 'application/json',
        //     // 'Access-Control-Allow-Origin': '*'
        //   }});
        
        // setEvents(JSON.parse(response['request']['response'])['events'])
        // let photos_raw = JSON.parse(response['request']['response'])["photos"];
        
        console.log(bruh["events"][""])
        setPhotos();

      } catch (error) {
        console.error({"error:" : error})
      } 
    };

    fetchData();
  }, [id]) 


  const handleName = (event) => {
    setName(event.target.value);
    setEvents({
      "name": event.target.value,
      "description": descr,
      "price": price,
      "date_time_start": timeStart,
      "date_time_end": timeEnd,
      "photos": photos
    });
    console.log(events)
  };

  const handleDescr = (event) => {
    setDescr(event.target.value);
    setEvents({
      "name": name,
      "description": event.target.value,
      "price": price,
      "date_time_start": timeStart,
      "date_time_end": timeEnd,
      "photos": photos
    });
  };

  const handleTimeStart = (event) => {
    setTimeStart(event.target.value);
    setEvents({
      "name": name,
      "description": descr,
      "price": price,
      "date_time_start": event.target.value,
      "date_time_end": timeEnd,
      "photos": photos
    });
  };

  const handleTimeEnd = (event) => {
    setTimeEnd(event.target.value);
    console.log(event.target.value)
    setEvents({
      "name": name,
      "description": descr,
      "price": price,
      "date_time_start": timeStart,
      "date_time_end": event.target.value,
      "photos": photos
    });
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
    setEvents({
      "name": name,
      "description": descr,
      "price": event.target.value,
      "date_time_start": timeStart,
      "date_time_end": timeEnd,
      "photos": photos
    });
  };


  
  return (
    <div className="CreateApp">
    {events != undefined ? <EventsPreview events={events}/> : <div/>}
      <div className='create-fields-container'>
        <h1>Добавить событие</h1>

        <h1>Название</h1>
        <input className='create-name-field' type="text" value={name} onChange={handleName} /> 

        <h1>Описание</h1>
        <textarea cols={20} maxLength={170} className='create-descr-field' type="text" value={descr} onChange={handleDescr} />

        <h1>Цена</h1>
        <input className='create-price-field' type="text" value={price} onChange={handlePrice} />
        

        <h1>Обложка</h1>
        {/* {photos !== undefined ?  */}
            <div className='create-covers'>
              <img src={"https://cdn.culture.ru/images/34be34b4-3a84-5978-9763-15318fa953b3/w_884,h_442,c_fill,g_center/3b7b31502cad5a1e16f81adda34d25c3-jpg.webp"}/>

              <div className='create-covers-add'>
                <h2>+</h2>
              </div>
            </div>
          {/* : <div/>} */}
          {/* <input type="file" onChange={handleFileChange} accept="image/*" />
          {imageSrc && <img src={imageSrc} alt="Uploaded" />} */}
        
        

        <h1>Дата начала</h1>
        <input className='create-price-field' type="text" value={timeStart} onChange={handleTimeStart} />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer  components={['DateTimePicker']}>
              <DateTimePicker 
              value={timeStart} 
              onChange={(newValue) => setTimeStart(newValue)} 
              className='dt-p' label="Введите дату начала события" />
            </DemoContainer>
        </LocalizationProvider> */}
          
        

        <h1>Дата окончания</h1>
        <input className='create-price-field' type="text" value={timeEnd} onChange={handleTimeEnd} />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker 
            className='dt-p' 
            value={timeEnd} 
            onChange={(newValue) => setTimeEnd(newValue)} 
            label="Введите дату окончания события" />
          </DemoContainer>
        </LocalizationProvider> */}

        <div className='empty-div'></div>
      </div>
    </div>
    
  );
}