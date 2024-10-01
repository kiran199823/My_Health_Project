import React from 'react';
import './style.scss';
import 'react-tabs/style/react-tabs.css'; // default styles from react-tabs, overrided in css file
import { bookingItems, getRedirectPath } from './utils';
import ImageButtons from '../CustomElements/ImageButtons';
import { useNavigate } from 'react-router-dom';

const BookingContainer = () => {
  const navigate = useNavigate();

  const handleOnClick = (buttonName) => {
    const path = getRedirectPath(buttonName);
    navigate(path);
  };

  return (
    <div className="bookingContainer">
      <div className="homeHeading">
        <p>Booking</p>
      </div>
      <div className="bookingBody">
        {bookingItems &&
          bookingItems.map(({ name, icon }, index) => {
            return (
              <ImageButtons
                name={name}
                icon={icon}
                key={index}
                handleClick={handleOnClick}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BookingContainer;
