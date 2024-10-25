import React from 'react';

const ImageButtons = (props) => {
  const { src, name, handleClick, alt } = props;

  const handleOnClick = (event) => {
    const buttonName = event.currentTarget.name; // using currentTarget because button constains both svg and span element.
    handleClick(buttonName);
  };
  return (
    <>
      <button
        className="imageButtons"
        // key={keyValue}
        onClick={handleOnClick}
        name={name}
      >
        {/* <FontAwesomeIcon icon={icon} className="imageButtonFontIcon" /> */}
        <img width="48" height="48" src={src} alt={alt} />
        <span className="imageButtonsName">{name}</span>
      </button>
    </>
  );
};

export default ImageButtons;
