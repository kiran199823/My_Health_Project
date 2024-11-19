export const formatDate = (date, month, year) => {
  if (date && month && year) {
    return `${date}-${month}-${year}`;
  }
};

export const userRequestBody = (userDetails, encryptedPassword) => {
  const { date, month, year, ...otherUserInfo } = userDetails;
  const formatedDate = formatDate(date, month, year);
  const modifiedData = { ...otherUserInfo, DOB: formatedDate, password: encryptedPassword };
  delete modifiedData.confirmPassword;
  return modifiedData;
};
