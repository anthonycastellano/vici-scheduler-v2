import React, { useState, useEffect, useRef } from 'react';
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

    return (
        <div className={classes.employees}>
            {renderedEmployees}
        </div>
    )
};

export default EmployeeAccordion;