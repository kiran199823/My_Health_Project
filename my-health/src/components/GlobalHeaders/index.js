import React, { useEffect, useState } from 'react';
import './style.scss';
import search from '../assets/svgIcons/search.svg';
import { useNavigate } from 'react-router-dom';
import { Button } from '../CustomElements/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  intialLoad,
  removeSignedInUser
} from '../Account/Signin/signinReducer/signinSlice';

const GlobalHeaders = () => {
  const isMobile = true; // get value either from props or state in future
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSignedin = useSelector(
    (state) => state?.signinSlice?.user?.userData
  );

  const [firstLetter, setFirstLetter] = useState('');

  const getUserSignedin = () => {
    if (userSignedin) {
      setFirstLetter(userSignedin.charAt(0).toUpperCase());
    }
  };

  useEffect(() => {
    dispatch(intialLoad());
    getUserSignedin();
  }, [userSignedin]);

  const handleUserIconClick = () => {
    dispatch(removeSignedInUser());
  };

  const handleSigninClick = () => {
    navigate('/signin');
  };

  return (
    <div>
      {isMobile && (
        <>
          <div className="headerContainer">
            <div className="header1stRow">
              <p>Hi User</p>
            </div>
            <div className="header2ndRow"></div>
            <div className="header3rdRow"></div>
            <div className="header4thRow"></div>
          </div>
          <div className='bodyContainer'></div>
        </>
      )}
    </div>
  );
};

export default GlobalHeaders;
