import React, { createContext, useContext, useState } from 'react';

const HomeSearchContext = createContext();

export const HomeSearchProvider = ({ children }) => {
  const [searchConditions, setSearchConditions] = useState({
    text: '',
    nBed: 0,
    dateStart: new Date(0),
    dateEnd: new Date(2099, 12, 31),
    priceStart: 0,
    priceEnd: Infinity,
    sortRate: 'Highest'
  });

  return (
    <HomeSearchContext.Provider value={{ searchConditions, setSearchConditions }}>
      {children}
    </HomeSearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(HomeSearchContext);
};
