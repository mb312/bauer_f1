import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const RaceContext = createContext();

async function fetchRacePodium(session_key, signal) {    
    const res = await fetch(
        `https://api.openf1.org/v1/session_result?session_key=${session_key}&position<=3`,
        { signal }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status} for session ${session_key}`);
    const data = await res.json();
    return data ?? null;
}

export function RaceProvider({ children }) {
    const [arrRaces, setRaceList] = useState([]);
    const [arrSessions, setSessionsList] = useState([]);
    const [bLoading, setLoading] = useState(true);
    const [arrPodium, setPodium] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        const loadData = async () => {
            try {
                const nYear = new Date().getFullYear();
                const URL_RACES = `https://api.openf1.org/v1/sessions?year=${nYear}`;
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
        return () => controller.abort();
    }, []);

     const arrPastRaces = useMemo(() => {
        const now = new Date();
        return arrRaces
            .filter(o => new Date(o.date_end) < now)
            .sort((a, b) => new Date(b.date_end) - new Date(a.date_end));
    }, [arrRaces]);

    useEffect(() => {
        if (arrPastRaces.length === 0) return;

        const controller = new AbortController();
        const loadPodium = async () => {
            try {
                const results = await Promise.allSettled(arrPastRaces.map(race =>fetchRacePodium(race.session_key, controller.signal)));
                
                const raceDetail = results.map((result, i) => ({
                    race: arrPastRaces[i],
                    podiumSitter: result.status === 'fulfilled' ? result.value : null,
                }));

                setPodium(raceDetail);
            } catch (e) {
                if (e.name !== 'AbortError') console.error(e);
            }
        };

        loadPodium();
        return () => controller.abort();
    },[arrPastRaces])

    return (
        <RaceContext.Provider value={{ arrRaces, bLoading, arrSessions, arrPodium }}>
            {children}
        </RaceContext.Provider>
    )
}

export function useRaceList() {
    return useContext(RaceContext);
}