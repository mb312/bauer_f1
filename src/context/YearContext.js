import React, { createContext, useContext, useState } from 'react'

const YearContext = createContext();

export function YearProvider({ children }) {
    const currentYear = new Date().getFullYear();
    const startYear = 2025;
    const [year, setYear] = useState(currentYear >= startYear ? currentYear : startYear);
    return (
        <YearContext.Provider value={{ year, setYear }}>
            {children}
        </YearContext.Provider>
    );
}

export function useYearContext() {
  return useContext(YearContext);
}