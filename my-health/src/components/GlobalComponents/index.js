import React from 'react';
import GlobalHeaders from '../GlobalHeaders';
import { useLocation } from 'react-router-dom';

const GlobalComponents = () => {
  const { pathname } = useLocation();
  const isAccountPath =
    pathname === '/signin' || pathname === '/create-account';

  return <>{!isAccountPath && <GlobalHeaders />}</>;
};

export default GlobalComponents;
