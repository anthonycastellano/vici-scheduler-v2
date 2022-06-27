import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CONSTANTS from '../store/constants'

// loading spinner
import LoadingDots from '../images/3-dots-moving.svg';

// styling
import './css/Schedules.scss';

// components
import ScheduleAccordion from '../components/ScheduleAccordion';

const Schedules = () => {
    const schedules = useSelector(state => state.schedules);
    const employees = useSelector(state => state.employees);
    const dispatch = useDispatch();

    useEffect(() => {
        // set active tab
        dispatch({ type: CONSTANTS.SET_ACTIVE_TAB_ACTION, activeTab: CONSTANTS.SCHEDULES_TAB });
    }, []);

    return (
        <div>
            {schedules.length ?
                <ScheduleAccordion schedules={schedules} employees={employees}/>
            :
                <img src={LoadingDots} alt='Loading...' />
            }
        </div>
    );
};

export default Schedules;
