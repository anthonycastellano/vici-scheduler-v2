import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import EmployeeAccordionItem from './EmployeeAccordionItem';

// styling
import './css/Accordion.scss';

// map each employee ID to a list of weekends
const getEmployeeUpcomingSchedules = (schedules) => {
    const employeeUpcomingScheduleMap = {};

    for (const schedule of schedules) {

    }
};

const EmployeeAccordion = ({employees}) => {
    // const schedules = useSelector(state => state.schedules);
    const [activeIndex, setActiveIndex] = useState();

    const renderedEmployees = employees.map(((employee, index) => {
        const showDescription = index === activeIndex;

        //temp
        employee.schedules = [1,2,4];

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