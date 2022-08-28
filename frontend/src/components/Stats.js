import CONSTANTS from "../store/constants";
import { MdOutlineNavigateBefore } from 'react-icons/md';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

// styling
import './css/AdminMenu.scss';


const Stats = ({ setMode }) => {
    const employees = useSelector(state => state.employees);
    const schedules = useSelector(state => state.schedules);
    const [filter, setFilter] = useState(CONSTANTS.FILTER_YEAR);
    const [stats, setStats] = useState();

    useEffect(() => {
        // build out stats using filter and schedules

        let filteredSchedules;
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        switch (filter) {
            case CONSTANTS.FILTER_YEAR:
                filteredSchedules = schedules.filter(schedule => schedule.year === year);
                break;
            case CONSTANTS.FILTER_MONTH:
                filteredSchedules = schedules.filter(schedule => schedule.year === year && schedule.month === month);
                break;
            default:
                filteredSchedules = schedules;
        }

        let newStats = { leadStats: {}, backupStats: {} };
        for (const schedule of filteredSchedules) {
            for (const lead of schedule.leads) {
                if (newStats.leadStats[lead]) {
                    newStats.leadStats[lead] += 1; 
                } else {
                    newStats.leadStats[lead] = 1;
                }
            }

            for (const backup of schedule.backups) {
                if (newStats.backupStats[backup]) {
                    newStats.backupStats[backup] += 1; 
                } else {
                    newStats.backupStats[backup] = 1;
                }
            }
        }

        setStats(newStats);
    }, [filter]);

    const updateFilter = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div>
            <button className='back-btn' onClick={() => setMode(CONSTANTS.ADMIN_MODE_MENU)}><MdOutlineNavigateBefore/></button>

            <div className='stats-page'>
                <h2>View stats for:</h2>
                <select onChange={updateFilter}>
                    <option value={CONSTANTS.FILTER_YEAR}>This year</option>
                    <option value={CONSTANTS.FILTER_MONTH}>This month</option>
                    <option value={CONSTANTS.FILTER_ALL}>All time</option>
                </select>
                <div id='stats-container'>
                    <div className='stats-col'>
                        <h3>Employee</h3>
                        {employees.map(employee => <p key={`${employee._id}-col-1`}>{`${employee.firstName} ${employee.lastName}`}</p>)}
                    </div>

                    <div className='stats-col'>
                        <h3>{CONSTANTS.PRIMARY}</h3>
                        {stats &&
                            employees.map(employee => <p key={`${employee._id}-col-2`}>{stats.leadStats[employee._id]}</p>)
                        }
                    </div>

                    <div className='stats-col'>
                        <h3>{CONSTANTS.SECONDARY}</h3>
                        {stats &&
                            employees.map(employee => <p key={`${employee._id}-col-2`}>{stats.backupStats[employee._id]}</p>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;