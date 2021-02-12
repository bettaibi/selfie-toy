import toy from '../../assets/toy.png';
import RandomCover from './RandomCover';
import { Link } from 'react-router-dom';

import './Home.scss';

const Home = () => {
    return (
    <div className="bg-secondary" style={{padding: '2rem 1rem', height: '100%', width: '100%'}}>
        <div className="home">
            <div className="m-1 sm-none">
                <RandomCover width="260px" heigth="230px" rotation="rotate(35deg)" marginTop="100px"/>
            </div>
             
            <div className="intro">
                 <h1 className="text-accent">SELFIE</h1>
                 <img src={toy} alt="logo" draggable="false"/>
                 <p>
                     Over 20 fun free digital effects and filters to use with your web camera. Take photos online, download and save selfies to your computer
                     or even share them on Social Media.
                 </p>
                 <button className="btn btn-accent">
                     <Link to='/selfie'>Ready ?</Link>
                 </button>
            </div>
             <div className="m-1 sm-none">
                <RandomCover  width="260px" heigth="230px" rotation="rotate(-35deg)" marginTop="10px"/>
                <RandomCover  width="120px" heigth="150px" rotation="rotate(35deg)" marginTop="10px"/>
            </div>
        </div>
        <footer>
            <small>Created By Bettaibi Nidhal</small>
        </footer>
    </div>
    )
}

export default Home
