import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../apiHelpers/employees';
import CONSTANTS from '../store/constants';

// loading spinner
import LoadingDots from '../images/3-dots-moving.svg';

// components
import EmployeeAccordion from '../components/EmployeeAccordion';

// styling
import './css/Employees.scss';

const Employees = () => {
    const employees = useSelector(state => state.employees);
    const dispatch = useDispatch();

    useEffect(() => {
        // set active tab
        dispatch({ type: CONSTANTS.SET_ACTIVE_TAB_ACTION, activeTab: CONSTANTS.EMPLOYEES_TAB });

        if (employees.length) return;

        // fetch employees and update state
        getEmployees().then(({ data }) => {
            dispatch({ type: CONSTANTS.SET_EMPLOYEES_ACTION, employees: data });
        });
    });

    return (
        <div>
            <div className='employee-header'>
                <h1><b>Employees</b></h1>
            </div>
            {employees.length ?
                <EmployeeAccordion employees={employees} />
            :
                <img src={LoadingDots} alt='Loading...' />
            }
        </div>
    );
};

export default Employees;