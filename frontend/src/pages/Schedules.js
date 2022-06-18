import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSchedules } from '../apiHelpers/schedule';
import { useDispatch } from 'react-redux';
import CONSTANTS from '../store/constants'

// loading spinner
import LoadingDots from '../images/3-dots-moving.svg';

// styling
import './css/Schedules.scss';

// components
import ScheduleAccordion from '../components/ScheduleAccordion';

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
            dispatch({ type: CONSTANTS.SET_SCHEDULES_ACTION, schedules: data });
        });
    }, []);

    return (
        <div>
            <div className='schedule-header'>
                <h1><b>Schedules</b></h1>
            </div>
            {schedules.length ?
                <ScheduleAccordion schedules={schedules} />
            :
                <img src={LoadingDots} alt='Loading...' />
            }
        </div>
    );
};

export default Schedules;
