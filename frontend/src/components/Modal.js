import { useDispatch, useSelector } from "react-redux";
import CONSTANTS from "../store/constants";
import { useState } from "react";

// api helpers
import { deleteEmployee, getEmployees } from "../apiHelpers/employees";

// styling
import './css/Modal.scss';

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
        } catch(err) {
            setErrMessage('An error occurred. Refresh and try again.');
            return;
        }

        // refetch employees
        getEmployees().then(({ data }) => {
            dispatch({ type: CONSTANTS.SET_EMPLOYEES_ACTION, employees: data });
        });

        closeModal();
    }

    const closeModal = () => {
        dispatch({ type: CONSTANTS.SET_MODAL_OPEN_ACTION, modalOpen: false });
    };

    const renderModal = () => {
        switch(type) {
            case CONSTANTS.MODAL_DELETE_EMPLOYEE:
                return (
                    <div>
                        <p>Are you sure you want to remove <b>{`${data.firstName} ${data.lastName}`}</b> from the system?</p>
                        <button onClick={deleteSelectedEmployee}>Yes</button>
                        <button onClick={closeModal}>No</button>
                    </div>
                )
            case CONSTANTS.MODAL_DELETE_SCHEDULE:
                return (
                    <div>
                        
                    </div>
                )
            case CONSTANTS.MODAL_UPDATE_EMPLOYEE:
                return (
                    <div>
                        
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
                {errMessage && <p>{errMessage}</p>}
                {renderModal()}
            </div>
        </div>
    );
};

export default Modal;