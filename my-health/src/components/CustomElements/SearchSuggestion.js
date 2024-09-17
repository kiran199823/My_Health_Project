import React from 'react';

const SearchSuggestion = (props) => {
  const { placeHolder, suggestionItems, onClick, headerName, handleBack } =
    props;
  return (
    <div className="searchSuggestionContainer">
      {headerName && (
        <div className="searchSuggestionHeading">
          <button
            className="searchSuggestionHeadingButton"
            onClick={handleBack}
          >
            <span>back i</span>
          </button>
          <p className="searchSuggestionHeadingName">{headerName}</p>
        </div>
      )}
      <div className='searchSuggestionInputContainer flexCenter'>
        <input
          className="searchSuggestionInput"
          placeholder={placeHolder}
          onClick={onClick}
        />
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
