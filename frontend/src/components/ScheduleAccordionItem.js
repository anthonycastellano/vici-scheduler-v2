import { getMonthString, getSaturdays } from "../helpers/calendarHelpers";
import { MdDelete, MdEditCalendar } from 'react-icons/md';
import { useDispatch } from "react-redux";
import CONSTANTS from "../store/constants";

// create a <tr> for each weekend in a schedule to be rendered in item description
const renderEmployeeRows = (schedule) => {
    const saturdays = getSaturdays(schedule.year, schedule.month);

    const tableRows = [];

    for (let i = 0; i < schedule.leads.length; i++) {
        tableRows.push(
            <tr key={`${schedule._id}-${saturdays[i]}`}>
                <td>
                    <p>{`${schedule.month}/${saturdays[i]}`}</p>
                </td>
                <td>
                    {schedule.leads[i]}
                </td>
                <td>
                    {schedule.backups[i]}
                </td>
            </tr>
        );
    }

    return tableRows;
}

const ScheduleAccordionItem = ({
    schedule,
    showDescription,
    onClick,
    activeItem,
    loggedIn
}) => {
    const buttonText = showDescription ? <b>{`${getMonthString(schedule.month)} ${schedule.year}`}</b> : <span>{`${getMonthString(schedule.month)} ${schedule.year}`}</span>;
    const dispatch = useDispatch();

    const openModal = (modalType) => {
        dispatch({
            type: CONSTANTS.SET_MODAL_OPEN_ACTION,
            modalOpen: true,
            modalType,
            data: schedule
        });
    };

    return (
        <div
            className={`schedule-accordion`}
            ref={showDescription ? activeItem : null}>
            <dt>
                <button onClick={onClick}>{buttonText}</button>

                {showDescription && loggedIn &&
                    <MdEditCalendar
                        className='edit-icon'
                        title='Edit schedule'
                        size={'2em'}
                        onClick={() => openModal(CONSTANTS.MODAL_UPDATE_SCHEDULE)}
                    />
                }
                {showDescription && loggedIn &&
                    <MdDelete
                        className='delete-icon'
                        title='Delete schedule'
                        size={'2em'}
                        onClick={() => openModal(CONSTANTS.MODAL_DELETE_SCHEDULE)}
                    />
                }
            </dt>
    
            <div className={`schedule-accordion-desc ${showDescription ? 'shown' : 'hidden'}`}>
                <dd>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <h3>Weekend</h3>
                                </th>
                                <th>
                                    <h3>{CONSTANTS.PRIMARY}</h3>
                                </th>
                                <th>
                                    <h3>{CONSTANTS.SECONDARY}</h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            { renderEmployeeRows(schedule) }
                        </tbody>
                    </table>
                </dd>
            </div>
        </div>
    );
}

export default ScheduleAccordionItem;
