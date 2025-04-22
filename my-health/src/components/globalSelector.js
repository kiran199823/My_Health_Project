import { createSelector } from 'reselect';

export const getlocalUserId = () => {
  const userId = localStorage.getItem('user');
  console.log('userId: ', userId);
  return userId ?? '';
};
