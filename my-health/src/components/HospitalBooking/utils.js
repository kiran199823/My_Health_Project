export const handleAPIDispatch = (id, dispatch) => {
  switch (id) {
    case 'state': {
      dispatch.stateRequest();
    }
  }
};

export const getInputSearchItems = (id, suggestionItems) => {
  switch (id) {
    case 'state': {
      return {
        id,
        placeHolder: 'Enter State',
        headerName: 'State',
        suggestionItems
      };
    }
    case 'city': {
      return {
        id,
        placeHolder: 'Enter City',
        headerName: 'City',
        suggestionItems
      };
    }
    case 'hospital': {
      return {
        id,
        placeHolder: 'Enter hospital name',
        headerName: 'Hospital name',
        suggestionItems: []
      };
    }
    case 'doctor': {
      return {
        id,
        placeHolder: 'Enter doctor name',
        headerName: 'Doctor name',
        suggestionItems: []
      };
    }
    case 'specialist': {
      return {
        id,
        placeHolder: 'Enter specialist',
        headerName: 'Specialist',
        suggestionItems: []
      };
    }
  }
};
