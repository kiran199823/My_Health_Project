import React from 'react';
import './style.scss';
import 'react-tabs/style/react-tabs.css'; // default styles from react-tabs, overrided in css file
import { bookingItems, getRedirectPath } from './utils';
import { useNavigate } from 'react-router-dom';

const BookingContainer = (props) => {
  const navigate = useNavigate();

  const { fetchToken } = props;

  const handleOnClick = (buttonName) => {
    const path = getRedirectPath(buttonName);
    if (buttonName === 'Hospital') {
      fetchToken();
    }
    navigate(path);
  };

  return (
    <div className="bookingContainer">
      <div className="homeHeading">
        <p>Booking</p>
      </div>
      <div className="bookingBody">
        {bookingItems &&
          bookingItems.map(({ name, src, alt }, index) => {
            return (
              <div className="cards" key={index} onClick={handleOnClick}>
                <img src={src} alt={alt} width="55"/>
                <span>{name}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BookingContainer;
