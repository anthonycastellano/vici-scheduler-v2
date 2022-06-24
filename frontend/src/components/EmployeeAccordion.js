import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EmployeeAccordionItem from './EmployeeAccordionItem';

// styling
import './css/Accordion.scss';

// map each employee ID to a list of weekends and roles
const buildEmployeeUpcomingSchedules = (schedules) => {
    const employeeUpcomingScheduleMap = {};

    for (const schedule of schedules) {

    }

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
            <EmployeeAccordionItem 
                employee={employee}
                index={index}
                showDescription={showDescription}
                onClick={() => { setActiveIndex(index) }}
            />
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