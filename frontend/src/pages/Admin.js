import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CONSTANTS from '../store/constants'

// components
import Login from '../components/Login';

const Admin = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);

    useEffect(() => {
        // set active tab
        dispatch({ type: CONSTANTS.SET_ACTIVE_TAB_ACTION, activeTab: CONSTANTS.ADMIN_TAB });

        // negate scroll from other pages
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            {loggedIn ?
            <div>
                Logged in
            </div>
            :
            <div>
                <Login />
            </div>
            }            
        </div>
    );
};

export default Admin;