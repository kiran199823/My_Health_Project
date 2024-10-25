import React from 'react';
import './style.scss';
import { Outlet } from 'react-router-dom';
import home from '../assets/svgIcons/home.svg';
import profile from '../assets/svgIcons/user.svg';
import cart from '../assets/svgIcons/cart.svg';
import calendar from '../assets/svgIcons/calendar.svg';
import history from '../assets/svgIcons/history.svg';

const GlobalFooterMenu = () => {
  return (
    <div className="layout">
      <div className='mainContents'>
        <Outlet /> {/* This will render the matched route component */}
      </div>
      <div className="menuFooterContainer flexCenter">
        <img src={home} alt="homeIcon" width="30" />
        <img src={calendar} alt="calendarIcon" width="32" />
        <img src={cart} alt="cartIcon" width="32" />
        <img src={profile} alt="profileIcon" width="29" />
        <img src={history} alt="historyIcon" width="29" />
      </div>
    </div>
  );
};

export default GlobalFooterMenu;
