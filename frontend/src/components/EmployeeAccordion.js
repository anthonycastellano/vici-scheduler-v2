import React, { useState, useEffect } from 'react';
import EmployeeAccordionItem from './EmployeeAccordionItem';

// styling
import './css/Accordion.scss';

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
                title={`${employee.firstName} ${employee.lastName}`}
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