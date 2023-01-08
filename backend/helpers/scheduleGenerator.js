// get # of Saturdays in month
const getNumSaturdays = (month, year) => {
    let saturdayCount = 0;
    let day = 1;
    let date = new Date(year, month - 1, day);
    while (date.getMonth() === month - 1) {
        if (date.getDay() === 6) {
            saturdayCount++;
            day += 7;
            date = new Date(year, month - 1, day);
            continue;
        }
        date = new Date(year, month - 1, ++day);
    }
    return saturdayCount;
};

const chooseRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// generate a schedule given existing month, year, and list of employees
exports.createNewSchedule = (month, year, employees, withAssists) => {
    const newSchedule = {
        month,
        year,
        leads: [],
        backups: []
    };

    if (withAssists) newSchedule.assists = [];
    
    const saturdays = getNumSaturdays(month, year);

    for (let i = 0; i < saturdays; i++) {
        // choose lead
        let newLead = chooseRandom(employees);
        // decrease probability of getting chosen as lead 2 times in a schedule
        if (newSchedule.leads.includes(newLead)) newLead = chooseRandom(employees);
        newSchedule.leads.push(newLead);

        // choose backup
        const newBackup = chooseRandom(employees.filter(e => e != newLead));
        newSchedule.backups.push(newBackup);

        // choose assist
        if (withAssists) {
            const newAssist = chooseRandom(employees.filter(e => e != newLead && e != newBackup));
            newSchedule.assists.push(newAssist);
        }
    }

    return newSchedule;
}