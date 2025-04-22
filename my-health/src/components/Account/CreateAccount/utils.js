import { dataEncryption } from '../../../utils';

export const formatDate = (date, month, year) => {
  if (date && month && year) {
    return `${date}-${month}-${year}`;
  }
};

// export const userRequestBody = (userDetails, encryptedPassword) => {
//   const { date, month, year, ...otherUserInfo } = userDetails;
//   const formatedDate = formatDate(date, month, year);
//   const modifiedData = { ...otherUserInfo, DOB: formatedDate, password: encryptedPassword };
//   delete modifiedData.confirmPassword;
//   return modifiedData;
// };

export const userRequestBody = (userDetails) => {
  const {
    firstName,
    lastName,
    email,
    phoneNo,
    date,
    month,
    year,
    gender,
    password,
  } = userDetails;
  const formatedDate = formatDate(date, month, year);
  const encryptedPassword = dataEncryption(password);
  return {
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    PhoneNo: phoneNo,
    DOB: formatedDate,
    Gender: gender,
    Password: encryptedPassword,
  };
};
