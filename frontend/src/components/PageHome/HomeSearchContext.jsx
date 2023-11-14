import React, { createContext, useContext, useState } from 'react';

const HomeSearchContext = createContext();

export const HomeSearchProvider = ({ children }) => {
  const [searchConditions, setSearchConditions] = useState({
    text: '',
    nBed: 0,
    dateStart: null,
    dateEnd: null,
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
