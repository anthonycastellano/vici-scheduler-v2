const _ = require('lodash');

const dummySchedules = [
    {
        month: 1,
        year: 2022,
        leads: ["1","2","7","2"],
        backups: ["4","5","2","1"]
    },
    {
        month: 4,
        year: 2022,
        leads: ['3','2','1','4','1'],
        backups: ['1','1','2','3','4']
    },
    {
        month: 2,
        year: 2022,
        leads: ['1','1','2','3','4'],
        backups: ['3','2','10','4','1']
    }
]

const sortingFunction = (s) => s.month + (s.year * 12);

class ScheduleGenerator {
    constructor(schedules) {
        this.schedules = _.sortBy(schedules, [sortingFunction]);
    }

    // generate a schedule given month, year, and list of employees
    createNewSchedule(month, year, employees) {
        const indexToInsert = _.sortedIndexBy(this.schedules, { month, year }, sortingFunction);
        this.schedules = _.slice(this.schedules, 0, indexToInsert);
        this.schedules.push({
            month,
            year,
            leads: [],
            backups: []
        });
        const newSchedule = this.schedules[indexToInsert];

        // TODO: get num of Saturdays in month
        const saturdays = 4;

        for (let i = 0; i < saturdays; i++) {
            // choose lead
            let newLead = _.sample(employees);
            // decrease probability of getting chosen 2 times in a schedule
            if (newSchedule.leads.includes(newLead)) newLead = _.sample(employees);
            newSchedule.leads.push(newLead);

            // choose backup
            const newBackup = _.sample(employees.filter(e => e != newLead));
            newSchedule.backups.push(newBackup);
        }

        return newSchedule;
    }
}

const g = new ScheduleGenerator(dummySchedules);

let count = 0;
for (let i = 0; i < 1000; i++) {
    let s = g.createNewSchedule(3, 2022, ['1','2','3','4','5','10']);
    let obj = {};
    for (const e of s.leads) {
        if (obj[e]) {
            count++;
            break;
        }
        else obj[e] = true;
    }
}
console.log(count/1000);
