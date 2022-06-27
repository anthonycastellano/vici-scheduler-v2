import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EmployeeAccordionItem from './EmployeeAccordionItem';
// import { getSaturdays } from '../helpers/calendarHelpers';

// styling
import './css/Accordion.scss';

// map each employee ID to a list of weekends and roles
const buildEmployeeUpcomingSchedules = (schedules) => {
    const employeeUpcomingScheduleMap = {};

    // for (const schedule of schedules) {
    //     // get saturday dates for current month
    //     const saturdayDates = getSaturdays(schedule.year, schedule.month);

    //     for (let i = 0; i < schedule.leads.length; i++) {
    //         const currentEmployees = [schedule.leads[i], schedule.backups[i]];
            
    //     }
    // }

    return employeeUpcomingScheduleMap;
};

const EmployeeAccordion = ({ employees }) => {
    const schedules = useSelector(state => state.schedules);
    const employeeUpcomingSchedules = buildEmployeeUpcomingSchedules(schedules);
    const [activeIndex, setActiveIndex] = useState();

    const renderedEmployees = employees.map(((employee, index) => {
        const showDescription = index === activeIndex;

        employee.schedules = employeeUpcomingSchedules[employee._id];

        return (
            <div key={`${employee._id}-item`}>
                <EmployeeAccordionItem 
                    employee={employee}
                    index={index}
                    showDescription={showDescription}
                    onClick={() => { setActiveIndex(index) }}
                />
            </div>
        );
    }));

    // negate scroll from schedule page
    useEffect(() => { window.scrollTo(0, 0) }, []);

    return (
        <div>
            <dl>{renderedEmployees}</dl>
        </div>
    )
};

export default EmployeeAccordion;