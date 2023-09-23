import './App.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import {useState} from "react";
import {useMemo} from "react";

function findNextPrimeAgeYear(startingYear) {
    if (!startingYear) return "Please choose a valid birth year";
    const primeList = findPrimeNumbers(120);
    for (let prime of primeList) {
        const nextPrimeAgeYear = startingYear + prime;
        if (nextPrimeAgeYear > dayjs().year()) {
            return "In year " + nextPrimeAgeYear + ", you will have a prime age of " + prime;
        }
    }
    return "Out of Range";
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
    const maxYear = dayjs();
    const minYear = dayjs().subtract(99, 'year');

    const [error, setError] = useState(null);

    const errorMessage = useMemo(() => {
        switch (error) {
            case 'maxDate': {
                return 'You are not born yet...?';
            }

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
                        minDate={minYear}
                        maxDate={maxYear}
                        onError={(newError) => {
                            setError(newError);
                        }}
                        slotProps={{
                            textField: {
                                helperText: errorMessage,
                            },
                        }}
                        onChange={(value) =>
                            setBirthYear(
                                (value?.year() >= (minYear.year()) &&
                                (value?.year() <= (maxYear.year()))) ? value.year() : null)}/>
        </LocalizationProvider>
    );
}

function App() {
    const [result, setResult] = useState("");
    return (
    <div className="App">
      <header className="App-header">
        <h2>Prime Age Calculator</h2>
        <YearPicker setBirthYear={(birthYear) => setResult(findNextPrimeAgeYear(birthYear))}/>
        <br />
        <h3 className={'selectedYear'}>{result}</h3>
      </header>
    </div>
    );
}

export default App;
