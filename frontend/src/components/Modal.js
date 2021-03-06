import { useDispatch, useSelector } from "react-redux";
import CONSTANTS from "../store/constants";
import { useState } from "react";

// helpers
import { deleteEmployee, getEmployees, updateEmployee } from "../apiHelpers/employee";
import { deleteSchedule, getSchedules, updateSchedule } from "../apiHelpers/schedule";
import { scheduleCompareFn } from "../helpers/helpers";

// styling
import './css/Modal.scss';

const ERROR_MSG = 'An error has occurred. Refresh and try again.';

const Modal = () => {
    const type = useSelector(state => state.modal.modalType);
    const data = useSelector(state => state.modal.data);
    const dispatch = useDispatch();
    const authToken = localStorage.getItem('token');
    const [errMessage, setErrMessage] = useState();
    const [firstName, setFirstName] = useState(data.firstName);
    const [lastName, setLastName] = useState(data.lastName);
    const [leads, setLeads] = useState(data.leads);
    const [backups, setBackups] = useState(data.backups);

    const refreshEmployees = () => {
        // refetch employees
        getEmployees().then(({ data }) => {
            dispatch({ type: CONSTANTS.SET_EMPLOYEES_ACTION, employees: data });
        });
    };

    const refreshSchedules = () => {
        getSchedules().then(({ data }) => {
            data.sort(scheduleCompareFn);
            dispatch({ type: CONSTANTS.SET_SCHEDULES_ACTION, schedules: data });
        });
    };

    const deleteSelectedEmployee = async () => {
        // delete employee
        try {
            await deleteEmployee(data._id, authToken);
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
            await deleteSchedule(data._id, authToken);
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
            await updateEmployee(data._id, authToken, firstName, lastName);
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
            await updateSchedule(data._id, authToken, leads, backups);
        } catch (err) {
            setErrMessage(ERROR_MSG)
            return;
        }

        refreshSchedules();
        closeModal();
    };

    const closeModal = () => {
        dispatch({ type: CONSTANTS.SET_MODAL_OPEN_ACTION, modalOpen: false });
    };

    const renderModal = () => {
        switch(type) {
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
                        {errMessage && <p className='error-message'>{errMessage}</p>}
                        <div className='confirm-buttons'>
                            <button className='delete-button' onClick={updateSelectedSchedule}>Submit</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                )
            default:
                return (
                    <button onClick={closeModal}>If you see this, something went wrong. Click to go back.</button>
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