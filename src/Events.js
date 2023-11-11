import { useEffect, useState } from 'react';
import './Events.css';
import { useParams } from 'react-router-dom';
import { bruh } from './objects'
import axios from 'axios';

import photosJson from './photos.json' //заглушка

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function Events() {
  let { id } = useParams();

  const [data, setData] = useState(null);
  const [events, setEvents] = useState()
  const [name, setName] = useState()
  const [descr, setDescr] = useState()
  const [timeStart, setTimeStart] = useState()
  const [timeEnd, setTimeEnd] = useState()
  const [price, setPrice] = useState()
  const [photos, setPhotos] = useState();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://195.80.50.92:8080/place/get?id=${id}`, {
          headers: {
            'Accept': 'application/json',
            // 'Access-Control-Allow-Origin': '*'
          }});
        
        setEvents(JSON.parse(response['request']['response'])['events'])
        let photos_raw = JSON.parse(response['request']['response'])["photos"];
        
        console.log(bruh["events"])
        setPhotos(bruh["events"]["photos"][0]);

      } catch (error) {
        console.error({"error:" : error})
      } 
    };

    fetchData();
  }, [id]) 


  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleDescr = (event) => {
    setDescr(event.target.value);
  };

  const handleTimeStart = (event) => {
    setTimeStart(event.target.value);
  };

  const handleTimeEnd = (event) => {
    setTimeEnd(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };


  return (
    <div className="EventApp">
      <h1 className='header-for-events'>Все события</h1>

        <div className='all-events-container'>
          {events !== undefined ? 
            events.map(key => {
              return(
                <div className='all-event'>
                  <img src={key['photos'][0]}/>
                  <h3 className='all-event-name' >{key["name"]}</h3>
                  <h3 className='all-event-description'>{key["description"]}</h3>
                  <div className='all-buttons'>
                    <div className='all-event-price'>{key["entry_price"]} ₽</div>
                    <div className='all-event-price'>{key["date_time_start"]} - {key["date_time_end"]}</div>
                  </div>
                </div>
              )
            }) : <div/> }
              

                <div className='all-event-add'>
                  <a href={`/#/constructor/${id}/events/create`}><h2>+</h2></a>
                </div>
        </div>
        <div className='empty-div'></div>
        <div className='empty-div'></div>
      </div>
  );

  // return (
  //   <div className="App">
  //   {data != null ? <EventsPreview place={data} events={events} photos = {photos}/> : <div/>}
  //     <div className='fields-container'>
  //       <h1>Добавить событие</h1>

  //       <h1>Название</h1>
  //       <input className='name-field' type="text" value={name} onChange={handleName} /> 
  //       {/* events name */}

  //       <h1>Описание</h1>
  //       <textarea cols={20} maxLength={170} className='descr-field' type="text" onChange={handleDescr} />
  //       {/* events descr */}

  //       <h1>Цена</h1>
  //       <input className='name-field' type="text" onChange={handlePrice} />
  //       {/* events price */}
        

  //       <h1>Обложка</h1>
  //         {photos !== undefined ? 
  //           <div className='covers'>
  //             <img src={photos}/>

  //             <div className='covers-add'>
  //               <h2>+</h2>
  //             </div>
  //           </div>
  //         : <div/>}
  //         {/* <input type="file" onChange={handleFileChange} accept="image/*" />
  //         {imageSrc && <img src={imageSrc} alt="Uploaded" />} */}
        
        

  //       <h1>Дата начала</h1>
  //       <LocalizationProvider dateAdapter={AdapterDayjs}>
  //         <DemoContainer components={['DateTimePicker']}>
  //           <DateTimePicker label="Basic date time picker" />
  //         </DemoContainer>
  //       </LocalizationProvider>

  //       <h1>Дата окончания</h1>
  //       <LocalizationProvider dateAdapter={AdapterDayjs}>
  //         <DemoContainer components={['DateTimePicker']}>
  //           <DateTimePicker label="Basic date time picker" />
  //         </DemoContainer>
  //       </LocalizationProvider>


  //       <h1>Все события</h1>
        
  //     </div>
  //   </div>
  // );
}