export const emailValidation = (value) => {
  if (value.length <= 0) {
    return {
      isRequired: true,
      message: 'Email required',
    };
  } else if (!value.includes('@gmail.com')) {
    return {
      isIncorrectfied: true,
      message: 'Email not valid',
    };
  }
};

export const phoneValidation = (value, optional = false) => {
  const isValid = false;
  if (value.length <= 0 && !optional) {
    return {
      isValid,
      message: 'Phone no: required',
    };
  } else if (value.length !== 10 && value.length !== 0) {
    return {
      isValid,
      message: 'Not a valid phone no',
    };
  }
};

export const passwordValidation = (value) => {
  if (value.length <= 0) {
    return {
      isRequired: true,
      message: 'Password required',
    };
  } else if (value.length < 8) {
    return {
      isLengthUnsatisfied: true,
      message: 'Must be at least 8 char',
    };
  }
};

export const nameValidation = (value) => {
  if (value.length <= 0) {
    return {
      isValid: false,
      message: 'Field is required',
    };
  }
};

export const ageValidator = (value) => {
  if (!value) {
    return {
      isValid: false,
      message: 'Enter age',
    };
  } else if (value < 0 || value > 150) {
    return {
      isValid: false,
      message: 'Enter valid age',
    };
  }
};

export const dateValidation = (day, month, year) => {
  const isValidDate = day > 0 && day <= 31;
  const isValidMonth = month > 0 && month <= 12;
  const isValidYear = year > 1850 && year <= 2026;
  if (!(isValidDate && isValidMonth && isValidYear)) {
    return {
      isRequired: true,
      message: 'Date is wrong',
    };
  }
};

export const genderValidator = (value) => {
  if (value === 'select') {
    return {
      isRequired: true,
      message: 'Please select gender',
    };
  }
};
