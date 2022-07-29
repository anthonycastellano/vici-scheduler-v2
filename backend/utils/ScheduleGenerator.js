const _ = require('lodash');

const dummySchedules = [
    {
        month: 1,
        year: 2022,
        leads: ["6240b97df411b90a47bfe4d3",
		"6240b985f411b90a47bfe4d4",
		"6240b989f411b90a47bfe4d5",
		"6240b98df411b90a47bfe4d6"],
        backups: ["6240b98df411b90a47bfe4d6",
		"6240b991f411b90a47bfe4d7",
		"6240b97df411b90a47bfe4d3",
		"6240b989f411b90a47bfe4d5"]
    },
    {
        month: 3,
        year: 2022,
        leads: [],
        backups: []
    },
    {
        month: 2,
        year: 2022,
        leads: [],
        backups: []
    }
]

const sortingFunction = (s) => s.month + s.year * 12;

class ScheduleGenerator {
    constructor(schedules) {
        this.schedules = _.sortBy(schedules, [sortingFunction]);
    }

    getSchedules() {
        return this.schedules;
    }

    // Generate a schedule given a month and year using scheduling probabilities, updating probabilities between weeks
    createNewSchedule(month, year, employees) {
        const indexToInsert = _.sortedIndexBy(this.schedules, { month, year }, sortingFunction);
        this.schedules = _.slice(this.schedules, 0, indexToInsert).concat([{
            month,
            year,
            leads: [],
            backups: []
        }]).concat();
        console.log(this.schedules);
    }

    // get 4 previous weeks
    // get full list of employees
    // traverse months backwards building queue of employees
    // queue used when scheduling
    buildRecentObject(month, year) {
        const recents = {};
        let runningWeeks = 0;
        for (let i = this.schedules.length - 1; i >= 0; i--) {
            for (let j = this.schedules[i].leads.length - 1; i > 0; i--) {
                let empObj = this.schedules[i].leads
            }
        }
    }
}

const g = new ScheduleGenerator(dummySchedules);
// g.createNewSchedule(4, 2022);