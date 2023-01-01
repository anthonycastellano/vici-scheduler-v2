import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CONSTANTS from '../store/constants';

// loading spinner
import LoadingDots from '../images/3-dots-moving.svg';

// components
import EmployeeAccordion from '../components/EmployeeAccordion';

// styling
import './css/Employees.scss';

const Employees = () => {
    const employees = useSelector(state => state.employees);
    const schedules = useSelector(state => state.schedules);
    const dispatch = useDispatch();

    useEffect(() => {
        // set active tab
        dispatch({ type: CONSTANTS.SET_ACTIVE_TAB_ACTION, activeTab: CONSTANTS.EMPLOYEES_TAB });

        // negate scroll from other pages
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            {employees ?
                <div>
                    {employees.length ?
                        <EmployeeAccordion employees={employees ? employees : []} schedules={schedules ? schedules : []}/>
                    :
                        <img src={LoadingDots} alt='Loading...' />
                    }

                </div>
            :
                <p>No employees created</p>
            }
        </div>
    );
};

export default Employees;
