import React, { useState, useEffect, useRef } from 'react';
import { getCurrentMonthIndex } from '../helpers/calendarHelpers';
import { useSelector } from 'react-redux';
import { convertEmployees } from '../helpers/helpers';

// styling
import './css/Accordion.scss';

// components
import ScheduleAccordionItem from './ScheduleAccordionItem';


const ACTIVE_ACCORDION_OFFSET = 100;


const ScheduleAccordion = () => {
    const employees = useSelector(state => state.employees);
    const schedules = useSelector(state => state.schedules);
    const loggedIn = useSelector(state => state.loggedIn);
    
    const currentMonthIdx = getCurrentMonthIndex(schedules);
    const [activeIndex, setActiveIndex] = useState(currentMonthIdx);
    const activeItem = useRef();

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
        let cancelled = false;

        const scrollToActive = () => {
            if (cancelled || !activeItem.current) return;
            // getBoundingClientRect instead of offsetTop: offsetTop is relative to
            // the nearest positioned/transformed ancestor, and the entrance
            // animations give ancestors a transform, which would break it
            const rect = activeItem.current.getBoundingClientRect();
            window.scrollTo({
                top: rect.top + window.scrollY - ACTIVE_ACCORDION_OFFSET,
                behavior: 'smooth'
            });
        };

        // wait for webfonts before measuring: the Roboto swap changes table
        // row heights after mount, which would clamp the smooth scroll short
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => requestAnimationFrame(scrollToActive));
        } else {
            requestAnimationFrame(scrollToActive);
        }

        return () => { cancelled = true; };
    }, []);

    return (
        <div>
            <dl>{renderedSchedules}</dl>
        </div>
    );
};

export default ScheduleAccordion;
