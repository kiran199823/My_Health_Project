export const formatDate = ({ date, month, year }) => {
  const dateValue = date?.value;
  const monthValue = month?.value;
  const yearValue = year?.value;
  if (dateValue && monthValue && yearValue) {
    return `${date.value}-${month.value}-${year.value}`;
  }
};

export const userRequestBody = (userInfo, password) => {
  return { ...userInfo, password: password };
};
