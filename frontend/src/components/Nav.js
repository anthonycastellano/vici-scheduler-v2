import { Link } from 'react-router-dom';

import classes from './css/Nav.module.css';

const Nav = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Schedule</Link>
                    </li>
                    <li>
                        <Link to='/employees'>Employees</Link>
                    </li>
                    <li>
                        <Link to='/admin'>Admin</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Nav;