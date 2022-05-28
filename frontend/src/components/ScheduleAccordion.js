import React, { useState, useEffect, useRef } from 'react';
import ScheduleAccordionItem from './ScheduleAccordionItem';

// css
import classes from './css/Accordion.module.css';

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
            />
        );
    });

    return (
        <div className={classes.schedules}>
            <d1>{renderedSchedules}</d1>
        </div>
    );
}

export default ScheduleAccordion;
