import React from 'react';
import './style.css';
import search from '../assets/svgIcons/search.svg';
import userSignin from '../assets/svgIcons/user.svg';

const GlobalHeaders = () => {
    const handleClick = () => {
        alert('need to handle in future')
    }

    return (
        <div className='globalHeadersContainers'>
            <div className='headerLogo'>
                <h2>My Health</h2>
            </div>
            <div className='headerSearchContainer'>
                <div className='headerSearch flexCenter'>
                    <input className='searchText' type='text' placeholder='Search'/>
                    <span className='verticalLineBar searchDivder'></span>
                    <img className='searchLogo' src={search} alt='searchLogo'/>
                </div>
            </div>
            <div className='headerLogin'>
                <p className='signinText'>signin</p>
                <img onClick={handleClick} className='signinLogo' src={userSignin} alt='userSignin'/>
            </div>
        </div>
    );
}

export default GlobalHeaders;
