import React, { useState } from 'react';
import { getSaturdays, getCurrentMonthIndex } from '../helpers/calendarHelpers';
import { useSelector } from 'react-redux';
import CONSTANTS from '../store/constants';

// styling
import './css/Accordion.scss';

// components
import EmployeeAccordionItem from './EmployeeAccordionItem';

// map each employee ID to a list of weekends and roles
const buildEmployeeUpcomingSchedules = (schedules) => {
    // trim past schedules
    const currentMonthIndex = getCurrentMonthIndex(schedules);
    schedules = schedules.slice(currentMonthIndex);

    const employeeUpcomingScheduleMap = {};

    for (const schedule of schedules) {
        // get saturday dates for current month
        const saturdayDates = getSaturdays(schedule.year, schedule.month);

        for (let i = 0; i < schedule.leads.length; i++) {
            const currentLead = schedule.leads[i];
            const currentBackup = schedule.backups[i];

            const leadWeekElement = [`${schedule.month}/${saturdayDates[i]}`, CONSTANTS.PRIMARY];
            const backupWeekElement = [`${schedule.month}/${saturdayDates[i]}`, CONSTANTS.SECONDARY];

            employeeUpcomingScheduleMap[currentLead] ?
                employeeUpcomingScheduleMap[currentLead].push(leadWeekElement)
                :
                employeeUpcomingScheduleMap[currentLead] = [leadWeekElement];

            employeeUpcomingScheduleMap[currentBackup] ?
                employeeUpcomingScheduleMap[currentBackup].push(backupWeekElement)
                :
                employeeUpcomingScheduleMap[currentBackup] = [backupWeekElement];

            // handle schedules with assists
            if (schedule.assists) {
                const currentAssist = schedule.assists[i];
                const assistWeekElement = [`${schedule.month}/${saturdayDates[i]}`, CONSTANTS.ASSIST]
                employeeUpcomingScheduleMap[currentAssist] ?
                    employeeUpcomingScheduleMap[currentAssist].push(assistWeekElement)
                    :
                    employeeUpcomingScheduleMap[currentAssist] = [assistWeekElement];
            }
        }
    }

    return employeeUpcomingScheduleMap;
};

const EmployeeAccordion = () => {
    const employees = useSelector(state => state.employees);
    const schedules = useSelector(state => state.schedules);
    const loggedIn = useSelector(state => state.loggedIn);

    const employeeUpcomingSchedules = schedules ? buildEmployeeUpcomingSchedules(schedules) : {};
    const [activeIndex, setActiveIndex] = useState();

    const renderedEmployees = employees.map(((employee, index) => {
        const showDescription = index === activeIndex;

        employee.upcomingSchedules = employeeUpcomingSchedules[employee._id];

        return (
            <div key={`${employee._id}-item`}>
                <EmployeeAccordionItem 
                    employee={employee}
                    showDescription={showDescription}
                    onClick={() => { setActiveIndex(index) }}
                    loggedIn={loggedIn}
                />
            </div>
        );
    }));

    return (
        <div>
            <dl>{renderedEmployees}</dl>
        </div>
    )
};

export default EmployeeAccordion;
