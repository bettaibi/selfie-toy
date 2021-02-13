import React from 'react'
import defaultUser from './../../assets/default.jpg';
import facebookIcon from './../../assets/icons/facebook.svg';
import downloadIcon from './../../assets/icons/file_download.svg';
import backIcon from './../../assets/icons/arrow_back.svg';
import { useHistory } from 'react-router-dom';

let myPic;

const MyPic = () => {
    const history = useHistory();
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

    return (
        <div className="pic-component">
            <div>
                <div className="cover my-pic fadeIn">
                    <img src={myPic} alt="myPic" />
                </div>
                <div className="pic-desc fadeIn" style={{color: 'rgb(212 212 212)', letterSpacing: '1px', marginTop:'1rem'}}>
                    <h1>Awesome pic!</h1>
                    <span>Save pictures in your computer or share them on Facebook</span>
                </div>
            </div>

            <div className="w-100" style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <button style={{width:'34px', height: '34px', borderRadius: '50%'}} onClick={goBack} className="btn btn-accent mr-5p flex-center shadow-sm">
                   <img src={backIcon} style={{filter: 'invert(1)', objectFit:'cover'}}/>
                </button>
                <div className="btn-group">
                    <button className="btn btn-facebook mr-5p" onClick={shareImage} style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <img src={facebookIcon} alt="facebook" style={{filter:'invert(1)', marginRight:'0.3rem'}}/>
                        <span>Share</span>
                    </button>
                    <button className="btn btn-accent" onClick={download}
                    style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <img src={downloadIcon} alt="download" style={{filter:'invert(1)', marginRight:'0.3rem'}}/>
                       Download
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyPic
