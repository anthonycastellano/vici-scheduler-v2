import React, { useState, useEffect } from 'react';
import EmployeeAccordionItem from './EmployeeAccordionItem';

// css
import classes from './css/Accordion.module.css';

const EmployeeAccordion = ({employees}) => {
    const [activeIndex, setActiveIndex] = useState();

    const renderedEmployees = employees.map(((employee, index) => {
        const showDescription = index === activeIndex;

        return (
            <EmployeeAccordionItem 
                employee={employee}
                index={index}
                showDescription={showDescription}
                onClick={() => { setActiveIndex(index) }}
                key={`${employee._id}-item`}
            />
        );
    }));

    // negate scroll from schedule page
    useEffect(() => { window.scrollTo(0, 0) }, []);

    return (
        <div className={classes.employees}>
            <dl>{renderedEmployees}</dl>
        </div>
    )
};

export default EmployeeAccordion;