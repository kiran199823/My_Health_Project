import React, { useState } from 'react';
import './style.scss';
import menu from '../assets/svgIcons/menu.svg';
import globe from '../assets/svgIcons/globe-grid.svg';
import BookingContainer from './BookingContainer';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { labsItems } from './utils';
import Insurance from './Insurance';
import LocationChange from '../LocationChange';

const HomePageComponent = (props) => {
  const {
    globalLocation,
    fetchLocationData,
    statesList,
    citiesList,
    updateGlobalLocation,
    resetlocationFields,
  } = props;

  const [isShowLocationModal, setIsShowLocationModal] = useState(false);
  const isMobile = true; // get value either from props or state in future

  const handleChangeLocation = () => {
    setIsShowLocationModal(true);
  };

  const handleCloseLocationModel = () => {
    setIsShowLocationModal(false);
  };

  return (
    <div className="homeScreenContainer">
      {isMobile && (
        <>
          <div className="headerContainer">
            <div className="headerLanguage">
              <img src={globe} alt="languageIcon" width="19" />
              <span onClick={handleChangeLocation}>{globalLocation?.city}</span>
            </div>
            <div className="headerSearch flexCenter">
              <input placeholder="Search.." className="searchBar" />
            </div>
            <div className="headerMenu">
              <img src={menu} alt="menu" width="20" />
            </div>
          </div>
          <div className="bodyContainer">
            <div className="homePageOffers flexCenter">
              <p>Offers in future</p>
            </div>
            <BookingContainer />
            <div className="labsContaier">
              <div className="homeHeading">
                <p>Labs</p>
              </div>
              <div className="labsButtonsContainer">
                {labsItems &&
                  labsItems.map(({ name, src, alt }, index) => {
                    return (
                      <button className="labsButton flexCenter" key={index}>
                        <img width="48" height="48" src={src} alt={alt} />
                        <span className="labsButtonName">{name}</span>
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
