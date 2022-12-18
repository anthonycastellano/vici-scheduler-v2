export function scheduleCompareFn(schedule1, schedule2) {
    return schedule1.year > schedule2.year ||  (schedule1.year === schedule2.year && schedule1.month > schedule2.month) ?  1 : -1;
};

const getEmployeeNameFromID = (employeeID, employees) => {
    const targetEmployee = employees.find((employee) => employee._id === employeeID);
    if (!targetEmployee) return 'Unknown';
    else return `${targetEmployee.firstName} ${targetEmployee.lastName}`
};

// convert employee IDs to full names
export function convertEmployees(schedule, employees) {
    const convertedLeads = [];
    const convertedBackups = [];

    for (let i = 0; i < schedule.leads.length; i++) {
        convertedLeads.push(getEmployeeNameFromID(schedule.leads[i], employees));
        convertedBackups.push(getEmployeeNameFromID(schedule.backups[i], employees));
    }

    return {
        ...schedule,
        leads: convertedLeads,
        backups: convertedBackups,
        leadIds: schedule.leads,
        backupIds: schedule.backups
    };
};
