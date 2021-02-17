import React, { useRef } from 'react'
import defaultUser from './../../assets/default.jpg';
import facebookIcon from './../../assets/icons/facebook.svg';
import downloadIcon from './../../assets/icons/file_download.svg';
import backIcon from './../../assets/icons/arrow_back.svg';
import deleteIcon from './../../assets/icons/delete.svg';
import cropIcon from './../../assets/icons/crop.svg';
import rotateIcon from './../../assets/icons/rotate.svg';
import zoomInIcon from './../../assets/icons/zoom_in.svg';
import zoomOutIcon from './../../assets/icons/zoom_out.svg';
import './MyPic.scss';
import { useHistory } from 'react-router-dom';
import CropperImage from './CropperImage';

let myPic;

const MyPic = () => {
    const history = useHistory();
    let cropper;

    let uri;
    if(sessionStorage.getItem('pic')){
        myPic = sessionStorage.getItem('pic');
        uri = `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2F&amp;src=${myPic}`;
    }
    else{
        myPic = defaultUser;
    }

    const goBack = (e) =>{
        e.stopPropagation();
        history.goBack();
    }

    const download = e =>{
        e.stopPropagation();
        var a = document.createElement('a');
        a.href = myPic;
        a.setAttribute('download', 'my-pic.jpg');
        a.click();
    }

    const shareImage = async (e) =>{
        const u= myPic;
        window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent('my-pic'),'sharer','toolbar=0,status=0,width=626,height=436');return false;
    };

    const cropImg = (e) =>{
        console.log(cropper)
        e.preventDefault();
    }

    return (
        <div className="pic-component">
            <div className="img-container">
                <CropperImage  originalPic= {myPic} cropper= {cropper}/>
            </div>
            <div className="bottom-toolbar">
               <button  data-tooltip="Go back" onClick={goBack} className="btn-icon btn-accent mr-5p flex-center shadow-sm">
                 <img src={backIcon} style={{filter: 'invert(1)', objectFit:'cover'}}/>
               </button>
               <div className="cropper-options">
                   <button  data-tooltip="Clear All" className="btn-icon">
                       <img src={deleteIcon} alt="delete_icon"/>
                   </button>
                   <button className="btn-icon"  data-tooltip="Crop"
                   onClick={cropImg}>
                       <img src={cropIcon} alt="crop_icon"/>
                   </button>
                   <button className="btn-icon"  data-tooltip="Rotate">
                       <img src={rotateIcon} alt="rotate_icon"/>
                   </button>
                   <button className="btn-icon" data-tooltip="Zoom In">
                       <img src={zoomInIcon} alt="zoomIn_icon"/>
                   </button>
                   <button className="btn-icon"  data-tooltip="Zoom Out">
                       <img src={zoomOutIcon} alt="zoomOut_icon"/>
                   </button>
               </div>
               <div className="btn-group">
                    <button data-tooltip="Share" className="btn-icon btn-facebook" onClick={shareImage}>
                        <img src={facebookIcon} alt="facebook" style={{filter:'invert(1)', marginRight:'0.3rem'}}/>
                    </button>
                    <button data-tooltip="Download" className="btn-icon btn-accent" onClick={download}>
                        <img src={downloadIcon} alt="download" style={{filter:'invert(1)', marginRight:'0.3rem'}}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyPic
