import React, { useState } from 'react';
import ScheduleAccordionItem from './ScheduleAccordionItem';

const ScheduleAccordion = ({ schedules }) => {
    const [activeIndex, setActiveIndex] = useState(0);

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