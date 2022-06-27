// get month name from index
exports.getMonthString = (month) => {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString('en-US', {
        month: 'long'
    });
};

// get saturday dates for the month
exports.getSaturdays = (year, month) => {
    const saturdays = [];
    let day = 1;
    let date = new Date(year, month - 1, day);
    while (date.getMonth() === month - 1) {
        if (date.getDay() === 6) {
            saturdays.push(date.getDate());
            day += 7;
            date = new Date(year, month - 1, day);
            continue;
        }
        date = new Date(year, month - 1, ++day);
    }
    return saturdays;
};

// return index of current month in list of monthly schedules
exports.getCurrentMonthIndex = (schedules) => {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    let index = 0;
    for (const schedule of schedules) {
        if (parseInt(schedule.month) === currentMonth && parseInt(schedule.year) === currentYear) {
            return index;
        }
        index++;
    }
    return 0;
};