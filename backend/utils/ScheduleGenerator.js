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
        backups: ['3','2','1','4','1']
    }
]

const ALPHA_INIT = 100;
const ALPHA_GROWTH_RATE = 1.2;
const LEAD_COEF = 0.5;
const BACKUP_COEF = 0.8;

const sortingFunction = (s) => s.month + (s.year * 12);

class ScheduleGenerator {
    constructor(schedules) {
        this.schedules = _.sortBy(schedules, [sortingFunction]);
    }

    // generate a schedule given month, year, and list of employees
    createNewSchedule(month, year, employees) {
        const indexToInsert = _.sortedIndexBy(this.schedules, { month, year }, sortingFunction);
        this.schedules = _.slice(this.schedules, 0, indexToInsert);

        // get num of Saturdays in month
        const sats = 4;

        // schedule employees using probabilities for each weekend, update probability after selection
        const leads = [];
        const backups = [];
        for (let i = 0; i < sats; i++) {

        }

        return {
            month,
            year,
            leads,
            backups
        }
    }

    buildEmployeeRecentScores(employees) {
        const scores = {};
        let alpha = ALPHA_INIT;
        for (let i = this.schedules.length - 1; i >= 0; i--) {
            currentSchedule = this.schedules[i];
            for (let j = currentSchedule.leads.length - 1; j > 0; j--) {
                // increment score for lead
                currentLead = currentSchedule.leads[j];
                if (scores[currentLead]) {
                    scores[currentLead] 
                } else {
                    scores[currentLead] 
                }

                currentBackup = currentSchedule.backups[j];
            }
            alpha *= ALPHA_GROWTH_RATE;
        }
    }
}

const g = new ScheduleGenerator(dummySchedules);
console.log(g.createNewSchedule(3, 2022, ['1','2','3','4','5']));