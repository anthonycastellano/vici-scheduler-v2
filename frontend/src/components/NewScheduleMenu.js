import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANTS from "../store/constants";
import { MdOutlineNavigateBefore } from 'react-icons/md';

// helpers
import { getSchedules, createSchedule } from '../apiHelpers/schedule';
import { scheduleCompareFn } from '../helpers/helpers';

// styling
import './css/AdminMenu.scss';

const NewScheduleMenu = ({ setMsg, setMode }) => {
    const [error, setError] = useState('');
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [employees, setEmployees] = useState([]);
    const [confirmMode, setConfirmMode] = useState(false);
    const [newSchedule, setNewSchedule] = useState();
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    const refreshSchedules = () => {
        // refetch and sort schedules
        getSchedules().then(({ data }) => {
            data.sort(scheduleCompareFn);
            dispatch({ type: CONSTANTS.SET_SCHEDULES_ACTION, schedules: data });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let schedule;
        try {
           schedule = await createSchedule(token, month, year, employees);
        } catch {
            return setError('Schedule creation failed');
        }

        // TODO: confirm step after displaying new schedule, prompt for regeneration

        setMsg(`${month}/${year} schedule was added to the system`);
        refreshSchedules();
        setMode(CONSTANTS.ADMIN_MODE_MENU);
    };

    return (
        <div>
            <button className='back-btn' onClick={() => setMode(CONSTANTS.ADMIN_MODE_MENU)}><MdOutlineNavigateBefore/></button>

            {
                !confirmMode ?
                    <form className='new-employee-form' onSubmit={handleSubmit}>
                    <h2>Create Schedule:</h2>

                    {error &&
                        <div className='error-alert'>
                            <p>{error}</p>
                        </div>
                    }

                    <input type='submit' value='Submit' />
                </form>
                :
                <div>
                    Confirm?
                </div>
            }
            
        </div>
    );
};

export default NewScheduleMenu;