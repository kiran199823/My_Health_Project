import React, { createContext, useState } from 'react';
import '../index.scss';

export const MyHealthContext = createContext();

export const MyHealthProvider = ({ children }) => {
  const [theme, setTheme] = useState('Light');
  return (
    <div className={`${theme === 'Dark' ? 'darkTheme' : 'lightTheme'}`}>
      <MyHealthContext.Provider value={{ theme, setTheme }}>
        {children}
      </MyHealthContext.Provider>
    </div>
  );
};
