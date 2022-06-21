import React, { useState, useEffect, useRef } from 'react';
import ScheduleAccordionItem from './ScheduleAccordionItem';

// styling
import './css/Accordion.scss';

const ACTIVE_ACCORDION_OFFSET = 90;

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

const getMonthString = (month) => {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString('en-US', {
        month: 'long'
    });
};

const ScheduleAccordion = ({ schedules }) => {
    const [activeIndex, setActiveIndex] = useState(getCurrentMonthIndex(schedules));
    const activeItem = useRef();

    useEffect(() => {
        window.scrollTo({
            top: activeItem.current.offsetTop - ACTIVE_ACCORDION_OFFSET,
            behavior: 'smooth'
        });
    }, []);

    const renderedSchedules = schedules.map((schedule, index) => {
        const showDescription = index === activeIndex;

        return (
            <ScheduleAccordionItem
                schedule={schedule}
                index={index}
                showDescription={showDescription}
                onClick={() => { setActiveIndex(index) }}
                title={`${getMonthString(schedule.month)} ${schedule.year}`}
                activeItem={activeItem}
            />
        );
    });

    return (
        <div>
            {renderedSchedules}
        </div>
    );
}

export default ScheduleAccordion;
