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
    console.log(index);
    return 0;
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
        const ariaExpanded = index === activeIndex ? 'true' : 'false';

        return (
            <ScheduleAccordionItem
                schedule={schedule}
                index={index}
                showDescription={showDescription}
                onClick={() => {
                    setActiveIndex(index);
                }}
                key={`${schedule.month}/${schedule.year}`}
                activeItem={activeItem}
                ariaExpanded={ariaExpanded}
            />
        );
    });

    return (
        <div>
            <d1>{renderedSchedules}</d1>
        </div>
    );
}

export default ScheduleAccordion;
