import './App.css';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import {useState} from "react";
import {useMemo} from "react";

function findNextPrimeAgeYear(startingYear) {
    const primeList = findPrimeNumbers(120);
    for (let prime of primeList) {
        const nextPrimeAgeYear = startingYear + prime;
        if (nextPrimeAgeYear > dayjs().year()) {
            return "In year " + nextPrimeAgeYear + ", you will have a prime age of " + prime;
        }
    }
    return "Out of Rangee";
}

function findPrimeNumbers(upperLimit) {
    let primeList = [];
    for (let i=2; i<upperLimit; i++) {
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

function YearPicker({setBirthYear}) {
    const [error, setError] = useState(null);

    const errorMessage = useMemo(() => {
        switch (error) {
            case 'maxDate': {return 'You are not born yet...?'}
            case 'minDate': {
                return 'Are you sure you are this old?';
            }

            case 'invalidDate': {
                return 'Your date is not valid';
            }

            default: {
                return '';
            }
        }
    }, [error]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Choose Birth Year" views={['year']}
                        defaultValue={dayjs()}
                        minDate={dayjs().subtract(99, 'year')}
                        maxDate={dayjs()}
                        onError={(newError) => setError(newError)}
                        slotProps={{
                            textField: {
                                helperText: errorMessage,
                            },
                        }}
                        onChange={(value) => value ? setBirthYear(value.year()) : null}/>
        </LocalizationProvider>
    );
}

function App() {
    const [birthYear, setBirthYear] = useState(dayjs().year());
    const [result, setResult] = useState("");
    return (
    <div className="App">
      <header className="App-header">
        <h2>Prime Age Calculator</h2>
        <YearPicker birthYear={birthYear} setBirthYear={setBirthYear}/>
        <Button onClick={() => setResult(findNextPrimeAgeYear(birthYear))}>Calculate</Button>
        <h3 className={'selectedYear'}>{result}</h3>
      </header>
    </div>
    );
}

export default App;
