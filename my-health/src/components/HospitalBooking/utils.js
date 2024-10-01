export const handleAPIDispatch = (id, dispatch) => {
  switch (id) {
    case 'state': {
      dispatch.stateAndCityRequest();
    }
  }
};

export const getInputSearchItems = (id, suggestionItems) => {
  switch (id) {
    case 'state': {
      return {
        placeHolder: 'Enter State',
        headerName: 'State',
        suggestionItems
      };
    }
    case 'city': {
      return {
        placeHolder: 'Enter City',
        headerName: 'City',
        suggestionItems
      };
    }
    case 'hospitalName': {
      return {
        placeHolder: 'Enter hospital name',
        headerName: 'Hospital name',
        suggestionItems: []
      };
    }
    case 'doctorName': {
      return {
        placeHolder: 'Enter doctor name',
        headerName: 'Doctor name',
        suggestionItems: []
      };
    }
    case 'specialist': {
      return {
        placeHolder: 'Enter specialist',
        headerName: 'Specialist',
        suggestionItems: []
      };
    }
  }
};
