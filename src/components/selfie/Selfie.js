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
    const loaderRef = useRef();

    const videoRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
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

        loaderRef.current.style= "display: block";
        setTimeout(()=>{
            snap.play();
            ctx.drawImage(videoRef.current, 0, 0, 500, height);
            sessionStorage.setItem('pic', canvasRef.current.toDataURL("image/png"));
            loaderRef.current.style= "display: none";
            history.push('/my-pic');
        },1000);

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
             <div className="counter" ref={loaderRef} style={{display:'none'}}></div>
            </div>
        </div>
    )
}

export default Selfie
