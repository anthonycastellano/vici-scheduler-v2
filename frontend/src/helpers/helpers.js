import CONSTANTS from "../store/constants";

export function scheduleCompareFn(schedule1, schedule2) {
    return schedule1.year > schedule2.year ||  (schedule1.year === schedule2.year && schedule1.month > schedule2.month) ?  1 : -1;
};

const getEmployeeNameFromID = (employeeID, employees) => {
    const targetEmployee = employees.find((employee) => employee._id === employeeID);
    if (!targetEmployee) return CONSTANTS.UNASSIGNED;
    else return `${targetEmployee.firstName} ${targetEmployee.lastName}`
};

// convert employee IDs to full names
export function convertEmployees(schedule, employees) {
    const convertedLeads = [];
    const convertedBackups = [];
    let convertedAssists;
    if (schedule.assists) convertedAssists = [];

    for (let i = 0; i < schedule.leads.length; i++) {
        convertedLeads.push(getEmployeeNameFromID(schedule.leads[i], employees));
        convertedBackups.push(getEmployeeNameFromID(schedule.backups[i], employees));
        if (convertedAssists) convertedAssists.push(getEmployeeNameFromID(schedule.assists[i], employees));
    }

    return {
        ...schedule,
        leads: convertedLeads,
        backups: convertedBackups,
        assists: convertedAssists,
        leadIds: schedule.leads,
        backupIds: schedule.backups,
        assistIds: schedule.assists
    };
};
