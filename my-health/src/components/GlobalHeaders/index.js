import React from 'react';
import './style.scss';
import search from '../assets/svgIcons/search.svg';
import { myHealth } from '../../constants';
// import { useSelector, useDispatch } from 'react-redux';
// import { increment } from './globalHeadersReducer/globalHeadersSlice';
import { useNavigate } from 'react-router-dom';

const GlobalHeaders = () => {
  const navigate = useNavigate();

  // const count = useSelector((state) => state.globalHeadersReducer.value);
  // const dispatch = useDispatch();

  const handleSigninClick = () => {
    navigate('/signin');
  };

  return (
    <div className="globalHeadersContainers">
      <div className="extraBlack headerLogo">
        <h2>{myHealth}</h2>
      </div>
      <div className="headerSearchContainer">
        <div className="headerSearch flexCenter">
          <input className="searchText" type="text" placeholder="Search" />
          <span className="verticalLineBar searchDivder"></span>
          <img className="searchLogo" src={search} alt="searchLogo" />
        </div>
      </div>
      <div className="headersignin">
        <button className="signinText" onClick={handleSigninClick}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default GlobalHeaders;
