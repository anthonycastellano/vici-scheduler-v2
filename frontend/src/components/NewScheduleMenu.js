import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANTS from "../store/constants";
import { MdOutlineNavigateBefore } from 'react-icons/md';

// helpers
import { getSchedules, createSchedule } from '../apiHelpers/schedule';
import { scheduleCompareFn, convertEmployees } from '../helpers/helpers';
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
    const [withAssists, setWithAssists] = useState(true);
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
            res = await createSchedule(month, year, selectedEmployees, withAssists);
        } catch {
            return setError('Schedule creation failed');
        }

        setNewSchedule(convertEmployees(res.data, employees));
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

    const renderNewSchedule = () => {
        const saturdays = getSaturdays(year, month);
        return saturdays.map((day, index) =>
            <tr key={`${day}-row`}>
                <td>{`${month}/${day}`}</td>
                <td>{newSchedule.leads[index]}</td>
                <td>{newSchedule.backups[index]}</td>
                {withAssists &&
                <td>{newSchedule.assists[index]}</td>
                }
            </tr>
        );
    };

    return (
        <div>
            <button className='back-btn' onClick={() => setMode(CONSTANTS.ADMIN_MODE_MENU)}><MdOutlineNavigateBefore/></button>

            {
                !confirmMode ?
                    <form onSubmit={handleSubmit}>
                        <h1>Create Schedule</h1>

                        {error &&
                            <div className='error-alert'>
                                <p>{error}</p>
                            </div>
                        }

                        <h2>Month/year</h2>
                        <div className='date-selectors'>
                            {renderMonthSelector()}
                            {renderYearSelector()}
                        </div>

                        <h2>Included employees</h2>
                        <div className='employee-selector'>
                            {renderEmployeeSelector()}
                        </div>

                        <br/>

                        <div className='assist-checkbox'>
                            <input type='checkbox' checked={withAssists} onChange={(e) => setWithAssists(!withAssists)}/>
                            Include {CONSTANTS.ASSIST}s?
                        </div>

                        <br/>

                        <input type='submit' value='Submit' />
                    </form>
                :
                    <div className='new-schedule-item'>
                        <h1>{`${month}/${year} Schedule:`}</h1>
                        <div className={`new-schedule-item-table${withAssists ? ' with-assists' : ''}`}>
                            <table>
                                <thead>
                                    <tr>
                                        <td><p>Weekend</p></td>
                                        <td><p>{CONSTANTS.PRIMARY}</p></td>
                                        <td><p>{CONSTANTS.SECONDARY}</p></td>
                                        {withAssists &&
                                        <td><p>{CONSTANTS.ASSIST}</p></td>
                                        }
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
