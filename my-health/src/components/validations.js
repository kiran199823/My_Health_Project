export const userNameValidation = (value) => {
  if (value.length <= 0) {
    return {
      isRequired: true,
      message: 'User name required'
    };
  } else if (value.length <= 2) {
    return {
      isLengthUnsatisfied: true,
      message: 'Must be at least 3 char'
    };
  }
};

export const passwordValidation = (value) => {
  if (value.length <= 0) {
    return {
      isRequired: true,
      message: 'Password required'
    };
  } else if (value.length < 8) {
    return {
      isLengthUnsatisfied: true,
      message: 'Must be at least 8 char'
    };
  }
};
