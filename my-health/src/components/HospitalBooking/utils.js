export const getInputSearchItems = (id, suggestionItems) => {
  switch (id) {
    case 'hospital': {
      return {
        id,
        placeHolder: 'Enter hospital name',
        headerName: 'Hospital name',
        suggestionItems,
      };
    }
    case 'doctor': {
      return {
        id,
        placeHolder: 'Enter doctor name',
        headerName: 'Doctor name',
        suggestionItems: [],
      };
    }
    case 'specialist': {
      return {
        id,
        placeHolder: 'Enter specialist',
        headerName: 'Specialist',
        suggestionItems: [],
      };
    }
    default:
      return {};
  }
};

export const getResetFields = (fieldName, setInputValues, item) => {
  let resetFields;

  switch (fieldName) {
    case 'hospital':
      setInputValues((prev) => ({
        ...prev,
        hospital: item,
        doctor: '',
        specialist: '',
      }));
      resetFields = ['doctor', 'specialist'];
      break;
    case 'doctor':
      setInputValues((prev) => ({ ...prev, doctor: item, specialist: '' }));
      resetFields = ['specialist'];
      break;
    default:
      resetFields = [];
  }

  return resetFields;
};
