import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CONSTANTS from '../store/constants'

// components
import Login from '../components/Login';
import NewEmployeeMenu from '../components/NewEmployeeMenu';
import NewScheduleMenu from '../components/NewScheduleMenu';
import Stats from '../components/Stats';

// styling
import './css/Admin.scss';

const Admin = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    const [mode, setMode] = useState(CONSTANTS.ADMIN_MODE_MENU);
    const [msg, setMsg] = useState();

    useEffect(() => {
        // set active tab
        dispatch({ type: CONSTANTS.SET_ACTIVE_TAB_ACTION, activeTab: CONSTANTS.ADMIN_TAB });

        // negate scroll from other pages
        window.scrollTo(0, 0);
    }, []);

    const renderMenu = () => {
        switch (mode) {
            case CONSTANTS.ADMIN_MODE_EMPLOYEE:
                return <NewEmployeeMenu setMode={setMode} setMsg={setMsg}/>
            case CONSTANTS.ADMIN_MODE_SCHEDULE:
                return <NewScheduleMenu setMode={setMode}/>
            case CONSTANTS.ADMIN_MODE_STATS:
                return <Stats setMode={setMode}/>
            default:
                return (
                    <div className='admin-menu'>
                        <h2>I would like to...</h2>
                        <button onClick={() => setMode(CONSTANTS.ADMIN_MODE_EMPLOYEE)}>create an <b>employee</b></button>
                        <button onClick={() => setMode(CONSTANTS.ADMIN_MODE_SCHEDULE)}>create a <b>schedule</b></button>
                        <button onClick={() => setMode(CONSTANTS.ADMIN_MODE_STATS)}>view <b>stats</b></button>
                    </div>
                )
        }
    }

    return (
        <div>
            {loggedIn ?
            <div>
                {renderMenu()}
                {msg && <p>{msg}</p>}
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