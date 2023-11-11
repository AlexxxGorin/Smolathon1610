import './EventsPreview.css';

import { useState, useEffect } from 'react';
import moment from "moment"
// import { cusineTypes } from './objects';

// import { interactiveBill } from './objects';
// import Stories from './Stories';
// import { styled, Box } from '@mui/system';
// import { Modal as BaseModal } from '@mui/base/Modal';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import Slider from 'react-slick';


export default function EventsPreview({ events }) {
    
  const [open, setOpen] = useState(false);
  const handleOpen = (typ) => {setOpen(true); setModalType(typ)}
  const handleClose = () => setOpen(false);
  const [modalType, setModalType] = useState('')
  
  

  return (
          <div className="event-preview">
              <img className='prev-img' src="https://cdn.culture.ru/images/34be34b4-3a84-5978-9763-15318fa953b3/w_884,h_442,c_fill,g_center/3b7b31502cad5a1e16f81adda34d25c3-jpg.webp"></img>
              <h3 className='add-event-name'>{events["name"]}</h3>
              <h3 className='add-event-description'>{events["description"]}</h3>
              <div className='add-event-button'>
                <div className='add-event-price'>{events["price"]} ₽</div>
                <div className='add-event-time'>{events["date_time_start"]} - {events["date_time_end"]}</div>
              </div>
              
              {/* {photos !== undefined ?
              <Slider {...settings}>
                  {photos['covers'].map((link, index) => (
                      <div key={index}>
                      <img src={link} alt={`Slide ${index}`} />
                      </div>
                  ))}
              </Slider> : <div/> } */}

              {/* <h1>{name}</h1>
              <h2>{descr}</h2>
              <div className='tag-container'>
                  {renderTags({ item: 0 })}
                  {renderTags({ item: 1 })}
                  {renderTags({ item: 2 })}
              
                  {renderTags2({item: 0})}
                  {renderTags2({item: 1})}
                  <a target='_blank' href={link}><div className='tag'><h3>📍 {adress}</h3></div></a>
              </div> */}

              {/* <div className='stories-container'>
                  {Object.keys(photos).map(key => {
                      return(
                          <div className='story'>
                              <img onClick={() => handleOpen(key)} src={photos[key][0]}/>
                              <h3>{key}</h3>
                          </div>
                      )
                  })}
              </div> */}

              {/* <div className='event-conteiner'>
                  {events !== undefined ? events.map(key => {
                      return(
                          <div className='event'>
                              <img src={ key["photos"][0] }/>
                              <h3 className='event-name' >{key["name"]}</h3>
                              <h3 className='event-description'>{key["description"]}</h3>
                              <div className='buttons'>
<                                   div className='event-price'>{key["entry_price"]} ₽</div>
                                  <div className='event-price'>{key["date_time_start"]} - {key["date_time_end"]}</div>
                              </div>
                              
                          </div>
                      )
                  }) : <div/>}
                  
              </div> */}
              <div className='empty-div'></div>
          </div>
      );
  }