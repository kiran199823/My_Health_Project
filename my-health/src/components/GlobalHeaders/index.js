import React, { useEffect, useState } from 'react';
import './style.scss';
import search from '../assets/svgIcons/search.svg';
import { myHealth } from '../../constants';
// import { increment } from './globalHeadersReducer/globalHeadersSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '../CustomElements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { intialLoad, removeSignedInUser } from '../Account/Signin/signinReducer/signinSlice';

const GlobalHeaders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSignedin = useSelector(
    (state) => state?.signinSlice?.user?.userData
  );

  const [firstLetter, setFirstLetter] = useState('');

  // const count = useSelector((state) => state.globalHeadersReducer.value);
  // const dispatch = useDispatch();

  const getUserSignedin = () => {
    if (userSignedin) {
      setFirstLetter(userSignedin.charAt(0).toUpperCase());
    }
  };

  useEffect(() => {
    dispatch(intialLoad())
    getUserSignedin();
  }, [userSignedin]);

  const handleUserIconClick = () => {
    dispatch(removeSignedInUser());
  };

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
        {userSignedin && !!firstLetter
          ? (
          <Button
            text={firstLetter}
            varient="circle"
            onClick={handleUserIconClick}
          />
            )
          : (
          <Button text="Sign in" onClick={handleSigninClick} />
            )}
      </div>
    </div>
  );
};

export default GlobalHeaders;
