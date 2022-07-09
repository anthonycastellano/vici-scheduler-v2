import React, { useState, useEffect } from 'react';
import { getSaturdays, getCurrentMonthIndex } from '../helpers/calendarHelpers';
import { useSelector } from 'react-redux';

// styling
import './css/Accordion.scss';

// components
import EmployeeAccordionItem from './EmployeeAccordionItem';

const PRIMARY = 'Primary';
const SECONDARY = 'Secondary';

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

            const leadWeekElement = [`${schedule.month}/${saturdayDates[i]}`, PRIMARY];
            const backupWeekElement = [`${schedule.month}/${saturdayDates[i]}`, SECONDARY];

            employeeUpcomingScheduleMap[currentLead] ?
                employeeUpcomingScheduleMap[currentLead].push(leadWeekElement)
                :
                employeeUpcomingScheduleMap[currentLead] = [leadWeekElement];

            employeeUpcomingScheduleMap[currentBackup] ?
                employeeUpcomingScheduleMap[currentBackup].push(backupWeekElement)
                :
                employeeUpcomingScheduleMap[currentBackup] = [backupWeekElement];
        }
    }

    return employeeUpcomingScheduleMap;
};

const EmployeeAccordion = ({ employees, schedules }) => {
    const employeeUpcomingSchedules = buildEmployeeUpcomingSchedules(schedules);
    const [activeIndex, setActiveIndex] = useState();
    const loggedIn = useSelector(state => state.loggedIn);

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
