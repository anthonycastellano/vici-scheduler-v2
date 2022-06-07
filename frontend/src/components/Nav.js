import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Schedules</Link>
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