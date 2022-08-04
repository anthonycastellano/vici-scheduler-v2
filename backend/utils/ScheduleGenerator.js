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

const ALPHA_INIT = 1;
const ALPHA_GROWTH_RATE = 1.2;
const LEAD_COEF = 0.5;
const BACKUP_COEF = 1;
const UNSCHEDULED_MULTIPLIER = 2;

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
            const employeeProbabilities = this.buildEmployeeProbabilities(employees);

            // choose lead
            const newLead = this.chooseEmployee(employees, employeeProbabilities);
            newSchedule.leads.push(newLead);

            // set lead probability to 0 (unless only 1 employee)
            if (employees.length >  1) employeeProbabilities[newLead] = 0;

            // choose backup
            const newBackup = this.chooseEmployee(employees, employeeProbabilities);
            newSchedule.backups.push(newBackup);
        }

        return newSchedule;
    }

    buildEmployeeProbabilities(employees) {
        const scores = {};
        let alpha = ALPHA_INIT;
        let maxScore = 0;

        for (let i = this.schedules.length - 1; i >= 0; i--) {
            const currentSchedule = this.schedules[i];
            for (let j = currentSchedule.leads.length - 1; j > 0; j--) {
                const currentLead = currentSchedule.leads[j];
    	        if (employees.includes(currentLead)) {
                    // increment score for lead
                    if (!scores[currentLead]) {
                        scores[currentLead] = alpha * LEAD_COEF; 
                    }
                    maxScore = Math.max(maxScore, scores[currentLead]);
                }

                const currentBackup = currentSchedule.backups[j];
                if (employees.includes(currentBackup)) {
                    // increment score for backup
                    if (!scores[currentBackup]) {
                        scores[currentBackup] = alpha * BACKUP_COEF;
                    } 
                    maxScore = Math.max(maxScore, scores[currentBackup]);
                }

                // increase alpha value
                alpha *= ALPHA_GROWTH_RATE;
            }
        }

        // set scores for unscheduled employees
        for (const employee of employees) {
            if (!scores[employee]) scores[employee] = maxScore * UNSCHEDULED_MULTIPLIER;
        }
        return scores;
    }

    chooseEmployee(employees, probabilities) {
        return employees[0];
    }
}

const g = new ScheduleGenerator(dummySchedules);
console.log(g.createNewSchedule(3, 2022, ['1','2','3','4','5','10']));
