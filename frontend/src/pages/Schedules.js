import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSchedules } from '../apiHelpers/schedule';
import { useDispatch } from 'react-redux';

// components
import ScheduleAccordion from '../components/ScheduleAccordion';

// css
import classes from './css/Schedules.module.css';

const Schedules = () => {
    const schedules = useSelector(state => state.schedules);
    const dispatch = useDispatch();

    useEffect(() => {
      // fetch schedules and update state
      getSchedules().then(({ data }) => {
        dispatch({ type: 'setSchedules', schedules: data });
      });
    }, []);

    return (
        <div>
            <h1>Schedule List</h1>
            {schedules ?
                <ScheduleAccordion schedules={schedules} />
            :
                <p>Loading Schedules...</p>
            }
        </div>
    );
};

export default Schedules;