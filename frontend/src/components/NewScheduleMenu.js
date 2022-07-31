import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANTS from "../store/constants";
import { MdOutlineNavigateBefore } from 'react-icons/md';

// helpers
import { getSchedules, createSchedule } from '../apiHelpers/schedule';
import { scheduleCompareFn } from '../helpers/helpers';

// styling
import './css/AdminMenu.scss';

const getYearOptions = (year) => {
    const yearOptions = [];
    for (let i = year; i < year+10; i++) {
        yearOptions.push(i);
    }
    return yearOptions;
};

const NewScheduleMenu = ({ setMsg, setMode }) => {
    const [error, setError] = useState('');
    const currentDate = new Date();
    const [month, setMonth] = useState(currentDate.getMonth() + 1);
    const [year, setYear] = useState(currentDate.getFullYear());
    const yearOptions = getYearOptions(currentDate.getFullYear());
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [confirmMode, setConfirmMode] = useState(false);
    const [newSchedule, setNewSchedule] = useState();
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employees);

    const refreshSchedules = () => {
        // refetch and sort schedules
        getSchedules().then(({ data }) => {
            data.sort(scheduleCompareFn);
            dispatch({ type: CONSTANTS.SET_SCHEDULES_ACTION, schedules: data });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let res;
        try {
            res = await createSchedule(token, month, year, selectedEmployees);
        } catch {
            return setError('Schedule creation failed');
        }

        setNewSchedule(res.data);
        setConfirmMode(true);
    };

    const handleConfirm = async (e) => {

        setMsg(`${month}/${year} schedule was added to the system`);
        refreshSchedules();
        setMode(CONSTANTS.ADMIN_MODE_MENU);
    };

    const updateSelectedEmployees = (e) => {
        const employeeList = [];
        for (const employee of e.target.selectedOptions) {
            employeeList.push(employee.value);
        }
        setSelectedEmployees(employeeList);
    }

    const renderMonthSelector = () => (
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {CONSTANTS.MONTH_OPTIONS.map((monthOption, index) =>
                <option key={`${monthOption}-selector`} value={index + 1}>{monthOption}</option>
            )}
        </select>
    );

    const renderYearSelector = () => (
        <select value={year} onChange={(e) => setYear(e.target.value)}>
            {yearOptions.map((yearOption) =>
                <option key={`${yearOption}-selector`} value={yearOption}>{yearOption}</option>
            )}
        </select>
    );

    const renderEmployeeSelector = () => (
        <select multiple={true} onChange={updateSelectedEmployees}>
            {employees.map((employee) =>
                <option key={`${employee._id}-option`} value={employee._id}>{`${employee.firstName} ${employee.lastName}`}</option>
            )}
        </select>
    );

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

                        {renderMonthSelector()}
                        {renderYearSelector()}
                        {renderEmployeeSelector()}

                        <input type='submit' value='Submit' />
                    </form>
                :
                    <form onSubmit={handleConfirm}>
                        <h2>Confirm schedule:</h2>

                        <input type='submit' value='Confirm' />
                    </form>
            }
        </div>
    );
};

export default NewScheduleMenu;