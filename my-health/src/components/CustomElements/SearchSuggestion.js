import React, { useEffect, useState } from 'react';
import { InputField } from './InputField';
import ImageButtons from './ImageButtons';

const SearchSuggestion = (props) => {
  const {
    id,
    placeHolder,
    suggestionItems,
    onClick,
    headerName,
    handleOnBack,
    onChange,
    onSelect,
  } = props;

  const [inputValue, setInputValue] = useState();
  const [dropDownItems, setDropDownItems] = useState(suggestionItems);

  const handleOnChange = (event) => {
    const { value } = event.target;
    setInputValue(value);

    const filteredDropDownItems = suggestionItems?.filter((item) =>
      item?.toLowerCase()?.includes(value?.toLowerCase())
    );
    setDropDownItems(filteredDropDownItems);

    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  const handleOnDropDownSelect = (selectedValue) => {
    if (typeof onSelect === 'function') {
      onSelect({ id, selectedValue });
      if (typeof handleOnBack === 'function' && id !== 'state') {
        handleOnBack();
      }
    }
  };

  return (
    <div className="searchSuggestionContainer">
      {headerName && (
        <div className="searchSuggestionHeading">
          <img
            src="https://img.icons8.com/sf-black/64/FFFFFF/left.png"
            alt="back"
            width="30"
            height="30"
            onClick={handleOnBack}
          />
          <p className="searchSuggestionHeadingName">{headerName}</p>
        </div>
      )}
      <div className="searchSuggestionInputContainer flexCenter">
        <div className="searchSuggestionInput">
          <InputField
            id={id}
            placeHolder={placeHolder}
            value={inputValue}
            onClick={onClick}
            onChange={handleOnChange}
          />
        </div>
      </div>
      {dropDownItems && (
        <div>
          {dropDownItems.map((item, index) => {
            return (
              <p
                className="searchSuggestionItems"
                key={index}
                onClick={() => handleOnDropDownSelect(item)}
              >
                {item}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchSuggestion;
