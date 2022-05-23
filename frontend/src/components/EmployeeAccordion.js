import React, { useState, useEffect, useRef } from 'react';
import EmployeeAccordionItem from './EmployeeAccordionItem';

// css
import classes from './css/Accordion.module.css';

const EmployeeAccordion = ({
    employees
}) => {
    const renderedEmployees = employees.map(((employee, index) => {
        
    }));

    return (
        <div>
            {renderedEmployees}
        </div>
    )
};

export default EmployeeAccordion;