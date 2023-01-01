import { MdDelete, MdModeEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import CONSTANTS from '../store/constants';

const renderScheduleList = (employee) => employee.upcomingSchedules.map((schedule) => {
    return (
        <tr key={`${schedule[0] + schedule[1]}-row`}>
            <td><p>{schedule[0]}</p></td>
            <td><p className={schedule[1] === CONSTANTS.PRIMARY ? 'highlight' : null}>{schedule[1]}</p></td>
        </tr>
    );
});

const EmployeeAccordionItem = ({
    employee,
    showDescription,
    onClick,
    loggedIn
}) => {
    const buttonText = showDescription ? <b>{`${employee.firstName} ${employee.lastName.substr(0, CONSTANTS.MAX_LAST_NAME_CHARS)}`}</b> : <span>{`${employee.firstName} ${employee.lastName}`}</span>
    const dispatch = useDispatch();

    const openModal = (modalType) => {
        dispatch({
            type: CONSTANTS.SET_MODAL_OPEN_ACTION,
            modalOpen: true,
            modalType,
            data: employee
        });
    };

    return (
        <div className={`employee-accordion`}>
            <dt>
                <button onClick={onClick}>{buttonText}</button>
                {showDescription && loggedIn &&
                    <MdModeEdit
                        className='edit-icon'
                        title='Edit employee'
                        size={'2em'}
                        onClick={() => openModal(CONSTANTS.MODAL_UPDATE_EMPLOYEE)}
                    />
                }
                {showDescription && loggedIn &&
                    <MdDelete
                        className='delete-icon'
                        title='Delete employee'
                        size={'2em'}
                        onClick={() => openModal(CONSTANTS.MODAL_DELETE_EMPLOYEE)}
                    />
                }
            </dt>

            <div className={`employee-accordion-desc ${showDescription ? 'shown' : 'hidden'}`}>
                <dd>
                    {
                        employee.upcomingSchedules &&
                        <table>
                            <thead>
                                <tr>
                                    <td><h3>Weekend</h3></td><td><h3>Role</h3></td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderScheduleList(employee)}
                            </tbody>
                        </table>
                    }
                    {!employee.upcomingSchedules && <p>No upcoming dates.</p>}
                </dd>
            </div>
        </div>
    );
};

export default EmployeeAccordionItem;
