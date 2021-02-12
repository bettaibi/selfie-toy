import {useEffect, useRef, useState} from 'react'
import CardSlider from './cardSlider/CardSlider';
import './Selfie.scss';
import camera from '../../assets/icons/camera.svg';
import audioSnap from '../../assets/audio/camera-shutter.mp3';

import { useHistory } from 'react-router-dom';

const Selfie = () => {
    const history = useHistory();
    let stream = null;
    const [videoStream, setVideoStream] = useState(null);
    const [filter, setFilter] = useState('none');
    let [counter, setCounter] = useState(4);

    const videoRef = useRef();
    const canvasRef = useRef();
    console.log("inside the component")
    useEffect(() => {
        console.log("inside effect")
        loadMedia();

        return () => {
            try{
                var track = stream.getTracks()[0];
                track.stop();
            }
            catch(err){
                console.error(err);
            }
        }
    }, []);

    async function loadMedia(){
      try{  
        stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});
        videoRef.current.srcObject = stream;
        setVideoStream(stream);
        videoRef.current.play();
      }
      catch(err){
          console.error(err.message);
      }
    }

    const updateFilter = (value) =>{
        videoRef.current.style = `filter: ${value}`;
        setFilter(value) 
    }

    const takeSnap = (e) =>{
        e.preventDefault();
        let height =  videoRef.current.videoHeight / ( videoRef.current.videoWidth / 500);
        canvasRef.current.setAttribute('width', 500);
        canvasRef.current.setAttribute('height', height);
        const ctx = canvasRef.current.getContext("2d");
        ctx.filter = filter;
        const snap = new Audio(audioSnap);

        var intervalId = setInterval(()=>{

            if(counter < 1){
                clearInterval(intervalId);
                snap.play();
                ctx.drawImage(videoRef.current, 0, 0, 500, height);
                sessionStorage.setItem('pic', canvasRef.current.toDataURL("image/png"));
                history.push('/my-pic');
            }
            setCounter(counter--);
        },800);

    }

    return(
        <div className="selfie">
            <canvas ref={canvasRef} style={{display: 'none'}}></canvas>
            <div className="video-container">
             <video ref={videoRef} autoPlay playsInline muted style={{filter: filter}}/>
             <div className="card-slider-container">
                 <div className="cards-container">
                     {videoStream ? (
                        <CardSlider onFilterChanged= {(filterValue)=>{ updateFilter(filterValue)}} stream={videoStream}/>
                     ): null}
                 </div>
             </div>
             <button className="snapshot btn btn-accent shadow" onClick={takeSnap}>
                 <img src={camera} alt="camera"/>
             </button>
             <h4 className="counter" style={{display: counter==4?'none':'block'}}>{counter}</h4>
            </div>
        </div>
    )
}

export default Selfie
