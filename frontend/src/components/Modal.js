import { useDispatch, useSelector } from "react-redux";
import CONSTANTS from "../store/constants";
import { useState } from "react";

// api helpers
import { deleteEmployee, getEmployees } from "../apiHelpers/employee";
import { deleteSchedule, getSchedules } from "../apiHelpers/schedule";

// styling
import './css/Modal.scss';

const scheduleCompareFn = (schedule1, schedule2) => {
    return schedule1.year > schedule2.year ||  (schedule1.year === schedule2.year && schedule1.month > schedule2.month) ?  1 : -1;
};

const Modal = () => {
    const type = useSelector(state => state.modal.modalType);
    const data = useSelector(state => state.modal.data);
    const dispatch = useDispatch();
    const authToken = localStorage.getItem('token');
    const [errMessage, setErrMessage] = useState();

    const deleteSelectedEmployee = async () => {
        // delete employee
        try {
            await deleteEmployee(data._id, authToken);
        } catch (err) {
            setErrMessage('An error occurred. Refresh and try again.');
            return;
        }

        // refetch employees
        getEmployees().then(({ data }) => {
            dispatch({ type: CONSTANTS.SET_EMPLOYEES_ACTION, employees: data });
        });

        closeModal();
    }

    const deleteSelectedSchedule = async () => {
        // delete schedule
        try {
            await deleteSchedule(data._id, authToken);
        } catch (err) {
            setErrMessage('An error occurred. Refresh and try again.');
            return;
        }

        // refetch schedules
        getSchedules().then(({ data }) => {
            data.sort(scheduleCompareFn);
            dispatch({ type: CONSTANTS.SET_SCHEDULES_ACTION, schedules: data });
        });

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
                        <p className='prompt'>Update {`${data.firstName} ${data.lastName} to`}:</p>
                        <div className='name-fields'>
                            <input defaultValue={data.firstName}/>
                            <input defaultValue={data.lastName}/>
                        </div>
                        <div className='confirm-buttons'>
                            <button className='delete-button' onClick={() => {}}>Submit</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                )
            case CONSTANTS.MODAL_UPDATE_SCHEDULE:
                return (
                    <div>
                        
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