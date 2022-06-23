import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CONSTANTS from '../store/constants'

const Admin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: CONSTANTS.SET_ACTIVE_TAB_ACTION, activeTab: CONSTANTS.ADMIN_TAB });
    }, []);

    return <h1>Admin</h1>;
};

export default Admin;