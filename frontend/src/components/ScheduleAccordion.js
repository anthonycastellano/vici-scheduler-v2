import React, { useState, useEffect, useRef } from 'react';
import { getCurrentMonthIndex } from '../helpers/calendarHelpers';
import { useSelector } from 'react-redux';

// styling
import './css/Accordion.scss';

// components
import ScheduleAccordionItem from './ScheduleAccordionItem';


const ACTIVE_ACCORDION_OFFSET = 100;


const ScheduleAccordion = ({ schedules, employees }) => {
    const currentMonthIdx = getCurrentMonthIndex(schedules);
    const [activeIndex, setActiveIndex] = useState(currentMonthIdx);
    const activeItem = useRef();
    const loggedIn = useSelector(state => state.loggedIn);

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
            backups: convertedBackups,
            leadIds: schedule.leads,
            backupIds: schedule.backups
        };
    };

    const renderedSchedules = schedules.map((schedule, index) => {
        const showDescription = index === activeIndex;
        return (
            <div key={`${schedule._id}-item`}>
                <ScheduleAccordionItem
                    schedule={convertEmployees(schedule)}
                    showDescription={showDescription}
                    onClick={() => { setActiveIndex(index) }}
                    activeItem={activeItem}
                    loggedIn={loggedIn}
                    isCurrentMonth={currentMonthIdx === index}
                />
            </div>
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
};

export default ScheduleAccordion;
