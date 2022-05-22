import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSchedules } from '../apiHelpers/schedule';
import { useDispatch } from 'react-redux';

// components
import ScheduleAccordion from '../components/ScheduleAccordion';

// css
import classes from './css/Schedules.module.css';

const scheduleCompareFn = (schedule1, schedule2) => {
    return schedule1.year > schedule2.year ||  (schedule1.year === schedule2.year && schedule1.month > schedule2.month) ?  1 : -1;
};

const Schedules = () => {
    const schedules = useSelector(state => state.schedules);
    const dispatch = useDispatch();

    useEffect(() => {
        if (schedules.length) return;
        // fetch schedules and update state
        getSchedules().then(({ data }) => {
            data.sort(scheduleCompareFn);
            dispatch({ type: 'setSchedules', schedules: data });
        });
    }, []);

    return (
        <div>
            <div className={classes.header}>
                <h1><b>Schedules</b></h1>
            </div>
            {schedules.length ?
                <ScheduleAccordion schedules={schedules} />
            :
                <p>Loading...</p>
            }
        </div>
    );
};

export default Schedules;
