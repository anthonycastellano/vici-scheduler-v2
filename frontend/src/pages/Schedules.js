import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSchedules } from '../apiHelpers/schedule';
import { useDispatch } from 'react-redux';

// components
import ScheduleAccordion from '../components/ScheduleAccordion';

const Schedules = () => {
    const schedules = useSelector(state => state.schedules);
    const dispatch = useDispatch();

    useEffect(() => {
        if (schedules.length) return;

        // fetch schedules and update state
        getSchedules().then(({ data }) => {
          dispatch({ type: 'setSchedules', schedules: data });
        });
    }, [dispatch]);

    return (
        <div>
            <h1>Schedules</h1>
            {schedules ?
                <ScheduleAccordion schedules={schedules} />
            :
                <p>Loading schedules...</p>
            }
        </div>
    );
};

export default Schedules;
