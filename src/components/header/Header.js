import React from 'react'
import './Header.scss';
import shutter from '../../assets/icons/shutter.svg';

const Header = () => {
    return (
        <header className="header shadow">
            <img className="logo" src={shutter} alt="Selfie Toy" height="38"/>
            <h1 style={{marginLeft: '0.8rem'}}>Selfie Toy</h1>
        </header>
    )
}

export default Header;
