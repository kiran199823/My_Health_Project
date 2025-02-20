import React, { useContext, useState } from 'react';
import './style.scss';
import BookingContainer from './BookingContainer';
import { labsItems } from './utils';
import Insurance from './Insurance';
import LocationChange from '../LocationChange';
import { MyHealthContext } from '../MyHealthContexProvider';
import { useNavigate } from 'react-router-dom';
// import SampleComponent from 'react-ease-kit';

const HomePageComponent = (props) => {
  const navigate = useNavigate();

  const {
    globalLocation,
    fetchLocationData,
    statesList,
    citiesList,
    updateGlobalLocation,
    resetlocationFields,
    fetchToken,
    localUserId,
    removeSignedInUser,
  } = props;

  const { theme, setTheme } = useContext(MyHealthContext);

  const [isShowLocationModal, setIsShowLocationModal] = useState(false);
  const isMobile = true; // get value either from props or state in future

  const headerRightFieldIcon =
    'https://img.icons8.com/fluency-systems-regular/144/user--v1.png'; // add this icon (https://img.icons8.com/material-outlined/384/menu--v1.png) when user is signed in

  const handleChangeLocation = () => {
    setIsShowLocationModal(true);
  };

  const handleCloseLocationModel = () => {
    setIsShowLocationModal(false);
  };

  const handleOnUserClick = () => {
    console.log('localUserId: ', localUserId);
    if (localUserId) {
      removeSignedInUser();
      return;
    }
    navigate('/signin');
  };

  // const handleThemeChange = () => {
  //   const mode = theme === 'Light' ? 'Dark' : 'Light';
  //   setTheme(mode);
  // };

  return (
    <div className="homeScreenContainer">
      {isMobile && (
        <>
          <div className="newHeaderContainer">
            {' '}
            {/* Change it later */}
            <span className="item-logo">MH</span>
            <div className="item-search">
              <img
                src="https://img.icons8.com/sf-regular/480/search.png"
                alt="searchIcon"
                width="35"
              />
            </div>
            <div className="item-userLogo">
              <img
                src={headerRightFieldIcon}
                alt="headerRightFieldIcon"
                width="33"
                onClick={handleOnUserClick}
              />
            </div>
          </div>
          <div className="headerLocation">
            <img
              src="https://img.icons8.com/material-outlined/384/marker.png"
              alt="locationIcon"
              width="25"
              height="25"
            />
            <span className="cityName" onClick={handleChangeLocation}>
              {globalLocation?.city}
            </span>
          </div>
          <div className="bodyContainer">
            <div className="homePageOffers flexCenter">
              <p>Offers to be added in future</p>
            </div>

            <BookingContainer fetchToken={fetchToken} />

            <div className="labsContaier">
              <div className="homeHeading">
                <p>Labs</p>
              </div>
              <div className="labsButtonsContainer">
                {labsItems &&
                  labsItems.map(({ name, src, alt }, index) => {
                    return (
                      <button className="labsButton" key={index}>
                        <img
                          className="image-item"
                          width="55"
                          height="55"
                          src={src}
                          alt={alt}
                        />
                        <span className="name-item">{name}</span>
                      </button>
                    );
                  })}
              </div>
            </div>
            <Insurance />
          </div>
          {isShowLocationModal && (
            <LocationChange
              fetchLocationData={fetchLocationData}
              stateSuggestion={statesList}
              citySuggestion={citiesList}
              closeLocationModel={handleCloseLocationModel}
              resetlocationFields={resetlocationFields}
              updateLocation={updateGlobalLocation}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePageComponent;
