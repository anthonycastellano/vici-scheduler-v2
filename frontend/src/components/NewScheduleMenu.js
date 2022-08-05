import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANTS from "../store/constants";
import { MdOutlineNavigateBefore } from 'react-icons/md';

// helpers
import { getSchedules, createSchedule } from '../apiHelpers/schedule';
import { scheduleCompareFn } from '../helpers/helpers';
import { getSaturdays } from '../helpers/calendarHelpers';

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

        setNewSchedule(convertEmployees(res.data));
        setMsg(`${month}/${year} schedule was added to the system`);
        refreshSchedules();
        setConfirmMode(true);
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

    const getEmployeeNameFromID = (employeeID) => {
        const targetEmployee = employees.find((employee) => employee._id === employeeID);
        if (!targetEmployee) return 'Unknown';
        else return `${targetEmployee.firstName} ${targetEmployee.lastName}`
    };

    // convert employee IDs to full names
    const convertEmployees = (schedule) => {
        const convertedLeads = [];
        const convertedBackups = [];

        for (let i = 0; i < schedule.leads.length; i++) {
            convertedLeads.push(getEmployeeNameFromID(schedule.leads[i]));
            convertedBackups.push(getEmployeeNameFromID(schedule.backups[i]));
        }

        return {
            ...schedule,
            leads: convertedLeads,
            backups: convertedBackups,
            leadIds: schedule.leads,
            backupIds: schedule.backups
        };
    };

    const renderNewSchedule = () => {
        const saturdays = getSaturdays(year, month);
        return saturdays.map((day, index) =>
            <tr key={`${day}-row`}>
                <td>{`${month}/${day}`}</td>
                <td>{newSchedule.leads[index]}</td>
                <td>{newSchedule.backups[index]}</td>
            </tr>
        );
    };

    return (
        <div>
            <button className='back-btn' onClick={() => setMode(CONSTANTS.ADMIN_MODE_MENU)}><MdOutlineNavigateBefore/></button>

            {
                !confirmMode ?
                    <form onSubmit={handleSubmit}>
                        <h2>Create Schedule:</h2>

                        {error &&
                            <div className='error-alert'>
                                <p>{error}</p>
                            </div>
                        }

                        <p>Month/year:</p>
                        <div className='date-selectors'>
                            {renderMonthSelector()}
                            {renderYearSelector()}
                        </div>
                        
                        <p>Included employees:</p>
                        <div className='employee-selector'>
                            {renderEmployeeSelector()}
                        </div>

                        <input type='submit' value='Submit' />
                    </form>
                :
                    <div className='new-schedule-item'>
                        <h1>{`${month}/${year} Schedule:`}</h1>
                        <div className='new-schedule-item-table'>
                            <table>
                                <thead>
                                    <tr>
                                        <td><p>Weekend</p></td>
                                        <td><p>Primary</p></td>
                                        <td><p>Secondary</p></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderNewSchedule()}
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>
    );
};

export default NewScheduleMenu;