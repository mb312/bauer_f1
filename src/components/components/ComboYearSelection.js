import React from 'react';
import { useYearContext } from '../../context/YearContext';

function ComboYearSelection() {
    const {year, setYear} = useYearContext();
    const START_YEAR = 2025;
    const nCurrentYear = new Date().getFullYear();
    const arrYears = Array.from({ length: Math.max(nCurrentYear - START_YEAR + 1, 1) }, (_, index) => START_YEAR + index);
    
    return (
        <div>
        <select id='year' value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {arrYears.map((nYear) =>(
                <option key={nYear} value={nYear}>
                    {nYear}
                </option>
            ))}
        </select>
        </div>
    )
}

export default ComboYearSelection