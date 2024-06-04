export const CalcPorc = (pNumber1: number, pNumber2: number): number => {
    return ((pNumber1 / pNumber2) * 100);
}

export const CalcLitros = (pNumber1: number, pNumber2: number): number => {
    return ((pNumber1 / pNumber2) / 100);
}

export const CalcTimeDiffDay = (dateFuture, dateNow): number => {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
    return Math.floor(diffInMilliSeconds / 86400);
}

export const convertStringToNumber = (value?: string): number => {
    if (isNaN(Number(value))) {
        return Number(value.replace(',', '.'));
    }
    return Number(value);
}

export const roundValue = (value: number): number => {
    return !!value ? Math.round(value * 100) / 100 : 1;
}

export const timeDiffCalc = (dateFuture, dateNow): number => {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
    // calculate days
    let days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let result = hours + (Number(minutes) / 60);

    if (days > 0) {
        days = days * 24;
        result = days + result;
    }
    return result;
}