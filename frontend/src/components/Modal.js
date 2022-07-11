import { useDispatch, useSelector } from "react-redux";
import CONSTANTS from "../store/constants";
import { deleteEmployee } from "../apiHelpers/employees";

// styling
import './css/Modal.scss';

// TODO: error handling
const Modal = () => {
    const type = useSelector(state => state.modal.modalType);
    const data = useSelector(state => state.modal.data);
    const dispatch = useDispatch();
    const authToken = localStorage.getItem('token');

    const deleteSelectedEmployee = async () => {
        const res = await deleteEmployee(data._id, authToken);
        // if successful, remove employee from store

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
                {renderModal()}
            </div>
        </div>
    );
};

export default Modal;