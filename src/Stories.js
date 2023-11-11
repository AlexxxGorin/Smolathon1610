import { useState, useEffect } from 'react';
import './Stories.css';
import Close from './assets/Close.svg';

export default function Stories(typ, pho, func) {
    const photos = typ['pho'][typ['typ']].slice(0, 20)
    const title = typ['typ']
    const closeFunc = typ['func'];

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
        const width = 450
        const blank = width * 0.01
        const barWidth = Math.floor((width - (blank * (photos.length))) / photos.length)
        return(
            <div className = 'bar-conteiner' style={{"gap": blank}}>
                {photos.map((key) => {
                    return(
                        <ProgressBar className='progress-bar' style={{"width": barWidth}} id={key} barWidth={barWidth} blank={blank}></ProgressBar>
                    )
                })}
            </div>
        )
    }

    function ProgressBar({barWidth, blank, id}){
        return(
            <div style={{"height": "3px", "zIndex": 999}}>
                <div className='prb-ph' style={{"width": photos.indexOf(id) === curr ? barWidth - (timeLeft * barWidth / 4) : 0}}/>
                <div className='prb-ph2' style={{"width": barWidth}} />
            </div>
        )
    }
    // console.log('meow', photos[curr])

    function handleNext(){
      if (curr < photos.length - 1){
          setCurr(curr + 1)
      }
      else {
          setCurr(0)
      }
      setTimeLeft(3.999)
  }

  function handlePrev(){
      if (curr > 0){
          setCurr(curr - 1)
      }
      else {
          setCurr(photos.length - 1)
      }
      setTimeLeft(3.999)
  }

    return(
      <div className='stories-conteiner'>
          <Bar></Bar>
          <img className='close-img' src={Close} onClick={() => closeFunc()}></img>
          <img className='stories-blured-photo' src={photos[curr]}></img>
          <div onClick={()=>handlePrev()} className='st-c-1'/>
          <div className='st-c-2'/>
          <div onClick={()=>handleNext()} className='st-c-3'/>
          <h1 style={{opacity: curr == 0 ? timeLeft > 4 ? 1 : 3 * (timeLeft - 2) : 0}}>{title}</h1>
          <img className='stories-photo' style={{}} src={photos[curr]} />
      </div>
  )
}