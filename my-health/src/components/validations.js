export const emailValidation = (value) => {
  if (value.length <= 0) {
    return {
      isRequired: true,
      message: 'Email required'
    };
  } else if (!value.includes('@gmail.com')) {
    return {
      isIncorrectfied: true,
      message: 'Email not valid'
    };
  }
};

export const phoneValidation = (value) => {
  if (value.length <= 0) {
    return {
      isRequired: true,
      message: 'Phone no: required'
    };
  } else if (value.length < 10) {
    return {
      isIncorrectfied: true,
      message: 'Phone no: not valid'
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

export const nameValidation = (value) => {
  if (value.length <= 0) {
    return {
      isRequired: true,
      message: 'Field is required'
    };
  }
};

export const dateValidation = ({ date, month, year }) => {
  const isValidDate = date?.value > 0 && date?.value <= 31;
  const isValidMonth = month?.value > 0 && month?.value <= 12;
  const isValidYear = year?.value > 1850 && year?.value <= 2026;
  if (!(isValidDate && isValidMonth && isValidYear)) {
    return {
      isRequired: true,
      message: 'Date is wrong'
    };
  }
};

export const genderValidation = (value) => {
  console.log('value: ', value);
  if (value.length <= 0) {
    return {
      isRequired: true,
      message: 'Field is required'
    };
  }
};
