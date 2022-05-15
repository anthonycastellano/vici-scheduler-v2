import React, { useState } from 'react';
import ScheduleAccordionItem from './ScheduleAccordionItem';

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
    console.log(getCurrentMonthIndex(schedules))
    const [activeIndex, setActiveIndex] = useState(getCurrentMonthIndex(schedules));

    const renderedSchedules = schedules.map((schedule, index) => {
        const showDescription = index === activeIndex ? "show-description": "";
        const ariaExpanded = index === activeIndex ? "true" : "false";

        return (
            <ScheduleAccordionItem
                schedule={schedule}
                index={index}
                showDescription={showDescription}
                ariaExpanded={ariaExpanded}
                onClick={() => {
                    setActiveIndex(index);
                }}
                key={`${schedule.month}/${schedule.year}`}
            />
        );
    });

    return (
        <div className='schedules'>
            {renderedSchedules}
        </div>
    );
}

export default ScheduleAccordion;