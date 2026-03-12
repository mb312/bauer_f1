import React, { createContext, useContext, useEffect, useState } from 'react'
import { useYearContext } from './YearContext';
const RaceContext = createContext();

export function RaceProvider({ children }) {
    const { year } = useYearContext();
    const [arrRaces, setRaceList] = useState([]);
    const [arrSessions, setSessionsList] = useState([]);
    const [bLoading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const nYear = new Date().getFullYear();
                const URL_RACES = `https://api.openf1.org/v1/sessions?year=${nYear}`; //`https://api.jolpi.ca/ergast/f1/${nYear}/races/`;
                let res = await fetch(URL_RACES);                
                let data = await res.json();
                let arrDisplayRaces = data.filter((oItem) => oItem.session_name === "Race");
                setRaceList(arrDisplayRaces);
                setSessionsList(data);
            } catch (e) {
                console.error(e);
                setRaceList([]);
                setSessionsList([]);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return (
        <RaceContext.Provider value={{ arrRaces, bLoading, arrSessions }}>
            {children}
        </RaceContext.Provider>
    )
}

export function useRaceList() {
    return useContext(RaceContext);
}