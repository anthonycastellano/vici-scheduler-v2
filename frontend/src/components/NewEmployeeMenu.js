import { useState } from 'react';
import CONSTANTS from '../store/constants';
import { MdOutlineNavigateBefore } from 'react-icons/md';
import { useDispatch } from 'react-redux';

// api helpers
import { createEmployee, getEmployees } from '../apiHelpers/employee';

// styling
import './css/AdminMenu.scss';

const NewEmployeeMenu = ({ setMode, setMsg }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const refreshEmployees = () => {
        // refetch employees
        getEmployees().then(({ data }) => {
            dispatch({ type: CONSTANTS.SET_EMPLOYEES_ACTION, employees: data });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName.length && !lastName.length) return setError('Employee must have a first name');

        try {
            await createEmployee(firstName, lastName);
        } catch {
            return setError('Employee creation failed');
        }

        setMsg(`${firstName} ${lastName} was added to the system`);
        refreshEmployees();
        setMode(CONSTANTS.ADMIN_MODE_MENU);
    };

    return (
        <div>
            <button className='back-btn' onClick={() => setMode(CONSTANTS.ADMIN_MODE_MENU)}><MdOutlineNavigateBefore/></button>

            <form onSubmit={handleSubmit}>
                <h2>Create Employee:</h2>

                {error &&
                    <div className='error-alert'>
                        <p>{error}</p>
                    </div>
                }

                <input type='text' placeholder='First Name' value={firstName} onChange={e => setFirstName(e.target.value)}/>
                <input type='text' placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)}/>
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
};

export default NewEmployeeMenu;