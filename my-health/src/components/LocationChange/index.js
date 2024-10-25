import React, { useEffect } from 'react';
import SearchSuggestion from '../CustomElements/SearchSuggestion';

const LocationChange = React.memo(
  (props) => {
    const {
      fetchLocationData,
      stateSuggestion,
      citySuggestion,
      closeLocationModel,
      resetlocationFields,
      updateLocation,
    } = props;

    useEffect(() => {
      if (!stateSuggestion) {
        fetchLocationData('state');
      }
      return () => {
        resetlocationFields();
      };
    }, []);

    const handleOnSelect = (selectedItem) => {
      const { id: inputFieldName, selectedValue } = selectedItem;
      if (inputFieldName === 'state') {
        fetchLocationData('city', 'post', { state: selectedValue });
        updateLocation({ state: selectedValue });
      }

      if (inputFieldName === 'city') {
        updateLocation({ city: selectedValue });
        closeLocationModel();
      }
    };

    return (
      <div className="locationChangeContainer">
        {stateSuggestion && !citySuggestion && (
          <SearchSuggestion
            id="state"
            placeHolder="State"
            headerName="Select state"
            suggestionItems={stateSuggestion}
            onSelect={handleOnSelect}
            handleOnBack={closeLocationModel}
          />
        )}
        {citySuggestion && (
          <SearchSuggestion
            id="city"
            placeHolder="City"
            headerName="Select city"
            suggestionItems={citySuggestion}
            onSelect={handleOnSelect}
            handleOnBack={closeLocationModel}
          />
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    const stateSuggestionChanged =
      prevProps?.stateSuggestion === nextProps?.stateSuggestion;
    const citySuggestionChanged =
      prevProps?.citySuggestion === nextProps?.citySuggestion;

    return stateSuggestionChanged && citySuggestionChanged;
  }
);

export default LocationChange.displayName = LocationChange;
