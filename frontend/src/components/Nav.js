import { Link } from 'react-router-dom';
import CONSTANTS from '../store/constants';
import { useSelector } from 'react-redux';

// styling
import './css/Nav.scss';

const Nav = () => {
    const activeTab = useSelector(state => state.activeTab);

    return (
        <header className='nav-header'>
            <p id='title'>Vici Surgical</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/"><span className={activeTab === CONSTANTS.SCHEDULES_TAB ? 'active-tab' : ''} >Schedules</span></Link>
                    </li>
                    <li>
                        <Link to='/employees'><span className={activeTab === CONSTANTS.EMPLOYEES_TAB ? 'active-tab' : ''} >Employees</span></Link>
                    </li>
                    <li>
                        <Link to='/admin'><span className={activeTab === CONSTANTS.ADMIN_TAB ? 'active-tab' : ''} >Admin</span></Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Nav;