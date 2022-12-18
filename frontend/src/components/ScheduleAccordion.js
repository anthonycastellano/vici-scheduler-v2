import React, { useState, useEffect, useRef } from 'react';
import { getCurrentMonthIndex } from '../helpers/calendarHelpers';
import { useSelector } from 'react-redux';
import { convertEmployees } from '../helpers/helpers';

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

    const renderedSchedules = schedules.map((schedule, index) => {
        const showDescription = index === activeIndex;
        return (
            <div key={`${schedule._id}-item`}>
                <ScheduleAccordionItem
                    schedule={convertEmployees(schedule, employees)}
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
