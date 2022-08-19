import { useDispatch, useSelector } from "react-redux";
import CONSTANTS from "../store/constants";
import { useState } from "react";

// helpers
import { deleteEmployee, getEmployees, updateEmployee } from "../apiHelpers/employee";
import { deleteSchedule, getSchedules, updateSchedule } from "../apiHelpers/schedule";
import { scheduleCompareFn } from "../helpers/helpers";
import { getSaturdays } from "../helpers/calendarHelpers";

// styling
import './css/Modal.scss';

const ERROR_MSG = 'An error has occurred. Refresh and try again.';

const Modal = () => {
    const type = useSelector(state => state.modal.modalType);
    const data = useSelector(state => state.modal.data);
    const employees = useSelector(state => state.employees);

    const dispatch = useDispatch();
    const [errMessage, setErrMessage] = useState();

    const [firstName, setFirstName] = useState(data.firstName);
    const [lastName, setLastName] = useState(data.lastName);

    const [leads, setLeads] = useState(data.leadIds);
    const [backups, setBackups] = useState(data.backupIds);

    const refreshEmployees = () => {
        // refetch employees
        getEmployees().then(({ data }) => {
            dispatch({ type: CONSTANTS.SET_EMPLOYEES_ACTION, employees: data });
        });
    };

    const refreshSchedules = () => {
        // refetch and sort schedules
        getSchedules().then(({ data }) => {
            data.sort(scheduleCompareFn);
            dispatch({ type: CONSTANTS.SET_SCHEDULES_ACTION, schedules: data });
        });
    };

    const deleteSelectedEmployee = async () => {
        // delete employee
        try {
            await deleteEmployee(data._id);
        } catch (err) {
            setErrMessage(ERROR_MSG);
            return;
        }

        refreshEmployees();
        closeModal();
    }

    const deleteSelectedSchedule = async () => {
        // delete schedule
        try {
            await deleteSchedule(data._id);
        } catch (err) {
            setErrMessage(ERROR_MSG);
            return;
        }

        refreshSchedules();
        closeModal();
    };

    const updateSelectedEmployee = async () => {
        // update employee
        try {
            await updateEmployee(data._id, firstName, lastName);
        } catch (err) {
            setErrMessage(ERROR_MSG);
            return;
        }

        refreshEmployees();
        closeModal();
    };

    const updateSelectedSchedule = async () => {
        // update schedule
        try {
            await updateSchedule(data._id, leads, backups);
        } catch (err) {
            setErrMessage(ERROR_MSG)
            return;
        }

        refreshSchedules();
        closeModal();
    };

    const updateLead = (e, index) => {
        let tempLeads = [...leads];
        tempLeads[index] = e.target.value;
        setLeads(tempLeads);
    };

    const updateBackup = (e, index) => {
        let tempBackups = [...backups];
        tempBackups[index] = e.target.value;
        setBackups(tempBackups);
    };

    const renderEmployeeSelectors = (employeeList, updateListFn) => employeeList.map((employee, index) =>
        <select key={`${updateListFn.name}-${index}-selector`} value={employee} onChange={(e) => updateListFn(e, index)}>
            {employees.map((employeeOption) => <option key={`${updateListFn.name}-${employeeOption._id}-option`} value={employeeOption._id}>{`${employeeOption.firstName} ${employeeOption.lastName}`}</option>)}
        </select>
    );

    const closeModal = () => {
        dispatch({ type: CONSTANTS.SET_MODAL_OPEN_ACTION, modalOpen: false });
    };

    const renderModal = () => {
        switch (type) {
            case CONSTANTS.MODAL_DELETE_EMPLOYEE:
                return (
                    <div>
                        <p className='prompt'>Remove <b>{`${data.firstName} ${data.lastName}`}</b> from the system?</p>
                        
                        {errMessage && <p className='error-message'>{errMessage}</p>}
                        
                        <div className='confirm-buttons'>
                            <button className='delete-button' onClick={deleteSelectedEmployee}>Yes</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                )
            case CONSTANTS.MODAL_DELETE_SCHEDULE:
                return (
                    <div>
                        <p className='prompt'>Remove the <b>{`${data.month}/${data.year}`}</b> schedule from the system?</p>
                        
                        {errMessage && <p className='error-message'>{errMessage}</p>}
                        
                        <div className='confirm-buttons'>
                            <button className='delete-button' onClick={deleteSelectedSchedule}>Yes</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                )
            case CONSTANTS.MODAL_UPDATE_EMPLOYEE:
                return (
                    <div>
                        <p className='prompt'>Update <b>{`${data.firstName} ${data.lastName}`}</b> to:</p>

                        <div className='name-fields'>
                            <input value={firstName} onChange={e => setFirstName(e.target.value)}/>
                            <input value={lastName} onChange={e => setLastName(e.target.value)}/>
                        </div>

                        {errMessage && <p className='error-message'>{errMessage}</p>}

                        <div className='confirm-buttons'>
                            <button className='delete-button' onClick={updateSelectedEmployee}>Submit</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                )
            case CONSTANTS.MODAL_UPDATE_SCHEDULE:
                return (
                    <div>
                        <p className='prompt'>Update <b>{`${data.month}/${data.year}`}</b> schedule to:</p>

                        <div className='employee-selectors-container' >
                            <div className='employee-selectors'>
                                {getSaturdays(data.year, data.month).map((date) => <span key={`${data.month}-${date}-text`}>{data.month}/{date}</span>)}
                            </div>

                            <div className='employee-selectors'>
                                {renderEmployeeSelectors(leads, updateLead)}
                            </div>

                            <div className='employee-selectors'>
                                {renderEmployeeSelectors(backups, updateBackup)}
                            </div>
                        </div>

                        {errMessage && <p className='error-message'>{errMessage}</p>}

                        <div className='confirm-buttons'>
                            <button className='delete-button' onClick={updateSelectedSchedule}>Submit</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                )
            default:
                return (
                    <button onClick={closeModal}>If you see this, something has gone wrong. Click to go back.</button>
                )
        }
    }

    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                {renderModal()}
            </div>
        </div>
    );
};

export default Modal;