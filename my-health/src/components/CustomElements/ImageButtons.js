import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the icon you want to use

const ImageButtons = (props) => {
  const { icon, name, key, handleClick } = props;

  const handleOnClick = (event) => {
    const buttonName = event.currentTarget.name; // using currentTarget because button constains both svg and span element.
    handleClick(buttonName);
  };
  return (
    <>
      <button
        className="imageButtons"
        key={key}
        onClick={handleOnClick}
        name={name}
      >
        <FontAwesomeIcon icon={icon} className="imageButtonFontIcon" />
        <span className="imageButtonsName">{name}</span>
      </button>
    </>
  );
};

export default ImageButtons;
