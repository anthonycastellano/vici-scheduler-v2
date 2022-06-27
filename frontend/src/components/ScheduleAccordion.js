import React, { useState, useEffect, useRef } from 'react';
import ScheduleAccordionItem from './ScheduleAccordionItem';
import { useSelector } from 'react-redux';

// styling
import './css/Accordion.scss';

const ACTIVE_ACCORDION_OFFSET = 100;

const getCurrentMonthIndex = (schedules) => {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    let index = 0;
    for (const schedule of schedules) {
        if (parseInt(schedule.month) === currentMonth && parseInt(schedule.year) === currentYear) {
            return index;
        }
        index++;
    }
    return 0;
};

const ScheduleAccordion = ({ schedules }) => {
    const [activeIndex, setActiveIndex] = useState(getCurrentMonthIndex(schedules));
    const activeItem = useRef();
    const employees = useSelector(state => state.employees);

    const getEmployeeNameFromID = (employeeID) => {
        const targetEmployee = employees.find((employee) => employee._id === employeeID);
        if (!targetEmployee) return 'Unknown';
        else return `${targetEmployee.firstName} ${targetEmployee.lastName}`
    };

    // convert employee IDs to full names
    const convertEmployees = (schedule) => {
        const convertedLeads = [];
        const convertedBackups = [];

        for (let i = 0; i < schedule.leads.length; i++) {
            convertedLeads.push(getEmployeeNameFromID(schedule.leads[i]));
            convertedBackups.push(getEmployeeNameFromID(schedule.backups[i]));
        }

        return {
            ...schedule,
            leads: convertedLeads,
            backups: convertedBackups
        };
    };

    const renderedSchedules = schedules.map((schedule, index) => {
        const showDescription = index === activeIndex;

        return (
            <ScheduleAccordionItem
                schedule={convertEmployees(schedule)}
                index={index}
                showDescription={showDescription}
                onClick={() => { setActiveIndex(index) }}
                activeItem={activeItem}
            />
        );
    });

    useEffect(() => {
        window.scrollTo({
            top: activeItem.current.offsetTop - ACTIVE_ACCORDION_OFFSET,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div>
            <dl>{renderedSchedules}</dl>
        </div>
    );
}

export default ScheduleAccordion;
