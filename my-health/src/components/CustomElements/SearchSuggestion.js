import React from 'react';
import { InputField } from './InputField';

const SearchSuggestion = (props) => {
  const { placeHolder, suggestionItems, onClick, headerName, handleOnBack } =
    props;
  return (
    <div className="searchSuggestionContainer">
      {headerName && (
        <div className="searchSuggestionHeading">
          <button
            className="searchSuggestionHeadingButton"
            onClick={handleOnBack}
          >
            <span>back i</span>
          </button>
          <p className="searchSuggestionHeadingName">{headerName}</p>
        </div>
      )}
      <div className="searchSuggestionInputContainer flexCenter">
        <div className='searchSuggestionInput'>
          <InputField
            placeHolder={placeHolder}
            onClick={onClick}
          />
        </div>
      </div>
      {suggestionItems && (
        <div>
          {suggestionItems.map((items, index) => {
            return (
              <p className="searchSuggestionItems" key={index}>
                {items}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchSuggestion;
