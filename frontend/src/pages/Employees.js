import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getEmployees } from '../apiHelpers/employees';
import { useDispatch } from 'react-redux';
import CONSTANTS from '../store/constants';

// components
import EmployeeList from '../components/EmployeeList';

// css
import classes from './css/Employees.module.css';

const Employees = () => {
    const employees = useSelector(state => state.employees);
    const dispatch = useDispatch();

    useEffect(() => {
        if (employees.length) return;

        // fetch employees and update state
        getEmployees().then(({ data }) => {
            dispatch({ type: CONSTANTS.SET_EMPLOYEES_ACTION, employees: data });
        });
    });

    return (
        <div>
            <div className={classes.header}>
                <h1><b>Employees</b></h1>
            </div>
            {employees.length ?
                <EmployeeList />
            :
                <p>Loading...</p>
            }
        </div>
    );
};

export default Employees;