import './App.css';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import {useState} from "react";

function findNextPrimeAgeYear(startingYear) {
    const primeList = findPrimeNumbers();
    for (let prime of primeList) {
        const nextPrimeAgeYear = startingYear + prime;
        if (nextPrimeAgeYear >= dayjs().year()) {
            return "In year " + nextPrimeAgeYear + ", you will have a prime age of " + prime;
        }
    }
    return "Out of Rangee";
}

function findPrimeNumbers() {
    let primeList = [];
    for (let i=2; i<120; i++) {
        let isPrime = true;
        for (let j=i-1; j>1; j--) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primeList = [...primeList, i];
        }
    }
    return primeList;
}

function YearPicker({birthYear, setBirthYear}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Choose Birth Year" views={['year']}
                        disableFuture
                        minDate={dayjs().subtract(99, 'year')}
                        maxDate={dayjs()}
                        onYearChange={(value) => setBirthYear(value.year())}/>
            <h3 className={'selectedYear'}>{birthYear}</h3>
        </LocalizationProvider>
    );
}

function App() {
    const [birthYear, setBirthYear] = useState(dayjs().year());
    const [result, setResult] = useState("");
    return (
    <div className="App">
      <header className="App-header">
        <p><YearPicker birthYear={birthYear} setBirthYear={setBirthYear}/></p>
        <p><Button onClick={() => setResult(findNextPrimeAgeYear(birthYear))}>Calculate</Button></p>
        <h3 className={'selectedYear'}>{result}</h3>
      </header>
    </div>
    );
}

export default App;
