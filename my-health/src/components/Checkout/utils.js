export const calculateGST = (fee, percentage = 9) => {
  return (percentage / 100) * fee;
};

export const calculateTotal = (fee, CGST, SGST) => {
  return fee + CGST + SGST;
};
